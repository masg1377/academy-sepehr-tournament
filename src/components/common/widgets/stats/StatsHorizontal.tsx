import { FC } from "react";
// ** Third Party Components
import classnames from "classnames";

// ** Reactstrap Imports
import { Card, CardBody } from "reactstrap";

interface IStatsHorizontalProp {
  stats?: string;
  renderStats?: any;
  className?: string;
  icon: JSX.Element;
  color: string;
  statTitle: string;
  statsMargin:
    | "mb-0"
    | "mb-25"
    | "mb-50"
    | "mb-75"
    | "mb-1"
    | "mb-2"
    | "mb-3"
    | "mb-4"
    | "mb-5";
}

const StatsHorizontal: FC<IStatsHorizontalProp> = ({
  icon,
  color,
  stats,
  renderStats,
  statTitle,
  className,
  statsMargin,
}) => {
  return (
    <Card>
      <CardBody className={className}>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            {renderStats ? (
              renderStats
            ) : (
              <h2
                className={classnames("fw-bolder", {
                  "mb-0": !statsMargin,
                  [statsMargin]: statsMargin,
                })}
              >
                {stats}
              </h2>
            )}

            <p className="card-text">{statTitle}</p>
          </div>
          <div
            className={`avatar avatar-stats p-50 m-0 ${
              color ? `bg-light-${color}` : "bg-light-primary"
            }`}
          >
            <div className="avatar-content">{icon}</div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export { StatsHorizontal };
