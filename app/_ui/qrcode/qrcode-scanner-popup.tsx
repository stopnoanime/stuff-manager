import QRCodeScanner from "./qrcode-scanner";

export default function QRCodeScannerPopup({
  onScan,
  onClose,
}: {
  onScan: (qr_code: string) => void;
  onClose: () => void;
}) {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 grid place-items-center bg-black bg-opacity-50 z-10 p-2">
      <div className="default-border p-4 bg-stone-50 overflow-hidden max-w-full ">
        <QRCodeScanner onScan={onScan}></QRCodeScanner>
        <button className="styled-input mt-2" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
