const divider = Handlebars.compile(`<div class="divider"></div>`);

const referenceText = Handlebars.compile(`<p class="sub-caption grey-text">Reference: </p>`);

const sectionTemplate = Handlebars.compile(`
  <div id="{{ id }}" class="section">
    <p class="caption">{{ caption }}</p>
  </div>
`);

const referenceRangeTemplate = Handlebars.compile(`
  <div class="row range-row">
    <span class="col s3 center-align card-panel text grey-text">{{ left }}</span>
    <span class="range-field col s6">
      <input id="{{ id }}" type="range" min="0" max="16" step="1"/>
    </span>
    <span class="col s3 center-align card-panel grey-text">{{ right }}</span>
  </div>
`);

const rangeTemplate = Handlebars.compile(`
  <div class="row range-row">
    <span class="col s3 center-align card-panel">{{ left }}</span>
    <span class="range-field col s6">
      <input id="{{ id }}" type="range" min="0" max="16" step="1"/>
    </span>
    <span class="col s3 center-align card-panel">{{ right }}</span>
  </div>
`);

const canvasTemplate = Handlebars.compile(`
  <div style="position: relative; margin: 0 auto;">
    <canvas id="{{ id }}"></canvas>
  </div>
`);

const showResultButton = Handlebars.compile(`
  <div class="row center-align">
    <a id="cal-btn" class="waves-effect waves-light btn">
      <i class="material-icons">assessment</i>
      <span style="display: inline-block; transform: translateY(-4px);">
        Show Result
      </span>
    </a>
  </div>
`);
