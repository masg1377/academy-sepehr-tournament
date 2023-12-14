import { validPasswordRegex } from "@src/core/utils/regex.utils";
import classNames from "classnames";
import React, { FC } from "react";

interface IValidatePasswordStrongProp {
  value: string;
}

const ValidatePasswordStrong: FC<IValidatePasswordStrongProp> = ({ value }) => {
  return (
    <>
      <div className="d-flex">
        <div
          className={classNames(
            "flex-fill",
            value.length
              ? value.length <= 7 || !validPasswordRegex.test(value)
                ? "bg-danger"
                : value.length > 7 && value.length <= 12
                ? "bg-warning"
                : "bg-success"
              : "bg-grey"
          )}
          style={{ height: 5, borderRadius: 5, marginRight: 9 }}
        ></div>
        <div
          className={classNames(
            "flex-fill",
            value.length > 7 &&
              value.length <= 12 &&
              validPasswordRegex.test(value)
              ? "bg-warning"
              : value.length > 12 && validPasswordRegex.test(value)
              ? "bg-success"
              : "bg-grey"
          )}
          style={{ height: 5, borderRadius: 5, marginRight: 9 }}
        ></div>
        <div
          className={classNames(
            "flex-fill",
            value.length > 12 && validPasswordRegex.test(value)
              ? "bg-success"
              : "bg-grey"
          )}
          style={{ height: 5, borderRadius: 5 }}
        ></div>
      </div>
      {value.length ? (
        value.length <= 7 || !validPasswordRegex.test(value) ? (
          <span
            className="fs-6 fw-bold text-danger d-block"
            style={{ margin: "8px 0" }}
          >
            Weak
          </span>
        ) : value.length > 7 && value.length <= 12 ? (
          <span
            className="fs-6 fw-bold text-warning d-block"
            style={{ margin: "8px 0" }}
          >
            Fair
          </span>
        ) : (
          <span
            className="fs-6 fw-bold text-success d-block"
            style={{ margin: "8px 0" }}
          >
            Strong
          </span>
        )
      ) : (
        <span
          className="fs-6 fw-bold text-secondary d-block"
          style={{ margin: "8px 0" }}
        >
          Too short
        </span>
      )}
      {value.length ? (
        value.length <= 7 || !validPasswordRegex.test(value) ? (
          <span className="fs-6">
            This password is easy to guess. Please{" "}
            <span className="fw-bolder ">
              use at least 8 characters - symbol (special character), numeric
              character, uppercase and lowercase letters.
            </span>
          </span>
        ) : value.length > 7 && value.length <= 12 ? (
          <span className="fs-6">
            Although you can use this password,{" "}
            <span className="fw-bolder ">
              using more than 12 characters will make it more secure.
            </span>
          </span>
        ) : (
          <span className="fs-6">
            Your password is excellent. You are good to go!
          </span>
        )
      ) : (
        <></>
      )}
    </>
  );
};

export { ValidatePasswordStrong };
