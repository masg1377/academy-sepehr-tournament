import React, { FC, useState } from "react";
import centerIcon from "@assets/images/icons/group/centerIcon.svg";
import Polygon from "@assets/images/icons/group/polygon.png";
import PolygonSel from "@assets/images/icons/group/polygon-sel.png";
import RemovePol from "@assets/images/icons/group/removePol.svg";
import { Typography } from "@src/components/common/Typography";
import Add from "@assets/images/icons/group/add.png";
import Dec from "@assets/images/icons/group/dec.png";

interface IMapControlsProp {
  setIsPolygon: React.Dispatch<React.SetStateAction<boolean>>;
  isPolygon: boolean;
  onCenter: () => void;
  onRemove: () => void;
  map?: google.maps.Map;
}

const MapControls: FC<IMapControlsProp> = ({
  isPolygon,
  setIsPolygon,
  onCenter,
  onRemove,
  map,
}): JSX.Element => {
  return (
    <>
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

      <div className="position-absolute zindex-1 bottom-1 end-0 p-1">
        <div
          className="bg-white rounded-2 d-flex justify-content-center align-items-center cursor-pointer mb-1"
          style={{
            boxShadow: "0 3px 6px 0 rgba(0, 0, 0, 0.16)",
            width: 32,
            height: 32,
          }}
          onClick={onRemove}
        >
          <img src={RemovePol} alt="polygon" style={{ width: 15.7 }} />
        </div>

        <div
          className="rounded-2 d-flex justify-content-center align-items-center cursor-pointer mb-1"
          style={{
            boxShadow: "0 3px 6px 0 rgba(0, 0, 0, 0.16)",
            width: 32,
            height: 32,
            backgroundColor: isPolygon ? "#151aae" : "white",
          }}
          onClick={() => setIsPolygon((old) => !old)}
        >
          <img
            src={!isPolygon ? Polygon : PolygonSel}
            alt="polygon"
            style={{ width: 18 }}
          />
        </div>

        <div
          className="bg-white rounded-2 d-flex justify-content-center align-items-center cursor-pointer"
          style={{
            boxShadow: "0 3px 6px 0 rgba(0, 0, 0, 0.16)",
            width: 32,
            height: 32,
          }}
          onClick={onCenter}
        >
          <img
            src={centerIcon}
            alt="center"
            style={{ width: 12, height: 12 }}
          />
        </div>
      </div>
    </>
  );
};

export { MapControls };
