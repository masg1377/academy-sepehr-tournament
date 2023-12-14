// ** React Imports
import { FC } from "react";

// ** ReactStrap Imports
import { Card, CardTitle, CardBody, CardText, CardHeader } from "reactstrap";

const Settingg: FC = (): JSX.Element => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex-md-row flex-column align-md-items-center align-items-start border-bottom pt-1 pb-1">
        <CardTitle tag="h4" className="d-flex">
          Settings
        </CardTitle>
      </CardHeader>
      <CardBody></CardBody>
    </Card>
  );
};

export { Settingg };
