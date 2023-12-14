// ** Import from react
import { FC } from "react";

// ** General components
import { CheckBox } from "@src/components/common/form/common/CheckBox/CheckBox";

// ** React feather
import { AlignCenter } from "react-feather";

// ** Reactstrap
import { Row, Col } from "reactstrap";

interface IFilterItemsProp {
  index: number;
  name: string;
  label: string;
}
const FilterItems: FC<IFilterItemsProp> = ({
  index,
  name,
  label,
}): JSX.Element => {
  return (
    <div
      key={index}
      style={{
        padding: "9px 1px",
        borderBottom: "1px solid #ccc",
      }}
    >
      <Row>
        <Col xs={6} className="text-start">
          <CheckBox
            labelClass="text-dark fw-bolder fs-9"
            name={name}
            label={label}
          />
        </Col>
        <Col xs={6} className="text-end">
          <AlignCenter size={16} className="cursor-pointer" />
        </Col>
      </Row>
    </div>
  );
};

export { FilterItems };
