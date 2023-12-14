import React, { FC } from "react";
import { Typography } from "@src/components/common/Typography";
import Add from "@assets/images/icons/group/add.png";
import Dec from "@assets/images/icons/group/dec.png";

interface IMapZoomControlProp {
  map?: google.maps.Map;
}

const MapZoomControl: FC<IMapZoomControlProp> = ({ map }): JSX.Element => {
  return (
    <div className="position-absolute zindex-1 bottom-1 p-1">
      <Typography
        tag={"div"}
        style={{
          width: 33,
          height: 63,
          boxShadow: "0 3px 6px 0 rgba(0, 0, 0, 0.16)",
        }}
        className="bg-white rounded-1"
      >
        <Typography
          onClick={() =>
            map ? map.setZoom((map.getZoom() || 0) + 1 || 1) : undefined
          }
          className="text-center h-50 package-add-btn-text cursor-pointer d-flex justify-content-center align-items-center"
          style={{
            borderBottom: "1px solid #edebf3",
            margin: "0 5px",
          }}
        >
          <img
            src={Add}
            alt="add"
            className=" cursor-pointer"
            style={{
              borderBottom: "1px solid #edebf3",
              margin: "0 5px",
              width: 11,
              height: 11,
            }}
          />
        </Typography>

        <Typography
          onClick={() =>
            map ? map.setZoom((map.getZoom() || 0) - 1 || 0) : undefined
          }
          className="text-center h-50 package-add-btn-text cursor-pointer d-flex justify-content-center align-items-center"
          style={{
            borderBottom: "1px solid #edebf3",
            margin: "0 5px",
          }}
        >
          <img
            src={Dec}
            alt="dec"
            className=" cursor-pointer"
            style={{
              borderBottom: "1px solid #edebf3",
              margin: "0 5px",
              width: 11,
              // height: 2.5,
            }}
          />
        </Typography>
      </Typography>
    </div>
  );
};

export { MapZoomControl };
