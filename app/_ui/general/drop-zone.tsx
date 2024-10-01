import { DragEvent, useState } from "react";

export default function DropZone({
  children,
  onDrop,
}: {
  children: React.ReactNode;
  onDrop: (file: File) => void;
}) {
  const [isDrag, setIsDrag] = useState(false);

  function handleDragOver(event: DragEvent) {
    event.preventDefault();
    setIsDrag(true);
  }

  function handleDrop(event: DragEvent) {
    event.preventDefault();
    setIsDrag(false);

    if (event.dataTransfer.files.length !== 1) return;

    const file = event.dataTransfer.files[0];

    onDrop(file);
  }

  function handleDragLeave() {
    setIsDrag(false);
  }

  return (
    <div
      className={"styled-input relative"}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      {children}

      {isDrag && (
        <div
          className="absolute -inset-px grid place-items-center bg-stone-200 text-xl opacity-80"
          onDragLeave={handleDragLeave}
        >
          Drop your images here
        </div>
      )}
    </div>
  );
}
