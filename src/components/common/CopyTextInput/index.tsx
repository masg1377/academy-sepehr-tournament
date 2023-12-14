import { useGetAPIMgmtCredential } from "@src/core/services/api/api-key";
import React, { FC, useEffect } from "react";
import { Copy } from "react-feather";
import toast from "react-hot-toast";

interface ICopyTextInputProp {
  wrapperClassName?: string;
  text: string | undefined;
  title: string;
  isLoading?: boolean;
}

const CopyTextInput: FC<ICopyTextInputProp> = ({
  wrapperClassName,
  text,
  title,
  isLoading,
}): JSX.Element => {
  return (
    <div className={wrapperClassName}>
      <label className="text-darker fs-7 fw-bold mb-5px">{title}</label>
      <div
        className="rounded-2 d-flex justify-content-between align-items-center"
        style={{
          height: 40,
          border: "1px solid #e1e0ea",
          backgroundColor: "#f4f3f9",
          padding: "0 12px",
        }}
      >
        <span className="text-darker fs-7 text-truncate w-90">
          {isLoading ? "Loading..." : text || "Not Set"}
        </span>

        <Copy
          size={18}
          color="#888b8d"
          className="cursor-pointer"
          onClick={() => {
            navigator.clipboard.writeText(text || "");
            toast.success("Successfully copied to clipboard");
          }}
        />
      </div>
    </div>
  );
};

export { CopyTextInput };
