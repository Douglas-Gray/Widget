const svg = d3.select('svg');

const width = +svg.attr('width');
const height = +svg.attr('height');

var graphData = [
  {"x":0, "y":0, "dataSet":1},
  {"x":10, "y":10, "dataSet":1},
  {"x":20, "y":30, "dataSet":1},
  {"x":0, "y":0, "dataSet":2},
  {"x":30, "y":20, "dataSet":2},
  {"x":60, "y":40, "dataSet":2}
  ]

  const render = data => {
    const title = 'Test Graph';
    
    const xValue = d => d.x;
    const yValue = d => d.y;

    const xAxisLabel = 'X';
    const yAxisLabel = 'Y';
    
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
    
    const g = svg.append('g')
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
        .attr('y', -65)
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
        .attr('y', 70)
        .attr('x', innerWidth / 2)
        .attr('fill', 'black')
        .text(xAxisLabel);
    
    const lineGenerator = d3.line()
      .x(d => xScale(xValue(d)))
      .y(d => yScale(yValue(d)))
      .curve(d3.curveBasis);

    const nested = d3.group(graphData, d => d.dataSet); 

    console.log(nested);
    
    g.selectAll('.line-path').data(nested)
        .enter().append('path')
        .attr('class', 'line-path')
        .attr('d', d => lineGenerator(d[1]));

    g.append('text')
        .attr('class', 'title')
        .attr('y', -15)
        .text(title);
  };

      graphData.forEach(d => {
        d.x = +d.x;
        d.y = +d.y;
      });
      render(graphData);


      function renderInput(){

        d3.selectAll("svg > *").remove();

        var graphData = [{"x":0, "y":0}]

        var x1 = document.getElementById("x1").value;
        var time = document.getElementById("time").value; 
        var velocity = parseInt(document.getElementById("velocity").value); 

        let increment = 0; 
        let i = 1;
        while (i <= time) {

          velocity += 1; 
  
          increment += x1 * velocity;
          graphData.push({"x":i, "y":increment});
          i++; 

        }
        
        console.log(graphData); 
        render(graphData);
      }
