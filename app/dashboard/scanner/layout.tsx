import QRCodeItemSearch from "@/app/_ui/qrcode/qrcode-item-search";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Scanner",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <h1 className="text-2xl font-light mb-6">Scanner</h1>
      <div className="max-w-[70vw] mx-auto">
        <QRCodeItemSearch></QRCodeItemSearch>
        {children}
      </div>
    </div>
  );
}
