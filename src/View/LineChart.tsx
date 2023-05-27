/* eslint-disable @typescript-eslint/no-unsafe-call */
import { useSelector } from "react-redux";
import { selectHistory } from "../Model/HistorySlice";
import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";
import { DataPoint } from "../Model/DataPoint";
import { Utilities } from "../Utilities";
import "./Styles.css";

const LineChart = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const history = useSelector(selectHistory);
  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    const resizeGraph = () => {
      const parentWidth = svgRef.current?.parentElement?.getBoundingClientRect();
      if (parentWidth && parentWidth.width !== 0) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        setWidth(parentWidth.width);
        d3.select(svgRef.current).attr("width", parentWidth.width);
        // Update the graph based on the new width
        // e.g., adjust scales, axes, redraw elements, etc.
      }
    };

    resizeGraph(); // Call the function initially

    window.addEventListener("resize", resizeGraph); // Attach listener to window resize event

    return () => {
      window.removeEventListener("resize", resizeGraph); // Clean up the listener on unmount
    };
  }, []);

  useEffect(() => {
    createGraph();
  }, [history, width]);

  function createGraph() {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    // Declare the chart dimensions and margins.
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-non-null-assertion
    const height = 500;
    const marginTop = 80;
    const marginRight = 30;
    const marginBottom = 30;
    const marginLeft = 100;

    const historyArray = history.history.toArray();
    const dataPoints: DataPoint[] = [];
    const startingYear = new Date().getFullYear();

    for (let index = 0; index < historyArray.length; index++) {
      const value = historyArray[index];
      const dataPoint = new DataPoint(
        new Date(startingYear + index, 0, 0),
        Utilities.getNetWorth(value).value
      );
      dataPoints.push(dataPoint);
    }

    // Declare the x (horizontal position) scale.
    const xScale = d3.scaleUtc(
      [
        d3.min(dataPoints, (d) => d._year)!,
        d3.max(dataPoints, (d) => d._year)!,
      ],
      [marginLeft, width - marginRight]
    );

    // Declare the y (vertical position) scale.
    const yScale = d3.scaleLinear(
      [d3.min(dataPoints, (d) => d._netWorth)!, d3.max(dataPoints, (d) => d._netWorth)!],
      [height - marginBottom, marginTop]
    );

    // Create the SVG container.
    svg
      .attr("width", width)
      // .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr(
        "style",
        "max-width: 100%; height: auto; height: intrinsic; margin-top: 3em;"
      );

    // Add the x-axis.
    svg
      .append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(
        d3
          .axisBottom(xScale)
          .ticks(width / 80)
          .tickSizeOuter(0)
      )
      .selectAll("text") // Select all text elements
      .style("font-size", "1em");

    // Add the y-axis, remove the domain line, add grid lines and a label.
    svg
      .append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(d3.axisLeft(yScale).ticks(height / 80))
      .style("font-size", "1em")
      .call((g) => g.select(".domain").remove())
      .call((g) =>
        g
          .selectAll(".tick line")
          .clone()
          .attr("x2", width - marginLeft - marginRight)
          .attr("stroke-opacity", "0.5")
      )
      .call((g) =>
        g
          .append("text")
          .attr("x", -marginLeft)
          .attr("y", 50)
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .style("font-size", "1em")
          .text("↑ Net Worth ($)")
      );

    const line = d3
      .line<DataPoint>()
      .x((d) => xScale(d._year))
      // .y0(height)
      .y((d) => yScale(d._netWorth));

    svg
      .append("path")
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", "0.2em")
      .attr("d", line(dataPoints));
      
  }


    

  if (history.history.size() == 0) {
    return null;
  }

  return (
    <div style={{ width: "100%" }}>
      <svg ref={svgRef} />
    </div>
  );
};

export default LineChart;
