import { LoadingData } from "@src/components/common/LoadingData/LoadingData";
import { RowWrappers } from "@src/components/common/RowWrappers/RowWrappers";
import { useGetListOfGroupsBtts } from "@src/core/services/api/group/group.api";
import { TGetGroupListBtt } from "@src/core/services/api/group/type";
import classNames from "classnames";
import React, { FC, useEffect, useRef, useState } from "react";
import { AlertCircle } from "react-feather";
import ReactPaginate from "react-paginate";
import { useParams } from "react-router-dom";
import { Col, Input, Row } from "reactstrap";
import { WizardComponentsWrapper } from "../WizardComponentsWrapper";

interface IAssignBTTsProp {
  stepper: any;
  setStepper: React.Dispatch<any>;
  stepNumber: number;
  setCurrentBttList: (val: any) => void;
  setfinalSetBtts: (val: any) => void;
  finalSetBtts: any;
  getCurrentBtts: () => void;
  isSubmiting?: boolean;
  isLoading?: boolean;
}

const AssignBTTs: FC<IAssignBTTsProp> = ({
  stepper,
  setStepper,
  stepNumber,
  setCurrentBttList,
  setfinalSetBtts,
  finalSetBtts,
  getCurrentBtts,
  isSubmiting,
  isLoading,
}): JSX.Element => {
  const { id } = useParams();

  //   const [editRole, setEditRole] = useState<boolean>(false);

  const [searchQuery, setSearchQuery] = useState<string>("");

  const [focus, setFocus] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [bttList, setBttList] = useState([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [listFilter, setListFilter] = useState<TGetGroupListBtt>({
    skip: 0,
    limit: 10,
  });

  const getBtts = useGetListOfGroupsBtts();

  const getBttsList = (page: number) => {
    getBtts.mutate(
      { ...listFilter, skip: page * 10 },
      {
        onSuccess: (res: any) => {
          let bttResult = res.data.result;
          setBttList(
            bttResult?.map((i: any) => ({ value: i.id, label: i.name }))
          );
          setTotalCount(
            res.data?.pagination?.total
              ? Math.ceil(res.data?.pagination?.total / 10)
              : 0
          );
        },
        onError: (err) => {
          setBttList([]);
        },
      }
    );
  };

  useEffect(() => {
    getBttsList(0);
    getCurrentBtts();
  }, []);

  const handleRemoveItem = (item: any) => {
    const newVal = finalSetBtts.filter((o: any) => o.label !== item.label);
    //setTempRoles(newVal);
    setfinalSetBtts(newVal);
  };

  const handleAddToTemp = (item: any) => {
    if (finalSetBtts.some((i: any) => i.label === item.label)) {
      let newItems = finalSetBtts.filter((m: any) => m.value !== item.value);
      setfinalSetBtts(newItems);
    } else {
      setfinalSetBtts([...finalSetBtts, item]);
    }

    //setfinalSetBtts([...finalSetBtts, item]);
  };

  const inputRef = useRef<any>();

  const handleRoleSearch = (val: string) => {
    clearTimeout(inputRef.current);
    setSearchQuery(val);
    let timeOut: any;
  };

  // ** Function to handle Pagination
  const handlePagination = (page: any) => {
    setCurrentPage(page.selected);
    getBttsList(page.selected);
  };

  return (
    <WizardComponentsWrapper
      stepper={stepper}
      setStepper={setStepper}
      stepNum={stepNumber}
      stepText="Assign BTTs"
      isSubmiting={isSubmiting}
      lastStep
    >
      {/* <PermissionWrapper roles={["can_manage_staff_role"]}> */}
      {isLoading ? (
        <LoadingData wrapperStyle="py-5 my-3" />
      ) : (
        <>
          <RowWrappers xl={12} xxl={8}>
            <div>
              <span style={{ color: "#314bc9" }} className="fs-7 fw-bolder">
                BTTs
              </span>
              <div
                style={{
                  borderRadius: "2px",
                  padding: "5px",
                  backgroundColor: "rgba(244, 243, 249, 0.6)",
                  border: "solid 1px #e1e0ea",
                }}
              >
                <div className="d-flex flex-wrap outlineContainerCustome">
                  {finalSetBtts &&
                    finalSetBtts.length !== 0 &&
                    finalSetBtts.map((item: any, index: number) => (
                      <div
                        key={index + 1}
                        className="discount-options-holder2 bg-primary text-light fs-9"
                      >
                        {item.label}
                        <span
                          onClick={() => handleRemoveItem(item)}
                          className="fs-6-1 cursor-pointer margin-left-9"
                        >
                          x
                        </span>
                      </div>
                    ))}
                </div>
                <Input
                  name="searchRoles"
                  placeholder={"Search btt ..."}
                  type={"text"}
                  className={""}
                  onChange={(e) => handleRoleSearch(e.target.value)}
                  value={searchQuery}
                  onFocusCapture={() => setFocus(true)}
                  onBlurCapture={() => setFocus(false)}
                  style={{
                    background: "transparent",
                    border: "1px solid transparent",
                    boxShadow: "0 0 0 transparent",
                    margin: "3px 0px",
                    paddingLeft: "12px",
                  }}
                />
              </div>
            </div>
          </RowWrappers>

          <RowWrappers xl={12} xxl={8}>
            <div>
              <div className="mt-1">
                <div className="customeInfoFontSize staffInfoText">
                  List of BTTs
                </div>
                <div className="rounded-sm roles-list">
                  {getBtts.isLoading && <LoadingData wrapperStyle="pt-2 m-0" />}
                  {!getBtts.isLoading &&
                    bttList &&
                    bttList?.length > 0 &&
                    bttList?.map((item: any, index: number) => (
                      <span
                        key={index + 1}
                        //onClick={() => handleAddToTemp(item)}
                        onDoubleClick={() => handleAddToTemp(item)}
                        style={{ padding: "2px 13px" }}
                        className={classNames(
                          "d-block",
                          "cursor-pointer",
                          "fs-8",
                          "roleHolder",
                          finalSetBtts.some((i: any) => i.label === item.label)
                            ? "roleHolderClick"
                            : ""
                        )}
                      >
                        {item.label}
                      </span>
                    ))}
                  {!getBtts.isLoading && bttList && bttList.length === 0 && (
                    <span className="text-center w-100 d-block mt-5">
                      {/* Please search for the List of Roles */}
                      Btt not Found
                    </span>
                  )}
                </div>
              </div>
              <Row className="mt-2 pe-0">
                <Col className="text-center text-sm-start" xs={12} sm={8}>
                  <div className="d-flex align-items-center mt-1-1">
                    <AlertCircle size={20} className="me-1" color="#3897f1" />
                    <span className="fs-6" style={{ color: "#3897f1" }}>
                      Please double click to add an item
                    </span>
                  </div>
                </Col>
                {totalCount > 0 && (
                  <Col
                    className="text-center text-sm-end mt-1 mt-sm-0 p-0"
                    xs={12}
                    sm={4}
                  >
                    <ReactPaginate
                      previousLabel=""
                      nextLabel=""
                      forcePage={currentPage}
                      onPageChange={(page) => handlePagination(page)}
                      pageCount={
                        totalCount
                        //   searchValue.length
                        //     ? Math.ceil(filteredData.length / paginationPerPage)
                        //     : Math.ceil(row.length / paginationPerPage) || 1
                      }
                      breakLabel="..."
                      pageRangeDisplayed={2}
                      marginPagesDisplayed={2}
                      activeClassName="active"
                      pageClassName="page-item"
                      breakClassName="page-item"
                      nextLinkClassName="page-link"
                      pageLinkClassName="page-link"
                      breakLinkClassName="page-link"
                      previousLinkClassName="page-link"
                      nextClassName="page-item next-item"
                      previousClassName="page-item prev-item"
                      containerClassName="pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1 mt-1"
                    />
                    {/* <SubmitButton
                      onClick={handleSubmitSave}
                      color="info"
                      // style={{
                      //   padding: "9px",
                      // }}
                      isLoading={assignRole.isLoading}
                      className="px-3 m-0 saveBtColor fs-8"
                    >
                      Save
                    </SubmitButton> */}
                  </Col>
                )}
              </Row>
            </div>
          </RowWrappers>
        </>
      )}
      {/* <Col xs={12}></Col> */}
      {/* </PermissionWrapper> */}
    </WizardComponentsWrapper>
  );
};

export default AssignBTTs;
