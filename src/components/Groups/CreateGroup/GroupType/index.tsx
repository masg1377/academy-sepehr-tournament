import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Col, Row } from "reactstrap";
import GroupTypeItem from "./GroupTypeItem/GroupTypeItem";
import { WizardComponentsWrapper } from "../WizardComponentsWrapper";
import { groupTypeItemsData } from "./groupTypeItemsData";
// import { TEditGroup } from "@src/core/services/api/group/type";
// import { useEditGroup } from "@src/core/services/api/group/group.api";
import { LoadingData } from "@src/components/common/LoadingData/LoadingData";
import { useEditGroupType } from "@src/core/services/api/group/group.api";
import { createGroupTypeValidation } from "@src/core/validations/group.validation";
import { useFormikContext } from "formik";

interface IGroupTypeProp {
  groupType: string;
  stepNumber: number;
  stepper: any;
  setStepper: React.Dispatch<any>;
  // details: any;
  indexStep: number;
  isSubmiting?: boolean;
  isLoading?: boolean;
}

const GroupType: FC<IGroupTypeProp> = ({
  groupType,
  stepper,
  setStepper,
  stepNumber,
  // details,
  indexStep,
  isSubmiting,
  isLoading,
}): JSX.Element => {
  //* States
  const [selectedItem, setSelectedItem] = useState<number>(1);
  //* Hooks
  const { id } = useParams();
  //* Custom Hooks
  const editGroup = useEditGroupType();

  const { values } = useFormikContext<any>();

  useEffect(() => {
    if (values["groupType"]?.brokerageGroup) setSelectedItem(2);
  }, [values["groupType"]]);

  // console.log("details", details);

  const selectItemHandler = (itemId: number) => {
    setSelectedItem(itemId);
    // console.log("itemId", itemId);
  };

  return (
    <WizardComponentsWrapper
      stepper={stepper}
      setStepper={setStepper}
      stepNum={stepNumber}
      stepText="Group Type"
      isSubmiting={isSubmiting}
      schema={createGroupTypeValidation}
    >
      {isLoading ? (
        <LoadingData wrapperStyle="py-5 my-3" />
      ) : (
        <Row>
          <Col sm={12} xs={12} md={12} xl={10} className="">
            {/* {groupType === "private" && */}
            {indexStep === 1 &&
              groupTypeItemsData?.map((item) => (
                <GroupTypeItem
                  key={item.id}
                  itemId={item.id}
                  name={item.name}
                  actualName={item.actualName}
                  title={item.title}
                  selectItemHandler={selectItemHandler}
                  isChecked={selectedItem === item.id}
                >
                  {item.child}
                </GroupTypeItem>
              ))}
            {/* ))} */}
            {/* {groupType === "public" && */}
          </Col>
        </Row>
      )}
    </WizardComponentsWrapper>
  );
};

export default GroupType;
