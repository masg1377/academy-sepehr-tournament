import { Modal } from "@src/components/common/Modal/Modal";
import { FormWrapper } from "@src/components/common/form/FormWrapper/FormWrapper";
import { DropZone } from "@src/components/common/form/common/DropZone/DropZone";
import { InputText } from "@src/components/common/form/common/InputText/InputText";
import { SubmitButton } from "@src/components/common/form/common/SubmitButton/SubmitButton";
import { useFileUploader } from "@src/core/services/api/file/file.api";
import {
  useAddEditDocumentToGroup,
  useAddEditLinkToGroup,
} from "@src/core/services/api/group/group.api";
import {
  TAddEditDocumentGroup,
  TAddEditLinkGroup,
} from "@src/core/services/api/group/type";
import { getCustomDate } from "@src/core/utils/date-helper.utils";
import { groupAddEditLinkValidation } from "@src/core/validations/group.validation";
import React, { FC } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

interface IDocAddEditModalProp {
  isOpen: boolean;
  onToggle: () => void;
  selected: any;
}

const DocAddEditModal: FC<IDocAddEditModalProp> = ({
  isOpen,
  onToggle,
  selected,
}): JSX.Element => {
  const { id } = useParams();

  console.log("selected", selected);

  const addEditDoc = useAddEditDocumentToGroup();
  const upload = useFileUploader();

  const onSubmit = (values: any) => {
    console.log(values);
    if (!values?.file?.length) return toast.error("Please select a file");

    if (values?.file[0].path !== selected?.url) {
      const file = values?.file[0];
      const formData = new FormData();
      const newFileName =
        Math.floor(Math.random() * 10000) +
        getCustomDate(new Date().toISOString()) +
        "." +
        file.name?.split(".").pop();

      const file2 = new File([file], newFileName);

      formData.append("file", file2);
      // formData.append(
      //   "file_name",
      //   isOther
      //     ? Math.floor(Math.random() * 10000) +
      //         getCustomDate(new Date().toISOString()) +
      //         "." +
      //         file.name.split(".").pop()
      //     : file.name
      // );
      formData.append("operation", "create");
      formData.append("uploader_type", "user");
      upload.mutate(
        { data: formData },
        {
          onSuccess: (res) => {
            if (res.data.is_success) {
              //@ts-ignore
              const path = res.data?.result[0]?.path;

              const obj: TAddEditDocumentGroup = {
                file_name: values?.fileName,
                category: values?.category,
                doc_url: path,
              };

              addEditDoc.mutate(
                {
                  body: obj,
                  group_id: id ? +id : 0,
                  isEdit: selected ? true : false,
                },
                {
                  onSuccess: (ress) => {
                    if (ress.data.is_success) {
                      toast.success(ress.data.message || "");
                      onToggle();
                    }
                  },
                }
              );
            }
          },
        }
      );
    } else {
      const obj: TAddEditDocumentGroup = {
        file_name: values?.fileName,
        category: values?.category,
        doc_url: selected?.url,
      };

      addEditDoc.mutate(
        {
          body: obj,
          group_id: id ? +id : 0,
          isEdit: selected ? true : false,
        },
        {
          onSuccess: (ress) => {
            if (ress.data.is_success) {
              toast.success(ress.data.message || "");
              onToggle();
            }
          },
        }
      );
    }
  };

  return (
    <FormWrapper
      initialValues={{
        fileName: selected?.name || "",
        file: selected?.url
          ? [
              {
                name: selected?.name,
                type: "text",
                size: 0,
                path: selected?.url,
              },
            ]
          : null,
        category: selected?.category || "",
      }}
      enableReinitialize
      onSubmit={onSubmit}
      // validationSchema={groupAddEditLinkValidation}
    >
      {({ submitForm }) => (
        <Modal isOpen={isOpen} onToggle={onToggle} modalTitle="Add Link">
          {{
            main: (
              <>
                <InputText
                  name="fileName"
                  placeholder="Please enter..."
                  label="File name"
                  wrapperClassName="mb-1"
                  disabled={selected ? true : false}
                />

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
                  name="category"
                  placeholder="Please enter..."
                  label="Category"
                  wrapperClassName="mb-1"
                />
              </>
            ),
            footer: (
              <div className="w-100 d-flex">
                <SubmitButton
                  type="button"
                  onClick={onToggle}
                  color="link"
                  className="flex-1"
                  disabled={addEditDoc.isLoading || upload.isLoading}
                >
                  Cancel
                </SubmitButton>
                <SubmitButton
                  type="submit"
                  onClick={submitForm}
                  color="info"
                  className="flex-1"
                  isLoading={addEditDoc.isLoading || upload.isLoading}
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

export { DocAddEditModal };
