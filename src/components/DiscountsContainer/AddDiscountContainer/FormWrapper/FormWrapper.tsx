import React, { FC, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  Search,
  Target,
} from "react-feather";
import { SubmitButton } from "@src/components/common/form/common/SubmitButton";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Input,
  InputGroup,
  InputGroupText,
} from "reactstrap";
import { RippleButton } from "@src/components/common/ripple-button";

interface IFormStepsWrapperProp {
  children?: JSX.Element | JSX.Element[];
  title?: string;
  isLoading?: boolean;
}

const FormWrapper: FC<IFormStepsWrapperProp> = ({
  children,
  title,
  isLoading,
}): JSX.Element => {
  const [searchValue, setSearchValue] = useState<string>("");

  return (
    <Card>
      <CardHeader className="d-flex justify-content-between border-bottom pb-1 pt-1">
        <div className="d-flex align-items-center">
          <small className="h5 fw-bolderer">{title}</small>
        </div>

        {/* <div className="d-flex align-items-center">
          <div className="ps-1 border-start">
            <RippleButton
              className="d-flex justify-content-center "
              color="light"
              size="sm"
            >
              <span className="fs-6  pending">Pending </span>
              <span
                style={{
                  marginLeft: "3px",
                  width: "15px",
                  height: "15px",
                  borderRadius: "100px",
                  backgroundColor: "#e7c415",
                }}
              ></span>
              <ChevronDown size={15} />
            </RippleButton>
          </div>
        </div> */}
      </CardHeader>

      <CardBody>{children}</CardBody>

      <CardFooter className="d-flex justify-content-between mt-0 border-top-0 pt-0">
        <SubmitButton
          type="submit"
          color="primary"
          isLoading={isLoading}
          // onClick={() => stepper.next()}
        >
          Save
        </SubmitButton>
      </CardFooter>
    </Card>
  );
};

export { FormWrapper };
