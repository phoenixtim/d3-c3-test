$(document).ready(function () {
  $.getJSON('/chart_data/', function (data) {
    console.log(data);

    var chart = c3.generate({
      bindto: '#chart_c3',
      data: {
        columns: data,
        types: {
          'Line 1': 'area',
          'Line 2': 'bar',
        },
      },
      axis: {
        x: {
          label: {
            text: 'x label',
            position: 'outer-center',
          },
          padding: {
            left: 0,
            // right: 0,
          },
          // min: 10,
        },
        y: {
          label: {
            text: 'y label',
            position: 'outer-middle',
          },
          padding: {
            // top: 0,
            bottom: 0,
          },
        },
      },
      subchart: {
        show: true,
      },
    });
  });
});
