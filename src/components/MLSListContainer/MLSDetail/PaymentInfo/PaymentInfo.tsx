import React, { FC, useState } from "react";
import { CardWrapper } from "@src/components/common/CardWrapper";
import { Nav, NavItem, NavLink } from "reactstrap";
import { ListTable } from "@src/components/common/ListTable/ListTable";
import { columns, customStyles } from "./data";

const PaymentInfo: FC = (): JSX.Element => {
  const [active, setActive] = useState<string>("1");

  const toggle = (tab: string) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  const headerChild = (): JSX.Element => {
    return (
      <Nav className="justify-content-end" tabs>
        <NavItem>
          <NavLink
            active={active === "1"}
            onClick={() => {
              toggle("1");
            }}
          >
            Clients Payment
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            active={active === "2"}
            onClick={() => {
              toggle("2");
            }}
          >
            Realtyna Payment
          </NavLink>
        </NavItem>
      </Nav>
    );
  };

  return (
    <CardWrapper
      title="Payment Info"
      headerChild={headerChild()}
      bodyClassName="p-0"
    >
      <ListTable
        columns={columns}
        noHeader
        rounded={false}
        noReload
        noSearch
        customStyle={customStyles}
        data={[
          {
            id: "#558556",
            request: "Rqs-122-45689",
            status: "paid",
            paidBy: "card **** **** **** 5583",
            withdraw: "$8,400.00",
            date: "12 Jun 2021",
          },
          {
            id: "#558556",
            request: "Rqs-122-45689",
            status: "paid",
            paidBy: "card **** **** **** 5583",
            withdraw: "$8,400.00",
            date: "12 Jun 2021",
          },
        ]}
      />

      <div className="border-top d-flex justify-content-between align-items-center p-1">
        <div>
          <span className="fs-6 text-secondary lh-base">Total </span>
          <span className="fs-4 fw-bolder text-primary"> $8,400.00</span>
        </div>
        <div>
          <span className="fs-5 fw-bolder text-black">201 </span>
          <span className="fs-6 text-secondary lh-base">Payments</span>
        </div>
      </div>
    </CardWrapper>
  );
};

export { PaymentInfo };
