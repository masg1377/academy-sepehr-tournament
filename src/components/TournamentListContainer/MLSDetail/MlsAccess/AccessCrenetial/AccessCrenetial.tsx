import React, { FC, useEffect, useState } from "react";
import { Edit3 } from "react-feather";
import { Col, Row } from "reactstrap";
import { CardWrapper } from "@src/components/common/CardWrapper";
import { RippleButton } from "@src/components/common/ripple-button";
import { useGetMlsServer } from "@src/core/services/api/mls/mls.api";
import { useParams } from "react-router-dom";
import { FormWrapper } from "@src/components/common/form/FormWrapper/FormWrapper";
import { CheckBox } from "@src/components/common/form/common/CheckBox/CheckBox";
import { LoadingData } from "@src/components/common/LoadingData/LoadingData";
import { CredentialModal } from "./CredentialModal/CredentialModal";

const AccessCrenetial: FC = (): JSX.Element => {
  const { accessId } = useParams();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [reload, setReload] = useState<boolean>(false);
  const [data, setData] = useState<any>();

  const getDetail = useGetMlsServer();

  useEffect(() => {
    getDetail.mutate(
      {
        entity: "mls_access_credential",
        data: {
          list_filter: {
            limit: 10,
            offset: 0,
            filters: [
              {
                field: "mls_access_id",
                operator: "=",
                value: accessId ? +accessId : 0,
              },
            ],
          },
        },
      },
      {
        onSuccess: (res) => {
          if (res.data.is_success) {
            const result = res.data.result;
            console.log(result);
            result && !Array.isArray(result) && setData(result);
          }
        },
      }
    );
  }, [reload]);

  const headerChild = (): JSX.Element => {
    return (
      <>
        {isOpen && (
          <CredentialModal
            isOpen={isOpen}
            onToggle={() => {
              setIsOpen((old) => !old);
              setReload((old) => !old);
            }}
            //   onAddData={(d: any) => setData((old: any) => [...old, d])}
            // setEditCellData={() => {}}
            data={data}
          />
        )}
        <RippleButton
          // style={{ minWidth: 130 }}
          // className="p-1"
          color="light"
          size="sm"
          // color="secondary"
          type="button"
          onClick={() => setIsOpen(true)}
        >
          <Edit3 size={18} color="#4d4d4d" />
        </RippleButton>
      </>
    );
  };

  return (
    <CardWrapper
      title="MLS Accesses Credential"
      headerChild={headerChild()}
      borderBottom
    >
      <FormWrapper
        initialValues={{ isMedia: data && data.is_media ? true : false }}
        onSubmit={() => {}}
        enableReinitialize
      >
        {getDetail.isLoading ? (
          <LoadingData wrapperStyle="py-5" />
        ) : (
          <Row className="mt-2">
            <Col sm={6} className="fs-6 fw-bolder mb-1">
              Class Name
            </Col>
            <Col sm={6} className="mb-1 text-secondary">
              {data && data.class_name ? data.class_name : "Not Set"}
            </Col>

            <Col sm={6} className="fs-6 fw-bolder mb-1">
              Version
            </Col>
            <Col sm={6} className="mb-1 text-secondary">
              {data && data.version ? data.version : "Not Set"}
            </Col>

            <CheckBox
              name="isMedia"
              label="Is Media"
              wrapperClass="mb-1 ms-1"
              disabled
            />

            <Col sm={6} className="fs-6 fw-bolder mb-1">
              Media Source
            </Col>
            <Col sm={6} className="mb-1 text-primary">
              {data && data.media_resource ? data.media_resource : "Not Set"}
            </Col>

            <Col sm={6} className="fs-6 fw-bolder mb-2">
              Media Object Type
            </Col>
            <Col sm={6} className="mb-2 text-secondary">
              {data && data.media_object_type
                ? data.media_object_type
                : "Not Set"}
            </Col>

            <Col sm={6} className="fs-6 fw-bolder mb-1">
              Login URL
            </Col>
            <Col sm={6} className="mb-1 text-primary">
              {data && data.login_url ? data.login_url : "Not Set"}
            </Col>

            <Col sm={6} className="fs-6 fw-bolder mb-1">
              Auth Type
            </Col>
            <Col sm={6} className="mb-1 text-secondary">
              {data && data.auth_type ? data.auth_type : "Not Set"}
            </Col>

            <Col sm={6} className="fs-6 fw-bolder mb-1">
              Rets User Name
            </Col>
            <Col sm={6} className="mb-1 text-secondary">
              {data && data.rets_user_name ? data.rets_user_name : "Not Set"}
            </Col>

            <Col sm={6} className="fs-6 fw-bolder mb-2">
              Rets Password
            </Col>
            <Col sm={6} className="mb-2 text-secondary">
              {data && data.rets_password ? "*************" : "Not Set"}
            </Col>

            <Col sm={6} className="fs-6 fw-bolder mb-1">
              Agent Username
            </Col>
            <Col sm={6} className="mb-1 text-secondary">
              {data && data.agent_user_name ? data.agent_user_name : "Not Set"}
            </Col>

            <Col sm={6} className="fs-6 fw-bolder mb-1">
              Agent Password
            </Col>
            <Col sm={6} className="mb-1 text-secondary">
              {data && data.agent_password ? "*************" : "Not Set"}
            </Col>

            <Col sm={6} className="fs-6 fw-bolder mb-1">
              Options
            </Col>
            <Col sm={6} className="mb-1 text-secondary">
              {"Not Data"}
            </Col>

            <Col sm={6} className="fs-6 fw-bolder mb-1">
              Request Method
            </Col>
            <Col sm={6} className="mb-1 text-secondary">
              {data && data.request_method ? data.request_method : "Not Set"}
            </Col>
          </Row>
        )}
      </FormWrapper>
    </CardWrapper>
  );
};

export { AccessCrenetial };
