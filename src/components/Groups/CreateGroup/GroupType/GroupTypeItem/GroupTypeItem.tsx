import React, { FC, useState } from "react";
import { RadioBox } from "@src/components/common/form/common/RadioBox/RadioBox";
import { ChevronDown, ChevronUp } from "react-feather";
import { CustomIcon } from "@src/components/common/CustomIcon";
import colored_eye from "@assets/images/pages/group/colored_eye.png";
import unColored_eye from "@assets/images/pages/group/unColored_eye.png";
import { Typography } from "@src/components/common/Typography";
import { Collapse } from "reactstrap";
import { useFormikContext } from "formik";

interface IGroupTypeItemProp {
  itemId: number;
  title: string;
  name: string;
  isChecked: boolean;
  selectItemHandler: (id: number) => void;
  children?: React.ReactNode;
  actualName: string;
}

const GroupTypeItem: FC<IGroupTypeItemProp> = ({
  itemId,
  title,
  isChecked,
  name,
  selectItemHandler,
  children,
  actualName,
}): JSX.Element => {
  const { setFieldValue } = useFormikContext();

  return (
    <div
      onClick={() => {
        selectItemHandler(itemId);
        setFieldValue("groupType", { [actualName]: true });
      }}
      className="d-flex flex-column p-2 rounded-3 mb-1"
      style={{ border: "solid 1px #bcbcbc" }}
    >
      {/* Top */}
      <div
        style={{ height: "35px" }}
        className="d-flex flex-row justify-content-between align-items-center"
      >
        <RadioBox
          id={name}
          radioName="groupType"
          checked={isChecked}
          name={name}
          label={title}
        />
        <div className="d-flex flex-row justify-content-start align-items-center">
          <div
            style={
              isChecked
                ? { border: "solid 1px #314bc9" }
                : { border: "solid 1px #bcbcbc" }
            }
            className="d-flex justify-content-center align-items-center px-1 rounded-1"
          >
            {isChecked && (
              <CustomIcon
                src={colored_eye}
                wrapperStyle={{ width: "24px", height: "13px" }}
              />
            )}
            {!isChecked && (
              <CustomIcon
                src={unColored_eye}
                wrapperStyle={{ width: "24px", height: "13px" }}
              />
            )}
            <Typography
              size={20}
              className={`${
                isChecked ? "text-primary" : "text-secondary"
              } ms-1`}
            >
              Preview
            </Typography>
          </div>
          {isChecked && (
            <ChevronUp color="#314bc9" className="ms-0/5" size={20} />
          )}
          {!isChecked && (
            <ChevronDown color="#bcbcbc" className="ms-0/5" size={20} />
          )}
        </div>
      </div>
      {/* Bottom */}
      <Collapse isOpen={isChecked}>{children}</Collapse>
    </div>
  );
};

export default GroupTypeItem;
