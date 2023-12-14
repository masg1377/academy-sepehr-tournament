import { FC } from "react";

// ** Reactstrap Imports
import { Card, CardBody } from "reactstrap";

interface IStatsVerticalProp {
  className?: string;
  icon: JSX.Element;
  color: string;
  stats: string;
  statTitle: string;
}

const StatsVertical: FC<IStatsVerticalProp> = ({
  icon,
  color,
  stats,
  statTitle,
  className,
}): JSX.Element => {
  return (
    <Card className="text-center">
      <CardBody className={className}>
        <div
          className={`avatar p-50 m-0 mb-1 ${
            color ? `bg-light-${color}` : "bg-light-primary"
          }`}
        >
          <div className="avatar-content">{icon}</div>
        </div>
        <h2 className="fw-bolder">{stats}</h2>
        <p className="card-text line-ellipsis">{statTitle}</p>
      </CardBody>
    </Card>
  );
};

export { StatsVertical };
