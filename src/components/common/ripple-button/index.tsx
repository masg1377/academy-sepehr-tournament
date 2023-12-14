// ** React Imports
import { useState, useEffect, FC } from "react";

// ** Third Party Components
import classnames from "classnames";

// ** Reactstrap Imports
import { Button } from "reactstrap";

// ** Styles
import "./ripple-button.scss";

const RippleButton: FC<any> = ({
  className,
  children,
  onClick,
  ripple,
  disabled,
  ...rest
}): JSX.Element => {
  // ** States
  const [mounted, setMounted] = useState<boolean>(false);
  const [isRippling, setIsRippling] = useState<boolean>(false);
  const [coords, setCoords] = useState({ x: -1, y: -1 });

  // ** Toggle mounted on mount & unmount
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // ** Check for coords and set ripple
  useEffect(() => {
    if (mounted) {
      if (coords.x !== -1 && coords.y !== -1) {
        setIsRippling(true);
        setTimeout(() => setIsRippling(false), 500);
      } else {
        setIsRippling(false);
      }
    }
  }, [coords]);

  // ** Reset Coords on ripple end
  useEffect(() => {
    if (mounted) {
      if (!isRippling) setCoords({ x: -1, y: -1 });
    }
  }, [isRippling]);

  return (
    <Button
      disabled={disabled}
      className={classnames("waves-effect", {
        [className]: className,
      })}
      style={rest.style}
      onClick={
        !ripple
          ? (e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });
              if (onClick) {
                onClick(e);
              }
            }
          : onClick
      }
      {...rest}
    >
      {children}
      {isRippling ? (
        <span
          className="waves-ripple"
          style={{
            left: coords.x,
            top: coords.y,
          }}
        ></span>
      ) : null}
    </Button>
  );
};
//@ts-ignore
Button.Ripple = RippleButton;

export { RippleButton };
