import classNames from "classnames";
import React, { FC, Fragment } from "react";
import {
  Button,
  Modal as ModalStrap,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";

interface IModalProp {
  isOpen: boolean;
  unmountOnClose?: boolean;
  onToggle: () => void;
  hasFooter?: boolean;
  modalTitle: string;
  children: {
    main?: JSX.Element | JSX.Element[];
    footer?: JSX.Element | JSX.Element[];
    wrapper?: any;
  };
  className?: string;
  size?: string;
  bodyClassName?: string;
  style?: any;
}

const Modal: FC<IModalProp> = ({
  isOpen,
  unmountOnClose = true,
  onToggle,
  hasFooter = true,
  children: { footer, main, wrapper: Wrapper = Fragment },
  modalTitle,
  className,
  size,
  bodyClassName,
  style,
}): JSX.Element => {
  return (
    <ModalStrap
      //   scrollable
      isOpen={isOpen}
      size={size}
      toggle={onToggle}
      style={style}
      unmountOnClose={unmountOnClose}
      className={classNames("modal-dialog-centered", className)}
    >
      <Wrapper>
        <ModalHeader toggle={onToggle}>{modalTitle}</ModalHeader>
        <ModalBody className={bodyClassName}>{main}</ModalBody>
        {hasFooter && <ModalFooter>{footer}</ModalFooter>}
      </Wrapper>
    </ModalStrap>
  );
};

export { Modal };
