const mainElem = document.querySelector('main');
const choiceChips = document.getElementById('choices-input');
const criteriaChips = document.getElementById('criterion-input');
const inputButton = document.getElementById('input-btn');

let criteriaCombo;
let choiceCombo;

const sectionTemplate = Handlebars.compile(`
  <div id="{{ id }}" class="section">
    <p class="caption">{{ caption }}</p>
  </div>
`);

const rangeTemplate = Handlebars.compile(`
  <div class="row range-row">
    <span class="col s3 center-align">{{ left }}</span>
    <span class="range-field col s6">
      <input id="{{ id }}" type="range" min="-9" max="9" step="1"/>
    </span>
    <span class="col s3 center-align">{{ right }}</span>
  </div>
`);

function htmlToElement(html) {
    let template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
}

// The first time inputButton is clicked
inputButton.onclick = () => {
  // add "Comparison Between Criterion" Section
  const criterionSection = htmlToElement(sectionTemplate({
    'id': 'criterion',
    'caption': 'Comparison between Criterion',
  }));
  mainElem.appendChild(criterionSection);

  // add Divider
  mainElem.appendChild(htmlToElement("<div class=\"divider\"></div>"));

  // add "Comparison Between Choices" Section
  const choicesSection = htmlToElement(sectionTemplate({
    'id': 'choices',
    'caption': 'Comparison between Choices',
  }));
  mainElem.appendChild(choicesSection);

  updateComparisonSection();

  // when inputButton is clicked again
  inputButton.onclick = () => {
    updateComparisonSection();
  };
};

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

function updateComparisonSection() {
  // get Choices
  let choices = getChipsData(choiceChips);
  // get Criterion
  let criterion = getChipsData(criteriaChips);

  // empty inputs
  if ((choices.length === 0) || (criterion.length === 0)) {
    return;
  }

  // obtain DOM of choicesSection & criterionSection
  const criterionSection = document.getElementById('criterion');
  const choicesSection = document.getElementById('choices');

  // create Reference
  const criterionReference = htmlToElement(rangeTemplate({
    'left': 'Left is more Important',
    'right': 'Right is more Important'
  }));

  const choicesReference = htmlToElement(rangeTemplate({
    'left': 'Left is Better',
    'right': 'Right is Better'
  }));

  // create Range for Comparison between each Criteria
  criteriaCombo = combinations(criterion, 2);
  criterionSection.appendChild(htmlToElement("<p class=\"caption\">Reference: </p>"));
  criterionSection.appendChild(criterionReference);
  for (let combo of criteriaCombo) {
    let cleft = criterion.indexOf(combo[0]);
    let cright = criterion.indexOf(combo[1]);
    let id = `c-${cleft}-${cright}`;
    let cRange = htmlToElement(rangeTemplate({'id': id, 'left': combo[0], 'right': combo[1]}));
    criterionSection.appendChild(cRange);
  }

  choiceCombo = combinations(choices, 2);
  choicesSection.appendChild(htmlToElement("<p class=\"caption\">Reference: </p>"));
  choicesSection.appendChild(choicesReference);
  for (let c of criterion) {
    choicesSection.appendChild(htmlToElement(`<p class="caption">${c}</p>`));
    for (let combo of choiceCombo) {
      let cIdx = criterion.indexOf(c);
      let aleft = choices.indexOf(combo[0]);
      let aright = choices.indexOf(combo[1]);
      let id = `c-${cIdx}-a-${aleft}-${aright}`;
      let aRange = htmlToElement(rangeTemplate({'id': id, 'left': combo[0], 'right': combo[1]}));
      choicesSection.appendChild(aRange);
    }
  }
  // initialize the ranges that are newly added
  M.Range.init(document.querySelectorAll("input[type=range]"));
  // console.log(choices);
  // console.log(criterion);
}
