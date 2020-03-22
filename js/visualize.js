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
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: y
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
                  max: 1
              }
          }]
        }
      }
  });
}
