"use client";
import QRCode from "qrcode";
import { useEffect, useState } from "react";

export default function QRCodeDisplay({ qr_code }: { qr_code: string }) {
  const [imgSrc, setImgSrc] = useState<string>("");

  useEffect(() => {
    (async () => {
      if (qr_code) setImgSrc(await QRCode.toDataURL(qr_code));
    })();
  }, [qr_code]);

  return (
    <div className="styled-input flex items-center justify-center gap-4">
      {qr_code && imgSrc && (
        <>
          <img src={imgSrc} height="64" width="64" alt="The qr code"></img>
          <a href={imgSrc} download="qr-code" className="styled-input !w-auto">
            Download
          </a>
        </>
      )}
      {!qr_code && <div className="w-full text-left text-stone-400">None</div>}
    </div>
  );
}
