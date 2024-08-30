"use client";
import QRCode from "qrcode";
import { useEffect, useState } from "react";

export default function QRCodeDisplay({ qr_code }: { qr_code: string }) {
  const [imgSrc, setImgSrc] = useState<string>("");

  useEffect(() => {
    (async () => {
      setImgSrc(await QRCode.toDataURL(qr_code));
    })();
  }, [qr_code]);

  return (
    <div className="flex flex-col items-center">
      {imgSrc && (
        <>
          <img src={imgSrc} alt="The QR code"></img>
          <a
            href={imgSrc}
            download="qr-code"
            className="styled-input text-center mt-2"
          >
            Download
          </a>
        </>
      )}
    </div>
  );
}
