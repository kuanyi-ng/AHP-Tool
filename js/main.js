const mainElem = document.querySelector('main');
const choiceChips = document.getElementById('alternatives');
const criteriaChips = document.getElementById('criterion');
const inputButton = document.getElementById('input-btn');

const sectionTemplate = Handlebars.compile(`
  <div class="section">
    <p class="caption">{{ caption }}</p>
  </div>
`);

const rangeTemplate = Handlebars.compile(`
  <div class="row">
    <span class="col s1 center-align">{{ left }}</span>
    <span class="range-field col s10">
      <input type="range" id="test5" min="-9" max="9" step="1"/>
    </span>
    <span class="col s1 center-align">{{ right }}</span>
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
  const criterionSection = sectionTemplate({'caption': 'Comparison between Criterion'});
  mainElem.appendChild(htmlToElement(criterionSection));

  // add Divider
  mainElem.appendChild(htmlToElement("<div class=\"divider\"></div>"));

  // add "Comparison Between Choices" Section
  const choicesSection = sectionTemplate({'caption': 'Comparison between Choices'});
  mainElem.appendChild(htmlToElement(choicesSection));

  inputButton.onclick = () => {
    updateComparisonSection();
  };

  updateComparisonSection();
};

function getChipsData(elem) {
  // return text in each chip in a list
  return M.Chips.getInstance(elem).chipsData.map(chip => chip.tag);
}

function combinations(arr, r) {

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
    return experiment(l, r, result);
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
      return experiment(l, r, result);
    }
  }
}

function updateComparisonSection() {
  // get Choices
  let choices = getChipsData(choiceChips);
  // get Criterion
  let criterion = getChipsData(criteriaChips);
  // create Range
  console.log(choices);
  console.log(criterion);
}
