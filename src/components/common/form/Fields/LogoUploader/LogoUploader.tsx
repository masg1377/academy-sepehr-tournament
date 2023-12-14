import React, { FC, useRef, useState } from "react";
import { Button, Label } from "reactstrap";
import { RippleButton } from "@src/components/common/ripple-button";
import { useFormikContext } from "formik";
import { useFileUploader } from "@src/core/services/api/file/file.api";
import { SubmitButton } from "../../common/SubmitButton/SubmitButton";
import { ErrorMessage } from "formik";
import { CropUploaderModal } from "./CropUploaderModal/CropUploaderModal";
import { getCustomDate } from "@src/core/utils/date-helper.utils";
import toast from "react-hot-toast";
import Atten from "@src/assets/images/icons/atten2.png";

interface ILogoUploaderProp {
  label?: string;
  id?: string;
  name: string;
  buttonLabel?: string;
  mode?: string;
  wrapperClassName?: string;
  customImage?: string;
  square?: boolean;
  fileFormat?: string;
  fileSize?: string;
}

const LogoUploader: FC<ILogoUploaderProp> = ({
  label,
  id,
  name,
  buttonLabel,
  wrapperClassName,
  mode,
  customImage,
  square,
  fileFormat,
  fileSize,
}): JSX.Element => {
  const ref = useRef<any>();
  const { values, setFieldValue } = useFormikContext<any>();
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [modalCrop, setModalCrop] = useState<boolean>(false);

  const upload = useFileUploader();

  const onUploadFile = (file: File, isOther: boolean) => {
    const formData = new FormData();

    // const newRandomeName = Math.floor(Math.random() * 1000000);
    // const input = event.currentTarget;
    // const previousFile = input.files[0];
    //@ts-ignore
    // const newFile = new File([previousFile], newRandomeName);

    // const dT = new DataTransfer();
    // dT.items.add(newFile);
    // input.files = dT.files;
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
        onSuccess: (val) => {
          //@ts-ignore
          const path = val.data?.result[0]?.path;
          setFieldValue(name, path);
          setSelectedImage(file);
          setModalCrop(false);
        },
        onError: () => {
          toast.error("Somthing went wrong! Please try again");
          setFieldValue(name, null);
          setSelectedImage(null);
          setModalCrop(false);
        },
      }
    );

    // const formData = new FormData();
    // formData.append("file", file);
    // formData.append("file_name", file.name);
    // formData.append("operation", "create");
    // formData.append("uploader_type", "user");

    // upload.mutate(
    //   { data: formData },
    //   {
    //     onSuccess: (val) => {
    //       //@ts-ignore
    //       const path = val.data.path;
    //       setFieldValue(name, path);
    //       setSelectedImage(file);
    //     },
    //   }
    // );
  };

  const openModal = (file: File): void => {
    if (file.type.includes("image")) {
      setModalCrop(true);
      setSelectedImage(file);
    } else onUploadFile(file, true);
  };

  return (
    <>
      {modalCrop && (
        <CropUploaderModal
          isOpen={modalCrop}
          onToggle={() => setModalCrop(false)}
          onUpload={onUploadFile}
          image={selectedImage}
          setImage={setSelectedImage}
          uploadLoading={upload.isLoading}
          // square={square}
        />
      )}
      <div className={wrapperClassName ? wrapperClassName : "pt-1 pb-1"}>
        {label && (
          <Label
            className="form-label d-block fs-6 fw-bold text-black"
            for={id}
          >
            {label}
          </Label>
        )}
        <input
          type="file"
          id={id}
          ref={(r) => (ref.current = r)}
          accept="image/*"
          onChange={(e) =>
            e.target.files && e.target.files.length > 0
              ? openModal(e.target.files[0]) //onUploadFile(e.target.files[0], e)
              : {}
          }
          className="d-none"
        />
        {values[name] || customImage || selectedImage ? (
          <div>
            {((mode && mode === "one") || !mode) && (
              <img
                src={
                  (selectedImage && URL.createObjectURL(selectedImage)) ||
                  values[name] ||
                  customImage
                }
                alt="logo"
                style={{ width: 50 }}
                onClick={() => ref.current.click()}
              />
            )}
            {mode && mode === "two" && (
              <>
                <img
                  src={
                    (selectedImage && URL.createObjectURL(selectedImage)) ||
                    values[name] ||
                    customImage
                  }
                  alt="logo"
                  style={{ width: 50 }}
                  className={"CUstomeImageLogoUploader"}
                />
                <Button
                  style={{ borderColor: "blue" }}
                  className="ms-2 text-primary"
                  color="white"
                  onClick={() => ref.current.click()}
                >
                  Change
                </Button>
              </>
            )}
            {mode && mode === "three" && (
              <>
                <img
                  src={
                    (selectedImage && URL.createObjectURL(selectedImage)) ||
                    values[name] ||
                    customImage
                  }
                  alt="logo"
                  style={{
                    width: "150px",
                    borderRadius: "7px",
                    display: "block",
                    margin: "30px auto",
                  }}
                  className={"mb-2 mt-2"}
                />
                <Button
                  style={{ borderColor: "blue" }}
                  className="ms-2 text-primary"
                  color="white"
                  onClick={() => ref.current.click()}
                >
                  Change
                </Button>
              </>
            )}

            <RippleButton
              type="button"
              className={`${mode === "two" ? "ms-0" : "ms-1"} text-secondary`}
              color="link"
              onClick={() => {
                setFieldValue(name, null);
                ref.current.value = null;
                setSelectedImage(null);
              }}
            >
              Remove
            </RippleButton>
          </div>
        ) : (
          <SubmitButton
            type="button"
            color="primary"
            className="bg-blue"
            onClick={() => ref.current.click()}
            isLoading={upload.isLoading}
          >
            {buttonLabel ? buttonLabel : "Upload"}
          </SubmitButton>
        )}
      </div>

      {fileFormat && fileSize && (
        <div className="d-flex gap-1 align-items-center">
          <img src={Atten} alt="Upload" style={{ width: 14, height: 14 }} />
          <span className="fs-7 text-darker">
            File formats: {fileFormat} (max size: up to {fileSize})
          </span>
        </div>
      )}

      <ErrorMessage
        name={name}
        render={(msg) => {
          // console.log(name, msg);
          return <span className="text-error-form fs-8">{msg}</span>;
        }}
      />
    </>
  );
};

export { LogoUploader };
