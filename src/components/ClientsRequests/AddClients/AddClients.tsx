// ** React Imports
import { FC, useEffect, useRef, useState } from "react";

import { DatePicker } from "@src/components/common/form/common/DatePicker/DatePicker";
import { InputText } from "@src/components/common/form/common/InputText";
import { SelectOption } from "@src/components/common/form/common/SelectOption";
import { FormWrapper } from "@src/components/common/form/FormWrapper";
import { RowWrappers } from "@src/components/common/RowWrappers";
import { requestAgentTypes, requestStatus } from "@src/core/data/mls.data";
import {
  useEditClientRequest,
  useGetClientRequestDetail,
  useGetMlsList,
} from "@src/core/services/api/mls/mls.api";
import {
  TAddRequest,
  TEditRequest,
  TGetMlsList,
} from "@src/core/services/api/mls/type";
import { useGetPlatform } from "@src/core/services/api/platform/platform.api";
import { TGetPlatformList } from "@src/core/services/api/platform/type";
import { getCustomDate } from "@src/core/utils/date-helper.utils";
import { addClientRequestValidation } from "@src/core/validations/mls.validation";
import { useNavigate, useParams } from "react-router-dom";
import { ExtraDataList } from "./ExtraDataList";
import { FormWrapper as Wrapper } from "./FormWrapper";
import { LoadingData } from "@src/components/common/LoadingData/LoadingData";

