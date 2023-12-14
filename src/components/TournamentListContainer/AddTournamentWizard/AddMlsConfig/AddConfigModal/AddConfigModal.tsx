import React, { FC, useState, useEffect } from "react";
import { Modal } from "@src/components/common/Modal";
import { FormWrapper } from "@src/components/common/form/FormWrapper";
import { SubmitButton } from "@src/components/common/form/common/SubmitButton";
import { FormikProps } from "formik";
import { InputText } from "@src/components/common/form/common/InputText";
import { MapPin } from "react-feather";
import { Nav, Row, Col } from "reactstrap";
import { ChildForm } from "@src/components/common/ChildForm/ChildForm";
import { addMlsConfigValidation } from "@src/core/validations/mls.validation";
import {
  useAddMlsConfig,
  useEditMlsAccess,
  useEditMlsConfig,
} from "@src/core/services/api/mls/mls.api";
import { TAddMlsConfig } from "@src/core/services/api/mls/type";
import { useParams } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { handleRefresh } from "@src/redux/refresh";
import { SwitchBox } from "@src/components/common/form/common/SwitchBox/SwitchBox";

interface IAddConfigModalProp {
  isOpen: boolean;
  onToggle: () => void;
  onAddData?: (data: any) => void;
  editCellData: any;
  setEditCellData: any;
}
const AddConfigModal: FC<IAddConfigModalProp> = ({
  isOpen,
  onToggle,
  editCellData,
  setEditCellData,
}): JSX.Element => {
  const { id, mlsId, accessId } = useParams();
  const [initialValues, setInitialValues] = useState({
    name: "",
    resource: "",
    query: "",
    limit: "",
    uniqField: "",
    photoTimeStamp: "",
    updateInterval: "",
    status: false,
  });

  useEffect(() => {
    if (editCellData)
      setInitialValues((old) => ({
        ...old,
        ...editCellData,
        uniqField: editCellData.unique_field,
        photoTimeStamp: editCellData.photo_time_stamp_field,
        updateInterval: editCellData.update_interval,
      }));
    else
      setInitialValues({
        name: "",
        resource: "",
        query: "",
        limit: "",
        uniqField: "",
        photoTimeStamp: "",
        updateInterval: "",
        status: false,
      });
  }, [editCellData]);

  const addConfig = useAddMlsConfig();
  const editConfig = useEditMlsConfig();
  const editAccess = useEditMlsAccess();

  // const dispatch = useDispatch();

  const onSubmit = (values: any, { resetForm }: any) => {
    console.log(values);

    let obj: TAddMlsConfig | any = {
      entity: "mls_config",
      data: {
        limit: +values.limit,
        unique_field: values.uniqField,
        mls_id: mlsId ? +mlsId : id ? +id : 0,
        name: values.name,
        photo_time_stamp_field: values.photoTimeStamp,
        query: values.query,
        resource: values.resource,
        update_interval: +values.updateInterval,
        status: values.status,
      },
    };

    if (editCellData) obj.data["id"] = editCellData.id;

    if (editCellData)
      editConfig.mutate(obj, {
        onSuccess: (res) => {
          if (res.data.is_success) {
            setEditCellData(undefined);
            // dispatch(handleRefresh("mlsConfig"));
            onToggle();
          }
        },
      });
    else
      addConfig.mutate(obj, {
        onSuccess: (res) => {
          if (res.data.is_success) {
            if (mlsId) {
              editAccess.mutate(
                {
                  entity: "mls_access",
                  data: {
                    id: accessId ? +accessId : 0,
                    mls_config_id: res.data.result.id,
                  },
                },
                {
                  onSuccess: (res) => {
                    if (res.data.is_success) {
                      setEditCellData(undefined);
                      // dispatch(handleRefresh("mlsConfig"));
                      resetForm();
                      onToggle();
                    }
                  },
                }
              );
            } else {
              setEditCellData(undefined);
              // dispatch(handleRefresh("mlsConfig"));
              resetForm();
              onToggle();
            }
          }
        },
      });
    // onAddData({ ...values, status: 2, id: data.length + 1 });
    // resetForm();
    // setEditCellData(undefined);
  };

  return (
    <FormWrapper
      initialValues={initialValues}
      onSubmit={onSubmit}
      enableReinitialize
      validationSchema={addMlsConfigValidation}
    >
      {({ values, handleSubmit, resetForm }: FormikProps<any>) => (
        <Modal
          // size="sm"
          isOpen={isOpen}
          onToggle={() => {
            setInitialValues({
              name: "",
              resource: "",
              query: "",
              limit: "",
              uniqField: "",
              photoTimeStamp: "",
              updateInterval: "",
              status: false,
            });
            onToggle();
          }}
          unmountOnClose
          modalTitle="Add Config"
          bodyClassName="overflow-visible pb-2"
        >
          {{
            main: (
              <>
                <InputText
                  name="name"
                  placeholder="Please enter Name ..."
                  label={"Name"}
                  id="name"
                  // wrapperClassName="mb-1"
                />

                <Nav vertical className="mt-2">
                  <ChildForm
                    headerIcon={<MapPin size={12} color="white" />}
                    headerTitle="Configs"
                    className="p-0"
                  >
                    <InputText
                      name="resource"
                      placeholder="Please enter ..."
                      label={"Resource"}
                      id="resource"
                      wrapperClassName="mb-1"
                      // wrapperClassName="mb-1"
                    />
                    <InputText
                      name="query"
                      placeholder="Please enter ..."
                      label={"Query"}
                      id="query"
                      type="textarea"
                      wrapperClassName="mb-1"
                      // wrapperClassName="mb-1"
                    />

                    <Row>
                      <Col sm="6">
                        <InputText
                          name="limit"
                          placeholder="Please enter number ..."
                          label={"Limit"}
                          id="limit"
                          wrapperClassName="mb-1"
                          // wrapperClassName="mb-1"
                        />
                      </Col>
                      <Col sm="6">
                        <InputText
                          name="uniqField"
                          placeholder="Please enter ..."
                          label={"Unique Field"}
                          id="uniqField"
                          wrapperClassName="mb-1"
                          // wrapperClassName="mb-1"
                        />
                      </Col>
                    </Row>

                    <Row>
                      <Col sm="6">
                        <InputText
                          name="updateInterval"
                          placeholder="Please enter number ..."
                          label={"Update Interval"}
                          id="updateInterval"
                          wrapperClassName="mb-1"
                        />
                      </Col>
                      <Col sm="6">
                        <InputText
                          name="photoTimeStamp"
                          placeholder="Please enter ..."
                          label={"Photo Time Stamp"}
                          id="photoTimeStamp"
                          wrapperClassName="mb-1"
                        />
                      </Col>
                    </Row>

                    <SwitchBox name="status" color="success" defaultChecked>
                      Status
                    </SwitchBox>
                  </ChildForm>
                </Nav>
              </>
            ),
            footer: (
              <SubmitButton
                type="submit"
                color="primary"
                outline
                className="btn-next w-25"
                onClick={handleSubmit}
                isLoading={
                  addConfig.isLoading ||
                  editConfig.isLoading ||
                  editAccess.isLoading
                }
                schema={addMlsConfigValidation}
              >
                <span className={"align-middle d-sm-inline-block"}>Save</span>
              </SubmitButton>
            ),
          }}
        </Modal>
      )}
    </FormWrapper>
  );
};

export { AddConfigModal };
