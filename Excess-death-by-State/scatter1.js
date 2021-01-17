// Modified version of template provided at: https://www.d3-graph-gallery.com/graph/scatter_basic.html

function drawScatterPlot(dataFile, cssSelector, varX, varY, lowX, highX, lowY, highY, labelY, distY){
  // set the dimensions and margins of the graph
  var margin = {top: 10, right: 30, bottom: 40, left: 60},
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

    // Text to X-axis, not in original template
    svg.append("text")
      .attr("transform", "translate(" + (width/8) + " ," + (height + margin.top + 20) + ")")
      .style("text-anxchor", "middle")
      .text("Average Weekly Excess Deaths per 100k");

    // Add Y axis
    var y = d3.scaleLinear()
      .domain([lowY, highY])
      .range([ height, 0]);
    svg.append("g")
      .call(d3.axisLeft(y));

    // Text to Y-axis, not in original template
    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - (margin.left + distY))
      .attr("x", 0 - (height/2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text(labelY);

    // Add dots
    svg.append('g')
      .selectAll("dot")
      .data(data)
      .enter()
      .append("circle")
        .attr("cx", function (d) { return x(d[varX]); } )
        .attr("cy", function (d) { return y(d[varY]); } )
        .attr("r", 3)
        .style("fill", "#69b3a2");

    // Name dots, with state names
    svg.selectAll("text")
      .data(data)
      .enter()
      // .attr("transform", "translate (0,5)")
      // .attr("class", "state")
      // .attr("x", function(d){
      //   return xScale(highX - d[varX]) + 5;
      // }) .attr("y", function(d){
      //   return yScale(d[varY]);
      // }) .text(function(d){
      //   return d.state
      // });
      .append("text")
        .attr("class", "label")
        .attr('font-size', '10px')
        .attr('font-family', 'sans-serif')
        .attr('text-anchor', 'end')
        .attr("x", function (d) { return x(d[varX]); } )
        .attr("y", function (d) { return y(d[varY]); } )
        .text(d =>`${d.state}`);

    // TODO: Add line of best-fit
    // svg.append("path")
    //   .datum(data)
    //   .attr("class", "line")
    //   .attr("d", line);

    // function fitReg(d,varX, varY){
    //   var x_mean = mean(d[varX])
    //   var y_mean = mean(d[varY])
    //   var term1 = 0
    //   var term2 = 0

    //   var xr = 0;
    //   var yr = 0;
    //   for (i = 0; i < d[varX].length; i++) {
    //       xr = d[varX][i] - x_mean;
    //       yr = d[varY][i] - y_mean;
    //       term1 += xr * yr;
    //       term2 += xr * xr;
    //   }

    //   var b1 = term1 / term2;
    //   var b0 = y_mean - (b1 * x_mean);

    //   yhat = [];
    //     // fit line using coeffs
    //     for (i = 0; i < x.length; i++) {
    //         yhat.push(b0 + (d[varX][i] * b1));
    //     }

    //     var dt = [];
    //     for (i = 0; i < d[varY].length; i++) {
    //         dt.push({
    //             "yhat": yhat[i],
    //             "y": d[varY][i],
    //             "x": d[varX][i]
    //         })
    //     }
    //   }
    })
}

drawScatterPlot("code/total.csv", "#scatter1", "excess_deaths_per_100k_wa", "Stringency", -0.5, 7, 20, 80, "Oxford Stringency Index", 0)
drawScatterPlot("code/total.csv", "#scatter2", "excess_deaths_per_100k_wa", "Per_capita_Real_GDP", -0.5, 7, 10000, 200000, "Real GDP pc", 3)
drawScatterPlot("code/total.csv", "#scatter3", "excess_deaths_per_100k_wa", "Mobility_a", -0.5, 7, -60, 0, "Google's Change in Mobility Index", 0)
