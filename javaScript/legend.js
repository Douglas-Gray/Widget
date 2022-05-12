/**
 * @file 
 * Provides rendering of a graph legend
 *
 */

const colorLegend = (selection, props) => {
    const {
      colourScale,
      circleRadius,
      spacing,
      textOffset
    } = props;

    colourScale.domain(nested);  
  
    const groups = selection.selectAll('g')
      .data(colourScale.domain());
    const groupsEnter = groups
      .enter().append('g')
        .attr('class', 'tick');
    groupsEnter
      .merge(groups)
        .attr('transform', (d, i) =>
          `translate(0, ${i * spacing})`
        );
    groups.exit().remove();
  
    groupsEnter.append('circle')
      .merge(groups.select('circle'))
        .attr('r', circleRadius)
        .attr('fill', d => colourScale(d[1]));
  
    groupsEnter.append('text')
      .merge(groups.select('text'))
        .text(d => d[0])
        .attr('dy', '0.32em')
        .attr('x', textOffset);
  }