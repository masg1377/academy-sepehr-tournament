// ** React Imports
import { FC } from "react";

// ** Reactstrap Imports
import { Row, Col } from "reactstrap";

interface IExtensionsHeaderProp {
  link?: string;
  title: string;
  subTitle: string;
}

const ExtensionsHeader: FC<IExtensionsHeaderProp> = ({
  subTitle,
  title,
  link,
}): JSX.Element => {
  return (
    <Row className="mb-2">
      <Col sm="12" className="ms-50">
        <p
          className="font-medium-5 mt-1 extension-title"
          data-tour="extension-title"
        >
          {title}
        </p>
        {link ? (
          <a href={link} target="_blank" rel="noopener noreferrer">
            {subTitle}
          </a>
        ) : (
          <p className="text-primary">{subTitle}</p>
        )}
      </Col>
    </Row>
  );
};
export { ExtensionsHeader };
