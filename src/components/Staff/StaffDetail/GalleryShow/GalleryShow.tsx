// import React from "react";
import { FC } from "react";
import { CardWrapper } from "@src/components/common/CardWrapper/CardWrapper";
import { RippleButton } from "@src/components/common/ripple-button";
import { Edit3, Plus, Trash, Trash2 } from "react-feather";
import { Row, Col } from "reactstrap";

import { Divider } from "@src/components/common/divider/Divider";
import { Link } from "react-router-dom";
import { ShowItems } from "./ShowItems/ShowItems";

import Pic from "@src/assets/images/portrait/small/avatar-s-11.jpg";
import pic2 from "@src/assets/images/portrait/small/bbb.jpg";

interface IGalleryShowProps {
  data?: any;
  moreData?: any;
}

const GalleryShow: FC<IGalleryShowProps> = ({
  data,
  moreData,
}): JSX.Element => {
  const noteChild = (): JSX.Element => (
    <Row style={{ padding: "5px" }} className="">
      <ShowItems title="Main Album" imgData={Pic} />
      <ShowItems title="Office Album" imgData={pic2} />
      <Divider wrapperClassName="p-0 m-0 w-100" />
      <Col style={{ padding: "8px 0px" }} xs={12} className="text-center m-0">
        <Link to="/" className={"fs-10"}>
          Show More
        </Link>
      </Col>
    </Row>
  );

  return (
    <CardWrapper
      title="Photo Gallery"
      headerChild={
        <RippleButton color="light" size="sm">
          <Plus size={18} color="#92969a" />
        </RippleButton>
      }
      borderBottom
      bodyClassName="overflow-auto p-1 py-0"
      //bodyStyle={{ minHeight: "200px" }}
    >
      {noteChild()}
    </CardWrapper>
  );
};

export { GalleryShow };
