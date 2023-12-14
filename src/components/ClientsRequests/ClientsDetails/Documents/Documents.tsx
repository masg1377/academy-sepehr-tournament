import { FC, useEffect, useState } from "react";
import { CardWrapper } from "@src/components/common/CardWrapper/CardWrapper";
import { RippleButton } from "@src/components/common/ripple-button";
import {
  ChevronDown,
  Plus,
  Target,
  FileText,
  Download,
  Edit3,
  Trash,
  RefreshCw,
} from "react-feather";
import { Col, NavLink, Row } from "reactstrap";
import { UploadDocModal } from "./UploadDocModal/UploadDocModal";
import {
  useGetClientRequest,
  useRemoveClientRequestDoc,
} from "@src/core/services/api/mls/mls.api";
import { TGetRequest } from "@src/core/services/api/mls/type";
import { useParams } from "react-router-dom";
import { getCustomDate } from "@src/core/utils/date-helper.utils";
import { LoadingData } from "@src/components/common/LoadingData/LoadingData";
import {
  capitalizeFirstLetter,
  showErrorAlert,
  showQuestionAlert,
  showSuccessAlert,
} from "@src/core/utils/Utils";
import { handleRefresh } from "@src/redux/refresh";
import classNames from "classnames";

const Documents: FC = (): JSX.Element => {
  const { id } = useParams();

  const [hasMore, setHasMore] = useState(true);
  const [selectedData, setSelectedData] = useState<any>(null);
  const [reloadDoc, setReloadDoc] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [data, setData] = useState<any>([]);
  const [filterState, setfilterState] = useState<TGetRequest>({
    entity: "mls_access_customer_request_document",
    data: {
      list_filter: {
        order_by: "creation_date DESC",
        limit: 10,
        offset: 0,
        filters: [
          {
            field: "mls_access_customer_request_id",
            operator: "=",
            value: id ? +id : "",
          },
        ],
      },
    },
  });

  const removeDoc = useRemoveClientRequestDoc();
  const getDocs = useGetClientRequest();
  const getDocsMore = useGetClientRequest();

  useEffect(() => {
    let filter = { ...filterState };
    //@ts-ignore
    filter.data.list_filter["offset"] = 0;
    setfilterState(filter);
    getDocs.mutate(filter, {
      onSuccess: (res) => {
        //console.log(res.data.result);
        if (res.data.is_success) {
          let result = res.data.result;
          if (result && !Array.isArray(result)) result = [result];

          setData(result);
          if (!result || result.length < 10) setHasMore(false);
        }
      },
    });
  }, [reloadDoc]);

  const headerChild = (): JSX.Element => (
    <div className="d-flex justify-content-start align-items-center">
      {/* <RippleButton
        className="d-flex justify-content-center me-1"
        color="light"
        size="sm"
      >
        <span className="fs-6">All </span>
        <ChevronDown size={15} />
      </RippleButton>
      <RippleButton
        className="d-flex justify-content-center me-1"
        color="light"
        size="sm"
      >
        <span className="fs-6 pending">Pending </span>
        <Target size={15} color="#e7c415" />
        <ChevronDown size={15} />
      </RippleButton> */}
      <RippleButton color="light" size="sm" onClick={() => setModalOpen(true)}>
        <Plus size={18} color="#92969a" />
      </RippleButton>
    </div>
  );

  // const dispatch = useDispatch();

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
          entity: "mls_access_customer_request_document",
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
                    setModalOpen(true);
                  }}
                />
                <Trash
                  size={18}
                  onClick={() => onRemove(item.id)}
                  className="cursor-pointer"
                />
              </div>

              <RippleButton
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
              </RippleButton>
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  );

  const onLoadMore = () => {
    let newFilter = { ...filterState };
    //@ts-ignore
    newFilter.data.list_filter["offset"] += newFilter.data.list_filter?.limit;
    setfilterState(newFilter);
    getDocsMore.mutate(newFilter, {
      onSuccess: (res) => {
        //console.log(res.data.result);
        if (res.data.is_success) {
          let result = res.data.result;
          if (result && !Array.isArray(result)) result = [result];
          result && setData((old: any) => [...old, ...result]);
          //console.log(result.length);
          if (!result || result.length < 10) setHasMore(false);
        }
      },
    });
  };

  return (
    <CardWrapper title="Documents" borderBottom headerChild={headerChild()}>
      {modalOpen && (
        <UploadDocModal
          isOpen={modalOpen}
          onToggle={() => {
            setModalOpen((old) => !old);
            setSelectedData(null);
          }}
          setReloadDoc={setReloadDoc}
          selectedData={selectedData}
        />
      )}

      {getDocs.isLoading ? (
        <LoadingData />
      ) : data && data.length > 0 ? (
        data.map((item: any, index: number) => docItems(item, index))
      ) : (
        <p style={{ textAlign: "center" }}>
          <b className="mt-1 d-block">There are no records to display</b>
        </p>
      )}

      {getDocsMore.isLoading && <LoadingData />}

      {(!getDocs.isLoading || (data && data.length > 0)) && hasMore && (
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
  );
};

export { Documents };
