import { useGetListOfEntity } from "@src/core/services/api/entities/entities.api";
import { useGetMlsServer } from "@src/core/services/api/mls/mls.api";
import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Col, Row } from "reactstrap";
import { AddMlsAccess } from "../AddMlsWizard/AddMlsAccess/AddMlsAccess";
import { AddMlsConfig } from "../AddMlsWizard/AddMlsConfig/AddMlsConfig";
import { ClientPayments } from "./ClientPayments";
import { ComplianceRequirments } from "./ComplianceRequirments";
import { CostBenefit } from "./CostBenefit";
import { MlsInformation } from "./MlsInformation";
import { PaymentDocumnets } from "./PaymentDocumnets";
import { PaymentInfo } from "./PaymentInfo";
import { Workflow } from "./Workflow";

const MLSDetail: FC = (): JSX.Element => {
  const { id } = useParams();

  const getDetail = useGetMlsServer();

  useEffect(() => {
    getDetail.mutate(
      { entity: "mls_server", data: { id: id ? +id : 0 } },
      {
        onSuccess: (res) => {
          console.log(res.data.result);
        },
      }
    );
  }, []);

  return (
    <Row>
      <Col xxl={9} xl={12} md={12}>
        <MlsInformation
          isLoading={getDetail.isLoading}
          data={
            getDetail.isSuccess
              ? getDetail.data.data && getDetail.data.data.result
              : null
          }
        />
        {/* <ComplianceRequirments /> */}
        {/* <PaymentInfo /> */}
        <AddMlsAccess stepper={null} isDetail />
        <AddMlsConfig stepper={null} isDetail />
        <PaymentDocumnets />
      </Col>
      {/* <Col xxl={3} xl={4} md={12}> */}
      {/* <CostBenefit /> */}
      {/* <Workflow /> */}
      {/* <ClientPayments /> */}
      {/* </Col> */}
    </Row>
  );
};

export { MLSDetail };
