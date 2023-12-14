import React from "react";
import { getCustomDate } from "@src/core/utils/date-helper.utils";
import {
  Bell,
  Edit,
  FileText,
  MoreVertical,
  Trash,
  Grid,
  DollarSign,
  GitPullRequest,
} from "react-feather";
import { useNavigate } from "react-router-dom";
import {
  Badge,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
  Row,
  Col,
} from "reactstrap";
import classNames from "classnames";
import DropdownMenuPortal from "@src/components/common/DropdownMenuPortal";

// ** Vars

const status: any = {
  1: { title: "Current", color: "light-primary" },
  2: { title: "Active", color: "light-success" },
  3: { title: "Rejected", color: "light-danger" },
  4: { title: "Resigned", color: "light-warning" },
  5: { title: "Applied", color: "light-info" },
};

export const columns: any = [
  {
    name: "#",
    width: "90px",
    // sortable: (row: any) => row.id,
    selector: (row: any) => row.row_id,
  },
  {
    name: "Full Name",
    minWidth: "200px",
    sortable: (row: any) => row.first_name,
    selector: (row: any) => row.first_name,
    cell: (row: any) => (
      <div className="text-truncate m-0 p-0">
        {row.first_name && row.first_name} {row.last_name && row.last_name}
        {!row.first_name && !row.last_nam && "-"}
      </div>
    ),
  },

  {
    name: "User id",
    sortable: true,
    minWidth: "130px",
    selector: (row: any) => row.id,
  },
  {
    name: "UserName",
    minWidth: "200px",
    sortable: (row: any) => row.username,
    selector: (row: any) => row.username,
    cell: (row: any) => (
      <div className="text-truncate m-0 p-0">
        {row.username ? row.username : "-"}
      </div>
    ),
  },

  {
    name: "Email",
    sortable: true,
    width: "270px",
    selector: (row: any) => row.email,
    cell: (row: any) => (
      <div className="text-truncate m-0 p-0">{row.email ? row.email : "-"}</div>
    ),
  },
  {
    name: "Member Since",
    sortable: true,
    minWidth: "190px",
    selector: (row: any) => row.creation_date,
    cell: (row: any) => {
      return <span>{getCustomDate(row.creation_date)}</span>;
    },
  },
  {
    name: "Location",
    sortable: true,
    minWidth: "190px",
    selector: (row: any) => row.locations,
    cell: (row: any) => {
      const locations = row.locations;
      return (
        <div className="d-flex justify-content-center  align-items-center">
          {locations && locations.length > 0 ? (
            <React.Fragment>
              <span style={{ marginRight: "3px" }}>{locations[0].name}</span>
              {locations.length > 1 && (
                <Badge pill color="primary">
                  {`${"+"}${locations.length - 1}`}
                </Badge>
              )}
            </React.Fragment>
          ) : (
            "-"
          )}
        </div>
      );
    },
  },
  {
    name: "Packages",
    sortable: true,
    minWidth: "190px",
    selector: (row: any) => row.packages,
    cell: (row: any) => {
      const packages = row.packages;
      return (
        <div className="d-flex justify-content-center  align-items-center">
          {packages && packages.length > 0 ? (
            <React.Fragment>
              <UncontrolledDropdown>
                <DropdownToggle className="p-0 m-0" tag="div">
                  <Badge
                    color="light"
                    className="text-secondary text-truncate cursor-pointer"
                    style={{
                      marginRight: 5,
                      marginBottom: 5,
                      marginTop: 7,
                      maxWidth: 125,
                    }}
                  >
                    <span
                      className={classNames(
                        "d-inline-block",
                        "rounded-circle",
                        packages[0].status
                          ? packages[0].status.toLowerCase() === "active"
                            ? "bg-success"
                            : packages[0].status.toLowerCase() === "inactive"
                            ? "bg-danger"
                            : packages[0].status.toLowerCase() === "pending"
                            ? "bg-warning"
                            : packages[0].status.toLowerCase() === "canceled"
                            ? "bg-danger"
                            : "bg-light"
                          : "bg-light"
                      )}
                      style={{
                        width: "9px",
                        height: "9px",
                        transform: "translateY(1px)",
                      }}
                    ></span>{" "}
                    {packages[0].name}
                  </Badge>
                </DropdownToggle>
                <DropdownMenuPortal
                  style={{ zIndex: "200", width: "200px" }}
                  className="overflow-hidden p-0"
                >
                  <Row className="overflow-hidden p-0 m-0 w-100">
                    <Col
                      className="w-100 fs-9 staffInfoText"
                      style={{
                        background: "#f2f2f2",
                        padding: "9px",
                      }}
                      xs={12}
                    >
                      More Details
                    </Col>
                    <Col
                      className="w-100 fs-10 staffInfoTitle bg-white"
                      style={{
                        padding: "9px",
                      }}
                      xs={12}
                    >
                      <span className="">Feed Type :</span>{" "}
                      <span className="staffInfoText text-truncate">
                        {packages[0].feed_type
                          ? packages[0]?.feed_type
                          : "Not Set"}
                      </span>
                    </Col>
                    <Col
                      className="w-100 fs-10 staffInfoTitle bg-white"
                      style={{
                        padding: "9px",
                      }}
                      xs={12}
                    >
                      <span className="">Contract Type :</span>{" "}
                      <span className="staffInfoText text-truncate">
                        {packages[0].mls_contract_type
                          ? packages[0]?.mls_contract_type
                          : "Not Set"}
                      </span>
                    </Col>
                  </Row>
                </DropdownMenuPortal>
              </UncontrolledDropdown>

              {packages.length > 1 && (
                <Badge pill color="primary" className="cursor-pointer">
                  <UncontrolledDropdown>
                    <DropdownToggle
                      style={{ paddingRight: "3px" }}
                      className=""
                      tag="span"
                    >
                      {`${"+"}${packages.length - 1}`}
                    </DropdownToggle>
                    <DropdownMenuPortal
                      style={{ padding: "3px", zIndex: "200" }}
                    >
                      {packages
                        .slice(1, packages.length)
                        .map((item: any, index: number) => (
                          <UncontrolledDropdown key={index + item.id}>
                            <DropdownToggle className="p-0 m-0" tag="div">
                              <Badge
                                color="light"
                                className="text-secondary text-truncate d-block text-start"
                                style={{
                                  //marginRight: 5,
                                  marginTop: 2,
                                  maxWidth: 160,
                                }}
                              >
                                <span
                                  className={classNames(
                                    "d-inline-block",
                                    "rounded-circle",
                                    packages[0].status
                                      ? item?.status.toLowerCase() === "active"
                                        ? "bg-success"
                                        : item?.status.toLowerCase() ===
                                          "inactive"
                                        ? "bg-danger"
                                        : item?.status.toLowerCase() ===
                                          "pending"
                                        ? "bg-warning"
                                        : item?.status.toLowerCase() ===
                                          "canceled"
                                        ? "bg-danger"
                                        : "bg-light"
                                      : "bg-light"
                                  )}
                                  style={{
                                    width: "9px",
                                    height: "9px",
                                    transform: "translateY(1px)",
                                  }}
                                ></span>{" "}
                                {item?.name}
                              </Badge>
                            </DropdownToggle>
                            <DropdownMenu
                              style={{
                                padding: "0px",
                                zIndex: "200",
                                width: "200px",
                              }}
                              className="overflow-hidden"
                              end
                            >
                              <Row className="overflow-hidden p-0 m-0 w-100">
                                <Col
                                  className="w-100 fs-9 staffInfoText"
                                  style={{
                                    background: "#f2f2f2",
                                    padding: "9px",
                                  }}
                                  xs={12}
                                >
                                  More Details
                                </Col>
                                <Col
                                  className="w-100 fs-10 staffInfoTitle"
                                  style={{
                                    background: "#fff",
                                    padding: "9px",
                                  }}
                                  xs={12}
                                >
                                  <span className="">Feed Type :</span>{" "}
                                  <span className="staffInfoText text-truncate">
                                    {item.feed_type
                                      ? item?.feed_type
                                      : "Not Set"}
                                  </span>
                                </Col>
                                <Col
                                  className="w-100 fs-10 staffInfoTitle"
                                  style={{
                                    background: "#fff",
                                    padding: "9px",
                                  }}
                                  xs={12}
                                >
                                  <span className="">Contract Type :</span>{" "}
                                  <span className="staffInfoText text-truncate">
                                    {item.mls_contract_type
                                      ? item?.mls_contract_type
                                      : "Not Set"}
                                  </span>
                                </Col>
                              </Row>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        ))}
                    </DropdownMenuPortal>
                  </UncontrolledDropdown>
                </Badge>
              )}
            </React.Fragment>
          ) : (
            "-"
          )}
        </div>
      );
    },
  },
  {
    name: "Status",
    minWidth: "130px",
    //sortable: (row: any) => row.status,
    selector: (row: any) => row.status,
    cell: (row: any) => {
      const statuss = row.status;
      return (
        <>
          {statuss && statuss === 1 ? (
            <Badge color={status[2].color} pill>
              {"Active"}
            </Badge>
          ) : (
            <Badge color={status[3].color} pill>
              {"Inactive"}
            </Badge>
          )}
        </>
      );
    },
  },

  {
    name: <Edit size={17} />,
    allowOverflow: true,
    width: "80px",
    cell: (row: any) => {
      const navigate = useNavigate();
      return (
        <div
          onClick={() => {
            navigate("/customer-list/edit/" + row.id);
          }}
          className="d-flex text-primary cursor-pointer"
        >
          Edit
        </div>
      );
    },
  },
  {
    name: <Grid size={17} />,
    allowOverflow: true,
    width: "70px",
    cell: (row: any) => {
      const navigate = useNavigate();

      return (
        <div className="d-flex">
          <UncontrolledDropdown>
            <DropdownToggle className="pe-1" tag="span">
              <MoreVertical size={15} />
            </DropdownToggle>
            <DropdownMenuPortal style={{ padding: "3px", zIndex: "200" }}>
              <DropdownItem
                tag="a"
                href="/"
                className="w-100"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/customer-list/" + row.id);
                }}
              >
                <FileText size={15} />
                <span className="align-middle ms-50">Details</span>
              </DropdownItem>
              {/* <DropdownItem
                tag="a"
                href="/"
                className="w-100"
                onClick={(e) => {
                  e.preventDefault();
                  //navigate("/staff/" + row.id);
                }}
              >
                <GitPullRequest size={15} />
                <span className="align-middle ms-50">Requests</span>
              </DropdownItem> */}
              <DropdownItem
                tag="a"
                href="/"
                className="w-100"
                onClick={(e) => {
                  e.preventDefault();
                  navigate(
                    "/customer-list/payment/" +
                      row.id +
                      "/" +
                      row.first_name +
                      " " +
                      row.last_name
                  );
                }}
              >
                <DollarSign size={15} />
                <span className="align-middle ms-50">Invoices</span>
              </DropdownItem>
            </DropdownMenuPortal>
          </UncontrolledDropdown>
        </div>
      );
    },
  },
];
