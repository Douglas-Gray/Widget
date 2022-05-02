const svg2 = d3.select("#svg2"); 

var width2 = +svg2.attr("width"); 
var height2 = +svg2.attr("height"); 

var nodeData = []
    
var render2 = data => {

    var title = 'Test Graph';
    const arrowPoints = [[0, 0], [0, 20], [20, 10]];

    var xValue = d => d.position[0];
    var yValue = d => d.position[1];
  
    var margin = {top: 100, right: 10, bottom: 20, left: 50}; 
    var innerWidth = width2 - margin.left - margin.right;
    var innerHeight = height2 - margin.top - margin.bottom;
  
    var x = d3.scaleLinear()
        .domain(d3.extent(data, xValue))
        .range([0, innerWidth])
        .nice(); 

    var y = d3.scaleLinear()
        .domain(d3.extent(data, yValue))
        .range([innerHeight, 0])
        .nice();

    var linkGen = d3.linkHorizontal()
    	.source(d => d.position)
        .target(d => d.parentPosition)
        .x(d => x(d[0]))
        .y(d => y(d[1]));
  
    var g = svg2.append("g")
            .attr('transform', `translate(${margin.left},${margin.top})`);

    g.selectAll("circle")
        .data(data)
        .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 5)
        .attr("cx", function(d) { return x(d.position[0]); })
        .attr("cy", function(d) { return y(d.position[1]); }) 
    	.style("fill", function(d) {        
          if (d.position[1] >= 3 && d.position[0] <= 3) {return "#60B19C"} // Top Left
          else if (d.position[1] >= 3 && d.position[0] >= 3) {return "#8EC9DC"} // Top Right
          else if (d.position[1] <= 3 && d.position[0] >= 3) {return "#D06B47"} // Bottom Left
          else { return "#A72D73" } //Bottom Right         
         }); 

    g.selectAll("path")
      .append('path')
      .data(data)
      .join("path")
      .attr("d", linkGen)
      .attr('stroke', 'black')
      .attr('fill', 'none') 
      .classed("link", true); 

        
    g.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + y.range()[0] / 2 + ")")
        .call(d3.axisBottom(x).ticks(10));

    g.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + x.range()[1] / 2 + ", 0)")
        .call(d3.axisLeft(y).ticks(10));

    function padExtent(e, p) {
  	    if (p === undefined) p = 1;
  	    return ([e[0] - p, e[1] + p]);
    }
};

nodeData.forEach(d => {
    d.position = + d.position;
    d.parentPosition = + d.parentPosition;
  });

render2(nodeData); 