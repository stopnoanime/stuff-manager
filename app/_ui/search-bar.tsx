"use client";

import { useState } from "react";
import QRCodeScannerPopup from "./qrcode/qrcode-scanner-popup";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [popupOpen, setPopupOpen] = useState(false);
  const router = useRouter();

  function handleQrCodeSearch(qr_code: string) {
    setPopupOpen(false);

    const params = new URLSearchParams();
    params.set("qr_code", qr_code);

    router.push(`/dashboard/search?${params.toString()}`);
  }

  return (
    <>
      <form
        className="flex border-stone-900 border-solid border-b h-16 justify-center p-2"
        action="/dashboard/search"
        method="get"
      >
        <input
          name="query"
          placeholder="Search for items"
          className="styled-input !w-[50vw]"
        ></input>
        <button type="submit" className="styled-input !w-auto !border-l-0">
          Search
        </button>
        <button
          type="button"
          className="styled-input !w-auto !border-l-0"
          onClick={() => setPopupOpen(true)}
        >
          QR search
        </button>
      </form>
      {popupOpen && (
        <QRCodeScannerPopup
          onScan={handleQrCodeSearch}
          onClose={() => setPopupOpen(false)}
        ></QRCodeScannerPopup>
      )}
    </>
  );
}
