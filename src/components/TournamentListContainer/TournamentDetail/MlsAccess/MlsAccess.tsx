import React, { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Col, Row } from "reactstrap";
import { AccessInformation } from "./AccessInformation";
import { MlsAccessConfig } from "./MlsAccessConfig";
import { PaymentMethod } from "./PaymentMethod";
import { useGetMlsServer } from "@src/core/services/api/mls/mls.api";
import { AccessCrenetial } from "./AccessCrenetial/AccessCrenetial";

const MlsAccess: FC = (): JSX.Element => {
  const { accessId } = useParams();

  const getDetail = useGetMlsServer();

  useEffect(() => {
    getDetail.mutate(
      {
        entity: "mls_access",
        data: { id: accessId ? +accessId : 0 },
      },
      {
        onSuccess: (res) => {
          if (res.data.is_success) {
            console.log(res.data.result);
          }
        },
      }
    );
  }, []);

  return (
    <Row>
      <Col xxl={8} xl={12} md={12}>
        <AccessInformation
          isLoading={getDetail.isLoading}
          data={
            getDetail.isSuccess
              ? getDetail.data.data && getDetail.data.data.result
              : null
          }
        />
        {/* <ComplianceRequirments /> */}
        <PaymentMethod />
      </Col>
      <Col xxl={4} xl={12} md={12}>
        {/* <CostBenefit /> */}
        {/* <Workflow /> */}
        {/* <ClientPayments /> */}
        <MlsAccessConfig
          isLoading={getDetail.isLoading}
          mlsConfigId={
            getDetail.isSuccess
              ? getDetail.data.data && getDetail.data.data.result
                ? getDetail.data.data.result.mls_config_id
                : 0
              : null
          }
        />

        <AccessCrenetial />
      </Col>
    </Row>
  );
};

export { MlsAccess };
