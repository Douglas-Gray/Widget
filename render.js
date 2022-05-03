const svg1 = d3.select('#svg1');

const width = +svg1.attr('width');
const height = +svg1.attr('height');

var graphData = [
  {"x":0, "y":0, "dataSet":0},
  {"x":1, "y":1, "dataSet":0},
  ]

nested = d3.group(graphData, d => d.dataSet);
var title = 'Test Graph';

console.log(nested);

  const render = data => {
   
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

    const colourScale = d3.scaleOrdinal(d3.schemeCategory10);
    colourScale.domain(nested); 
 
    const g = svg1.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);
    
    const xAxis = d3.axisBottom(xScale)
      .tickSize(-innerHeight)
      .tickPadding(15);
    
    const yAxis = d3.axisLeft(yScale)
      .tickSize(-innerWidth)
      .tickPadding(10);
    
    const yAxisG = g.append('g').call(yAxis);
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
      .attr('transform', `translate(0,${innerHeight})`);
    
    xAxisG.select('.domain').remove();
    
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

    g.selectAll('.line-path').data(nested)
        .enter().append('path')
        .attr('class', 'line-path')
        .attr('d', d => lineGenerator(d[1]))
        .attr('stroke', d => colourScale(d[1])); 

    g.append('text')
        .attr('class', 'title')
        .attr('y', -15)
        .text(title);
  };

  render(graphData);