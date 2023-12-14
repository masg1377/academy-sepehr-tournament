import { FC } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  CardLink,
} from "reactstrap";
import { ClientsRequests } from "@src/components/ClientsRequests";

const Alerts: FC = (): JSX.Element => {
  return <ClientsRequests />;
};

export { Alerts };
