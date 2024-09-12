import QRCodeScanner from "./qrcode-scanner";

export default function QRCodeScannerPopup({
  onScan,
  onClose,
}: {
  onScan: (qr_code: string) => void;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-10 grid place-items-center bg-black bg-opacity-50 p-2">
      <div className="default-border max-w-full overflow-hidden bg-stone-50 p-4">
        <QRCodeScanner onScan={onScan}></QRCodeScanner>
        <button className="styled-input mt-2" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
