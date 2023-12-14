import React, { FC, useEffect, useState } from "react";
import { CardWrapper } from "@src/components/common/CardWrapper/CardWrapper";
import { RippleButton } from "@src/components/common/ripple-button";
import {
  Edit,
  Target,
  ChevronDown,
  Calendar,
  Plus,
  Edit3,
} from "react-feather";
import { Row, Col, Badge } from "reactstrap";
import { FormWrapper } from "@src/components/common/form/FormWrapper/FormWrapper";
import { SwitchBox } from "@src/components/common/form/common/SwitchBox/SwitchBox";
import { SelectOption } from "@src/components/common/form/common/SelectOption/SelectOption";
import {
  getCustomDate,
  getCustomClock,
} from "@src/core/utils/date-helper.utils";
import { LoadingData } from "@src/components/common/LoadingData/LoadingData";
import { useParams } from "react-router-dom";
import { useGetMlsServer } from "@src/core/services/api/mls/mls.api";
import Logo from "@src/assets/images/logo/logo-upload.png";
import { feedTypeItems } from "@src/core/data/mls.data";

interface IMlsInformationProp {
  data: any;
  isLoading: boolean;
}

const AccessInformation: FC<IMlsInformationProp> = ({
  data,
  isLoading,
}): JSX.Element => {
  const { mlsId } = useParams();

  const [mlsData, setMlsData] = useState<any>();

  const getMls = useGetMlsServer();

  useEffect(() => {
    getMls.mutate(
      { entity: "mls_server", data: { id: mlsId ? +mlsId : 0 } },
      {
        onSuccess: (res) => {
          if (res.data.is_success) {
            setMlsData(res.data.result);
          }
        },
      }
    );
  }, []);

  const headerRightSide = (): JSX.Element => {
    return (
      <div className="d-flex align-items-center">
        {/* <div className="d-flex align-items-center border-end-secondary pe-1">
          <span className="fs-6 fw-bolder me-1">Handler</span>
          <RippleButton
            className="d-flex justify-content-center"
            color="light"
            size="sm"
          >
            <span className="fs-6 me-1">Nolan M</span>
            <Edit size={15} />
          </RippleButton>
        </div> */}
        {/* <div className="d-flex align-items-center ms-1">
          <RippleButton
            className="d-flex justify-content-center me-1"
            color="light"
            size="sm"
          >
            <span className="fs-6 pending">Pending </span>
            <Target size={15} color="#e7c415" />
            <ChevronDown size={15} />
          </RippleButton>

          <RippleButton
            className="d-flex justify-content-center"
            color="light"
            size="sm"
          >
            <Calendar size={18} color="#68686b" />
          </RippleButton>
        </div> */}
      </div>
    );
  };

  return (
    <CardWrapper
      title="MLS Access Information"
      headerChild={headerRightSide()}
      borderBottom
    >
      {isLoading ? (
        <LoadingData wrapperStyle="py-5 my-3" />
      ) : (
        <FormWrapper initialValues={{}} onSubmit={() => {}}>
          <Row className="mt-1 mb-1 align-items-center">
            <Col sm={6} className="d-flex align-items-center">
              <img
                src={mlsData && mlsData.image ? mlsData.image : Logo}
                style={{ width: 49, marginRight: 10 }}
              />
              <span className="fs-6 fw-bolder">
                {mlsData && mlsData.name ? mlsData.name : "Not Set"}
              </span>
            </Col>
            <Col sm={6} className="text-end">
              <Edit3 size={18} className="cursor-pointer" />
            </Col>
          </Row>
          <div className="d-flex align-items-center mb-1 d-flex">
            <span className="fs-6 fw-bolder d-block" style={{ width: 140 }}>
              Platform
            </span>

            <span className="fs-6">
              {data && data.platform_name ? data.platform_name : "Not Set"}
            </span>
          </div>

          <div className="mb-1 d-flex">
            <span className="fs-6 fw-bolder d-block" style={{ width: 140 }}>
              Feed Type
            </span>
            <span className="fs-6">
              {data && data.feed_type_connection_type_id ? (
                <Badge>
                  {
                    feedTypeItems.find(
                      (f) => f.value === data.feed_type_connection_type_id
                    )?.label
                  }
                </Badge>
              ) : (
                "Not Set"
              )}
            </span>
          </div>

          <div className="mb-1 d-flex">
            <span className="fs-6 fw-bolder d-block" style={{ width: 140 }}>
              Contract Type
            </span>
            <span className="fs-6">
              {data && data.contract_type ? data.contract_type : "Not Set"}
            </span>
          </div>
        </FormWrapper>
      )}
    </CardWrapper>
  );
};

export { AccessInformation };
