import { ListTable } from "@src/components/common/ListTable/ListTable";
import { RowWrappers } from "@src/components/common/RowWrappers/RowWrappers";
import { useGetPlatformCredential } from "@src/core/services/api/platform/platform.api";
import { TGetPlatformList } from "@src/core/services/api/platform/type";
import { RootState } from "@src/redux/store";
import React, { FC, useEffect, useState } from "react";
import { MapPin } from "react-feather";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { AddCredentialModal } from "../AddCredentialModal/AddCredentialModal";
import { columns } from "../data";
import { FormStepsWrapper } from "../FormStepsWrapper";
import { FormWrapper } from "@src/components/common/form/FormWrapper/FormWrapper";

const listItems = [
  { value: 1, label: "IDX/RETS" },
  { value: 2, label: "IDX/RESO_WEB_API" },
  { value: 3, label: "IDX_PLUS/RETS" },
  { value: 4, label: "IDX_PLUS/RESO_WEB_API" },
  { value: 5, label: "VOW/RETS" },
  { value: 6, label: "VOW/RESO_WEB_API" },
  { value: 7, label: "IDX" },
  { value: 8, label: "IDX_PLUS" },
  { value: 9, label: "VOW" },
  { value: 10, label: "RETS" },
  { value: 11, label: "ALL/ALL" },
  { value: 12, label: "--/RESO_WEB_API" },
  { value: 13, label: "ALL Feed Type" },
  { value: 14, label: "ALL Connection Type" },
];

interface IAddPlatformCredentialProp {
  stepper: any;
}

const AddPlatformCredential: FC<IAddPlatformCredentialProp> = ({
  stepper,
}): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const isEdit = location.pathname.includes("edit");
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [filterList, setFilterList] = useState<TGetPlatformList>({
    entity: "platform_credential",
    data: {
      list_filter: {
        limit: 10,
        offset: 0,
        filters: [
          { field: "platform_id", operator: "=", value: id ? +id : "" },
        ],
      },
    },
  });

  const navigate = useNavigate();

  const { platformCredential } = useSelector(
    (state: RootState) => state.refresh
  );

  const getList = useGetPlatformCredential();

  useEffect(() => {
    if (!isOpen && id) getList.mutate(filterList);
  }, [isOpen, platformCredential]);

  useEffect(() => {
    if (getList.isSuccess) {
      let result = getList.data.data.result;
      console.log(result);
      if (result && !Array.isArray(result)) result = [result];
      console.log(result);
      setData(
        result
          ? result.map((item: any, index: number) => ({
              ...item,
              row_id: index + 1,
              feedTypeConnection:
                item &&
                listItems.find(
                  (i) => i.value === item.feed_type_connection_type_id
                )?.label,
            }))
          : []
      );
    }
  }, [getList.isSuccess]);

  return (
    <FormStepsWrapper
      stepName={isEdit ? "Platform Credential" : "Add Platform Credential"}
      stepNum={2}
      stepper={stepper}
      hasPrev
      nextLabel="Finish"
      hasNext
      onNextStep={() => navigate("/platforms")}
      lastStep
      //   isLoading={createPlatform.isLoading}
    >
      {{
        Wrapper: (props: any) => (
          <FormWrapper initialValues={{}} onSubmit={() => {}}>
            {props.children}
          </FormWrapper>
        ),
        body: (
          <>
            <RowWrappers xxl={12} xl={12} md={12} sm={12}>
              <ListTable
                columns={columns}
                data={data}
                headerTitle={
                  <div className="d-flex align-items-center me-1">
                    <span
                      className="rounded-1 bg-primary d-flex justify-content-center align-items-center"
                      style={{ width: 20, height: 20 }}
                    >
                      <MapPin size={14} color="white" />
                    </span>

                    <span className="text-darker h5 mb-0 ms-1 fw-bolder">
                      Platform Credential
                    </span>
                  </div>
                }
                addBtnText="Add Credential"
                noReload
                isLoading={getList.isLoading}
                noSearch
                onAddBtn={() => setIsOpen((old) => !old)}
              />
            </RowWrappers>
            {isOpen && (
              <AddCredentialModal
                isOpen={isOpen}
                onToggle={() => setIsOpen((old) => !old)}
              />
            )}
          </>
        ),
      }}
    </FormStepsWrapper>
  );
};

export default AddPlatformCredential;
