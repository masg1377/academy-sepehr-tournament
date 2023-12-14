export default async function getCroppedImg(
  imageSrc: any,
  pixelCrop: any,
  rotation = 0,
  type: string = "image/png"
) {
  let image: any;
  image = await createImage(imageSrc);
  const canvas = document.createElement("canvas"),
    ctx: any = canvas.getContext("2d"),
    safeArea = Math.max(image.width, image.height) * 2;

  // Set each dimensions to double largest dimension to allow for a safe area for the
  // image to rotate in without being clipped by canvas context
  canvas.width = safeArea;
  canvas.height = safeArea;

  // Translate canvas context to a central location on image to allow rotating around the center.
  ctx.translate(safeArea / 2, safeArea / 2);
  ctx.rotate(getRadianAngle(rotation));
  ctx.translate(-safeArea / 2, -safeArea / 2);

  // Draw rotated image and store data.
  ctx.drawImage(
    image,
    safeArea / 2 - image.width * 0.5,
    safeArea / 2 - image.height * 0.5
  );
  const data = ctx.getImageData(0, 0, safeArea, safeArea);

  // Set canvas width to final desired crop size - this will clear existing context
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  // Paste generated rotate image with correct offsets for x,y crop values.
  ctx.putImageData(
    data,
    0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x,
    0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y
  );

  // As a Base64 String
  // return canvas.toDataURL('image/jpeg');

  // As a BLOB
  return new Promise((resolve) => {
    canvas.toBlob((file: any) => {
      resolve(URL.createObjectURL(file));
    }, type);
  });
}

const createImage = (url: any) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.src = url;
  });

function getRadianAngle(degreeValue: any) {
  return (degreeValue * Math.PI) / 180;
}
