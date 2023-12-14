// ** React Imports
import { FC, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";

// ** Third Party Components
import classnames from "classnames";
import {
  Grid,
  CheckSquare,
  MessageSquare,
  Mail,
  Calendar,
  ArrowLeft,
} from "react-feather";

// ** Reactstrap Imports
import {
  Breadcrumb,
  DropdownMenu,
  DropdownItem,
  BreadcrumbItem,
  DropdownToggle,
  UncontrolledButtonDropdown,
} from "reactstrap";

interface IBreadCrumbsProp {
  title: string;
  data?: { title: string; link?: string }[];
  miniBord?: boolean;
  hasBack?: boolean;
}

const BreadCrumbs: FC<IBreadCrumbsProp> = (props): JSX.Element => {
  // ** Props
  const { data, title, hasBack } = props;

  const renderBreadCrumbs = () => {
    return (
      data &&
      data.map((item, index) => {
        const Wrapper: any = item.link ? Link : Fragment;
        const isLastItem = data.length - 1 === index;
        return (
          <BreadcrumbItem
            tag="li"
            key={index}
            active={index === 0} //!isLastItem}
            className={classnames({
              "text-white": index === data.length - 1,
              "text-muted": index !== data.length - 1,
            })}
          >
            <Wrapper
              {...(item.link
                ? {
                    to: item.link,
                    className: classnames({
                      "text-white": index === data.length - 1,
                      "text-muted": index !== data.length - 1,
                    }),
                  }
                : {})}
            >
              {item.title}
            </Wrapper>
          </BreadcrumbItem>
        );
      })
    );
  };

  const navigate = useNavigate();

  return (
    <div
      className={classnames(
        "content-header row no-padding breadcrumb-wrapper",
        props.miniBord ? "breadcrumb-wrapper-mini" : "",
        "justify-content-between"
      )}
    >
      <div className="content-header-left mb-2">
        <div className="row">
          <div>
            {title ? (
              <h2 className="content-header-title float-start mb-0">
                {hasBack && (
                  <ArrowLeft
                    size={25}
                    className="cursor-pointer"
                    onClick={() => navigate(-1)}
                  />
                )}{" "}
                {title}
              </h2>
            ) : (
              ""
            )}
            {/* <div className="breadcrumb-wrapper vs-breadcrumbs d-sm-block d-none col-12">
              <Breadcrumb>
                <BreadcrumbItem tag="li">
                  <Link to="/">Home</Link>
                </BreadcrumbItem>
                {renderBreadCrumbs()}
              </Breadcrumb>
            </div> */}
          </div>
        </div>
      </div>
      <div className="content-header-right text-md-end d-flex justify-content-end w-50">
        <Breadcrumb>{renderBreadCrumbs()}</Breadcrumb>
      </div>
    </div>
  );
};
export { BreadCrumbs };
