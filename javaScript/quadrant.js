const svg2 = d3.select("#svg2"); 

var width2 = +svg2.attr("width"); 
var height2 = +svg2.attr("height"); 

var nodeData = [{"position":[1, 1] , "parentPosition": [0, 0]},
                {"position":[2, 2] , "parentPosition": [1, 1]},
                {"position":[3, 3] , "parentPosition": [2, 2]},
                {"position":[4, 4] , "parentPosition": [3, 3]}] 

var title2 = 'Phase Space';
    
var render2 = data => {

    var xValue = d => +d.position[0];
    var yValue = d => +d.position[1];

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

    var linkGen = d3.link(d3.curveBundle)
    	.source(d => d.parentPosition)
        .target(d => d.position)
        .x(d => xScale(d[0]))
        .y(d => yScale(d[1])); 

    var g = svg2.append("g")
            .attr('transform', `translate(${margin.left},${margin.top})`);

    var xAxis = d3.axisBottom(xScale)
        .tickSize(-innerHeight)
        .tickPadding(15);
          
    var yAxis = d3.axisLeft(yScale)
        .tickSize(-innerWidth)
        .tickPadding(10);

    var yAxisG = g.append('g').call(yAxis)
        .style("stroke-dasharray", ("3, 3")); 
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
        .style("stroke-dasharray", ("3, 3")) 
        .attr('transform', `translate(0,${innerHeight})`);
        
    xAxisG.select('.domain').remove();

    xAxisG.append('text')
        .attr('class', 'axis-label')
        .attr('y', 60)
        .attr('x', innerWidth / 2)
        .attr('fill', 'black')
        .text(xAxisLabel);

    g.append("svg:defs").append("svg:marker")
        .attr("id", "triangle")
        .attr("refX", 11)
        .attr("refY", 5.5)
        .attr("markerWidth", 30)
        .attr("markerHeight", 30)
        .attr("markerUnits","userSpaceOnUse")
        .attr("orient", "auto")
        .append("path")
        .attr("d", "M 0 0 12 6 0 12 3 6")
        .style("fill", "#7129e5");
        
    g.selectAll("path")
        .enter().append('path')
        .data(data)
        .join("path")
        .attr("d", linkGen)
        .attr('stroke', 'none')
        .attr('fill', 'none') 
        .attr("marker-end", "url(#triangle)")
        .classed("link", true);  

    g.append('text')
        .attr('class', 'title')
        .attr('y', -15)
        .text(title2);
  
        /* g.append('path')
         .attr('class', 'line-path')
         .attr('d', lineGenerator(data));*/ 

};

render2(nodeData); 