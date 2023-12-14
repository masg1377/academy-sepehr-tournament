import React, { FC, useEffect } from "react";
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
import { Row, Col } from "reactstrap";
import { FormWrapper } from "@src/components/common/form/FormWrapper/FormWrapper";
import Logo from "@src/assets/images/logo/logo-upload.png";
import { LoadingData } from "@src/components/common/LoadingData/LoadingData";
import { useLoadImage } from "@src/core/services/api/file/file.api";
import { useNavigate } from "react-router-dom";

interface IPlatformInformationProp {
  isLoading: boolean;
  data: any;
}

const PlatformInformation: FC<IPlatformInformationProp> = ({
  isLoading,
  data,
}): JSX.Element => {
  const navigate = useNavigate();
  // const loadImage = useLoadImage();

  // useEffect(() => {
  //   if (data && data.image) {
  //     // loadImage.mutate(data.image, {
  //     //   onSuccess: (res) => {
  //     //     console.log(res.data);
  //     //   },
  //     // });
  //     // fetch(data.image, {
  //     //   headers: {
  //     //     Authorization:
  //     //       "Bearer eyJraWQiOiJ4cU1nOUN0NXNNODVOekVvVkZTTmxZcUlUZzZuY3VaNU94dVhMcFRpUzJrPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI1MjBiMmU0Ni1kOGZlLTQ1OTktODJhYS01OTQxNGJlNTRiZmIiLCJjb2duaXRvOmdyb3VwcyI6WyJSRVNPIiwiUkVTT19kYXNoYm9hcmQiXSwiZW1haWxfdmVyaWZpZWQiOnRydWUsImludml0YXRpb25fdmFsaWRhdGVkIjoidHJ1ZSIsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTEuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0xXzkydHJGcWpNbyIsImNvZ25pdG86dXNlcm5hbWUiOiI1MjBiMmU0Ni1kOGZlLTQ1OTktODJhYS01OTQxNGJlNTRiZmIiLCJvcmlnaW5fanRpIjoiZDRjYWRmZjUtOWU3MS00MzUzLWFlMWItNDU4OWJhMGExMmE4IiwiYXVkIjoiMnFqNjNtZTlidDVnMW5xaWM4MGE0cXFnZG4iLCJwcm9maWxlX3NldHVwX3N0YXR1cyI6ImRvbmUiLCJldmVudF9pZCI6ImM2M2FmNGEwLWFlYTgtNDEzZC1hNzE3LWMwOTI1NGI3YTA1YiIsInVzZXJfaWQiOiI4MzUiLCJ0b2tlbl91c2UiOiJpZCIsInBlcm1pc3Npb25zIjoie1wiaW52aXRhdGlvbl92YWxpZGF0ZWRcIjogZmFsc2UsIFwiY3JtX2FjY2Vzc1wiOiBmYWxzZSwgXCJwcm9maWxlX3NldHVwX3N0YXR1c1wiOiBmYWxzZSwgXCJjYW5fcHVyY2hhc2VfcGFja2FnZVwiOiB0cnVlfSIsImF1dGhfdGltZSI6MTY2NDQzNzE2MSwibmFtZSI6ImJlbiAiLCJleHAiOjE2NjQ3ODc3MTQsImlhdCI6MTY2NDc4NDExNCwiZmFtaWx5X25hbWUiOiJzdGFmZiIsImp0aSI6IjNiNDRiOTZkLWZhMzYtNGYyNS05YTI3LTMwODE2MTEwZDk1MiIsImVtYWlsIjoiYmVuLm0rc3RhZmZAcmVhbHR5bmEubmV0In0.ODKZh5EFF4i9AydnQZ2zsDIMWbjXiozr5MuN-Z4esIrY-Fsj45BCR7A3boCmiajS1ayLNXsQ0AWQ9m2r7hGHH4Mo2FjNtsbjOynWNQZQhxDk0RjcLqENqYrLLpqT3P1q4eHL7MWB5FXkvCq0Xs56evlOAPlIDRpYNM2i7Tx2CAUDJ55d8rqmivbKMne3juu_539OW7TMtcHgju6L4Pf_ZfmV5hxLhlSk5XRL7-x_RmrablTMJ_-4n-zzV8p0OKw7Ujjl3QSaUsm90yYRaVGbbUeVaRqB9zZv2BRO9rLLbm4E9CPWmt7HGT_VpsVNoQI3r4Kv559eTBFBwrfkMPZ1bA",
  //     //   },
  //     // })
  //     //   .then((res) => console.log(res))
  //     //   .catch((err) => console.log(err));
  //   }
  // }, [data]);

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
        </div>
        <div className="d-flex align-items-center ms-1">
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
      title="Platform Information"
      headerChild={headerRightSide()}
      borderBottom
    >
      {isLoading ? (
        <LoadingData />
      ) : (
        <div>
          <div className="d-flex justify-content-between align-items-center mt-1">
            <img src={data?.image || Logo} alt="logo" style={{ width: 49 }} />
            <Edit3
              size={20}
              color="#92969a"
              className="cursor-pointer"
              onClick={() => navigate("/platforms/edit/" + data.id + "/1")}
            />
          </div>
          <div className="mt-1">
            <span
              style={{ width: "19.6%", display: "inline-block" }}
              className="fs-6 fw-bolder me-2"
            >
              Name
            </span>
            <span className="fs-6 text-secondary">
              {(data && data.name) || "Not Set"}
            </span>
          </div>
          <div className="mt-1">
            <span
              style={{ width: "19.6%", display: "inline-block" }}
              className="fs-6 fw-bolder me-2"
            >
              Dashboard access url
            </span>
            <span
              className="fs-6 text-info cursor-pointer"
              onClick={() =>
                window.open(
                  (data && data.dashboard_access_url.includes("http")
                    ? data.dashboard_access_url
                    : "https://" + data.dashboard_access_url) || "#"
                )
              }
            >
              {(data && data.dashboard_access_url) || "Not Set"}
            </span>
          </div>
          <Row>
            <Col sm={6} className="mt-1">
              <span
                style={{ width: "40%", display: "inline-block" }}
                className="fs-6 fw-bolder me-2"
              >
                Username
              </span>
              <span className="fs-6 text-secondary">
                {(data && data.username) || "Not Set"}
              </span>
            </Col>
            <Col sm={6} className="mt-1">
              <span
                style={{ width: "40%", display: "inline-block" }}
                className="fs-6 fw-bolder me-2"
              >
                Password
              </span>
              <span className="fs-6 text-secondary">*********</span>
            </Col>
          </Row>
        </div>
      )}
    </CardWrapper>
  );
};

export { PlatformInformation };
