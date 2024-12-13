import React from "react";
import { QRCode } from "react-qrcode-logo";

const QR: React.FC<{ value: string }> = ({ value }) => {
    return <QRCode value={value} />;
};

export default QR;
