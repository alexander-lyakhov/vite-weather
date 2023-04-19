export default {
  spanGaps: true,
  maintainAspectRatio: false,
  // animation: false,

  scales: {
    x: {
      ticks: {
        font: {
          family: 'verdana'
        },
        color: '#c0c0c0',
        maxRotation: 0,
        minRotation: 0,
        maxTicksLimit: 6
      },
    },
    y: {
      ticks: {
        font: {
          family: 'verdana',
        },
        color: '#c0c0c0',
      },
      beginAtZero: true
    },
  },
  elements: {
    point: {
      pointStyle: 'rect',
      radius: 3,
      hitRadius: 6,
      hoverRadius: 8
    },
    line: {
      borderWidth: 1
    }
  },
  plugins: {
    tooltip: {
      titleFont: {
        family: 'verdana',
        size: 14,
        weight: 'normal'
      },
      bodyFont: {
        family: 'verdana',
        size: 14,
      },
      boxWidth: 8,
      boxHeight: 8,
      boxPadding: 4
    },
    legend: {
      labels: {
        color: '#e0e0e0',
        font: {
          family: 'verdana',
          size: 14,
        }
      }
    },
  }
}
