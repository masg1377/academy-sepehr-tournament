// ** Icons Import
import { FC } from "react";
import { Heart } from "react-feather";

const Footer: FC = (): JSX.Element => {
  return (
    <p className="clearfix mb-0">
      <span className="d-block text-center w-100 d-md-inline-block mt-25">
        Copyright © {new Date().getFullYear()} by{" "}
        <a href="https://Realtyna.com" target="_blank" rel="Realtync.com">
          Realtyna.com
        </a>{" "}
        <span className="d-none d-sm-inline-block"> All rights reserved.</span>
      </span>
    </p>
  );
};

export { Footer };
