// import React from "react";
import { FC } from "react";
import { Row, Col } from "reactstrap";

interface IShowItemProps {
  title: string;
  imgData?: any;
  moreClick?: () => void;
}

const ShowItems: FC<IShowItemProps> = ({
  title,
  imgData,
  moreClick,
}): JSX.Element => {
  return (
    <Col xs={6} className="text-center d-flex flex-wrap padding-5-px">
      {[1, 2, 3].map((item, index) => (
        <div
          key={index + 1}
          className="padding-1-px w-50 overflow-hidden radius-55"
        >
          <img
            className="w-100 radius-22 fit-coverr"
            src={imgData}
            alt="main album"
          />
        </div>
      ))}
      <div className="padding-1-px w-50 overflow-hidden radius-55 position-relative">
        <img
          className="w-100 radius-22 fit-coverr"
          src={imgData}
          alt="main album"
        />
        <div
          onClick={moreClick}
          className="position-absolute top-0 left-0 w-100 h-100 cursor-pointer d-flex justify-content-center align-items-center"
          style={{
            background: "#313136",
            opacity: "0.6",
          }}
        >
          <span className="text-center fs-9 text-light">12</span>
        </div>
      </div>
      <Col style={{ padding: "6px 0" }} className="fs-9" xs={12}>
        {title}
      </Col>
    </Col>
  );
};

export { ShowItems };
