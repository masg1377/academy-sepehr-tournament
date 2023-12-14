import { CardWrapper } from "@src/components/common/CardWrapper/CardWrapper";
import { LoadingData } from "@src/components/common/LoadingData/LoadingData";
import { RippleButton } from "@src/components/common/ripple-button";
import {
  capitalizeFirstLetter,
  showErrorAlert,
  showQuestionAlert,
  showSuccessAlert,
} from "@src/core/utils/Utils";
import { getCustomDate } from "@src/core/utils/date-helper.utils";
import classNames from "classnames";
import React, { FC, useState } from "react";
import {
  Download,
  Edit3,
  FileText,
  Plus,
  RefreshCw,
  Trash,
} from "react-feather";
import { Col, NavLink, Row } from "reactstrap";
import { DocAddEditModal } from "../DocAddEditModal";
import { useAddEditDocumentToGroup } from "@src/core/services/api/group/group.api";
import { useParams } from "react-router-dom";

interface IDocumentsProp {
  isLoading?: boolean;
  docs: any;
  refetch: () => void;
}

const Documents: FC<IDocumentsProp> = ({
  docs,
  isLoading,
  refetch,
}): JSX.Element => {
  const { id } = useParams();

  const [docModal, setDocModal] = useState<boolean>(false);
  const [selected, setSelected] = useState<any>();

  const remove = useAddEditDocumentToGroup();

  const onDelete = (item: any) => {
    showQuestionAlert(
      "Are you sure?",
      "Delete the Document?",
      (val) => {},
      "Yes",
      true,
      true,
      async (val) => {
        try {
          const result: any = await remove.mutateAsync({
            body: {
              category: item?.category,
              doc_url: item.url,
              file_name: item?.name,
            },
            group_id: id ? +id : 0,
            isRemove: true,
          });
          if (result.data.is_success || result.data.success) {
            showSuccessAlert(
              "Success!",
              "Documnent removed!",
              () => {
                // dispatch(handleRefresh("btt"));
                refetch();
              },
              "Ok"
            );
            return result.data.is_success || result.data.success;
          } else {
            showErrorAlert("Error!", "Something went wrong!", undefined, "Ok");
          }
        } catch (error) {
          showErrorAlert("Error!", "Something went wrong!", undefined, "Ok");
        }
      }
    );
  };

  const headerChild = () => (
    <>
      <RippleButton
        className="d-flex justify-content-center"
        color="light"
        size="sm"
        onClick={() => setDocModal(true)}
      >
        <Plus size={20} color="#92969a" />
      </RippleButton>
    </>
  );

  const docItems = (item: any, index: number) => (
    <Row className="border-bottom pb-1" key={index}>
      <Col sm={9}>
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
            {/* <div>
              <span className="fs-6 fw-bold text-black">Creation on: </span>
              <span className="fs-6 text-secondary">
                {item.creation_date
                  ? getCustomDate(item.creation_date)
                  : "Not Set"}
              </span>
            </div> */}
          </Col>

          <Col xxl={6} className=" pe-0">
            <div>
              <span className="fs-6 fw-bold text-black">Categories: </span>
              <span className="fs-6 text-secondary">{item?.category}</span>
            </div>
          </Col>
        </Row>
      </Col>
      <Col sm={3} className="mt-1">
        <div className="d-flex flex-column justify-content-between h-100">
          <div className="d-flex justify-content-end align-items-center">
            <NavLink
              download="myFile"
              href={item.url ? item.url : ""}
              target="_blank"
              className="text-gray2 "
            >
              <Download size={18} className="me-1" />
            </NavLink>
            <div
              className="me-1"
              onClick={() => {
                setSelected(item);
                setDocModal(true);
              }}
            >
              <Edit3
                size={18}
                className="cursor-pointer"
                onClick={() => {
                  // setSelectedData(item);
                  // setModalOpen(true);
                }}
              />
            </div>
            <div onClick={() => onDelete(item)}>
              <Trash
                size={18}
                onClick={() => {}} //onRemove(item.id)}
                className="cursor-pointer"
              />
            </div>
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
            {capitalizeFirstLetter(item.status)}{" "}
            {item.status === "pending" && <RefreshCw size={12} />}
          </RippleButton> */}
        </div>
      </Col>
    </Row>
  );

  return (
    <CardWrapper title="Documents" headerChild={headerChild()} borderBottom>
      {docModal && (
        <DocAddEditModal
          isOpen={docModal}
          onToggle={() => {
            setDocModal(false);
            refetch();
            setSelected(undefined);
          }}
          selected={selected}
        />
      )}
      {isLoading ? (
        <LoadingData />
      ) : docs && Object.keys(docs)?.length ? (
        <>
          {Object.keys(docs)?.map((item, index: number) =>
            docItems(
              {
                name: docs[item]?.file_name,
                url: docs[item]?.doc_url,
                category: docs[item]?.category,
                creator: "Realtyna",
              },
              index
            )
          )}
        </>
      ) : (
        <span className="d-block bg-light-purple py-1 px-6 fs-3 fw-bold text-purple-lighter text-center mt-1 rounded-2">
          There is no information Please add
        </span>
      )}
    </CardWrapper>
  );
};

export { Documents };
