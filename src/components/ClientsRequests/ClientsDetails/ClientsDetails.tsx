import React, { FC, useEffect } from "react";
import { Col, Row } from "reactstrap";
import useWindowDimensions from "@src/core/utils/Utils";
import { RequestInformation } from "./RequestInformation";
import { Workflow } from "@src/components/MLSListContainer/MLSDetail/Workflow";
import { ExteraData } from "../../common/ExteraData";
import { PaymentHistory } from "./PaymentHistory";
import { Documents } from "./Documents";
import { useGetClientRequestDetail } from "@src/core/services/api/mls/mls.api";
import { useParams } from "react-router-dom";
import { useGetListOfEntity } from "@src/core/services/api/entities/entities.api";

const ClientsDetails: FC = (): JSX.Element => {
  const { id } = useParams();

  const getRequestDetail = useGetClientRequestDetail();
  const getUserDetail = useGetListOfEntity();

  useEffect(() => {
    getRequestDetail.mutate(
      {
        entity: "mls_access_customer_request",
        data: { id: id ? +id : 0 },
      },
      {
        onSuccess: (res) => {
          //console.log(res.data);
          if (res.data.is_success) {
            getUserDetail.mutate(
              {
                entity: "users",
                data: { id: res.data.result.owner_id },
              },
              {
                onSuccess: (user) => {
                  //console.log(user.data.result);
                },
              }
            );
          }
        },
      }
    );
  }, []);

  const { width } = useWindowDimensions();

  return (
    <Row>
      <Col xxl={width < 1920 ? 12 : 10} xl={12} md={12}>
        <RequestInformation
          isLoading={getRequestDetail.isLoading}
          data={
            getRequestDetail.isSuccess
              ? getRequestDetail.data.data.is_success
                ? getRequestDetail.data.data.result
                : null
              : null
          }
          clientData={
            getUserDetail.isSuccess
              ? getUserDetail.data.data.is_success
                ? getUserDetail.data.data.result
                : null
              : null
          }
        />
        <ExteraData
          data={
            getRequestDetail.isSuccess
              ? getRequestDetail.data.data.is_success
                ? getRequestDetail.data.data.result &&
                  getRequestDetail.data.data.result.extra_data
                : []
              : []
          }
          isLoading={getRequestDetail.isLoading}
        />
        <Documents />
      </Col>
      {/* <Col xxl={4} xl={4} md={12}>
        <Workflow />
        <PaymentHistory />
      </Col> */}
    </Row>
  );
};

export { ClientsDetails };
