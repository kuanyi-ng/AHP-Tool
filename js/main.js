const mainElem = document.querySelector('main');
const choiceChips = document.getElementById('choices-input');
const criteriaChips = document.getElementById('criterion-input');
const inputButton = document.getElementById('input-btn');
let calButton;

let choices;
let criterion;
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
      <input id="{{ id }}" type="range" min="0" max="16" step="1"/>
    </span>
    <span class="col s3 center-align">{{ right }}</span>
  </div>
`);

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

  // add Button
  mainElem.appendChild(htmlToElement("<a id=\"cal-btn\" class=\"waves-effect waves-light btn\"><i class=\"material-icons\">navigate_next</i></a>"));
  calButton = document.getElementById('cal-btn');

  updateComparisonSection();

  // when inputButton is clicked again
  inputButton.onclick = () => {
    updateComparisonSection();
  };

  // when calButton is clicked
  calButton.onclick = () => {
    simulateResult();
  };
};

function updateComparisonSection() {
  // get Choices
  choices = getChipsData(choiceChips);
  // get Criterion
  criterion = getChipsData(criteriaChips);

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

  // create Range for Comparison between each Choices
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

  // don't initialize the ranges that are newly added to avoid confusion (no ballon showing value)
  // M.Range.init(document.querySelectorAll("input[type=range]"));
}

function simulateResult() {
  // Initialize Comparison Matrix for Weight of each Criteria
  let criteriaCMatrix = makeComparisonMatrix(criterion);
  // Initialize Comparison Matrix for Comparison of each Choice
  let choiceCMatrix = {}
  for (let criteria of criterion) {
    choiceCMatrix[criteria] = makeComparisonMatrix(choices);
  }

  // get value from Range and update CMatrix
  // Weight of each Criteria
  for (let cCombo of criteriaCombo) {
    let val = getComparisonValue("criteria", cCombo);
    criteriaCMatrix = updateComparisonMatrix(criteriaCMatrix, cCombo, val);
  }

  // Comparison of Each Choice
  for (let criteria of criterion) {
    for (let aCombo of choiceCombo) {
      let val = getComparisonValue("choice", aCombo, criteria);
      choiceCMatrix[criteria] = updateComparisonMatrix(choiceCMatrix[criteria], aCombo, val);
    }
  }

  // calculate the Weight of each Criteria
  let criteriaWeight = groupImportance(groupGeometricMean(criteriaCMatrix));

  // calculate the Rating of each Choice based on each Criteria
  let choiceWeight = {};
  for (let criteria of criterion) {
    choiceWeight[criteria] = groupImportance(groupGeometricMean(choiceCMatrix[criteria]));
  }

  console.log(criteriaWeight);
  console.log(choiceWeight);
}
