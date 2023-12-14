// ** React Imports
import { Link } from "react-router-dom";
import { FC } from "react";

// ** General components
import { AllCustomer as Customer } from "@src/components/CustomersComponent/AllCustomer/AllCustomer";

const AllCustomer: FC = (): JSX.Element => {
  return <Customer />;
};

export { AllCustomer };
