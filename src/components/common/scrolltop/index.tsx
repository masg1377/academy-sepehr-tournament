// ** React Imports
import { FC, useEffect, useState } from "react";

// ** Third Party Components
import Proptypes from "prop-types";

const ScrollTop: FC<any> = (props): JSX.Element => {
  // ** Props
  const { showOffset, scrollBehaviour = "smooth", children, ...rest } = props;

  // ** State
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    if (window) {
      window.addEventListener(
        "scroll",
        () => {
          if (window.pageYOffset >= showOffset) {
            setVisible(true);
          } else {
            setVisible(false);
          }
        },
        { passive: true }
      );
    }
  }, []);

  const handleScrollToTop = (): void => {
    window.scroll({ top: 0, behavior: scrollBehaviour });
  };

  return visible ? (
    <div className="scroll-to-top" onClick={handleScrollToTop} {...rest}>
      {children}
    </div>
  ) : (
    <></>
  );
};

export { ScrollTop };
