function drawScatterPlot(dataFile, cssSelector, varX, varY, lowX, highX, lowY, highY){
  // set the dimensions and margins of the graph
  var margin = {top: 10, right: 30, bottom: 30, left: 60},
      width = 460 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  var svg = d3.select(cssSelector)
    .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

  //Read the data
  d3.csv(dataFile, function(data) {

    // Add X axis
    var x = d3.scaleLinear()
      .domain([lowX, highX])
      .range([ 0, width ]);
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    // Add Y axis
    var y = d3.scaleLinear()
      .domain([lowY, highY])
      .range([ height, 0]);
    svg.append("g")
      .call(d3.axisLeft(y));

    // Add dots
    svg.append('g')
      .selectAll("dot")
      .data(data)
      .enter()
      .append("circle")
        .attr("cx", function (d) { return x(d[varX]); } )
        .attr("cy", function (d) { return y(d[varY]); } )
        .attr("r", 3)
        .style("fill", "#69b3a2")
      })
}

drawScatterPlot("code/total.csv", "#scatter1", "excess_deaths_per_100k_wa", "Stringency", -0.5, 7, 20, 70)
drawScatterPlot("code/total.csv", "#scatter2", "excess_deaths_per_100k_wa", "Per_capita_Real_GDP", -0.5, 7, 10000, 200000)
drawScatterPlot("code/total.csv", "#scatter3", "excess_deaths_per_100k_wa", "Mobility_a", -0.5, 7, -60, 0)
