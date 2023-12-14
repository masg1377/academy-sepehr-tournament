// ** React Imports
import { FC, Fragment, ReactNode, useState } from "react";

// ** Third Party Components
import PropTypes from "prop-types";
import { Code } from "react-feather";

// ** Reactstrap Imports
import { Card, CardHeader, CardBody, CardTitle, Collapse } from "reactstrap";

interface ICardSnippetProp {
  title: string;
  children?: any;
  noBody?: boolean;
  code?: ReactNode | JSX.Element;
  iconCode?: ReactNode | JSX.Element;
  className?: string;
}

const CardSnippet: FC<ICardSnippetProp> = ({
  title,
  children,
  noBody,
  code,
  iconCode,
  className,
}): JSX.Element => {
  // ** State
  const [isOpen, setIsOpen] = useState(false);

  // ** If user passes custom icon then render that else render default icon
  const IconCode = iconCode ? iconCode : <Code size={15} />;

  // ** To toggle collapse
  const toggle = () => setIsOpen(!isOpen);

  // ** If user passes noBody then return <Fragment> else return <CardBody>
  const Wrapper = noBody ? Fragment : CardBody;

  return (
    <Card className="card-snippet">
      <CardHeader>
        <CardTitle tag="h4">{title}</CardTitle>
        <div className="views cursor-pointer" onClick={toggle}>
          {IconCode}
        </div>
      </CardHeader>
      <Wrapper>{children}</Wrapper>
      <Collapse isOpen={isOpen}>
        <CardBody>{code}</CardBody>
      </Collapse>
    </Card>
  );
};

export { CardSnippet };
