// import React from "react";
import { FC } from "react";
import { CardWrapper } from "@src/components/common/CardWrapper/CardWrapper";
import { RippleButton } from "@src/components/common/ripple-button";
import { Edit3, Plus, Trash, Trash2 } from "react-feather";

const Note: FC = (): JSX.Element => {
  const noteChild = (): JSX.Element => (
    <div className="pb-1 border-bottom">
      <div className="d-flex justify-content-between align-items-center mt-1">
        <span className="fs-5 fw-bold text-black lh-base d-block ">
          Note title
        </span>

        <div>
          <Edit3 size={18} color="#92969a" className="me-1" />
          <Trash2 size={18} color="#92969a" />
        </div>
      </div>
      <span className="fs-6-1 lh-base text-secondary d-block mt-1">
        Lorem ipsum dolor sit amet, consectetur adipi scing elit, sed do eiusmod
        tepor incidt ut labore{" "}
        {/*et dolore magna aliqua. Enim nulla aliquet
       porttitor lacus. Ultrices neque ornare aenean{" "} */}
      </span>
      <span className="fs-6-1 lh-base fw-light text-black d-block mt-1">
        Hector Z. on 23 Oct 2021 - 04:46 PM
      </span>
    </div>
  );

  return (
    <CardWrapper
      title="Note"
      headerChild={
        <RippleButton color="light" size="sm">
          <Plus size={18} color="#92969a" />
        </RippleButton>
      }
      borderBottom
      bodyClassName="overflow-auto"
      bodyStyle={{ minHeight: "200px" }}
    >
      {noteChild()}
    </CardWrapper>
  );
};

export { Note };
