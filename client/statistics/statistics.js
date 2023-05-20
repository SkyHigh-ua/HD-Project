var ctx = document.getElementById('myChart').getContext('2d');
var chartData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  datasets: [{
    data: [12, 19, 8, 15, 10, 5, 7, 9, 13, 6, 11, 14], 
    backgroundColor: 'rgba(128, 128, 128, 0.5)', 
    borderColor: 'rgba(128, 128, 128, 1)', 
    borderWidth: 1
  }]
};

var myChart = new Chart(ctx, {
  type: 'bar',
  data: chartData,
  options: {
    scales: {
      x: {
        grid: {
          display: false 
        }
      },
      y: {
        grid: {
          display: false 
        },
        beginAtZero: true,
        stepSize: 1 
      }
    },
    plugins: {
      legend: {
        display: false 
      }
    }
  }
});
