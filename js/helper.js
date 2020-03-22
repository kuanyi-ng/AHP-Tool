const comparisonValue = [9, 8, 7, 6, 5, 4, 3, 2, 1, 1/2, 1/3, 1/4, 1/5, 1/6, 1/7, 1/8, 1/9];

function htmlToElement(html) {
    let template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
}

function getChipsData(elem) {
  // return text in each chip in a list
  return M.Chips.getInstance(elem).chipsData.map(chip => chip.tag);
}

function getRangeId(type, combo, c=null) {
  let left;
  let right;
  if (type === "criteria") {
    left = criterion.indexOf(combo[0]);
    right = criterion.indexOf(combo[1]);
    return `c-${left}-${right}`;
  } else if (type === "choice") {
    if (!c) { return; }

    let cIdx = criterion.indexOf(c);
    left = choices.indexOf(combo[0]);
    right = choices.indexOf(combo[1]);
    return `c-${cIdx}-a-${left}-${right}`;
  } else {
    return;
  }
}

function getRangeValue(type, combo, c=null) {
  let id = getRangeId(type, combo, c);
  return document.getElementById(id).value;
}

function getComparisonValue(type, combo, c=null) {
  let validType = ["criteria", "choice"];
  if (validType.indexOf(type) === -1) {
    return;
  }

  let rangeVal = getRangeValue(type, combo, c);
  return comparisonValue[rangeVal];
}

function combinations(arr, r) {
  let combinationIndex = combinationUtil(arr.length, r);
  return combinationIndex.map((idx) => {
    return idx.map(i => arr[i]);
  });
}

function combinationUtil(l, r, result=[]) {
  // Generate an Array of (Array of indexes)
  // which is used to produce combination
  if (result.length === 0) {
    // add first combination
    let first = [];
    for (let i = 0; i < r; i++) {
      first.push(i);
    }
    result.push(first);
    return combinationUtil(l, r, result);
  }

  // get the previous combination
  let previous = result[result.length-1].slice();
  // last combination generated
  if (previous[0] === (l-r)) {
    return result;
  }
  // generate the next combination based on previous
  let maxAtEachIndex = [];
  for (let i = 0; i < r; i++) {
    maxAtEachIndex.push(l-r+i);
  }
  for (let checkIndex = r-1; checkIndex >= 0; checkIndex--) {
    // if value at checkIndex is not at its max (this is the next combination)
    if (previous[checkIndex] != l-r+checkIndex) {
      let temp = previous.slice(); // copy
      // increment the value at checkIndex
      temp[checkIndex] = previous[checkIndex] + 1;
      // fill in the rest in ascending order
      for (let fillIndex = checkIndex+1; fillIndex < r; fillIndex++) {
        temp[fillIndex] = temp[fillIndex-1] + 1;
      }
      // add to result
      result.push(temp);
      return combinationUtil(l, r, result);
    }
  }
}

function geometricMean(arr) {
  if (arr.length === 0) {
    return;
  }

  let total = arr[0];
  for (let i = 1; i < arr.length; i++) {
    total *= arr[i];
  }

  return Math.pow(total, 1/arr.length);
}

function percentageAmong(n, arr) {
  if ((arr.length === 0) | (arr.indexOf(n) === -1)) {
    return;
  }

  let total = arr[0];
  for (let i = 1; i < arr.length; i++) {
    total += arr[i];
  }

  return n / total;
}

function makeComparisonMatrix(arr) {
  let compareMatrix = {};
  for (let idx of arr) {
    compareMatrix[idx] = {};
    for (let col of arr) {
      if (idx === col) {
        compareMatrix[idx][col] = 1;
      } else {
        compareMatrix[idx][col] = null;
      }
    }
  }
  return compareMatrix;
}

function updateComparisonMatrix(cm, combo, val) {
  let idx = combo[0];
  let col = combo[1];
  cm[idx][col] = val;
  cm[col][idx] = 1/val;
  return cm;
}
