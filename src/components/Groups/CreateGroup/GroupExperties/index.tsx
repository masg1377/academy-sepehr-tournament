import markerIcon from "@assets/images/pages/group/logo3.png";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { LoadingData } from "@src/components/common/LoadingData/LoadingData";
import { Typography } from "@src/components/common/Typography";
import { LocationField } from "@src/components/common/form/Fields/LocationField/LocationField";
import { TPath } from "@src/core/model/common.model";
import { createGroupExpertiseValidation } from "@src/core/validations/group.validation";
import { useFormikContext } from "formik";
import React, { FC, useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Col } from "reactstrap";
import { ExpertiseListField } from "./ExpertiseListField";
import { WizardComponentsWrapper } from "../WizardComponentsWrapper";
import { MapControls } from "./MapControls";
import { PolygonComp } from "./PolygonComp";
import { GoogleMaps } from "@src/components/common/GoogleMap";

interface IGroupExpertiesProp {
  stepNumber: number;
  stepper: any;
  setStepper: React.Dispatch<any>;
  details?: any;
  setPath: React.Dispatch<React.SetStateAction<{ id: number; paths: TPath }[]>>;
  path: { id: number; paths: TPath }[];
  isSubmiting?: boolean;
  isLoading?: boolean;
}

const GroupExperties: FC<IGroupExpertiesProp> = ({
  stepNumber,
  stepper,
  setStepper,
  details,
  path,
  setPath,
  isSubmiting,
  isLoading,
}): JSX.Element => {
  return (
    <WizardComponentsWrapper
      stepper={stepper}
      setStepper={setStepper}
      stepNum={stepNumber}
      stepText="Group Experties"
      isSubmiting={isSubmiting}
      schema={createGroupExpertiseValidation}
    >
      {isLoading ? (
        <LoadingData wrapperStyle="py-5 my-3" />
      ) : (
        <>
          <Typography size={20}>Expertise</Typography>
          <Typography size={18} className="my-1">
            Please select from the list below
          </Typography>
          <ExpertiseListField
            name="expertise_list_field"
            // isLocal={!profileSetupStatus}
          />

          {/* Area Activity */}
          <div className="mt-3">
            <Col sm={12} xs={12} md={12} xl={5}>
              <Typography className="text-black bold" size={20}>
                Area of Activity
              </Typography>

              <LocationField
                isMulti
                name="activity_area"
                placeholder="Please search..."
                label="Zipcode, Neighborhood, City, County"
                wrapperClassName="mt-1"
                isClearable
                isOutline
                noColor
              />
            </Col>
          </div>
          {/* Map */}
          <div className="d-flex justify-content-start align-items-center mt-1">
            <Typography className="mb-1 text-black" size={18}>
              You can also choose the location from the map
            </Typography>
          </div>
          <div style={{ height: "500px" }} className="rounded-3">
            <Col
              className="h-100 position-relative"
              sm={12}
              xs={12}
              md={12}
              xl={7}
            >
              <GoogleMaps
                controls={{
                  hasZoomControls: true,
                  hasMapControls: true,
                  hasPointSearch: true,
                }}
                name="activity_area_map"
                area_activity_json={details?.area_activity_json}
              />
            </Col>
          </div>
        </>
      )}
    </WizardComponentsWrapper>
  );
};

export default GroupExperties;
