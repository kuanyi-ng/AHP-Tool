function criteriaWeightBar(canvas_id, criteriaWeight) {
  let x = [];
  let y = [];
  for (const criteria in criteriaWeight) {
    x.push(criteria);
    y.push(criteriaWeight[criteria]);
  }

  const ctx = document.getElementById(canvas_id).getContext('2d');

  let bar = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: x,
        datasets: [{
            data: y,
            backgroundColor: 'rgb(75, 192, 192)',
            borderColor: 'rgb(75, 192, 192)',
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
                  beginAtZero:true,
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
    colors = palette('tol-rainbow', criterion.length).map(color => `#${color}`);
  } else {
    colors = palette('cb-BuGn', criterion.length).map(color => `#${color}`);
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
      backgroundColor: colors[c],
      borderColor: colors[c],
    });
  }

  console.log(datasets);

  const ctx = document.getElementById(canvas_id).getContext('2d');

  let stackedBar = new Chart (ctx, {
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
