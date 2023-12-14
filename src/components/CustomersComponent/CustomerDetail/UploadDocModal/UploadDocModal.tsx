import React, { FC, useEffect, useState } from "react";
import { Modal } from "@src/components/common/Modal";
import { FormWrapper } from "@src/components/common/form/FormWrapper";
import { FormikProps } from "formik";
import { InputText } from "@src/components/common/form/common/InputText";
import { DropZone } from "@src/components/common/form/common/DropZone/DropZone";
import { SubmitButton } from "@src/components/common/form/common/SubmitButton";
import { SelectOption } from "@src/components/common/form/common/SelectOption";
import { requestDocumentStatuses } from "@src/core/data/mls.data";
import {
  addClientRequestDocValidation,
  editClientRequestDocValidation,
} from "@src/core/validations/mls.validation";
import {
  useAddClientRequestDoc,
  useEditClientRequestDoc,
} from "@src/core/services/api/mls/mls.api";
import {
  TCreateRequestDocument,
  TEditRequestDocument,
} from "@src/core/services/api/mls/type";
import { useParams } from "react-router-dom";
import { useFileUploader } from "@src/core/services/api/file/file.api";
import { getCustomDate } from "@src/core/utils/date-helper.utils";

interface IUploadDocModalProp {
  isOpen: boolean;
  onToggle: () => void;
  setReloadDoc: (val: any) => void;
  selectedData: any;
  requestData?: any;
}

