import { ALLOWED_IMAGE_TYPES } from "@/app/_lib/data-definitions";
import noImage from "@/public/no-image.svg";
import Image from "next/image";
import { ChangeEvent, DragEvent, useRef, useState } from "react";

export default function ImageInput({
  defaultImage,
  errors,
}: {
  defaultImage?: string;
  errors?: string[];
}) {
  const [imageSrc, setImageSrc] = useState(defaultImage || noImage);
  const [deleteImage, setDeleteImage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState("");
  const [isDrag, setIsDrag] = useState(false);

  function handleImageChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setImageSrc(URL.createObjectURL(file));
      setFileName(file.name);
    }
  }

  function handleImageDelete() {
    setImageSrc(noImage);
    setDeleteImage("true");
    setFileName("");
    fileInputRef.current!.value = "";
  }

  function handleDragOver(event: DragEvent) {
    event.preventDefault();
    setIsDrag(true);
  }

  function handleDrop(event: DragEvent) {
    event.preventDefault();
    setIsDrag(false);

    if (event.dataTransfer.files.length !== 1) return;

    const file = event.dataTransfer.files[0];

    if (file && ALLOWED_IMAGE_TYPES.includes(file.type)) {
      setImageSrc(URL.createObjectURL(file));
      setFileName(file.name);
      fileInputRef.current!.files = event.dataTransfer.files;
    }
  }

  function handleDragLeave() {
    setIsDrag(false);
  }

  return (
    <div
      className="styled-input relative"
      onDrop={handleDrop}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
    >
      <input
        hidden
        type="text"
        value={deleteImage}
        readOnly
        name="delete_image"
      ></input>
      <div className="aspect-video relative pointer-events-none">
        <Image
          className="object-contain"
          src={imageSrc}
          fill
          priority
          sizes="60vw"
          alt="Item image"
        />
      </div>
      <div className="flex mt-2">
        <label className="styled-input cursor-pointer grow !w-auto">
          {fileName || "Select Image"}
          <input
            type="file"
            ref={fileInputRef}
            name="image"
            aria-describedby="image-errors"
            accept=".jpg,.jpeg,.png,.webp"
            onChange={handleImageChange}
            hidden
          ></input>
        </label>
        {imageSrc !== noImage && (
          <button
            type="button"
            onClick={handleImageDelete}
            className="styled-input !w-auto !border-l-0"
          >
            Delete Image
          </button>
        )}
      </div>

      {isDrag && (
        <div className="absolute top-0 right-0 bottom-0 left-0 opacity-80 bg-stone-200 grid place-items-center text-xl pointer-events-none">
          Drop your images here
        </div>
      )}

      <div id="image-errors" className="text-red-500 text-sm">
        {errors?.map((e) => <p key={e}>{e}</p>)}
      </div>
    </div>
  );
}
