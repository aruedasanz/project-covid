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
    svg.selectAll("dot")
      .data(data)
      .enter()
      .append("text")
        .attr("class", "label")
        .attr('font-size', '10px')
        .attr('font-family', 'sans-serif')
        .attr('text-anchor', 'end')
        .attr("x", function (d) { return x(d[varX]); } )
        .attr("y", function (d) { return y(d[varY]); } )
        .text(d =>`${d.region_code}`);

    // TODO: Add line of best-fit

    // Calculate a linear regression from the data

    // Takes 5 parameters:
    // (1) Your data
    // (2) The column of data plotted on your x-axis
    // (3) The column of data plotted on your y-axis
    // (4) The minimum value of your x-axis
    // (5) The minimum value of your y-axis

    // Returns an object with two points, where each point is an object with an x and y coordinate
    // Source: https://bl.ocks.org/HarryStevens/be559bed98d662f69e68fc8a7e0ad097

      function calcLinear(data, x, y, minX, minY, cssSelector){
        /////////
        //SLOPE//
        /////////

        // Let n = the number of data points
        var n = data.length;

        // Get just the points
        var pts = [];
        data.forEach(function(d,i){
          var obj = {};
          obj.varX = d[x];
          obj.varY = d[y];
          obj.mult = obj.varX*obj.varY;
          pts.push(obj);
        });

        // Let a equal n times the summation of all x-values multiplied by their corresponding y-values
        // Let b equal the sum of all x-values times the sum of all y-values
        // Let c equal n times the sum of all squared x-values
        // Let d equal the squared sum of all x-values
        var sum = 0;
        var xSum = 0;
        var ySum = 0;
        var sumSq = 0;
        pts.forEach(function(pt){
          sum = sum + parseFloat(pt.mult);
          xSum = xSum + parseFloat(pt.varX);
          ySum = ySum + parseFloat(pt.varY);
          sumSq = sumSq + (parseFloat(pt.varX) * parseFloat(pt.varY));
        });
        var a = sum * n;
        var b = xSum * ySum;
        var c = sumSq * n;
        var d = xSum * xSum;


        // Plug the values that you calculated for a, b, c, and d into the following equation to calculate the slope
        // slope = m = (a - b) / (c - d)
        var m = (a - b) / (c - d);

        /////////////
        //INTERCEPT//
        /////////////

        // Let e equal the sum of all y-values
        var e = ySum;

        // Let f equal the slope times the sum of all x-values
        var f = m * xSum;

        // Plug the values you have calculated for e and f into the following equation for the y-intercept
        // y-intercept = b = (e - f) / n
        var b = (e - f) / n;

        // Print the equation below the chart

        // // return an object of two points
        // // each point is an object with an x and y coordinate
        return {
          ptA : {
            x: minX,
            y: (m * minX) + b
          },
          ptB : {
            y: minY,
            x: (minY - b) / m
          }
        }
      }

    // see above for an explanation of the calcLinear function
    var lg = calcLinear(data, varX, varY, d3.min(data, function(d){ return d[varX]}), d3.min(data, function(d){ return d[varY]}), cssSelector);

    svg.append("line")
        .attr("class", "regression")
        .attr("x1", x(lg.ptA.x))
        .attr("y1", y(lg.ptA.y))
        .attr("x2", x(lg.ptB.x))
        .attr("y2", y(lg.ptB.y));

    })
}

drawScatterPlot("code-and-data/total.csv", "#scatter1", "excess_deaths_per_100k_wa", "Stringency", -1, 7, 20, 80, "Oxford Stringency Index", 0)
// drawScatterPlot("code-and-data/total.csv", "#scatter2", "excess_deaths_per_100k_wa", "Per_capita_Real_GDP", -0.5, 7, 10000, 200000, "Real GDP pc", 3)
// drawScatterPlot("code-and-data/total.csv", "#scatter3", "excess_deaths_per_100k_wa", "Mobility_a", -0.5, 7, -60, 0, "Google's Change in Mobility Index", 0)
drawScatterPlot("code-and-data/total.csv", "#scatter4", "excess_deaths_per_100k_wa", "Density", -1, 7, 0, 1600, "Population Density per Sq Mile", 0)
