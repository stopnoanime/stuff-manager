"use client";

import { BrowserMultiFormatReader, IScannerControls } from "@zxing/browser";
import { useEffect, useRef, useState } from "react";

export default function QRCodeScanner({
  onChange,
}: {
  onChange: (s: string) => void;
}) {
  const [inputList, setInputList] = useState<MediaDeviceInfo[]>([]);
  const [selectedInput, setSelectedInput] = useState("");
  const [isDecoding, setIsDecoding] = useState(false);
  const [wasDecoded, setWasDecoded] = useState(false);

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
        setWasDecoded(true);
        onChange(res.getText());
      },
    );

    setIsDecoding(true);
    setWasDecoded(false);
    onChange("");
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
        className={"aspect-video mb-2 w-[25vw] " + (isDecoding ? "" : "hidden")}
        ref={videoRef}
      ></video>

      {wasDecoded && <div className="mb-2">Successfully scanned QR code.</div>}

      <div className="flex w-full">
        <button
          className="styled-input"
          type="button"
          onClick={isDecoding ? stopVideo : startVideo}
        >
          {isDecoding ? "Stop scanning" : "Start scanning"}
        </button>

        <div className=" styled-input !w-auto !border-l-0">
          <select
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
