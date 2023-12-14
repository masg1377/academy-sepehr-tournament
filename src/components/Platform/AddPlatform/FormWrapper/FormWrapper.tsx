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
}

const FormWrapper: FC<IFormStepsWrapperProp> = ({
  children,
  title,
}): JSX.Element => {
  const [searchValue, setSearchValue] = useState<string>("");

  return (
    <Card>
      <CardHeader className="d-flex justify-content-between border-bottom pb-1 pt-1">
        <div className="d-flex align-items-center">
          <small className="h5 fw-bolderer">{title}</small>
        </div>

        <Col md={3}>
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
        </Col>
      </CardHeader>

      <CardBody>{children}</CardBody>

      <CardFooter className="d-flex justify-content-between mt-0 border-top-0 pt-0">
        <SubmitButton
          type="submit"
          color="info"
          // onClick={() => stepper.next()}
        >
          Save
        </SubmitButton>
      </CardFooter>
    </Card>
  );
};

export { FormWrapper };
