import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { TPath } from "@src/core/model/common.model";
import { useFormikContext } from "formik";
import { FC, useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { LocationField } from "../form/Fields/LocationField/LocationField";
import { MapZoomControl } from "@src/components/common/GoogleMap/MapZoomControl";
import { MapControls } from "./MapControls";
import { PolygonComp } from "./PolygonComp";

interface IGoogleMapsProp {
  name?: string;
  area_activity_json?: any;
  addressName?: string;
  controls: {
    hasMapControls?: boolean;
    hasPointSearch?: boolean;
    hasZoomControls?: boolean;
  };
}

const GoogleMaps: FC<IGoogleMapsProp> = ({
  name = "",
  controls: { hasMapControls, hasPointSearch, hasZoomControls },
  addressName,
  area_activity_json,
}): JSX.Element => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyA4913w6cnR0Ilu6TaxVrDMn5WI2RNvHAw",
    // googleMapsApiKey: "",
  });

  const [isPolygon, setIsPolygon] = useState<boolean>(false);
  const [selectedPolId, setSelectedPolId] = useState<number>(0);
  const [center, setCenter] = useState<{ lat: number; lng: number }>({
    lat: 37.78825,
    lng: -122.4324,
  });
  const [map, setMap] = useState<any>(null);
  const [locations, setLocations] = useState<any[]>([
    {
      lat: 36.61676921882259,
      lng: 59.640663120276514,
    },
    {
      lat: 36.4684176510228,
      lng: 52.85991419228157,
    },
    {
      lat: 32.70637242762227,
      lng: 51.660631469615865,
    },
  ]);
  const [path, setPath] = useState<{ id: number; paths: TPath }[]>([]);

  const { setFieldValue, values } = useFormikContext<any>();

  useEffect(() => {
    if (addressName && values[addressName]?.Geometry?.Point) {
      const point = values[addressName]?.Geometry?.Point;
      setLocations([{ lat: point[1], lng: point[0] }]);
      setCenter({ lat: point[1], lng: point[0] });
    } else setLocations([]);
  }, [addressName && values[addressName]]);

  useEffect(() => {
    if (area_activity_json) {
      const cords = area_activity_json?.coordinates;

      const cordsPath = cords?.length ? cords : [];
      setPath(
        cordsPath.map((pol: any, ind: number) => ({
          id: ind + 1,
          paths: pol?.map((cord: number[]) => ({ lat: cord[0], lng: cord[1] })),
        }))
      );
      // setPath(cordsPath?.map((it: number[]) => ({ lat: it[0], lng: it[1] })));
      cordsPath[0][0] &&
        setCenter({ lat: cordsPath[0][0][0], lng: cordsPath[0][0][1] });
    }
  }, [area_activity_json]);

  const createPolygon = (event: any) => {
    try {
      if (selectedPolId) {
        const newPath: { id: number; paths: TPath }[] = path.map((p) =>
          p.id === selectedPolId
            ? {
                id: selectedPolId,
                paths: [
                  ...p.paths,
                  { lat: event.latLng?.lat(), lng: event.latLng?.lng() },
                ],
              }
            : p
        );
        setPath(newPath);

        setFieldValue(name, newPath); //"activity_area_map"
      } else {
        let ids = Math.max(...path.map((p) => p.id));
        ids = ids !== Number.NEGATIVE_INFINITY ? ids + 1 : 1;

        const newPath: { id: number; paths: TPath }[] = [
          ...path,
          {
            id: ids,
            paths: [{ lat: event.latLng?.lat(), lng: event.latLng?.lng() }],
          },
        ];
        setSelectedPolId(ids);
        setPath(newPath);

        setFieldValue(name, newPath);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const selectMapItemHandler = (item: any) => {
    console.log(item);
  };

  const onMapLoad = useCallback((map: any) => {
    setMap(map);
  }, []);

  useEffect(() => {
    if (!isPolygon) setSelectedPolId(0);
  }, [isPolygon]);

  useEffect(() => {
    if (hasPointSearch && values["map_input"]?.Geometry) {
      const geometry = values["map_input"]?.Geometry?.Point;
      geometry.length && setCenter({ lat: geometry[1], lng: geometry[0] });
    }
  }, [values["map_input"]]);

  return (
    <>
      {isLoaded && hasZoomControls && <MapZoomControl map={map} />}
      {isLoaded && hasPointSearch && (
        <div className="w-100 d-flex justify-content-center">
          <div
            style={{
              // right: "-8.2px",
              width: "calc(100% - 3rem)",
            }}
            className="position-absolute top-0 zindex-1 mt-1"
          >
            <LocationField
              name="map_input"
              placeholder="Search"
              wrapperClassName="mb-0"
              noColor
              whiteColor
              defaultMargin={true}
            />
          </div>
        </div>
      )}
      {isLoaded && hasMapControls && (
        <MapControls
          setIsPolygon={setIsPolygon}
          isPolygon={isPolygon}
          onCenter={() => {
            map.setCenter(center);
          }}
          onRemove={() => {
            if (selectedPolId) {
              const removed = path.filter((f) => f.id !== selectedPolId);
              setPath(removed);
              setFieldValue(name, removed);
            } else {
              // setPath([]);
              toast.error("Please select a polygon first!");
            }
            setSelectedPolId(0);
          }}
          map={map}
        />
      )}
      {!isLoaded ? (
        <h1>Loading Map...</h1>
      ) : (
        <GoogleMap
          key={"AIzaSyA4913w6cnR0Ilu6TaxVrDMn5WI2RNvHAw"}
          mapContainerClassName="map-container h-100 rounded-3"
          center={center}
          zoom={12}
          onClick={isPolygon ? (e) => createPolygon(e) : () => {}}
          onLoad={onMapLoad}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
        >
          {path.length > 0 &&
            path.map((p, index) => (
              <PolygonComp
                key={index}
                polygon={p}
                isPolygon={isPolygon}
                path={path}
                selectedPolId={selectedPolId}
                setPath={setPath}
                setSelectedPolId={setSelectedPolId}
              />
            ))}
          {locations?.map((item, inex) => (
            <Marker
              // onLoad={onLoad}
              position={item}
              onClick={() => selectMapItemHandler(item)}
              // icon={{
              //   // path: google.maps.SymbolPath.CIRCLE,
              //   url: markerIcon,
              //   // size: {},
              //   // fillColor: "#EB00FF",
              //   scale: 3,
              // }}
              key={inex}
            />
          ))}
        </GoogleMap>
      )}
    </>
  );
};

export { GoogleMaps };
