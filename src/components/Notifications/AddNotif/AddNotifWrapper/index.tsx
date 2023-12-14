import { SubmitButton } from "@src/components/common/form/common/SubmitButton/SubmitButton";
import { RippleButton } from "@src/components/common/ripple-button";
import { addPackageValidation } from "@src/core/validations/package.validation";
import { addPackStep4Validation } from "@src/core/validations/package.validation";
import { useFormikContext } from "formik";
import React, { FC, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  Search,
  Target,
} from "react-feather";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import { Col, Input, InputGroup, InputGroupText } from "reactstrap";

interface IAddNotifWrapperProp {
  stepNum: number;
  stepName: string;
  children?: JSX.Element | JSX.Element[];
  stepper: any;
  hasPrev?: boolean;
  setIndexStep?: (val: any) => void;
  isLoading?: boolean;
  btnNextText?: string;
  // schema: any;
  values?: any;
  onSave?: any;
}

const AddNotifWrapper: FC<IAddNotifWrapperProp> = ({
  stepName,
  stepNum,
  children,
  stepper,
  hasPrev,
  setIndexStep,
  isLoading,
  btnNextText,
  // schema,
  // values,
  onSave,
}): JSX.Element => {
  // const [searchValue, setSearchValue] = useState<string>("");

  const location = useLocation();
  const isEdit = location.pathname.includes("edit");

  // const { values } = useFormikContext();

  return (
    <div
      style={{
        boxShadow: "0 4px 24px 0 rgba(34, 41, 47, 0.1)",
        padding: "1.5rem 1.5rem",
        borderRadius: "0.5rem",
      }}
      className="bg-white"
    >
      <div className="d-flex justify-content-between border-bottom pb-1 ">
        <div className="d-flex align-items-center">
          <span className="h5 fw-bolderer text-primary me-1">
            Step {stepNum}:
          </span>
          <small className="h5 fw-bolderer">{stepName}</small>
        </div>

        {/* <Col md={3} className="d-flex justify-content-end">
          <RippleButton
            className="d-flex justify-content-center "
            color="light"
            size="sm"
          >
            <span className="fs-6 text-success">Active </span>
            <Target size={15} color="#21c44c" className="me-1" />
            <ChevronDown size={15} />
          </RippleButton>
        </Col> */}
      </div>

      {children}

      <div className="d-flex justify-content-between mt-2 border-top pt-1">
        <div>
          {hasPrev && (
            <SubmitButton
              type="button"
              color="primary"
              outline
              className="btn-prev me-1"
              onClick={() => {
                setIndexStep && setIndexStep((old: number) => old - 1);
                stepper.previous();
              }}
            >
              <ArrowLeft
                size={14}
                className="align-middle me-sm-25 me-0"
              ></ArrowLeft>
              <span className="align-middle d-sm-inline-block d-none">
                Prev Step
              </span>
            </SubmitButton>
          )}
          <SubmitButton
            type="submit"
            color="primary"
            outline
            isLoading={isLoading}
            className="btn-next"
            // schema={schema}
            onClick={() => {
              // stepper.next();
              // setIndexStep && setIndexStep();
            }}
          >
            <span
              className={
                hasPrev
                  ? "align-middle d-sm-inline-block d-none"
                  : "align-middle d-sm-inline-block"
              }
            >
              {btnNextText ? btnNextText : "Next Step"}
            </span>
            <ArrowRight
              size={14}
              className="align-middle ms-sm-25 ms-0"
            ></ArrowRight>
          </SubmitButton>
        </div>

        {/* {isEdit && ( */}
        <SubmitButton
          type="button"
          color="info"
          isLoading={isLoading}
          onClick={() => {
            // if (addPackageValidation)
            //   addPackageValidation
            //     .validate(values)
            //     .then(() => {
            //       onSave && onSave(values, true);
            //     })
            //     .catch((err: any) => {
            //       toast.error(err.message);
            //     });
            // else onSave && onSave(values, true);
          }}
        >
          Save
        </SubmitButton>
        {/* )} */}
      </div>
    </div>
  );
};

export { AddNotifWrapper };
