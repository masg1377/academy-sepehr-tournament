import useWindowDimensions from "@src/core/utils/Utils";
import React, { FC } from "react";
import { Row, Card, Col } from "reactstrap";
import { PlatformInformation } from "./PlatformInformation";
import { ExteraData } from "@src/components/common/ExteraData";
import { Note } from "./Note";
import { PlatformCredential } from "./PlatformCredential";
import { useGetPlatformDetail } from "@src/core/services/api/platform/platform.api";
import { useParams } from "react-router-dom";

const PlatformDetail: FC = (): JSX.Element => {
  const { id } = useParams();

  const {
    data: platformData,
    isLoading: platformLoading,
    isSuccess: platformSuccess,
  } = useGetPlatformDetail({
    entity: "platform",
    data: { id: id ? +id : 0 },
  });

  const { width } = useWindowDimensions();

  return (
    <Row>
      <Col xxl={width < 1920 ? 12 : 10} xl={12} md={12}>
        <PlatformInformation
          isLoading={platformLoading}
          data={platformData?.data.result}
        />
        <ExteraData
          isLoading={platformLoading}
          data={
            platformData && platformData.data && platformData.data.result
              ? platformData.data.result.extra_data
              : []
          }
        />
        <PlatformCredential />
      </Col>
      {/* <Col xxl={4} xl={4} md={12}>
        <Note />
      </Col> */}
    </Row>
  );
};

export { PlatformDetail };
