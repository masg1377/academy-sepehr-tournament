import React, { FC, useState, useEffect } from "react";
import { Modal } from "@src/components/common/Modal";
import { FormWrapper } from "@src/components/common/form/FormWrapper";
import { SubmitButton } from "@src/components/common/form/common/SubmitButton";
import { FormikProps } from "formik";
import { InputText } from "@src/components/common/form/common/InputText";
import { MapPin } from "react-feather";
import { Nav, Row, Col } from "reactstrap";
import { SelectOption } from "@src/components/common/form/common/SelectOption/SelectOption";
import { DropZone } from "@src/components/common/form/common/DropZone/DropZone";
import { mlsDocumentType } from "@src/core/data/mls.data";
import {
  addMlsDocValidation,
  editMlsDocValidation,
} from "@src/core/validations/mls.validation";
import { useFileUploader } from "@src/core/services/api/file/file.api";
import {
  useAddMlsDoc,
  useEditMlsDoc,
} from "@src/core/services/api/mls/mls.api";
import { useParams } from "react-router-dom";
import { urlToObject } from "@src/core/utils/Utils";
import { getCustomDate } from "@src/core/utils/date-helper.utils";

interface IAddConfigModalProp {
  isOpen: boolean;
  onToggle: () => void;
  onAddData: (data: any) => void;
  data: any;
  editCellData: any;
  setEditCellData: any;
}
const AddDocModal: FC<IAddConfigModalProp> = ({
  isOpen,
  onToggle,
  onAddData,
  data,
  editCellData,
  setEditCellData,
}): JSX.Element => {
  const [initialValues, setInitialValues] = useState<any>({
    documentType: null,
    documentName: "",
    file: null,
  });

  const { id } = useParams();

  useEffect(() => {
    (async () => {
      if (editCellData) {
        // const file = await urlToObject(editCellData.url);
        // console.log(file);
        setInitialValues((old: any) => ({
          ...old,
          documentName: editCellData.name,
          documentType: mlsDocumentType.find(
            (o) => o.value === editCellData.document_type
          ),
          file: editCellData.url,
        }));
      } else
        setInitialValues({
          documentType: null,
          documentName: "",
          file: null,
        });
    })();
  }, [editCellData]);

  const upload = useFileUploader();
  const addDoc = useAddMlsDoc();
  const editDoc = useEditMlsDoc();

  const onSubmit = (val: any) => {
    const values = { ...val };
    const formData = new FormData();

    if (values.file) {
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
      //     values.file[0].name?.split(".").pop()
      // );
      formData.append("operation", "create");
      formData.append("uploader_type", "user");
    }

    // ["pdf", "docx", "doc", "txt", ""]

    if (editCellData) {
      editDoc.mutate(
        {
          entity: "mls_document",
          data: {
            id: editCellData.id,
            document_type: values.documentType.value,
            // mls_id: id ? +id : 0,
            name: values.documentName,
            // url: values.file,
          },
        },
        {
          onSuccess: (res) => {
            // resetForm();
            if (res.data.is_success) {
              setEditCellData(undefined);
              onToggle();
            }
          },
        }
      );
    } else
      upload.mutate(
        { data: formData },
        {
          onSuccess: (val) => {
            //@ts-ignore
            const path = val.data?.result[0]?.path;

            addDoc.mutate(
              {
                entity: "mls_document",
                data: {
                  document_type: values.documentType.value,
                  mls_id: id ? +id : 0,
                  name: values.documentName,
                  url: path,
                },
              },
              {
                onSuccess: (res) => {
                  // resetForm();
                  if (res.data.is_success) {
                    setEditCellData(undefined);
                    onToggle();
                  }
                },
              }
            );
          },
        }
      );
  };

  return (
    <FormWrapper
      initialValues={initialValues}
      onSubmit={onSubmit}
      enableReinitialize
      validationSchema={
        editCellData ? editMlsDocValidation : addMlsDocValidation
      }
    >
      {({ submitForm }: FormikProps<any>) => (
        <Modal
          // size="sm"
          isOpen={isOpen}
          onToggle={() => {
            setInitialValues({
              documentType: null,
              documentName: "",
              file: null,
            });
            onToggle();
          }}
          unmountOnClose
          modalTitle="Add Document"
          bodyClassName="overflow-visible pb-2"
        >
          {{
            main: (
              <>
                <SelectOption
                  name="documentType"
                  placeholder="Please select ..."
                  label={"Document Type"}
                  id="documentType"
                  options={mlsDocumentType}
                  wrapperClassName="mb-1"
                />
                <InputText
                  name="documentName"
                  placeholder="Please enter ..."
                  label={"Document Name"}
                  id="documentName"
                  // wrapperClassName="mb-1"
                />
                {!editCellData && (
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
                )}
              </>
            ),
            footer: (
              <SubmitButton
                type={
                  upload.isLoading || addDoc.isLoading ? "button" : "submit"
                }
                color="primary"
                outline
                isLoading={
                  upload.isLoading || addDoc.isLoading || editDoc.isLoading
                }
                className="btn-next w-25"
                schema={
                  editCellData ? editMlsDocValidation : addMlsDocValidation
                }
                // values={}
                onClick={submitForm}
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

export { AddDocModal };
