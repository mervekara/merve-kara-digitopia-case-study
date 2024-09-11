// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { useSelector } from "react-redux";
import { Recommendation } from "@/types/types";
import { startOfMonth, endOfYear } from 'date-fns';

const GanttChart = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data: Recommendation[] = useSelector((state: any) => state.recommendations.recommendations);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = svg.node().getBoundingClientRect().width;
    const height = 350;
    const margin = { top: 64, right: 3, bottom: 24, left: 2 };
    const numSubdivisions = 4;

    const todayDate = new Date();
    const currentMonthStart = startOfMonth(todayDate);

    const xScale = d3
      .scaleTime()
      .domain([currentMonthStart, endOfYear(todayDate)])
      .range([margin.left, width - margin.right]);

    const yScale = d3
      .scaleBand()
      .range([margin.top, height - margin.bottom])
      .padding(0.3);

    svg
      .attr("width", "1000px")
      .attr("height", height)
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("preserveAspectRatio", "xMidYMid meet");

    svg.append("rect")
      .attr("width", width)
      .attr("height", height)
      .attr("fill", "#ffff")
      .attr("rx", 20)
      .attr("ry", 20);

    const g = svg.append("g");

    function drawChart() {
      g.selectAll("*").remove();

      const years = d3.timeYear.range(xScale.domain()[0], xScale.domain()[1]);
      years.forEach((year) => {
        g
          .append("line")
          .attr("class", "year-line")
          .attr("x1", xScale(year))
          .attr("x2", xScale(year))
          .attr("y1", margin.top - 32)
          .attr("y2", height - margin.bottom)
          .attr("stroke", "darkgrey")
          .attr("stroke-width", 2);

        const yearLabelWidth = xScale(d3.timeYear.offset(year, 1)) - xScale(year);
        g
          .append("rect")
          .attr("x", xScale(year) + 2)
          .attr("y", margin.top - 50)
          .attr("width", yearLabelWidth - 4)
          .attr("height", 20)
          .attr("fill", "#f0f0f0")
          .attr("stroke", "gray")
          .attr("rx", 4)
          .attr("ry", 4);

        g
          .append("text")
          .attr("class", "year-label")
          .attr("x", xScale(year) + 5)
          .attr("y", margin.top - 36)
          .text(d3.timeFormat("%Y")(year))
          .attr("fill", "black")
          .attr("font-size", "12px")
          .attr("text-anchor", "start");
      });

      const months = d3.timeMonth.range(xScale.domain()[0], xScale.domain()[1]);
      months.forEach((month) => {
        const subDivisionScale = d3
          .scaleLinear()
          .domain([0, numSubdivisions])
          .range([xScale(month), xScale(d3.timeMonth.offset(month, 1))]);

        for (let j = 1; j < numSubdivisions; j++) {
          g
            .append("line")
            .attr("class", "month-line")
            .attr("x1", subDivisionScale(j))
            .attr("x2", subDivisionScale(j))
            .attr("y1", margin.top)
            .attr("y2", height - margin.bottom)
            .attr("stroke", "lightgrey")
            .attr("stroke-width", 1);
        }

        g
          .append("line")
          .attr("class", "month-line")
          .attr("x1", xScale(month))
          .attr("x2", xScale(month))
          .attr("y1", margin.top - 12)
          .attr("y2", height - margin.bottom)
          .attr("stroke", "lightgrey")
          .attr("stroke-width", 2);

        const monthLabelWidth = xScale(d3.timeMonth.offset(month, 1)) - xScale(month);
        g
          .append("rect")
          .attr("x", xScale(month) + 2)
          .attr("y", margin.top - 24)
          .attr("width", monthLabelWidth - 4)
          .attr("height", 20)
          .attr("fill", "#f0f0f0")
          .attr("rx", 4)
          .attr("ry", 4);

        g
          .append("text")
          .attr("class", "month-label")
          .attr("x", xScale(month) + 5)
          .attr("y", margin.top - 12)
          .text(d3.timeFormat("%b")(month))
          .attr("fill", "black")
          .attr("font-size", "12px")
          .attr("text-anchor", "start");
      });

      if (data.length > 0 && data.some(d => d.startDate && d.endDate)) {
        const filteredData = data.filter(d => d.startDate && d.endDate);
        const randomColor = () => `hsl(${Math.random() * 360}, 100%, 75%)`;

        g.selectAll(".bar")
          .data(filteredData)
          .enter()
          .append("rect")
          .attr("class", "bar")
          .attr("x", (d) => xScale(new Date(d.startDate)))
          .attr("y", (d, i) => margin.top + i * 30)
          .attr("height", 30)
          .attr("width", yScale.bandwidth())
          .attr("rx", 5)
          .attr('fill', randomColor);


        g.selectAll(".label")
          .data(filteredData)
          .enter()
          .append("text")
          .attr("class", "label")
          .attr("x", (d) => xScale(new Date(d.startDate)) + 10)
          .attr("y", (d, i) => margin.top + i * 30 + 15)
          .text((d) => d.topicRecommendation.recommendation)
          .attr("fill", "white")
          .attr("font-size", "12px");
      }
    }

    drawChart();

    const today = new Date();
    g.append("line")
      .attr("x1", xScale(today))
      .attr("x2", xScale(today))
      .attr("y1", margin.top - 36)
      .attr("y2", height - margin.bottom)
      .attr("stroke", "#758ef0")
      .attr("stroke-width", 2)
      .attr("stroke-dasharray", "4");

    g.append("text")
      .attr("x", xScale(today))
      .attr("y", margin.top - 45)
      .text("Today")
      .attr("fill", "#758ef0")
      .attr("font-size", "12px")
      .attr("text-anchor", "start");

    const handleResize = () => {
      drawChart();
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [data]);

  return (
    <div>
      <svg ref={svgRef} style={{ width: "100%", height: "auto" }} />
    </div>
  );
};

export default GanttChart;
