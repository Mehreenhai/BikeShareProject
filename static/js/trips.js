var trips_url = "/trips";
var violations_url = "/speed_violations";

const ctx1 = document.getElementById("timeline1");
const ctx2 = document.getElementById("timeline2");
const ctx3 = document.getElementById("timeline3");

console.log(ctx1);

d3.json(trips_url, function(responseTrips){
    console.log(responseTrips);

    d3.json(violations_url, function(responseViolations){
        console.log(responseViolations); 

//   Pulling Data for Trips/year
    var year_analysis = responseTrips.year_analysis;
    var ctx1_year = [];
    var ctx1_value = [];
    

    for (var i=0; i<year_analysis.length;i++) {
        var year = year_analysis[i][0];
        var value = year_analysis[i][1];

        ctx1_year.push(year);
        if (year == 2017) {
            ctx1_value.push(value*2); 
        } else {
            ctx1_value.push(value);
        }
        
    }

// Pulling Data for violations/year
    var violation_analysis = responseViolations.violation_analysis;
    var viol_year = [];
    var viol_value = [];

    for (var i=0; i<violation_analysis.length;i++) {
        var year = violation_analysis[i][0];
        var value = violation_analysis[i][1];

        viol_year.push(year)
        if (year == 2014) {
            viol_value.push(value*2)
        } else {
            viol_value.push(value)
        }
    } 
console.log(ctx1_year);
console.log(viol_year);

// CREATING LINE CHART WITH COMPARISON OF RIDES VS VIOLATIONS
    new Chart(ctx1, {
      type: 'line',
      data: {
        labels: ctx1_year,
        datasets: [{
          label: 'Rides per Year',
          yAxisID: 'A',
          data: ctx1_value,
          backgroundColor:[
                    'rgba(255, 99, 132, 0.2)'
                    ],
                        borderColor: [
                            'rgba(255,99,132,1)'
                        ],
                        borderWidth: 1
        }, {
          label: 'Violations per Year',
          yAxisID: 'B',
          data: viol_value
        }]
      },
      options: {
        scales: {
          yAxes: [{
            id: 'A',
            type: 'linear',
            position: 'left',
          }, {
            id: 'B',
            type: 'linear',
            position: 'right',
            ticks: {
            //   max: 1,
            //   min: 0
                beginAtZero:true                       

            }
          }]
        }
      }
    });

// CREATING PIE CHARTS
    var gender_analysis = responseTrips.gender_analysis;
    var ctx2_gender = [];
    var ctx2_value = [];

    
    for (var i=0; i<gender_analysis.length;i++) {
        ctx2_gender.push(gender_analysis[i][0])
        ctx2_value.push(gender_analysis[i][1])
        
    }
        
    var myDoughnutChart = new Chart(ctx2, {
        type: 'doughnut',
        data: {
            datasets: [{
                data: ctx2_value,
                backgroundColor:[
                    'rgba(255,105,180,0.4)','rgba(0,0,255,0.4)'
                    ],
                borderColor: [
                    'rgba(255,105,180,1)','rgba(0,0,255,1)'
                ],
                borderWidth: 1
                        
            }],
        
            // These labels appear in the legend and in the tooltips when hovering different arcs
            labels: ctx2_gender
        },
        options: {cutoutPercentage:70,
                  animation: {animateRotate: true}
        }
    });



});


});