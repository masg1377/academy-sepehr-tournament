import React, { FC, Fragment, useState, useEffect } from "react";
import { Field, useFormikContext } from "formik";

// ** Reactstrap Imports
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Button,
  ListGroup,
  ListGroupItem,
} from "reactstrap";

// ** Third Party Imports
import { Accept, useDropzone } from "react-dropzone";
import { FileText, X, DownloadCloud } from "react-feather";
// ** Styles
import "@styles/react/libs/file-uploader/file-uploader.scss";
import classNames from "classnames";
import Atten from "@src/assets/images/icons/atten2.png";

interface IDropZoneProp {
  name: string;
  accept?: Accept;
  onChange?: (e: any) => void;
  fileFormat?: string;
  fileSize?: string;
}

const DropZone: FC<IDropZoneProp> = ({
  name,
  accept,
  onChange,
  fileFormat,
  fileSize,
}): JSX.Element => {
  // ** State
  const [files, setFiles] = useState<any>([]);

  const { setFieldValue, values } = useFormikContext<any>();

  useEffect(() => {
    if (values && values[name] && (!files || files.length === 0)) {
      setFiles(values[name]);
    }
  }, [values]);

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: accept,
    onDrop: (acceptedFiles) => {
      setFieldValue(
        name,
        acceptedFiles.map((file) => Object.assign(file))
      );
      setFiles([...acceptedFiles.map((file) => Object.assign(file))]);
      onChange && onChange(acceptedFiles.map((file) => Object.assign(file)));
    },
  });

  const renderFilePreview = (file: any) => {
    if (file.type.startsWith("image")) {
      return (
        <img
          className="rounded"
          alt={file.name}
          src={URL.createObjectURL(file)}
          height="28"
          width="28"
        />
      );
    } else {
      return <FileText size="28" />;
    }
  };

  const handleRemoveFile = (file: any) => {
    const uploadedFiles = files;
    const filtered = uploadedFiles.filter((i: any) => i.name !== file.name);
    setFiles([...filtered]);
    setFieldValue(name, [...filtered]);
  };

  const renderFileSize = (size: number) => {
    if (Math.round(size / 100) / 10 > 1000) {
      return `${(Math.round(size / 100) / 10000).toFixed(1)} mb`;
    } else {
      return `${(Math.round(size / 100) / 10).toFixed(1)} kb`;
    }
  };

  const fileList = files.map((file: any, index: number) => (
    <ListGroupItem
      key={`${file.name}-${index}`}
      className="d-flex align-items-center justify-content-between"
    >
      <div className="file-details d-flex align-items-center">
        <div className="file-preview me-1">{renderFilePreview(file)}</div>
        <div>
          <p className="file-name mb-0">{file.name}</p>
          <p className="file-size mb-0">{renderFileSize(file.size)}</p>
        </div>
      </div>
      <Button
        color="danger"
        outline
        size="sm"
        className="btn-icon"
        onClick={() => handleRemoveFile(file)}
      >
        <X size={14} />
      </Button>
    </ListGroupItem>
  ));

  const handleRemoveAllFiles = () => {
    setFiles([]);
  };

  return (
    <Field name={name}>
      {({
        field,
        meta,
        form: { setFieldValue, setFieldTouched },
      }: {
        form: any;
        field: any;
        meta: any;
      }) => (
        <div className="mt-1">
          <div
            {...getRootProps({
              className: classNames(
                "dropzone",
                meta.error && meta.touched && "border-danger"
              ),
            })}
          >
            <input
              {...getInputProps()}
              // {...(onChange ? { onChange: onChange } : {})}
            />
            <div className="d-flex align-items-center justify-content-center flex-column">
              <DownloadCloud size={50} />
              <h5>Drag and Drop</h5>
              <p className="text-secondary">
                or{" "}
                <a href="/" onClick={(e) => e.preventDefault()}>
                  Browse
                </a>{" "}
                your file to upload
              </p>
            </div>
          </div>

          {fileFormat && fileSize && (
            <div className="d-flex gap-1 align-items-center my-1">
              <img src={Atten} alt="Upload" style={{ width: 14, height: 14 }} />
              <span className="fs-7 text-darker">
                File formats: {fileFormat} (max size: up to {fileSize})
              </span>
            </div>
          )}

          {files.length ? (
            <Fragment>
              <ListGroup className="my-2">{fileList}</ListGroup>
              {/* <div className="d-flex justify-content-end">
            <Button
              className="me-1"
              color="danger"
              outline
              onClick={handleRemoveAllFiles}
            >
              Remove All
            </Button>
            <Button color="primary">Upload Files</Button>
          </div> */}
            </Fragment>
          ) : null}
        </div>
      )}
    </Field>
  );
};

export { DropZone };
