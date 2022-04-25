var ctx = document.getElementById("myChart");
var myChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: f,
    datasets: [
      {
        label: "Average",
        data: dbfs,
        lineTension: 0,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: "#69d1a9",
        borderWidth: 2,
        pointBackgroundColor: "#69d1a9",
      },
    ],
  },
  options: {
    scales: {
      x: {
        display: true,
        type: "logarithmic",
        min: 40,
        max: 15000,
      },
    },
    legend: {
      display: false,
    },
    elements: {
      point: {
        radius: 0,
      },
    },
  },
});
