import React, { FC, useEffect, useState } from "react";
import { RowWrappers } from "@src/components/common/RowWrappers";
import { Card, Col, NavLink, Row } from "reactstrap";
import { CardWrapper } from "@src/components/common/CardWrapper/CardWrapper";
import { Timeline } from "@src/components/common/timeline";
import { docData, paymentData } from "./timelineData";
import {
  Download,
  Edit3,
  FileText,
  Plus,
  RefreshCcw,
  RefreshCw,
  Trash,
} from "react-feather";
import { RippleButton } from "@src/components/common/ripple-button";
import {
  useGetMlsServer,
  useRemoveMls,
} from "@src/core/services/api/mls/mls.api";
import { useParams } from "react-router-dom";
import { getCustomDate } from "@src/core/utils/date-helper.utils";
import { useGetListOfEntity } from "@src/core/services/api/entities/entities.api";
import { AddDocModal } from "../../AddTournamentWizard/AddMlsDoc/AddDocModal/AddDocModal";
import { LoadingData } from "@src/components/common/LoadingData/LoadingData";
import {
  capitalizeFirstLetter,
  showErrorAlert,
  showQuestionAlert,
  showSuccessAlert,
} from "@src/core/utils/Utils";
import classNames from "classnames";

const PaymentDocumnets: FC = (): JSX.Element => {
  const { id } = useParams();

  const [data, setData] = useState<any>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedData, setSelectedData] = useState<any>(null);
  const [reloadDoc, setReloadDoc] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState(true);
  const [filterState, setfilterState] = useState<any>({
    entity: "mls_document",
    data: {
      list_filter: {
        limit: 10,
        offset: 0,
        filters: [{ field: "mls_id", operator: "=", value: id ? +id : 0 }],
      },
    },
  });
  // const [invoicesData, setInvoicesData] = useState<any>([]);

  const getDetailDoc = useGetMlsServer();
  const getDetailDocMore = useGetMlsServer();
  const removeDoc = useRemoveMls();

  // const getInvoceDetail = () => {
  //   getInvoices.mutate(
  //     {
  //       entity: "invoices",
  //       data: {
  //         list_filter: {
  //           limit: 10000,
  //           offset: 0,
  //           filters: [{ field: "mls_id", operator: "=", value: id ? +id : 0 }],
  //         },
  //       },
  //     },
  //     {
  //       onSuccess: (res) => {
  //         console.log(res.data);
  //         if (res.data.is_success) {
  //           let result = res.data.result;
  //           if (result && !Array.isArray(result)) result = [result];
  //         } else setData([]);
  //       },
  //     }
  //   );
  // };

  // useEffect(() => {
  //   getInvoceDetail();
  // }, []);

  useEffect(() => {
    if (!isOpen)
      getDetailDoc.mutate(filterState, {
        onSuccess: (res) => {
          console.log(res.data.result);
          if (res.data.is_success) {
            let result = res.data.result;
            if (result && !Array.isArray(result)) result = [result];
            result &&
              setData(
                result
                // .map((o: any) => ({
                //   title: o.name,
                //   content: "",
                //   icon: <FileText size={35} />,
                //   // meta: (
                //   //   <RippleButton
                //   //     color="pending"
                //   //     className="pending text-white"
                //   //     size="sm"
                //   //   >
                //   //     Pending
                //   //     <RefreshCcw size={15} className="ms-1" />
                //   //   </RippleButton>
                //   // ),
                //   metaClassName: "mb-1",
                //   customIcon: true,
                //   className: "border-start-0",
                //   customContent: (
                //     <div className="d-flex justify-content-between align-items-end border-bottom pb-1">
                //       <div>
                //         <div>
                //           <span className="fs-6 fw-bolder lh-base">Type: </span>
                //           <span className="fs-6 lh-base">
                //             {o.document_type}
                //           </span>
                //         </div>
                //         <div>
                //           <span className="fs-6 fw-bolder lh-base">
                //             Source:{" "}
                //           </span>
                //           <span className="fs-6 lh-base">Realtyna</span>
                //         </div>
                //       </div>
                //       <span className="fs-6 lh-base">
                //         {getCustomDate(o.modification_date)}
                //       </span>
                //     </div>
                //   ),
                // }))
              );
            if (!result || result.length < 10) setHasMore(false);
          } else setData([]);
        },
      });
  }, [isOpen, reloadDoc]);

  const onRemove = (idDoc: number) => {
    showQuestionAlert(
      "Are you sure?",
      "Delete the document?",
      (val) => {},
      "Yes",
      true,
      true,
      async (val) => {
        const result = await removeDoc.mutateAsync({
          entity: "mls_document",
          data: {
            id: idDoc,
          },
        });
        if (result.data.is_success) {
          showSuccessAlert(
            "Success!",
            "Document removed!",
            () => {
              // dispatch(handleRefresh("discount"));
              setReloadDoc((old) => !old);
            },
            "Ok"
          );
          return result.data.is_success;
        } else {
          showErrorAlert("Error!", "Something went wrong!", undefined, "Ok");
        }
      }
    );
  };

  const docItems = (item: any, index: number) => (
    <Row className="border-bottom pb-1" key={index}>
      <Col sm={6}>
        <div className="d-flex mt-1 mb-1">
          {/* <img
        src={pdf}
        alt="pdf"
        style={{ width: 32, height: 32, objectFit: "cover" }}
      /> */}
          <FileText size={32} color="#f5334f" />
          <div className="ms-1">
            <span className="d-block fs-6 fw-bolder text-black">Filename</span>
            <span className="d-block fs-6 text-secondary lh-1">
              {item.name}
            </span>
          </div>
        </div>

        <Row>
          <Col xxl={6} className="pe-0">
            <div>
              <span className="fs-6 fw-bold text-black">Creator: </span>
              <span className="fs-6 text-secondary">{item.creator}</span>
            </div>
            <div>
              <span className="fs-6 fw-bold text-black">Creation on: </span>
              <span className="fs-6 text-secondary">
                {item.creation_date
                  ? getCustomDate(item.creation_date)
                  : "Not Set"}
              </span>
            </div>
          </Col>

          <Col xxl={6} className=" pe-0">
            <div>
              <span className="fs-6 fw-bold text-black">Source: </span>
              <span className="fs-6 text-secondary">Staff</span>
            </div>
            <div>
              <span className="fs-6 fw-bold text-black">Modification on: </span>
              <span className="fs-6 text-secondary">
                {item.modification_date
                  ? getCustomDate(item.modification_date)
                  : "Not Set"}
              </span>
            </div>
          </Col>
        </Row>
      </Col>
      <Col sm={6} className="mt-1">
        <Row className="h-100">
          <Col sm={8}>
            <span className="d-block fs-6 fw-bolder text-black">Note:</span>
            <span className="d-block fs-6 fw-bold text-secondary ">
              {item.note ? item.note : "Not Set"}
            </span>
          </Col>
          <Col sm={4}>
            <div className="d-flex flex-column justify-content-between h-100">
              <div className="d-flex justify-content-end align-items-center">
                <NavLink
                  download="myFile"
                  href={item.url ? item.url : ""}
                  target="_blank"
                >
                  <Download size={18} className="me-1" />
                </NavLink>
                <Edit3
                  size={18}
                  className="me-1 cursor-pointer"
                  onClick={() => {
                    setSelectedData(item);
                    setIsOpen(true);
                  }}
                />
                <Trash
                  size={18}
                  onClick={() => onRemove(item.id)}
                  className="cursor-pointer"
                />
              </div>

              {/* <RippleButton
                className={classNames(
                  "text-white",
                  item.status === "sent" ? "" : "bg-pending"
                )}
                color={
                  item.status === "sent"
                    ? "info"
                    : item.status === "approved"
                    ? "success"
                    : item.status === "rejected"
                    ? "error"
                    : item.status === "archived"
                    ? "light"
                    : "light"
                }
                size="sm"
              >
                {capitalizeFirstLetter(item.status)} <RefreshCw size={12} />
              </RippleButton> */}
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  );

  const onLoadMore = () => {
    let newFilter: any = { ...filterState };
    //@ts-ignore
    newFilter.data.list_filter["offset"] += newFilter.data.list_filter?.limit;
    setfilterState(newFilter);
    getDetailDocMore.mutate(newFilter, {
      onSuccess: (res) => {
        console.log(res.data.result);
        if (res.data.is_success) {
          let result = res.data.result;
          if (result && !Array.isArray(result)) result = [result];
          result && setData((old: any) => [...old, ...result]);
          console.log(result.length);
          if (!result || result.length < 10) setHasMore(false);
        }
      },
    });
  };

  return (
    <>
      <AddDocModal
        isOpen={isOpen}
        onToggle={() => setIsOpen((old) => !old)}
        onAddData={(d) => setData((old: any) => [...old, d])}
        data={data}
        editCellData={selectedData}
        setEditCellData={(val: any) => setSelectedData(val)}
      />
      <RowWrappers sm={12} md={12}>
        {/* <CardWrapper
          title="Payment History"
          headerChild={
            <RippleButton color="light" size="sm">
              <Plus size={18} color="#92969a" />
            </RippleButton>
          }
          borderBottom
        >
          <Timeline data={paymentData} className="mt-1" />
        </CardWrapper> */}

        <CardWrapper
          title="Documents"
          headerChild={
            <RippleButton
              color="light"
              size="sm"
              onClick={() => setIsOpen(true)}
            >
              <Plus size={18} color="#92969a" />
            </RippleButton>
          }
          borderBottom
        >
          {getDetailDoc.isLoading ? (
            <LoadingData />
          ) : data?.length > 0 ? (
            data.map((old: any, key: number) => docItems(old, key))
          ) : (
            // <Timeline data={data} className="mt-1" />
            <span className="p-3 d-block text-center text-black">
              There are no records to display
            </span>
          )}

          {getDetailDocMore.isLoading && <LoadingData />}
          {(!getDetailDoc.isLoading || (data && data.length > 0)) &&
            hasMore && (
              <RippleButton
                block
                color="link"
                className="mt-1 p-0"
                onClick={() => onLoadMore()}
              >
                Show more
              </RippleButton>
            )}
        </CardWrapper>
      </RowWrappers>
    </>
  );
};

export { PaymentDocumnets };
