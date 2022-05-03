const svg2 = d3.select("#svg2"); 

var width2 = +svg2.attr("width"); 
var height2 = +svg2.attr("height"); 

var chartTime = 10; 
var nodeData = [{"x":0, "y":0, "dataSet":0},
                {"x":1, "y":1, "dataSet":0}]

nested2 = d3.group(nodeData, d => d.dataSet);
    
var render2 = data => {

    //var xValue = d => d.position[0];
    //var yValue = d => d.position[1];

    var xValue = d => +d.x;
    var yValue = d => +d.y;

    var xAxisLabel = 'x1';
    var yAxisLabel = 'x2';
  
    var margin = {top: 100, right: 40, bottom: 95, left: 110}; 
    var innerWidth = width2 - margin.left - margin.right;
    var innerHeight = height2 - margin.top - margin.bottom;
  
    var xScale = d3.scaleLinear()
    .domain(d3.extent(data, xValue))
    .range([0, innerWidth])
    .nice();
  
    var yScale = d3.scaleLinear()
    .domain(d3.extent(data, yValue))
    .range([innerHeight, 0])
    .nice();

    
    var colourScale = d3.scaleOrdinal(d3.schemeCategory10);
    colourScale.domain(nested2); 
    
    /*
    var linkGen = d3.link(d3.curveBundle)
    	.source(d => d.position)
        .target(d => d.parentPosition)
        .x(d => xScale(d[0]))
        .y(d => yScale(d[1])); */

    var g = svg2.append("g")
            .attr('transform', `translate(${margin.left},${margin.top})`);

    var xAxis = d3.axisBottom(xScale)
        .tickSize(-innerHeight)
        .tickPadding(15);
          
    var yAxis = d3.axisLeft(yScale)
        .tickSize(-innerWidth)
        .tickPadding(10);

    var yAxisG = g.append('g').call(yAxis);
        yAxisG.selectAll('.domain').remove();
    
    yAxisG.append('text')
        .attr('class', 'axis-label')
        .attr('y', -50)
        .attr('x', -innerHeight / 2)
        .attr('fill', 'black')
        .attr('transform', `rotate(-90)`)
        .attr('text-anchor', 'middle')
        .text(yAxisLabel);
        
    var xAxisG = g.append('g').call(xAxis)
        .attr('transform', `translate(0,${innerHeight})`);
        
    xAxisG.select('.domain').remove();

    xAxisG.append('text')
        .attr('class', 'axis-label')
        .attr('y', 60)
        .attr('x', innerWidth / 2)
        .attr('fill', 'black')
        .text(xAxisLabel);
        
   /* g.selectAll("path")
        .enter().append('path')
        .data(data)
        .join("path")
        .attr("d", linkGen)
        .attr('stroke', 'black')
        .attr('fill', 'none') 
        .classed("link", true);  

    g.selectAll("circle")
        .data(data)
        .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 5)
        .attr("cx", function(d) { return xScale(d.position[0]); })
        .attr("cy", function(d) { return yScale(d.position[1]); }); 
        .style("fill", function(d) {        
          if (d.position[1] >= 3 && d.position[0] <= 3) {return "#60B19C"} // Top Left
          else if (d.position[1] >= 3 && d.position[0] >= 3) {return "#8EC9DC"} // Top Right
          else if (d.position[1] <= 3 && d.position[0] >= 3) {return "#D06B47"} // Bottom Left
          else { return "#A72D73" } //Bottom Right         
         });
         */ 

         var lineGenerator = d3.line()
         .x(d => xScale(xValue(d)))
         .y(d => yScale(yValue(d)))
         .curve(d3.curveBundle);
   
       g.selectAll('.line-path').data(nested2)
           .enter().append('path')
           .attr('class', 'line-path')
           .attr('d', d => lineGenerator(d[1]))
           .attr('stroke', d => colourScale(d[1])); 

};

render2(nodeData); 