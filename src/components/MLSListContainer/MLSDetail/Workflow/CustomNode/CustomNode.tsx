import { RippleButton } from "@src/components/common/ripple-button";
import React, { FC } from "react";
import { Handle, Position } from "react-flow-renderer";

const CustomNodeComponent: FC<any> = ({ data }): JSX.Element => {
  return (
    <div style={{ width: 170 }} className="d-flex justify-content-center">
      {!data.noTop && (
        <Handle
          type="target"
          position={Position.Top}
          style={{ borderRadius: 0 }}
        />
      )}
      <RippleButton color={data.color} size={data.size} style={{ width: 170 }}>
        {data.text}
      </RippleButton>
      {!data.noBottom && (
        <Handle
          type="source"
          position={Position.Bottom}
          id="a"
          style={{ top: "100%", borderRadius: 0 }}
        />
      )}
    </div>
  );
};

export { CustomNodeComponent };
