var spyChartCanvas = $('#spy-chart')
var spyChart = new Chart(spyChartCanvas, {
    type: 'line',
    data: {
        labels: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26],
        datasets: [{
            label: 'SPY',
            data: [1,2,3,2,6,5,5,4,6,8,7,9,8,10,9,7,8,9,10,9,11,12,10,13,14,11],
            backgroundColor: 'rgba(255, 99, 132, 1)',
            lineTension: 0.25,
            pointBackgroundColor: 'rgba(255, 255, 255, 1)',
            pointBorderColor: 'rgba(255, 99, 132, 1)'
        }]
    }
})
