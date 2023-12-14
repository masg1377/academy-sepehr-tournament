import { useParams } from "react-router-dom";
import React, { FC, useEffect, useState } from "react";
import { Row, Col } from "reactstrap";
import useWindowDimensions from "@src/core/utils/Utils";
import { PackageInformation } from "./PackageInformation";
import { Note } from "./Note";
import { useGetPlatformDetail } from "@src/core/services/api/platform/platform.api";
import { useGetListOfEntity } from "@src/core/services/api/entities/entities.api";

const PackageDetail: FC = (): JSX.Element => {
  const { id } = useParams();
  const [detail, setDetail] = useState(null);
  const [language, setLanguage] = useState(null);
  const [bttItems, setBttItems] = useState(null);
  const [preBttItems, setPreBttItems] = useState(null);

  const [loadFlag, setLoadFlag] = useState<boolean>(false);

  const packageDetail = useGetListOfEntity();
  const packageBtt = useGetListOfEntity();
  const packagePreBtt = useGetListOfEntity();
  const packageLanguage = useGetListOfEntity();

  const getPackageDetail = () => {
    packageDetail.mutate(
      {
        entity: "packages",
        data: { id: id ? +id : 0 },
      },
      {
        onSuccess: (res) => {
          if (res.data.is_success) {
            let result = res.data.result;
            if (result && Array.isArray(result)) result = result[0];
            //console.log(result);
            setDetail(result);
          }
        },
      }
    );
  };

  const getPackageBtt = () => {
    packageBtt.mutate(
      {
        entity: "packages_btt_items",
        data: {
          list_filter: {
            limit: 1000000,
            offset: 0,
            filters: [
              { field: "package_id", operator: "=", value: id ? +id : 0 },
            ],
          },
        },
      },
      {
        onSuccess: (res) => {
          if (res.data.is_success) {
            let result = res.data.result;
            if (result && !Array.isArray(result)) result = [result];
            setBttItems(result);
          }
        },
      }
    );
  };
  const getPreBttItems = () => {
    packagePreBtt.mutate(
      {
        entity: "packages_pre_req_btt_items",
        data: {
          list_filter: {
            limit: 1000000,
            offset: 0,
            filters: [
              { field: "package_id", operator: "=", value: id ? +id : 0 },
            ],
          },
        },
      },
      {
        onSuccess: (res) => {
          if (res.data.is_success) {
            let result = res.data.result;
            if (result && !Array.isArray(result)) result = [result];
            setPreBttItems(result);
          }
        },
      }
    );
  };

  const getPackageLanguage = () => {
    packageLanguage.mutate(
      {
        entity: "package_descriptions",
        data: {
          list_filter: {
            limit: 1000000,
            offset: 0,
            filters: [
              { field: "package_id", operator: "=", value: id ? +id : 0 },
            ],
          },
        },
      },
      {
        onSuccess: (res) => {
          if (res.data.is_success) {
            let result = res.data.result;
            if (result && !Array.isArray(result)) result = [result];
            setLanguage(result);
            setLoadFlag(true);
          }
        },
      }
    );
  };

  useEffect(() => {
    getPackageDetail();
    getPackageLanguage();
  }, []);

  useEffect(() => {
    if (loadFlag) {
      getPackageBtt();
      getPreBttItems();
    }
  }, [loadFlag]);

  const { width } = useWindowDimensions();

  return (
    <Row>
      {/* <Col xxl={width < 1920 ? 12 : 8} xl={12} md={12}> */}
      <Col xs={12} lg={12}>
        <PackageInformation
          isLoading={
            packageDetail.isLoading ||
            packageBtt.isLoading ||
            packagePreBtt.isLoading ||
            packageLanguage.isLoading
              ? true
              : false
          }
          data={detail}
          langData={language}
          bttData={bttItems}
          preBttItems={preBttItems}
        />
      </Col>
      {/* <Col xxl={width < 1920 ? 12 : 4} xl={4} md={12}> */}
      {/* <Col lg={3} xs={12}>
        <Note />
      </Col> */}
    </Row>
  );
};

export { PackageDetail };
