"use client";

import { ChangeEvent, useState } from "react";
import QRCodeDisplay from "./qrcode-display";
import QRCodeScannerPopup from "./qrcode-scanner-popup";

type ActionType = "none" | "generate" | "scan";
export function QRCodeInput({ default_qr_code }: { default_qr_code?: string }) {
  const [action, setAction] = useState<ActionType>(
    default_qr_code ? "generate" : "none",
  );
  const [qr_code, set_qr_code] = useState(default_qr_code || "");
  const [popupOpen, setPopupOpen] = useState(false);
  const [usingScanned, setUsingScanned] = useState(false);

  function onActionChange(e: ChangeEvent<HTMLInputElement>) {
    const action = e.target.value as ActionType;
    setAction(action);

    set_qr_code(
      action == "generate" ? default_qr_code || crypto.randomUUID() : "",
    );

    setUsingScanned(false);
    if (action == "scan") setPopupOpen(true);
  }

  function handleQrCodeScan(qr_code: string) {
    setPopupOpen(false);
    setUsingScanned(true);
    set_qr_code(qr_code);
  }

  return (
    <>
      <fieldset>
        <legend>QR Code</legend>

        <div className="styled-input flex justify-evenly">
          <label className="flex items-center gap-1">
            <input
              type="radio"
              name="qr-type"
              value="none"
              checked={action == "none"}
              onChange={onActionChange}
            />
            None
          </label>
          <label className="flex items-center gap-1">
            <input
              type="radio"
              name="qr-type"
              value="generate"
              checked={action == "generate"}
              onChange={onActionChange}
            />
            {default_qr_code ? "Keep previous" : "Generate new"}
          </label>
          <label className="flex items-center gap-1 w-32 justify-center">
            <input
              type="radio"
              name="qr-type"
              value="scan"
              checked={action == "scan"}
              onChange={onActionChange}
            />
            {usingScanned ? "Use scanned" : "Scan"}
          </label>
        </div>
      </fieldset>

      <input hidden type="text" value={qr_code} readOnly name="qr_code"></input>

      {action == "generate" && (
        <div className="col-span-2 default-border p-2">
          <QRCodeDisplay qr_code={qr_code}></QRCodeDisplay>
        </div>
      )}

      {popupOpen && (
        <QRCodeScannerPopup
          onScan={handleQrCodeScan}
          onClose={() => setPopupOpen(false)}
        ></QRCodeScannerPopup>
      )}
    </>
  );
}
