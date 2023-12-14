import { SelectOption } from "@src/components/common/form/common/SelectOption";
import { RowWrappers } from "@src/components/common/RowWrappers";
import React, { FC, useEffect, useRef, useState } from "react";
import { AtSign, BarChart2, Check, MapPin, User, Wifi } from "react-feather";
import { Nav, NavItem } from "reactstrap";
import { MlsComplienceList } from "./MlsComplienceList/MlsComplienceList";
import { SwitchBox } from "@src/components/common/form/common/SwitchBox";
import { InputText } from "@src/components/common/form/common/InputText";
import { ChildForm } from "@src/components/common/ChildForm/ChildForm";
import { useGetListOfEntity } from "@src/core/services/api/entities/entities.api";
import { packageMlsContractType } from "@src/core/data/package.data";
import {
  mlsReportIntervalType,
  reportIntervalData,
} from "@src/core/data/mls.data";
import { LocationField } from "@src/components/common/form/Fields/LocationField/LocationField";
import { TGetEntities } from "@src/core/services/api/entities/type";
import { MaskInput } from "@src/components/common/form/common/MaskInput/MaskInput";

const MainMlsForm: FC = (): JSX.Element => {
  const [locationOption, setlocationOption] = useState([]);
  const [addressLocationOption, setAddressLocationOption] = useState([]);
  const [addressInput, setAddressInput] = useState<string>("");
  const [countryInput, setCountryInput] = useState<string>("");
  const [locationFilter, setLocationFilter] = useState<TGetEntities>({
    entity: "locations",
    data: {
      list_filter: {
        limit: 100,
        offset: 0,
        filters: [
          { field: "name", operator: "like", value: "" },
          "and",
          { field: "level", operator: "=", value: 1 },
        ],
      },
    },
  });
  const [addressLocationFilter, setAddressLocationFilter] =
    useState<TGetEntities>({
      entity: "locations",
      data: {
        list_filter: {
          limit: 100,
          offset: 0,
          filters: [{ field: "label", operator: "like", value: "" }],
        },
      },
    });

  const getLocations = useGetListOfEntity();
  const getAddressLocations = useGetListOfEntity();

  useEffect(() => {
    getLocations.mutate(locationFilter, {
      onSuccess: (res) => {
        if (res.data.is_success) {
          setlocationOption(
            res.data.result.map((o: any) => ({ value: o.id, label: o.label }))
          );
        }
      },
    });
  }, []);
  useEffect(() => {
    getAddressLocations.mutate(addressLocationFilter, {
      onSuccess: (res) => {
        if (res.data.is_success) {
          setAddressLocationOption(
            res.data.result.map((o: any) => ({ value: o.id, label: o.label }))
          );
        }
      },
    });
  }, []);

  const addressRef = useRef<any>();
  const onFilterAddressLocation = (val: string) => {
    clearTimeout(addressRef.current);
    setAddressInput(val);
    if (addressInput !== val && val) {
      const timeOut = setTimeout(() => {
        const obj: TGetEntities = { ...addressLocationFilter };
        // @ts-ignore
        obj.data.list_filter["filters"] = [
          { field: "label", operator: "like", value: val },
        ];
        setAddressLocationFilter(obj);
        getAddressLocations.mutate(obj, {
          onSuccess: (res) => {
            if (res.data.is_success) {
              let result = res.data.result;
              if (result && !Array.isArray(result)) result = [result];
              setAddressLocationOption(
                result.map((o: any) => ({
                  value: o.id,
                  label: o.label,
                }))
              );
            }
          },
        });
      }, 500);
      addressRef.current = timeOut;
    }
  };

  const countryRef = useRef<any>();
  const onFilterCountryLocation = (val: string) => {
    clearTimeout(countryRef.current);
    setCountryInput(val);
    if (countryInput !== val && val) {
      const timeOut = setTimeout(() => {
        const obj: TGetEntities = { ...locationFilter };
        // @ts-ignore
        obj.data.list_filter["filters"] = [
          { field: "name", operator: "like", value: val },
          "and",
          { field: "level", operator: "=", value: 1 },
        ];
        setLocationFilter(obj);
        getLocations.mutate(obj, {
          onSuccess: (res) => {
            if (res.data.is_success) {
              let result = res.data.result;
              if (result && !Array.isArray(result)) result = [result];
              setlocationOption(
                result.map((o: any) => ({
                  value: o.id,
                  label: o.label,
                }))
              );
            }
          },
        });
      }, 500);
      countryRef.current = timeOut;
    }
  };

  return (
    <Nav vertical className="mt-2 border">
      <ChildForm
        headerIcon={<MapPin size={12} color="white" />}
        headerTitle="Location"
        className="p-1"
      >
        <RowWrappers sm={6} md={4}>
          {/* <LocationField
            name="country"
            placeholder="Please select"
            label={"Country"}
          /> */}
          {/* <LocationField
            name="country"
            placeholder="Please select"
            label={"Country"}
            wrapperClassName="mb-1"
            // isOutline
          /> */}

          <SelectOption
            name="country"
            placeholder="Please select"
            label={"Country"}
            id="country"
            onInputChange={onFilterCountryLocation}
            noFilter
            options={locationOption}
            isLoading={getLocations.isLoading}
            wrapperClassName="mb-1"
          />

          {/* <LocationField
            name="address"
            placeholder="Please select"
            label={"Address"}
            wrapperClassName="mb-1"
            creative
            // isOutline
          /> */}
          <InputText
            name="address"
            placeholder="Please enter ..."
            label={"Address"}
            id="address"
          />
          {/* <SelectOption
            name="address"
            placeholder="Please select"
            label={"Address"}
            id="address"
            options={addressLocationOption}
            isLoading={getAddressLocations.isLoading}
            wrapperClassName="mb-1"
            noFilter
            onInputChange={onFilterAddressLocation}
          /> */}
        </RowWrappers>
      </ChildForm>

      <NavItem className="dropdown-divider mt-0"></NavItem>
      <ChildForm
        headerIcon={<User size={12} color="white" />}
        headerTitle="Contract Type"
        className="p-1 pb-0"
      >
        <RowWrappers sm={6} md={4}>
          <SelectOption
            name="contract_type"
            placeholder="Please select"
            label={"Contract"}
            id="contract_type"
            options={packageMlsContractType}
            wrapperClassName="mb-1"
          />
        </RowWrappers>
      </ChildForm>

      <NavItem className="dropdown-divider mt-0"></NavItem>
      {/* <ChildForm
        headerIcon={<Wifi size={12} color="white" />}
        headerTitle="Coverage Area"
        className="p-1 pb-0"
      >
        <RowWrappers sm={6} md={4}>
          <SelectOption
            name="cities"
            placeholder="Please select"
            label={"Cities"}
            id="cities"
            isMulti
            options={[]}
            wrapperClassName="mb-1"
          />
        </RowWrappers>
      </ChildForm> */}
      {/* <NavItem className="dropdown-divider mt-0"></NavItem> */}

      {/* <ChildForm
        headerIcon={<Check size={12} color="white" />}
        headerTitle="Mls Complience"
        className="p-1 pb-0"
      >
        <MlsComplienceList />
      </ChildForm> */}

      <NavItem className="dropdown-divider mt-0"></NavItem>
      <ChildForm
        headerIcon={<BarChart2 size={12} color="white" />}
        headerTitle="Reports"
        className="p-1 pb-0"
      >
        <SwitchBox
          color="success"
          // defaultChecked
          // withIcon
          name="report_status"
          wrapperClassName="w-100 mt-2"
        >
          Report Required
        </SwitchBox>

        <RowWrappers>
          <SelectOption
            name="reportInterval"
            placeholder="Please select"
            label={"Report Interval"}
            id="reportInterval"
            options={mlsReportIntervalType}

            // wrapperClassName="mb-1"
          />
          <InputText
            name="reportDayOfMmonth"
            placeholder="Please enter ..."
            label={"Report day of month"}
            id="reportDayOfMmonth"
            // wrapperClassName="mb-1"
          />
        </RowWrappers>
      </ChildForm>

      <NavItem className="dropdown-divider mt-0"></NavItem>

      <ChildForm
        headerIcon={<AtSign size={12} color="white" />}
        headerTitle="Contact Information"
        className="p-1 pb-0"
      >
        <RowWrappers>
          <InputText
            name="website"
            placeholder="Please enter Address ..."
            label={"Website Address"}
            id="website"
            // wrapperClassName="mb-1"
          />
          <InputText
            name="contact_number"
            placeholder="Please enter Number..."
            label={"Contact Number"}
            id="contact_number"
            // wrapperClassName="mb-1"
            // options={{ phone: true, phoneRegionCode: "US" }}
          />
        </RowWrappers>

        <RowWrappers>
          <InputText
            name="contact_email"
            placeholder="Please enter Email..."
            label={"Contact Email"}
            id="contact_email"
            // wrapperClassName="mb-1"
          />
          <InputText
            name="contact_ticket"
            placeholder="Please enter ..."
            label={"Contact Ticket"}
            id="contact_ticket"
            // type="number"
            // wrapperClassName="mb-1"
          />
        </RowWrappers>

        <RowWrappers>
          <InputText
            name="contact_person1"
            placeholder="Please enter info ..."
            label={"Contact Person 1"}
            id="contact_person1"
            // wrapperClassName="mb-1"
            // type="number"
            type="text"
            // options={{ phone: true, phoneRegionCode: "US" }}
          />
          <InputText
            name="contact_person2"
            placeholder="Please enter info ..."
            label={"Contact Person 2"}
            id="contact_person2"
            // wrapperClassName="mb-1"
            // options={{ phone: true, phoneRegionCode: "US" }}
          />
        </RowWrappers>
      </ChildForm>
    </Nav>
  );
};

export { MainMlsForm };
