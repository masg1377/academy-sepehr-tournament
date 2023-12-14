import { FC } from "react";

const ComponentSpinner: FC = (): JSX.Element => {
  return (
    <div className="fallback-spinner">
      <div className="loading">
        <div className="effect-1 effects"></div>
        <div className="effect-2 effects"></div>
        <div className="effect-3 effects"></div>
      </div>
    </div>
  );
};

export { ComponentSpinner };
