$(document).ready(function () {
  $.getJSON('/chart_data_d3/', function (data) {
    var margin = {
      left: 30,
      right: 30,
      top: 30,
      bottom: 30,
    };
    var svgWidth = 1000;
    var svgHeight = 600;
    var width = svgWidth - margin.left - margin.right;
    var height = svgHeight - margin.top - margin.bottom;

    var svg = d3.select('#chart_d3').append('svg')
      .attr('width', svgWidth)
      .attr('height', svgHeight);
    svg = svg.append('g')
      .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

    var xScale = d3.scaleLinear()
      .range([0, width])
      .domain([0, data.maxX]);
    var yScale = d3.scaleLinear()
      .range([height, 0])
      .domain([0, data.maxY]);

    var xAxis = d3.axisBottom()
      .scale(xScale);
    var yAxis = d3.axisLeft()
      .scale(yScale);

    svg.append('g')
      .call(xAxis)
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0, ' + height + ')');
    svg.append('g')
      .call(yAxis)
      .attr('class', 'axis axis--y');

    var line1 = d3.line()
      .x(function (_, index) {
        return xScale(index);
      })
      .y(function (data, index) {
        return yScale(data);
      });

    svg.append('path')
      .datum(data.line1.data)
      .attr('class', 'line')
      .attr('d', line1);

    var brush = d3.brush().on('end', brushEnded);
    var idleTimeout;
    var idleDelay = 350;

    svg.append('g')
      .attr('class', 'brush')
      .call(brush);

    function brushEnded() {
      var selection = d3.event.selection;
      if (!selection) {
        if (!idleTimeout) {
          return idleTimeout = setTimeout(function () {
              idleTimeout = null;
            }, idleDelay);
        }

        xScale.domain([0, data.maxX]);
        yScale.domain([0, data.maxY]);
      } else {
        xScale.domain(
          [selection[0][0], selection[1][0]].map(xScale.invert, xScale));
        yScale.domain(
          [selection[1][1], selection[0][1]].map(yScale.invert, yScale));

        svg.select('.brush')
          .call(brush.move, null);
      }

      zoom();
    }

    function zoom() {
      var transition = svg.transition().duration(750);

      svg.select('.axis--x')
        .transition(transition)
        .call(xAxis);
      svg.select('.axis--y')
        .transition(transition)
        .call(yAxis);
      svg.select('.line')
        .transition(transition)
        .attr('d', line1);
    }
  });
});
