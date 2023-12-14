import { SubmitButton } from "@src/components/common/form/common/SubmitButton/SubmitButton";
import React, { FC, useState } from "react";
import { ArrowLeft, ArrowRight, Search } from "react-feather";
import toast from "react-hot-toast";
import { Col, Input, InputGroup, InputGroupText } from "reactstrap";

interface IFormStepsWrapperProp {
  stepNum: number;
  stepName: string;
  children?: JSX.Element | JSX.Element[];
  stepper: any;
  hasPrev?: boolean;
  isLoading?: boolean;
  onNext?: () => void;
  nextLabel?: string;
  values?: any;
  schema?: any;
  onSave?: () => void;
}

const FormStepsWrapper: FC<IFormStepsWrapperProp> = ({
  stepName,
  stepNum,
  children,
  stepper,
  hasPrev,
  isLoading,
  onNext,
  nextLabel,
  schema,
  values,
  onSave,
}): JSX.Element => {
  const [searchValue, setSearchValue] = useState<string>("");

  return (
    <>
      <div className="d-flex justify-content-between border-bottom pb-1">
        <div className="d-flex align-items-center">
          <span className="h5 fw-bolderer text-primary me-1">
            Step {stepNum}:
          </span>
          <small className="h5 fw-bolderer">{stepName}</small>
        </div>

        {/* <Col md={3}>
          <InputGroup className="input-group-merge">
            <Input
              type="text"
              bsSize="sm"
              placeholder="Search ..."
              id="search-input"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <InputGroupText>
              <Search size={14} />
            </InputGroupText>
          </InputGroup>
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
              onClick={() => stepper.previous()}
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
            className="btn-next"
            isLoading={isLoading}
            onClick={onNext}
            values={values}
            schema={schema}
          >
            <span
              className={
                hasPrev
                  ? "align-middle d-sm-inline-block d-none"
                  : "align-middle d-sm-inline-block"
              }
            >
              {nextLabel ? nextLabel : "Next Step"}
            </span>
            <ArrowRight
              size={14}
              className="align-middle ms-sm-25 ms-0"
            ></ArrowRight>
          </SubmitButton>
        </div>

        <SubmitButton
          type="button"
          color="info"
          isLoading={isLoading}
          onClick={() => {
            if (schema)
              schema
                .validate(values)
                .then(() => {
                  onSave && onSave();
                })
                .catch((err: any) => {
                  toast.error(err.message);
                });
            else onSave && onSave();
          }}
        >
          Save
        </SubmitButton>
      </div>
    </>
  );
};

export { FormStepsWrapper };
