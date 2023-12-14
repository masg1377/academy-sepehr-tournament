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
  Copy,
  Download,
  Edit3,
  FileText,
  Plus,
  RefreshCw,
  Trash,
} from "react-feather";
import toast from "react-hot-toast";
import { Col, NavLink, Row } from "reactstrap";
import { LinkAddEditModal } from "../LinkAddEditModal";
import { useAddEditLinkToGroup } from "@src/core/services/api/group/group.api";
import { useParams } from "react-router-dom";

interface ILinksProp {
  links: { [key: string]: { category: string; title: string; url: string } };
  isLoading?: boolean;
  refetch: () => void;
}

const Links: FC<ILinksProp> = ({ links, isLoading, refetch }): JSX.Element => {
  const { id } = useParams();
  const [linkModal, setLinkModal] = useState<boolean>(false);
  const [selectedLink, setSelectedLink] = useState<any>();

  const headerChild = () => (
    <>
      <RippleButton
        className="d-flex justify-content-center"
        color="light"
        size="sm"
        onClick={() => setLinkModal(true)}
      >
        <Plus size={20} color="#92969a" />
      </RippleButton>
    </>
  );

  const copyText = (text: string) => {
    navigator.clipboard.writeText(text || "");
    toast.success("Successfully copied to clipboard!");
  };

  const remove = useAddEditLinkToGroup();

  const onDelete = (title: string) => {
    showQuestionAlert(
      "Are you sure?",
      "Delete the Link?",
      (val) => {},
      "Yes",
      true,
      true,
      async (val) => {
        try {
          const result: any = await remove.mutateAsync({
            body: {
              title,
            },
            group_id: id ? +id : 0,
            isRemove: true,
          });
          if (result.data.is_success || result.data.success) {
            showSuccessAlert(
              "Success!",
              "Link removed!",
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

  const linkItems = (item: any, index: number) => (
    <Row className="border-bottom pb-1" key={index}>
      <Col sm={9}>
        <div className="d-flex mt-1 mb-1">
          <span
            className="d-block linkBlue fs-5 cursor-pointer"
            onClick={() => window.open(item?.url, "_blank")}
          >
            {item?.url || "Not Set"}
          </span>
        </div>

        <Row>
          <Col xxl={6} className="pe-0">
            <div>
              <span className="fs-6 fw-bold text-black">Title: </span>
              <span className="fs-6 text-secondary">{item.title}</span>
            </div>
            <div>
              <span className="fs-6 fw-bold text-black">Created by: </span>
              <span className="fs-6 text-secondary">
                {item.created_by ? item.created_by : "Not Set"}
              </span>
            </div>
          </Col>

          <Col xxl={6} className=" pe-0">
            <div>
              <span className="fs-6 fw-bold text-black">Categories: </span>
              <span className="fs-6 text-secondary">{item?.category}</span>
            </div>
            {/* <div>
              <span className="fs-6 fw-bold text-black">Creation on: </span>
              <span className="fs-6 text-secondary">{item?.creation_date}</span>
            </div> */}
          </Col>
        </Row>
      </Col>
      <Col sm={3} className="mt-1">
        <div className="d-flex flex-column justify-content-between h-100">
          <div className="d-flex justify-content-end align-items-center">
            <div
              className="me-1 cursor-pointer"
              onClick={() => copyText(item?.url)}
            >
              <Copy size={18} />
            </div>
            <div
              className="me-1"
              onClick={() => {
                setSelectedLink(item);
                setLinkModal(true);
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
            <div onClick={() => onDelete(item?.title)}>
              <Trash
                size={18}
                onClick={() => {}} //onRemove(item.id)}
                className="cursor-pointer"
              />
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );

  return (
    <CardWrapper title="Links" headerChild={headerChild()} borderBottom>
      {linkModal && (
        <LinkAddEditModal
          isOpen={linkModal}
          onToggle={() => {
            setLinkModal(false);
            setSelectedLink(undefined);
            refetch();
          }}
          selected={selectedLink}
        />
      )}
      {isLoading ? (
        <LoadingData />
      ) : links && Object.keys(links)?.length ? (
        <>
          {Object.keys(links)?.map((item, index: number) =>
            linkItems(
              {
                name: item,
                title: links[item]?.title,
                // creation_date: "2023-02-05",
                created_by: "Realtyna",
                url: links[item]?.url,
                category: links[item]?.category,
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

export { Links };
