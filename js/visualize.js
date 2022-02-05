function criteriaWeightBar(canvas_id, criteriaWeight) {
  let x = [];
  let y = [];
  for (const criteria in criteriaWeight) {
    x.push(criteria);
    y.push(criteriaWeight[criteria]);
  }

  const borderColor = 'rgb(33, 33, 33)';
  const backgroundColor = rgbToRgba(borderColor, 0.2);

  const ctx = document.getElementById(canvas_id).getContext('2d');

  let bar = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: x,
      datasets: [{
        data: y,
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        borderWidth: 1,
      }]
    },
    options: {
      title: {
        display: true,
        text: 'Importance of each Criteria'
      },
      legend: {
        display: false
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            min: 0,
            // max: 1
          }
        }]
      }
    }
  });
}

function choiceScoreBar(canvas_id, choices, finalScore, criterion) {
  let colors;
  if (criterion.length > 9) {
    colors = palette('tol-rainbow', criterion.length).map(color => hexToRgb(color));
  } else {
    colors = palette('cb-Greys', criterion.length).map(color => hexToRgb(color));
  }

  let datasets = [];

  for (let c = 0; c < criterion.length; c++) {
    let data = [];
    for (let a = 0; a < choices.length; a++) {
      data.push(finalScore[choices[a]][criterion[c]]);
    }
    datasets.push({
      label: criterion[c],
      data: data,
      backgroundColor: rgbToRgba(colors[c], 0.2),
      borderColor: colors[c],
      borderWidth: 1,
    });
  }

  console.log(datasets);

  const ctx = document.getElementById(canvas_id).getContext('2d');

  let stackedBar = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: choices,
      datasets: datasets
    },
    options: {
      title: {
        display: true,
        text: 'Score of each Choice'
      },
      scales: {
        xAxes: [{
          stacked: true
        }],
        yAxes: [{
          ticks: {
            beginAtZero: true,
            min: 0,
            // max: 1,
          },
          stacked: true
        }]
      },
    }
  });
}

function rgbToRgba(rgbString, alpha) {
  // rgb_str: rgb(R, G, B)
  // 
  // return: rgba(R, G, B, alpha)
  let rgbaValues = rgbString.slice(4, -1).split(',').map(value => value.trim());
  rgbaValues.push(alpha);

  return `rgba(${rgbaValues.join(',')})`;
}

function hexToRgb(hex) {
  // hex: rrggbb
  //
  // return: rgb(R, G, B)
  const red = parseInt(hex.slice(0, 2), 16);
  const green = parseInt(hex.slice(2, 4), 16);
  const blue = parseInt(hex.slice(4, 6), 16);

  return `rgb(${red}, ${green}, ${blue})`;
}