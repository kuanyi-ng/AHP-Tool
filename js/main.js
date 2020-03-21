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
    console.log('input updated');
  };

  console.log('done adding DOM');
};

// function firstInput() {
//   // add "Comparison Between Criterion" Section
//   const criterionSection = sectionTemplate({'caption': 'Comparison between Criterion'});
//   mainElem.innerHTML += criterionSection;
//
//   // add Divider
//   mainElem.innerHTML += "<div class=\"divider\"></div>";
//
//   // add "Comparison Between Choices" Section
//   const choicesSection = sectionTemplate({'caption': 'Comparison between Choices'});
//   mainElem.innerHTML += choicesSection;
//
//   inputButton.onclick = updateInput;
//
//   console.log('done adding DOM');
// }

// When inputButton is clicked again
// function updateInput() {
// }

function getChipsData(elem) {
  // return text in each chip in a list
  return M.Chips.getInstance(elem).chipsData.map(chip => chip.tag);
}

function addChoice() {

}

function addCriteria() {

}
