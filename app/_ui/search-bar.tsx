"use client";

import { FormEvent, Suspense, useRef, useState } from "react";
import QRCodeScannerPopup from "./qrcode/qrcode-scanner-popup";
import { useRouter, useSearchParams } from "next/navigation";
import { AutocompleteItem } from "../_lib/data-definitions";
import Link from "next/link";
import { useOutsideClick } from "../_lib/hooks";
import { useDebouncedCallback } from "use-debounce";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faQrcode } from "@fortawesome/free-solid-svg-icons";

function SearchBarNoSuspense() {
  const [popupOpen, setPopupOpen] = useState(false);

  const [autocompleteOpen, setAutocompleteOpen] = useState(false);
  const [autocomplete, setAutocomplete] = useState<AutocompleteItem[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);
  useOutsideClick(wrapperRef, () => setAutocompleteOpen(false));
  const debouncedInputChange = useDebouncedCallback(handleInputChange, 500);
  const searchParams = useSearchParams();

  const router = useRouter();

  function handleQrCodeSearch(qr_code: string) {
    setPopupOpen(false);

    const params = new URLSearchParams();
    params.set("qr_code", qr_code);

    router.push(`/dashboard/search?${params.toString()}`);
  }

  async function handleInputChange(input: string) {
    const params = new URLSearchParams();
    params.set("query", input);

    const req = await fetch(`/api/autocomplete?${params.toString()}`);
    if (!req.ok) return;

    const data = await req.json();
    setAutocomplete(data);
  }

  function handleSearch(event: FormEvent) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);

    const query = formData.get("query")?.toString() || "";

    const params = new URLSearchParams();
    params.set("query", query);

    router.replace(`/dashboard/search?${params.toString()}`);
    setAutocompleteOpen(false);
  }

  return (
    <>
      <form
        className="flex border-stone-900 border-solid border-b h-16 justify-center p-2"
        onSubmit={handleSearch}
        onFocus={() => setAutocompleteOpen(true)}
      >
        <div className="relative w-full md:!w-[50vw]" ref={wrapperRef}>
          <input
            name="query"
            placeholder="Search for items"
            className="styled-input h-full"
            onChange={(e) => debouncedInputChange(e.target.value)}
            defaultValue={searchParams.get("query")?.toString()}
          ></input>
          {autocompleteOpen && !!autocomplete.length && (
            <ul className="absolute top-full left-0 right-0 border-stone-900 border-solid border-l border-r  bg-stone-50">
              {autocomplete.map((i) => (
                <li
                  className="border-stone-900 border-solid border-b p-2"
                  key={i.id}
                >
                  <Link
                    className="link"
                    href={`/dashboard/items/${i.id}`}
                    onClick={() => setAutocompleteOpen(false)}
                  >
                    {i.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        <button type="submit" className="styled-input !w-auto !border-l-0">
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="md:!hidden mx-2"
          />
          <div className="hidden md:block"> Search</div>
        </button>

        <button
          type="button"
          className="styled-input !w-auto !border-l-0"
          onClick={() => setPopupOpen(true)}
        >
          <FontAwesomeIcon icon={faQrcode} className="md:!hidden" />
          <div className="hidden md:block"> QR search</div>
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

export default function SearchBar() {
  return (
    <Suspense>
      <SearchBarNoSuspense />
    </Suspense>
  );
}
