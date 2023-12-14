import React, { FC, useEffect } from "react";
import { Typography } from "@src/components/common/Typography";
import { Divider } from "@src/components/common/divider/Divider";
import { SubmitButton } from "@src/components/common/form/common/SubmitButton/SubmitButton";
import { ChevronLeft, ChevronRight } from "react-feather";

interface IWizardComponentsWrapperProp {
  stepper: any;
  setStepper: React.Dispatch<any>;
  stepNum: number;
  stepText: string;
  children: React.ReactNode;
  lastStep?: boolean;
  schema?: any;
  isSubmiting?: boolean;
  isFirstStep?: boolean;
}

const WizardComponentsWrapper: FC<IWizardComponentsWrapperProp> = ({
  stepper,
  setStepper,
  stepNum,
  stepText,
  children,
  lastStep,
  schema,
  isSubmiting,
  isFirstStep,
}): JSX.Element => {
  // const onFormData = (obj: any) => {
  //   const formData = new FormData();

  //   // Object.keys(obj) => ['key1', 'key2', 'key3', ...]
  //   Object.keys(obj).forEach((key) => {
  //     const itemValue = obj[key];
  //     formData.append(key, itemValue);
  //   });

  //   return formData;
  // };

  // useEffect(() => {
  //   // Instead of this method:
  //   // let data = new FormData();
  //   // data.append("Title", "<string>");
  //   // data.append("Describe", "<string>");
  //   // data.append("MiniDescribe", "<string>");
  //   // data.append("Capacity", "<integer>");
  //   // data.append("CourseTypeId", "<integer>");
  //   // data.append("SessionNumber", "<string>");
  //   // data.append("CurrentCoursePaymentNumber", "<integer>");
  //   // data.append("TremId", "<integer>");
  //   // data.append("ClassId", "<integer>");
  //   // data.append("CourseLvlId", "<integer>");
  //   // data.append("TeacherId", "<long>");
  //   // data.append("Cost", "<double>");
  //   // data.append("UniqeUrlString", "<string>");
  //   // data.append("Image", "<string>");
  //   // data.append("StartTime", "<dateTime>");
  //   // data.append("EndTime", "<dateTime>");
  //   // data.append("GoogleSchema", "<string>");
  //   // data.append("GoogleTitle", "<string>");
  //   // data.append("CoursePrerequisiteId", "<uuid>");
  //   // data.append("ShortLink", "<string>");
  //   // data.append("TumbImageAddress", "<string>");
  //   // data.append("ImageAddress", "<string>");

  //   const obj = {
  //     Title: "Adad",
  //     Describe: "Description",
  //     MiniDescribe: "asdsdsasadsadescription",
  //   };
  //   const data = onFormData(obj);

  //   // TODO: call api method
  //   axios.post("url", data);
  // }, []);

  return (
    <div className="bg-white d-flex flex-column justify-content-between align-items-start rounded-1 pb-1 w-100">
      <div className="d-flex flex-column justify-content-start align-items-between w-100">
        <div className="d-flex flex-row justify-content-start align-items-center  mb-1">
          <Typography className="ft-16 text-primary">
            Step {stepNum}:{" "}
            <Typography className="ft-16 text-thunder">{stepText}</Typography>
          </Typography>
        </div>
        <Divider wrapperClassName="w-100 mb-2" />
        {children}
      </div>
      <div className="d-flex flex-row justify-content-start align-items-center mt-2 w-100">
        {!isFirstStep && (
          <SubmitButton
            type="button"
            onClick={() => stepper?.previous()}
            color="primary"
            outline
          >
            <Typography size={16}>
              <ChevronLeft size={15} /> Prev Step
            </Typography>
          </SubmitButton>
        )}
        <SubmitButton
          className="ms-auto"
          color="primary"
          outline
          schema={schema}
          type="submit"
          isLoading={isSubmiting}
        >
          <Typography size={16}>
            {!lastStep ? (
              <>
                Next Step <ChevronRight size={15} />
              </>
            ) : (
              "Finish"
            )}
          </Typography>
        </SubmitButton>
        {/* <SubmitButton className="ms-auto" color="success">
          Save
        </SubmitButton> */}
      </div>
    </div>
  );
};

export { WizardComponentsWrapper };
