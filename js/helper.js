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
