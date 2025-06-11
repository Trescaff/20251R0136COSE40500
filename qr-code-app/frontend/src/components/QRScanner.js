// src/components/QRScanner.js
import React, { useEffect, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

function QRScanner({ onScanSuccess }) {
  const scannerRef = useRef(null);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      'qr-scanner',
      { fps: 10, qrbox: { width: 250, height: 250 } },
      false
    );

    scanner.render(
      (decodedText, decodedResult) => {
        console.log(`Scan result: ${decodedText}`);
        onScanSuccess(decodedText);
        scanner.clear(); // stop scanning after success
      },
      (error) => {
        console.warn(`QR code scan error: ${error}`);
      }
    );

    return () => {
      scanner.clear().catch(error => console.error('Failed to clear scanner', error));
    };
  }, [onScanSuccess]);

  return <div id="qr-scanner" ref={scannerRef}></div>;
}

export default QRScanner;
