"use client";

import noCamera from "@/public/no-image.svg";
import { BrowserMultiFormatReader, IScannerControls } from "@zxing/browser";
import { useEffect, useRef, useState } from "react";

export default function QRCodeScanner({
  onScan,
}: {
  onScan: (s: string) => void;
}) {
  const [inputList, setInputList] = useState<MediaDeviceInfo[]>([]);
  const [selectedInput, setSelectedInput] = useState("");
  const [isDecoding, setIsDecoding] = useState(false);

  const readerRef = useRef(new BrowserMultiFormatReader());
  const controlsRef = useRef<IScannerControls>();
  const videoRef = useRef<HTMLVideoElement>(null);

  async function startVideo() {
    controlsRef.current = await readerRef.current.decodeFromVideoDevice(
      selectedInput,
      videoRef.current!,
      (res, err) => {
        if (!res) return;

        stopVideo();
        onScan(res.getText());
      },
    );

    setIsDecoding(true);
  }

  function stopVideo() {
    if (controlsRef.current) controlsRef.current.stop();

    setIsDecoding(false);
  }

  useEffect(() => {
    (async () => {
      const inputs = await BrowserMultiFormatReader.listVideoInputDevices();
      setSelectedInput(inputs[0]?.deviceId || "");
      setInputList(inputs);
    })();

    return stopVideo;
  }, []);

  return (
    <div className="flex flex-col items-center">
      <video
        className="mb-2 aspect-video w-[30vw] min-w-[min(20rem,100%)]"
        poster={noCamera.src}
        ref={videoRef}
      ></video>

      <div className="flex w-full">
        <button
          className="styled-input !w-auto grow"
          type="button"
          onClick={isDecoding ? stopVideo : startVideo}
        >
          {isDecoding ? "Stop scanning" : "Start scanning"}
        </button>

        <div className="styled-input flex !w-auto min-w-0 items-center !border-l-0">
          <select
            className="max-w-full"
            value={selectedInput}
            onChange={(e) => setSelectedInput(e.target.value)}
          >
            {inputList.map((i) => (
              <option key={i.deviceId} value={i.deviceId}>
                {i.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
