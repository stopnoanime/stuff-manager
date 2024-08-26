import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";
import noImage from "@/public/no-image.png";

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

  return (
    <div className="styled-input">
      <input hidden type="text" value={deleteImage} name="delete_image"></input>
      <div className="aspect-video relative">
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

      <div id="image-errors" className="text-red-500 text-sm">
        {errors?.map((e) => <p key={e}>{e}</p>)}
      </div>
    </div>
  );
}
