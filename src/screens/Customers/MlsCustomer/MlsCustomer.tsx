// ** React Imports
import { Link } from "react-router-dom";
import { FC } from "react";

// ** General components
import { MlsCustomer as Customer } from "@src/components/CustomersComponent/MlsCustomer/MlsCustomer";

const MlsCustomer: FC = (): JSX.Element => {
  return <Customer />;
};

export { MlsCustomer };
