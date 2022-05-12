/**
 * @file 
 * Handles rendering of the 2D line graph
 * Using the values contained in graphData
 *
 */

const svg1 = d3.select('#svgGraph');
const width = +svg1.attr('width');
const height = +svg1.attr('height');

/*default data for first display */
var graphData = [{"x":0, "y":0, "dataSet":"x1"}, {"x":0, "y":0, "dataSet":"x2"},
                  {"x":10, "y":10, "dataSet":"x1"}, {"x":10, "y":20, "dataSet":"x2"}]

var nested = d3.group(graphData, d => d.dataSet);

var title = 'Default Graph';
var duration = 500; 

  const renderGraph = data => {

    var slider = document.getElementById("duration");
    if (slider != null){
      duration = slider.value; 
    }

    const xValue = d => +d.x;
    const yValue = d => +d.y;

    const xAxisLabel = 'Time';
    const yAxisLabel = 'x1, x2';
    
    const margin = { top: 100, right: 40, bottom: 95, left: 110 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    
    const xScale = d3.scaleLinear()
      .domain(d3.extent(data, xValue))
      .range([0, innerWidth])
      .nice();
    
    const yScale = d3.scaleLinear()
      .domain(d3.extent(data, yValue))
      .range([innerHeight, 0])
      .nice();

    const colourScale = d3.scaleOrdinal(d3.schemeCategory10)
    .range(["#d67b26", "#2962c4"]);
    colourScale.domain(nested); 

    console.log(colourScale.domain(), "test");
 
    const g = svg1.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);
    
    const xAxis = d3.axisBottom(xScale)
      .tickSize(-innerHeight)
      .tickPadding(10);
    
    const yAxis = d3.axisLeft(yScale)
      .tickSize(-innerWidth)
      .tickPadding(10);
    
    const yAxisG = g.append('g').call(yAxis)
    .style("stroke-dasharray", ("1, 2"));  
    
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
        
    xAxisG.append('text')
        .attr('class', 'axis-label')
        .attr('y', 60)
        .attr('x', innerWidth / 2)
        .attr('fill', 'black')
        .text(xAxisLabel);
    
    const lineGenerator = d3.line()
      .x(d => xScale(xValue(d)))
      .y(d => yScale(yValue(d)))
      .curve(d3.curveBundle);

    var path = g.selectAll('.line-path').data(nested)
        .enter().append('path')
        .attr('class', 'line-path')
        .attr('d', d => lineGenerator(d[1]))
        .attr('stroke', d => colourScale(d[1])); 

    path.transition()
        .duration(duration)
        .ease(d3.easeLinear)
        .attrTween("stroke-dasharray", function() {
          const length = this.getTotalLength();
          return d3.interpolate(`0,${length}`, `${length},${length}`);
        })

    g.append('text')
        .attr('class', 'title')
        .attr('y', -15)
        .text(title);
      
   g.append('g')
        .attr('transform', `translate(400,-50)`)
        .call(colorLegend, {
          colourScale,
          circleRadius: 8,
          spacing: 25,
          textOffset: 12
        });
  };

 renderGraph(graphData);