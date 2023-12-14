import { FC } from "react";
// ** Third Party Components
import { X } from "react-feather";
import classnames from "classnames";
import PerfectScrollbar from "react-perfect-scrollbar";

import { Modal, ModalHeader, ModalBody } from "reactstrap";

const Sidebar: FC<any> = (props): JSX.Element => {
  // ** Props
  const {
    open,
    size,
    title,
    width,
    children,
    closeBtn,
    className,
    toggleSidebar,
    bodyClassName,
    contentClassName,
    wrapperClassName,
    headerClassName,
    ...rest
  } = props;

  // ** If user passes custom close btn render that else default close btn
  const renderCloseBtn = closeBtn ? (
    closeBtn
  ) : (
    <X className="cursor-pointer" size={15} onClick={toggleSidebar} />
  );

  return (
    <Modal
      isOpen={open}
      toggle={toggleSidebar}
      contentClassName={classnames("overflow-hidden", {
        [contentClassName]: contentClassName,
      })}
      modalClassName={classnames("modal-slide-in", {
        [wrapperClassName]: wrapperClassName,
      })}
      className={classnames({
        [className]: className,
        "sidebar-lg": size === "lg",
        "sidebar-sm": size === "sm",
      })}
      /*eslint-disable */
      {...(width !== undefined
        ? {
            style: { width: String(width) + "px" },
          }
        : {})}
      /*eslint-enable */
      {...rest}
    >
      <ModalHeader
        className={classnames({
          [headerClassName]: headerClassName,
        })}
        toggle={toggleSidebar}
        close={renderCloseBtn}
        tag="div"
      >
        <h5 className="modal-title">
          <span className="align-middle">{title}</span>
        </h5>
      </ModalHeader>
      <PerfectScrollbar options={{ wheelPropagation: false }}>
        <ModalBody
          className={classnames("flex-grow-1", {
            [bodyClassName]: bodyClassName,
          })}
        >
          {children}
        </ModalBody>
      </PerfectScrollbar>
    </Modal>
  );
};

export { Sidebar };
