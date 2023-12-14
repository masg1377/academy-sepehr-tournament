import { FC } from "react";
// ** Third Party Components
import Chart from "react-apexcharts";

// ** Reactstrap Imports
import { Card, CardBody } from "reactstrap";

interface ITinyChartStatsProp {
  // type?:
  //   | "line"
  //   | "area"
  //   | "bar"
  //   | "histogram"
  //   | "pie"
  //   | "donut"
  //   | "radialBar"
  //   | "scatter"
  //   | "bubble"
  //   | "heatmap"
  //   | "treemap"
  //   | "boxPlot"
  //   | "candlestick"
  //   | "radar"
  //   | "polarArea"
  //   | "rangeBar";
  type?: any;
  title: string;
  stats: string;
  series: any[];
  options: any;
  height?: number | string;
}

const TinyChartStats: FC<ITinyChartStatsProp> = ({
  title,
  stats,
  options,
  series,
  type,
  height = 100,
}) => {
  return (
    <Card className="card-tiny-line-stats">
      <CardBody className="pb-50">
        <h6>{title}</h6>
        <h2 className="fw-bolder mb-1">{stats}</h2>
        <Chart options={options} series={series} type={type} height={height} />
      </CardBody>
    </Card>
  );
};

export { TinyChartStats };

// // ** PropTypes
// TinyChartStats.propTypes = {
//   type: PropTypes.string.isRequired,
//   title: PropTypes.string.isRequired,
//   stats: PropTypes.string.isRequired,
//   series: PropTypes.array.isRequired,
//   options: PropTypes.object.isRequired,
// };

// // ** Default Props
// TinyChartStats.defaultProps = {
//   height: 100,
// };
