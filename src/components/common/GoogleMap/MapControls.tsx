import React, { FC, useState } from "react";
import centerIcon from "@assets/images/icons/group/centerIcon.svg";
import Polygon from "@assets/images/icons/group/polygon.png";
import PolygonSel from "@assets/images/icons/group/polygon-sel.png";
import RemovePol from "@assets/images/icons/group/removePol.svg";
import { MapZoomControl } from "./MapZoomControl";

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
      <MapZoomControl map={map} />

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
