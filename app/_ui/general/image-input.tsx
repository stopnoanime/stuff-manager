import {
  ALLOWED_IMAGE_TYPES,
  MAX_IMAGE_SIZE_MB,
} from "@/app/_lib/data-definitions";
import noImage from "@/public/no-image.svg";
import imageCompression from "browser-image-compression";
import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";
import DropZone from "./drop-zone";

export default function ImageInput({
  defaultImage,
  errors,
}: {
  defaultImage?: string;
  errors?: string[];
}) {
  const [displayImageSrc, setDisplayImageSrc] = useState(
    defaultImage || noImage,
  );
  const [shouldDeleteImage, setShouldDeleteImage] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState("");

  function handleFileInputChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (file) handleImageFileChange(file);
  }

  async function handleImageFileChange(imageFile: File) {
    if (!ALLOWED_IMAGE_TYPES.includes(imageFile.type)) return;

    const compressedFile = await imageCompression(imageFile, {
      maxSizeMB: MAX_IMAGE_SIZE_MB,
      maxWidthOrHeight: 1920,
    });

    setDisplayImageSrc(URL.createObjectURL(compressedFile));
    setFileName(imageFile.name);

    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(
      new File([compressedFile], imageFile.name, { type: imageFile.type }),
    );
    fileInputRef.current!.files = dataTransfer.files;
  }

  function handleImageDelete() {
    setDisplayImageSrc(noImage);
    setShouldDeleteImage("true");
    setFileName("");
    fileInputRef.current!.value = "";
  }

  return (
    <DropZone onDrop={handleImageFileChange}>
      <input
        hidden
        type="text"
        value={shouldDeleteImage}
        readOnly
        name="delete_image"
      ></input>

      <div className="relative aspect-video">
        <Image
          className="object-contain"
          src={displayImageSrc}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          priority
          alt="Item image"
        />
      </div>

      <div className="mt-2 flex">
        <label className="styled-input !w-auto grow cursor-pointer">
          {fileName || "Select Image"}
          <input
            type="file"
            ref={fileInputRef}
            name="image"
            aria-describedby="image-errors"
            accept=".jpg,.jpeg,.png,.webp"
            onChange={handleFileInputChange}
            hidden
          ></input>
        </label>

        {displayImageSrc !== noImage && (
          <button
            type="button"
            onClick={handleImageDelete}
            className="styled-input !w-auto !border-l-0"
          >
            Delete Image
          </button>
        )}
      </div>

      <div id="image-errors" className="text-sm text-red-500">
        {errors?.map((e) => <p key={e}>{e}</p>)}
      </div>
    </DropZone>
  );
}
