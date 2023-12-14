import { Polygon } from "@react-google-maps/api";
import { TPath } from "@src/core/model/common.model";
import { useFormikContext } from "formik";
import React, { FC, useCallback, useRef } from "react";

interface IPolygonCompProp {
  polygon: { id: number; paths: TPath };
  selectedPolId: number;
  isPolygon: boolean;
  setPath: React.Dispatch<React.SetStateAction<{ id: number; paths: TPath }[]>>;
  path: { id: number; paths: TPath }[];
  setSelectedPolId: (val: number) => void;
}

const PolygonComp: FC<IPolygonCompProp> = ({
  selectedPolId,
  isPolygon,
  path,
  setPath,
  polygon: { id, paths },
  setSelectedPolId,
}): JSX.Element => {
  const polygonRef = useRef<any>(null);
  const listenersRef = useRef<any>([]);

  const { setFieldValue } = useFormikContext();

  const polygonOptions = {
    fillColor: "rgba(21, 26, 174, 0.15)",
    fillOpacity: 0.5,
    strokeColor: "#151aae",
    strokeOpacity: 0.7,
    strokeWeight: 2,
    clickable: isPolygon,
    draggable: isPolygon,
    editable: isPolygon,
    geodesic: true,
    zIndex: 1,
  };

  // Call setPath with new edited path :
  const onPolygonEdit = useCallback(
    (e: number) => {
      // if (selectedPolId !== e) {
      //   setSelectedPolId(e);
      //   return;
      // }

      if (polygonRef.current) {
        const nextPath = polygonRef.current
          .getPath()
          .getArray()
          .map((latLng: any) => {
            return { lat: latLng.lat(), lng: latLng.lng() };
          });

        //console.log("eee", e);
        const newPath = path.map((m) => ({
          ...m,
          paths: m.id === e ? nextPath : m.paths,
        }));

        setPath(newPath);
        setFieldValue("activity_area_map", newPath);
      }
    },
    [setPath, selectedPolId, path]
  );

  // Call
  const onPolygonLoad = useCallback(
    (polygon: any) => {
      polygonRef.current = polygon;
      const path = polygon.getPath();
      listenersRef.current.push(
        path.addListener("set_at", onPolygonEdit),
        path.addListener("insert_at", onPolygonEdit),
        path.addListener("remove_at", onPolygonEdit)
      );
    },
    [onPolygonEdit]
  );

  // Clean refs
  const onPolygonUnmount = useCallback(() => {
    listenersRef.current.forEach((lis: any) => lis.remove());
    polygonRef.current = null;
    // setPath([]);
  }, []);

  return (
    <Polygon
      paths={paths}
      options={{
        ...polygonOptions,
        strokeColor: id === selectedPolId ? "red" : "#151aae",
      }}
      draggable={isPolygon}
      editable={isPolygon}
      //   onClick={createPolygon}
      onMouseUp={isPolygon ? () => onPolygonEdit(id) : () => {}}
      onDragEnd={isPolygon ? () => onPolygonEdit(id) : () => {}}
      onLoad={onPolygonLoad}
      onUnmount={onPolygonUnmount}
      onDblClick={() =>
        setPath((old) => {
          const removed = old.filter((f) => f.id !== id);
          setFieldValue("activity_area_map", removed);
          return removed;
        })
      }
      onClick={() => {
        if (selectedPolId === id) setSelectedPolId(0);
        else setSelectedPolId(id);
      }}
    />
  );
};

export { PolygonComp };
