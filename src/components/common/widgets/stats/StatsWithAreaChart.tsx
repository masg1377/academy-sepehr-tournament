import { FC } from "react";
// ** Custom Components
import { Avatar } from "@src/components/common/avatar";

// ** Third Party Components
import classnames from "classnames";
import Chart from "react-apexcharts";

// ** Reactstrap Imports
import { Card, CardBody } from "reactstrap";

// ** Default Options
import { areaChartOptions } from "./ChartOptions";

const StatsWithAreaChart: FC<any> = (props): JSX.Element => {
  // ** Props
  const {
    icon,
    color = "primary",
    stats,
    statTitle,
    series,
    options = areaChartOptions,
    type,
    height,
    className,
    ...rest
  } = props;
  return (
    <Card {...rest}>
      <CardBody
        className={classnames("pb-0", {
          [className]: className,
        })}
      >
        <Avatar
          className="avatar-stats p-50 m-0"
          color={`light-${color}`}
          icon={icon}
        />
        <h2 className="fw-bolder mt-1">{stats}</h2>
        <p className="card-text">{statTitle}</p>
      </CardBody>
      <Chart
        options={options}
        series={series}
        type={type}
        height={height ? height : 100}
      />
    </Card>
  );
};

export { StatsWithAreaChart };

// // ** PropTypes
// StatsWithAreaChart.propTypes = {
//   type: PropTypes.string,
//   height: PropTypes.string,
//   options: PropTypes.object,
//   className: PropTypes.string,
//   icon: PropTypes.element.isRequired,
//   color: PropTypes.string.isRequired,
//   stats: PropTypes.string.isRequired,
//   series: PropTypes.array.isRequired,
//   statTitle: PropTypes.string.isRequired,
// };

// // ** Default Props
// StatsWithAreaChart.defaultProps = {
//   color: "primary",
//   options: areaChartOptions,
// };