const UploadDocModal: FC<IUploadDocModalProp> = ({
  isOpen,
  onToggle,
  setReloadDoc,
  selectedData,
  requestData,
}): JSX.Element => {
  const { id } = useParams();
  const [allRequests, setAllRequests] = useState<any>([]);
  const [initialValues, setInitialValues] = useState<any>({
    fileName: "",
    file: null,
    note: "",
    status: null,
    request_id: null,
  });

  const addDoc = useAddClientRequestDoc();
  const editDoc = useEditClientRequestDoc();
  const upload = useFileUploader();

  useEffect(() => {
    if (!selectedData)
      setAllRequests(
        requestData.map((item: any, index: number) => ({
          value: item.id,
          label: item.mls_name,
        }))
      );
  }, [requestData]);

  useEffect(() => {
    if (selectedData) {
      setInitialValues({
        fileName: selectedData.name,
        file: null,
        note: selectedData.note,
        status: requestDocumentStatuses.find(
          (o) => o.value === selectedData.status
        ),
      });
    }
  }, [selectedData]);

  console.log(selectedData);

  const onSubmit = (values: any) => {
    if (selectedData && selectedData.id) {
      if (values.file && values.file.length > 0) {
        const formData = new FormData();

        const newFileName =
          Math.floor(Math.random() * 10000) +
          getCustomDate(new Date().toISOString()) +
          "." +
          values.file[0].name?.split(".").pop();

        const file = new File(values.file, newFileName);

        formData.append("file", file);
        // formData.append(
        //   "file_name",
        //   Math.floor(Math.random() * 10000) +
        //     getCustomDate(new Date().toISOString()) +
        //     "." +
        //     values.file[0].name.split(".").pop()
        // );
        formData.append("operation", "create");
        formData.append("uploader_type", "user");

        upload.mutate(
          { data: formData },
          {
            onSuccess: (val) => {
              if (val.data) {
                //@ts-ignore
                const path = val.data?.result[0]?.path;
                const docObj: TEditRequestDocument = {
                  entity: "mls_access_customer_request_document",
                  data: {
                    name: values.fileName,
                    note: values.note,
                    status: values.status ? values.status.value : "",
                    id: selectedData.id,
                    url: path ? path : undefined,
                  },
                };

                editDoc.mutate(docObj, {
                  onSuccess: (val) => {
                    if (val.data.is_success) {
                      setReloadDoc((old: boolean) => !old);
                      onToggle();
                    }
                  },
                });
              }
            },
          }
        );
      } else {
        let docObj: TEditRequestDocument = {
          entity: "mls_access_customer_request_document",
          data: {
            name: values.fileName,
            note: values.note,
            status: values.status ? values.status.value : "",
            id: selectedData.id,
            url: values.file ? values.file[0] : undefined,
          },
        };
        // if (values.file) docObj.data.url = values.file;

        editDoc.mutate(docObj, {
          onSuccess: (val) => {
            if (val.data.is_success) {
              setReloadDoc((old: boolean) => !old);
              onToggle();
            }
          },
        });
      }
    } else {
      // console.log("yes", values);
      const formData = new FormData();

      const newFileName =
        Math.floor(Math.random() * 10000) +
        getCustomDate(new Date().toISOString()) +
        "." +
        values.file[0].name?.split(".").pop();

      const file = new File(values.file, newFileName);

      formData.append("file", file);
      // formData.append(
      //   "file_name",
      //   Math.floor(Math.random() * 10000) +
      //     getCustomDate(new Date().toISOString()) +
      //     "." +
      //     values.file[0].name.split(".").pop()
      // );
      formData.append("operation", "create");
      formData.append("uploader_type", "user");

      upload.mutate(
        { data: formData },
        {
          onSuccess: (val) => {
            if (val.data) {
              //@ts-ignore
              const path = val.data?.result[0]?.path;
              const docObj: TCreateRequestDocument = {
                entity: "mls_access_customer_request_document",
                data: {
                  //mls_access_customer_request_id: id ? +id : 0,
                  mls_access_customer_request_id: values.request_id.value,
                  name: values.fileName,
                  url: path,
                  note: values.note,
                  status: values.status ? values.status.value : "",
                },
              };

              addDoc.mutate(docObj, {
                onSuccess: (val) => {
                  if (val.data.is_success) {
                    setReloadDoc((old: boolean) => !old);
                    onToggle();
                  }
                },
              });
            }
          },
        }
      );
    }
  };
  return (
    <FormWrapper
      initialValues={initialValues}
      onSubmit={onSubmit}
      enableReinitialize
      validationSchema={
        selectedData
          ? editClientRequestDocValidation
          : addClientRequestDocValidation
      }
    >
      {({ values, submitForm }: FormikProps<any>) => (
        <Modal
          modalTitle={selectedData ? "Edit document" : "Upload document"}
          isOpen={isOpen}
          onToggle={onToggle}
          unmountOnClose
        >
          {{
            main: (
              <>
                <InputText
                  name="fileName"
                  placeholder="Please enter Name"
                  label={"File name"}
                  id="fileName"
                  wrapperClassName="mb-1"
                />
                {!selectedData && (
                  <SelectOption
                    name="request_id"
                    placeholder="Choose request access"
                    label={"Request Access"}
                    id="request_id"
                    options={allRequests}
                    isClearable
                    //customeLabelClass="searchFilterLabelGeneral"
                    //noColor
                    wrapperClassName="mb-2"
                  />
                )}
                <DropZone
                  name="file"
                  accept={{
                    "application/pdf": [".pdf"],
                    "application/msword": [".doc"],
                    "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                      [".docx"],
                    "text/plain": [".txt"],
                    "application/vnd.ms-excel": [".xls"],
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                      [".xlsx"],
                  }}
                  fileFormat="pdf, doc, docx, txt"
                  fileSize="1 GB"
                />

                <InputText
                  name="note"
                  placeholder="Please write the note..."
                  label={"Note"}
                  id="note"
                  wrapperClassName="mb-1"
                  type="textarea"
                />

                <SelectOption
                  name="status"
                  placeholder="Please select"
                  label={"Status"}
                  id="status"
                  options={requestDocumentStatuses}
                  // creative
                  // wrapperClassName="mb-1"
                />
              </>
            ),
            footer: (
              <div className="d-flex justify-content-between">
                <SubmitButton
                  type="button"
                  color="link"
                  disabled={
                    upload.isLoading || addDoc.isLoading || editDoc.isLoading
                  }
                  onClick={onToggle}
                >
                  Cancel
                </SubmitButton>
                <SubmitButton
                  isLoading={
                    upload.isLoading || addDoc.isLoading || editDoc.isLoading
                  }
                  type="submit"
                  disabled={
                    upload.isLoading || addDoc.isLoading || editDoc.isLoading
                  }
                  color="info"
                  onClick={
                    upload.isLoading || addDoc.isLoading || editDoc.isLoading
                      ? () => {}
                      : submitForm
                  }
                >
                  Save
                </SubmitButton>
              </div>
            ),
          }}
        </Modal>
      )}
    </FormWrapper>
  );
};

export { UploadDocModal };
