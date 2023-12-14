import { FC } from "react";
// ** Custom Components
import { Avatar } from "@src/components/common/avatar";

// ** Third Party Components
import Chart from "react-apexcharts";

// ** Reactstrap Imports
import { Card, CardHeader, CardText } from "reactstrap";

// ** Default Options
import { lineChartOptions } from "./ChartOptions";

const StatsWithLineChart: FC<any> = ({
  icon,
  color = "primary",
  stats,
  statTitle,
  series,
  options = lineChartOptions,
  type,
  height,
  ...rest
}) => {
  return (
    <Card {...rest}>
      <CardHeader className="align-items-start pb-0">
        <div>
          <h2 className="fw-bolder">{stats}</h2>
          <CardText>{statTitle}</CardText>
        </div>
        <Avatar
          className="avatar-stats p-50 m-0"
          color={`light-${color}`}
          icon={icon}
        />
      </CardHeader>
      <Chart
        options={options}
        series={series}
        type={type}
        height={height ? height : 100}
      />
    </Card>
  );
};

export { StatsWithLineChart };

// // ** PropTypes
// StatsWithLineChart.propTypes = {
//   type: PropTypes.string,
//   height: PropTypes.string,
//   options: PropTypes.object,
//   icon: PropTypes.element.isRequired,
//   color: PropTypes.string.isRequired,
//   stats: PropTypes.string.isRequired,
//   series: PropTypes.array.isRequired,
//   statTitle: PropTypes.string.isRequired,
// };

// // ** Default Props
// StatsWithLineChart.defaultProps = {
//   options: lineChartOptions,
//   color: "primary",
// };
