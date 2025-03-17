import QRCode from "react-qr-code";

export default function QrPage() {
  return <QRCode value={typeof window !== "undefined" ? window.location.href : ""} />;
}
