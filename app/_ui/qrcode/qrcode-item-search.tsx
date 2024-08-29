"use client";

import QRCodeScanner from "./qrcode-scanner";
import { useRouter } from "next/navigation";

export default function QRCodeItemSearch() {
  const router = useRouter();

  async function handleCodeChange(code: string) {
    router.push("/dashboard/scanner/" + code);
  }

  return <QRCodeScanner onChange={handleCodeChange}></QRCodeScanner>;
}
