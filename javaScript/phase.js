/**
 * @file 
 * Handles rendering of the phase space graph
 * Using the values contained in nodeData
 *
 */

const svg2 = d3.select("#svgPhase"); 

const width2 = +svg2.attr("width"); 
const height2 = +svg2.attr("height"); 

/*default data for first display */
var nodeData = [{"position":[1, 1] , "parentPosition": [0, 0]},
                {"position":[2, 2] , "parentPosition": [1, 1]},
                {"position":[3, 3] , "parentPosition": [2, 2]},
                {"position":[4, 4] , "parentPosition": [3, 3]}] 

var title2 = 'Phase Space';
    
var renderPhase = data => {

    const xValue = d => +d.position[0];
    const yValue = d => +d.position[1];

    const xAxisLabel = 'x1';
    const yAxisLabel = 'x2';
  
    const margin = {top: 100, right: 40, bottom: 95, left: 110}; 
    const innerWidth = width2 - margin.left - margin.right;
    const innerHeight = height2 - margin.top - margin.bottom;
  
    const xScale = d3.scaleLinear()
    .domain(d3.extent(data, xValue))
    .range([0, innerWidth])
    .nice();
  
    const yScale = d3.scaleLinear()
    .domain(d3.extent(data, yValue))
    .range([innerHeight, 0])
    .nice();

    const linkGen = d3.link(d3.curveBundle)
    	.source(d => d.parentPosition)
        .target(d => d.position)
        .x(d => xScale(d[0]))
        .y(d => yScale(d[1])); 

    const g = svg2.append("g")
            .attr('transform', `translate(${margin.left},${margin.top})`);

    const xAxis = d3.axisBottom(xScale)
        .tickSize(-innerHeight)
        .tickPadding(15);
          
    const yAxis = d3.axisLeft(yScale)
        .tickSize(-innerWidth)
        .tickPadding(10);

    const yAxisG = g.append('g').call(yAxis)
        .style("stroke-dasharray", ("1, 2")); 
        yAxisG.selectAll('.domain').remove();
    
    yAxisG.append('text')
        .attr('class', 'axis-label')
        .attr('y', -50)
        .attr('x', -innerHeight / 2)
        .attr('fill', 'black')
        .attr('transform', `rotate(-90)`)
        .attr('text-anchor', 'middle')
        .text(yAxisLabel);
        
    const xAxisG = g.append('g').call(xAxis)
        .style("stroke-dasharray", ("1, 2")) 
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
  
};

renderPhase(nodeData); 