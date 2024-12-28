"use client";
import React, { useEffect, useState } from "react";
import { Html5Qrcode, Html5QrcodeScanner } from "html5-qrcode";

const QRScanner = () => {
  const [cameraId, setCameraId] = useState(null);
  const [qrCodeData, setQrCodeData] = useState(null); // State untuk menyimpan data QR yang terdeteksi
  const [scanning, setScanning] = useState(false); // State untuk menandakan apakah pemindaian sedang berjalan

  useEffect(() => {
    // Mendapatkan daftar kamera yang tersedia
    Html5Qrcode.getCameras()
      .then((devices) => {
        if (devices && devices.length > 0) {
          setCameraId(devices[0].id); // Memilih kamera pertama
        }
      })
      .catch((err) => console.error("Error getting cameras:", err));
  }, []);

  useEffect(() => {
    if (!cameraId || scanning) return; // Tidak mulai pemindaian jika sudah ada pemindaian aktif

    const scanner = new Html5QrcodeScanner(
      "qr-reader",
      {
        fps: 10,
        qrbox: { width: 250, height: 250 },
      },
      false
    );

    scanner.render(
      (decodedText) => {
        if (!qrCodeData) {
          // Cek apakah QR Code baru terdeteksi
          setQrCodeData(decodedText); // Set hasil QR Code
          setScanning(true); // Tandai pemindaian selesai
          console.log("QR Code Scanned:", decodedText);
          alert(decodedText); // Tampilkan hasil pemindaian
        }
      },
      (error) => {
        if (error.name !== "NotFoundException") {
          console.error("QR Scan Error:", error); // Hanya log error yang penting
        }
      }
    );

    return () => {
      scanner.clear();
    };
  }, [cameraId, scanning, qrCodeData]);

  return (
    <div style={{ width: "100%" }}>
      <div id="qr-reader" style={{ width: "100%" }}></div>
      {qrCodeData && <p>QR Code Detected: {qrCodeData}</p>}
    </div>
  );
};

export default QRScanner;
