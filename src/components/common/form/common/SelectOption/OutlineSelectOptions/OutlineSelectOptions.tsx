// ** React Imports
import { FC } from "react";

interface OutlineOptions {
  outline: boolean;
  metaValue: any;
  handleRemoveItem: (val: number) => void;
}

const OutlineSelectOptions: FC<OutlineOptions> = ({
  outline,
  metaValue,
  handleRemoveItem,
}): JSX.Element => {
  return (
    <div className="d-flex flex-wrap outlineContainerCustome">
      {metaValue &&
        metaValue.map((item: any, index: any) => (
          <div
            key={index + 1}
            className="discount-options-holder bg-info text-light fs-9"
          >
            {item.label}
            <span
              onClick={() => handleRemoveItem(item.value)}
              className="fs-6-1 cursor-pointer margin-left-9"
            >
              x
            </span>
          </div>
        ))}
    </div>
  );
};

export default OutlineSelectOptions;
