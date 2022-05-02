const svg2 = d3.select("#svg2"); 

var width2 = +svg2.attr("width"); 
var height2 = +svg2.attr("height"); 
    
var render2 = data => {

    var title = 'Test Graph';

    var xValue = d => d.x;
    var yValue = d => d.y;
    
    var margin = {top: 10, right: 10, bottom: 20, left: 50}; 
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
  
    var g = svg2.append("g")
            .attr('transform', `translate(${margin.left},${margin.top})`);

    g.selectAll("circle")
        .data(data)
        .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 5)
        .attr("cx", function(d) { return x(d.x); })
        .attr("cy", function(d) { return y(d.y); })
    	.style("fill", function(d) {        
          if (d.y >= 3 && d.x <= 3) {return "#60B19C"} // Top Left
          else if (d.y >= 3 && d.x >= 3) {return "#8EC9DC"} // Top Right
          else if (d.y <= 3 && d.x >= 3) {return "#D06B47"} // Bottom Left
          else { return "#A72D73" } //Bottom Right         
      });
    
    g.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + y.range()[0] / 2 + ")")
        .call(d3.axisBottom(x).ticks(5));

    g.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + x.range()[1] / 2 + ", 0)")
        .call(d3.axisLeft(y).ticks(5));

    function padExtent(e, p) {
  	    if (p === undefined) p = 1;
  	    return ([e[0] - p, e[1] + p]);
    }
};

graphData.forEach(d => {
    d.x = + d.x;
    d.y = + d.y;
  });

render2(graphData); 