const AddClients: FC = (): JSX.Element => {
  const { id } = useParams();

  const [initialValues, setInitialValues] = useState<any>({
    status: null,
    aggrementStartDate: "",
    ticketNumber: "",
    mlsAccess: null,
    platform: null,
    agentType: null,
    agentName: "",
    agentMlsId: "",
    agentEmail: "",
    agentWebsite: "",
    brokerName: "",
    brokerMlsId: "",
    brokerEmail: "",
    officeName: "",
    officeMlsId: "",
    clientSource: "",
    comments: "",
  });
  const [platformInputChange, setPlatformInputChange] = useState<string>("");
  const [platformFilterList, setPlatformFilterList] =
    useState<TGetPlatformList>({
      entity: "platform",
      data: {
        list_filter: {
          limit: 40,
          offset: 0,
        },
      },
    });
  const [mlsAccessSearch, setMlsAccessSearch] = useState<TGetMlsList>({
    entity: "mls_access",
    data: {
      list_filter: {
        limit: 500,
        offset: 0,
        // filters: [{ field: "name", operator: "like", value: "" }],
      },
    },
  });
  const [mlsAccessOption, setMlsAccessOption] = useState<any>([]);
  const [platformOption, setPlatformOption] = useState<any>([]);
  const [hanlderName, setHanlderName] = useState<any>("");

  const getMlsAccessList = useGetMlsList();
  const getPlatformList = useGetPlatform();

  const getRequestDetail = useGetClientRequestDetail();

  useEffect(() => {
    getRequestDetail.mutate(
      {
        entity: "mls_access_customer_request",
        data: { id: id ? +id : 0 },
      },
      {
        onSuccess: (res) => {
          console.log(res.data);
          if (res.data.is_success) {
            const result = res.data.result;

            setInitialValues((old: any) => ({
              ...old,
              agentEmail: result.agent_email,
              agentMlsId: result.agent_mls_id,
              agentName: result.agent_name,
              agentType: result.agent_type
                ? { value: result.agent_type, label: result.agent_type }
                : null,
              agentWebsite: result.agent_website,
              aggrementStartDate: result.aggrement_start_date
                ? getCustomDate(result.aggrement_start_date)
                : "",
              brokerEmail: result.broker_email,
              brokerMlsId: result.broker_mls_id,
              brokerName: result.broker_name,
              clientSource: result.client_source,
              comments: result.comments,
              mlsAccess: result.mls_access_id
                ? { value: result.mls_access_id, label: result.mls_access_id }
                : null,
              officeMlsId: result.office_mls_id,
              officeName: result.office_name,
              platform: result.platform_id
                ? { value: result.platform_id, label: "" }
                : null,
              status: result.status
                ? { value: result.status, label: result.status }
                : null,
              ticketNumber: result.ticket_number,
              handler: {
                id: result?.handler_id,
                first_name: result?.handler_name,
                last_name: "",
              },
            }));
          }
        },
      }
    );
  }, []);

  useEffect(() => {
    getMlsAccessList.mutate(mlsAccessSearch);
    getPlatformList.mutate(platformFilterList);
  }, []);

  // load mls access
  useEffect(() => {
    if (getMlsAccessList.isSuccess) {
      let result = getMlsAccessList.data.data.result;
      if (result && !Array.isArray(result)) result = [result];
      if (result)
        setMlsAccessOption(
          result.map((o: any) => ({ value: o.id, label: o.id }))
        );
      else setMlsAccessOption([]);
    }
  }, [getMlsAccessList.isSuccess]);

  // load platform
  useEffect(() => {
    if (getPlatformList.isSuccess) {
      let result = getPlatformList.data.data.result;
      if (result && !Array.isArray(result)) result = [result];
      if (result)
        setPlatformOption(
          result.map((o: any) => ({ value: o.id, label: o.name }))
        );
      else setPlatformOption([]);
    }
  }, [getPlatformList.isSuccess]);

  const searchRef = useRef<any>();

  const handleFilterPlatform = (val: string) => {
    setPlatformInputChange(val);
    if (val !== platformInputChange) {
      clearTimeout(searchRef.current);

      const timeOut = setTimeout(() => {
        const obj: any = {
          entity: "platform",
          data: {
            list_filter: {
              limit: 40,
              offset: 0,
              filters: [
                { field: "name", operator: "like", value: val },
                "or",
                { field: "username", operator: "like", value: val },
              ],
            },
          },
        };

        setPlatformFilterList(obj);
        getPlatformList.mutate(obj, {
          onSuccess: (res) => {
            if (res.data.is_success) {
              let result = res.data.result;
              if (result && !Array.isArray(result)) result = [result];
              setPlatformOption((old: any) => [
                ...result.map((o: any, index: number) => ({
                  value: o.id,
                  label: o.name,
                })),
              ]);
              if (result.length === 10) setPlatformOption([]);
            } else {
              setPlatformOption([]);
            }
          },
          onError: (err: any) => setPlatformOption([]),
        });
      }, 500);

      searchRef.current = timeOut;
    }
  };

  const editRequest = useEditClientRequest();

  const navigate = useNavigate();

  const onSubmit = (values: any) => {
    console.log(values);
    const obj: TEditRequest = {
      entity: "mls_access_customer_request",
      data: {
        id: id ? +id : 0,
        status: values.status ? values.status.value : "",
        agent_email: values.agentEmail,
        agent_mls_id: values.agentMlsId,
        agent_name: values.agentName,
        agent_type: values.agentType ? values.agentType.value : undefined,
        agent_website: values.agentWebsite,
        aggrement_start_date: values.aggrementStartDate,
        broker_email: values.brokerEmail,
        broker_mls_id: values.brokerMlsId,
        broker_name: values.brokerName,
        client_source: values.clientSource,
        comments: values.comments,
        mls_access_id: values.mlsAccess ? values.mlsAccess.value : null,
        office_mls_id: values.officeMlsId,
        office_name: values.officeName,
        platform_id: values.platform ? values.platform.value : null,
        ticket_number: values.ticketNumber,
        handler_id: values?.handler?.id,
      },
    };

    editRequest.mutate(obj, {
      onSuccess: (res) => {
        if (res.data.is_success) {
          navigate("/alerts");
        }
      },
    });
    // addRequest.mutate();
  };

  return (
    <FormWrapper
      initialValues={initialValues}
      onSubmit={onSubmit}
      // validationSchema={addClientRequestValidation}
      enableReinitialize
    >
      <Wrapper
        title="Edit Client Request form"
        handlerName={hanlderName}
        isLoading={editRequest.isLoading}
      >
        <span className="fs-6 fw-bolder text-primary mt-1 d-block">
          Request Info
        </span>
        {getRequestDetail.isLoading ? (
          <LoadingData wrapperStyle="py-5 my-4" />
        ) : (
          <>
            <RowWrappers sm={6} md={4}>
              <SelectOption
                name="status"
                placeholder="Please select"
                label={"Status"}
                id="status"
                options={requestStatus}
              />
            </RowWrappers>

            <RowWrappers sm={6} md={4}>
              <DatePicker
                name="aggrementStartDate"
                label="Aggrement Start Date"
                id="aggrementStartDate"
                placeholder="Please select a date"
              />

              <InputText
                name="ticketNumber"
                placeholder="Please enter ..."
                label={"Ticket Number"}
                id="ticketNumber"
                // wrapperClassName="mb-1"
              />
            </RowWrappers>

            <RowWrappers sm={6} md={4}>
              <SelectOption
                name="mlsAccess"
                placeholder="Please select"
                label={"MLS Access"}
                id="mlsAccess"
                options={mlsAccessOption}
                isLoading={getMlsAccessList.isLoading}
                // wrapperClassName="mb-1"
              />
              <SelectOption
                name="platform"
                placeholder="Please select"
                label={"Platform"}
                id="platform"
                options={platformOption}
                onInputChange={handleFilterPlatform}
                noFilter
                isLoading={getPlatformList.isLoading}
                // wrapperClassName="mb-1"
              />
            </RowWrappers>

            <RowWrappers sm={6} md={4}>
              <SelectOption
                name="agentType"
                placeholder="Please select"
                label={"Agent Type"}
                id="agentType"
                options={requestAgentTypes}
                // wrapperClassName="mb-1"
              />
            </RowWrappers>

            <RowWrappers sm={6} md={4}>
              <InputText
                name="agentName"
                placeholder="Please enter Name"
                label={"Agent Name"}
                id="agentName"
                // wrapperClassName="mb-1"
              />
              <InputText
                name="agentMlsId"
                placeholder="Please enter ID"
                label={"Agent MLS ID"}
                id="agentMlsId"
                // wrapperClassName="mb-1"
              />
            </RowWrappers>

            <RowWrappers sm={6} md={4}>
              <InputText
                name="agentEmail"
                placeholder="Please enter Email"
                label={"Agent Email"}
                id="agentEmail"
                // wrapperClassName="mb-1"
              />
              <InputText
                name="agentWebsite"
                placeholder="Please enter the Website Address"
                label={"Agent Website"}
                id="agentWebsite"
                // wrapperClassName="mb-1"
              />
            </RowWrappers>

            <RowWrappers sm={6} md={4}>
              <InputText
                name="brokerName"
                placeholder="Please enter Name"
                label={"Broker Name"}
                id="brokerName"
                // wrapperClassName="mb-1"
              />
              <InputText
                name="brokerMlsId"
                placeholder="Please enter ID"
                label={"Broker MLS ID"}
                id="brokerMlsId"
                // wrapperClassName="mb-1"
              />
            </RowWrappers>

            <RowWrappers sm={6} md={4}>
              <InputText
                name="brokerEmail"
                placeholder="Please enter Email"
                label={"Broker Email"}
                id="brokerEmail"
                // wrapperClassName="mb-1"
              />
            </RowWrappers>

            <RowWrappers sm={6} md={4}>
              <InputText
                name="officeName"
                placeholder="Please enter Name"
                label={"Office Name"}
                id="officeName"
                // wrapperClassName="mb-1"
              />
              <InputText
                name="officeMlsId"
                placeholder="Please enter ID"
                label={"Office MLS ID"}
                id="officeMlsId"
                // wrapperClassName="mb-1"
              />
            </RowWrappers>
            <RowWrappers sm={6} md={4}>
              <InputText
                name="clientSource"
                placeholder="Please enter ..."
                label={"Client Source"}
                id="clientSource"
                // wrapperClassName="mb-1"
              />
            </RowWrappers>

            <RowWrappers sm={12} md={8}>
              <InputText
                name="comments"
                placeholder="Please add comments ..."
                type="textarea"
                label={"Comments"}
                id="comments"
                // wrapperClassName="mb-1"
              />
            </RowWrappers>

            <ExtraDataList />
          </>
        )}
      </Wrapper>
    </FormWrapper>
  );
};

export { AddClients };
