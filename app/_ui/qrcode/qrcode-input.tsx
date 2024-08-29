"use client";

import { ChangeEvent, useState } from "react";
import QRCodeScanner from "./qrcode-scanner";
import QRCodeDisplay from "./qrcode-display";

type ActionType = "none" | "generate" | "scan";
export function QRCodeInput({ default_qr_code }: { default_qr_code?: string }) {
  const [action, setAction] = useState<ActionType>(
    default_qr_code ? "generate" : "none",
  );
  const [qr_code, set_qr_code] = useState(default_qr_code || "");

  function onActionChange(e: ChangeEvent<HTMLInputElement>) {
    const action = e.target.value as ActionType;
    setAction(action);

    if (action == "none" || action == "scan") set_qr_code("");

    if (action == "generate")
      set_qr_code(default_qr_code || crypto.randomUUID());
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
            {default_qr_code ? "Keep" : "Generate"}
          </label>
          <label className="flex items-center gap-1">
            <input
              type="radio"
              name="qr-type"
              value="scan"
              checked={action == "scan"}
              onChange={onActionChange}
            />
            Scan
          </label>
        </div>
      </fieldset>

      <input hidden type="text" value={qr_code} readOnly name="qr_code"></input>

      {action == "generate" && (
        <div className="col-span-2 default-border p-2">
          <QRCodeDisplay qr_code={qr_code}></QRCodeDisplay>
        </div>
      )}

      {action == "scan" && (
        <div className="col-span-2 default-border p-2">
          <QRCodeScanner onChange={set_qr_code}></QRCodeScanner>
        </div>
      )}
    </>
  );
}
