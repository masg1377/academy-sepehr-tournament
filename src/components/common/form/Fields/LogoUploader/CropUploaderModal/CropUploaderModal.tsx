import { Modal } from "@src/components/common/Modal/Modal";
import { getCustomDate } from "@src/core/utils/date-helper.utils";
import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import Cropper from "react-easy-crop";
import toast from "react-hot-toast";
import { SubmitButton } from "../../../common/SubmitButton/SubmitButton";
import getCroppedImg from "./CropImage";
import ReactCrop, {
  centerCrop,
  Crop,
  makeAspectCrop,
  PixelCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { useDebounceEffect } from "./UseDebounceEffect";
import { canvasPreview } from "./canvasPreview";
import { formatBytes, IsSameUrl } from "@src/core/utils/Utils";

function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

interface ICropUploaderModalProp {
  isOpen: boolean;
  onToggle: () => void;
  onUpload: any;
  image: any;
  setImage: (file: File | null) => void;
  uploadLoading: boolean;
  square?: boolean;
}

const CropUploaderModal: FC<ICropUploaderModalProp> = ({
  isOpen,
  onToggle,
  onUpload,
  image,
  setImage,
  uploadLoading,
  square,
}): JSX.Element => {
  const [showSquare, setShowSquare] = useState<boolean>(false);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [croppedImage, setCroppedImage] = useState<any>();
  const [isCropping, setIsCropping] = useState<boolean>(false);

  useEffect(() => {
    if (image) {
      const img = new Image();
      img.onload = function () {
        //@ts-ignore

        console.log(this.height, this.width);
        //@ts-ignore
        if (this.height > 422 && this.height >= this.width) setShowSquare(true);
        else setShowSquare(false);
      };
      img.src = typeof image === "object" ? URL.createObjectURL(image) : image;
    }
  }, [image]);

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        setIsCropping(true);
        const result: any = await canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
          1,
          0,
          image.type
        );
        setIsCropping(false);
        setCroppedImage(result);
      }
    },
    100,
    [completedCrop, crop]
  );

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    if (square) {
      const { width, height } = e.currentTarget;
      !crop && setCrop(centerAspectCrop(width, height, 1));
    }
  };

  const saveResult = async (): Promise<void> => {
    if (image) {
      try {
        if (croppedImage) {
          setIsCropping(true);
          let file = await fetch(croppedImage)
            .then((r) => r.blob())
            .then(
              (blobFile) =>
                new File(
                  [blobFile],
                  Math.floor(Math.random() * 10000) +
                    getCustomDate(new Date().toISOString()) +
                    "." +
                    image.name.split(".").pop()
                )
            );
          const format = formatBytes(file.size);
          if (IsSameUrl(format.format, "MB") && format.size > 2) {
            toast.error("Please Upload smaller photo!");
            setIsCropping(false);
          } else {
            setTimeout(() => {
              setIsCropping(false);
            }, 200);
            onUpload(file, true);
          }
        } else {
          const format = formatBytes(image.size);
          if (IsSameUrl(format.format, "MB") && format.size > 2) {
            toast.error("Please Upload smaller photo!");
            setIsCropping(false);
          } else {
            setTimeout(() => {
              setIsCropping(false);
            }, 200);
            onUpload(image, true);
          }
        }
      } catch (e) {
        setIsCropping(false);
        //console.log(e);
      }
    } else {
      toast.error("please select a file to crop");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      modalTitle="Crop Image"
      onToggle={() => {
        setImage(null);
        onToggle();
      }}
    >
      {{
        main: (
          <div
            style={{ height: "400px" }}
            className="d-flex justify-content-center align-items-center"
          >
            <ReactCrop
              crop={crop}
              onChange={(_, percentCrop) => setCrop(percentCrop)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={square ? 1 : undefined}
              keepSelection={square}
              style={{ width: "100%", height: showSquare ? "100%" : "auto" }}

              // aspect={aspect}
            >
              <img
                ref={imgRef}
                alt="Crop me"
                src={image ? URL.createObjectURL(image) : ""}
                // style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
                onLoad={onImageLoad}
                className="w-100"
                style={{ maxHeight: "100%", objectFit: "contain" }}
              />
            </ReactCrop>

            {!!completedCrop && (
              <canvas
                ref={previewCanvasRef}
                style={{
                  // border: "1px solid black",
                  objectFit: "contain",
                  width: 0,
                  height: 0,
                }}
              />
            )}
            {/* <Cropper
              image={image ? URL.createObjectURL(image) : ""}
              crop={crop}
              zoom={zoom}
              aspect={1 / 1}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            /> */}
          </div>
        ),
        footer: (
          <SubmitButton
            type="button"
            isLoading={uploadLoading || isCropping}
            onClick={saveResult}
          >
            Save
          </SubmitButton>
        ),
      }}
    </Modal>
  );
};

export { CropUploaderModal };
