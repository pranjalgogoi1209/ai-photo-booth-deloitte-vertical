import React, { useState } from "react";
import QRCode from "react-qr-code";
import { IoIosCloseCircle } from "react-icons/io";
import styles from "./qrFeature.module.css";
import axios from "axios";
import logo from "./../../../assets/logo.png";

export default function QrFeature({ generatedImg, printRef }) {
  const [showQrPopup, setShowQrPopup] = useState(false);
  const [qr, setQr] = useState("");

  // converting selectedImage to base64 format
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  const getImageData = img => {
    canvas.width = img.width;
    canvas.height = img.height;
    context.drawImage(img, 0, 0);
    return canvas.toDataURL("image/png");
  };

  // handle QR code generation
  const handleSubmitQr = () => {
    console.log("submitting qr");
    setShowQrPopup(true);
    console.log("printRef", printRef.current);
    axios
      .post("https://adp24companyday.com/aiphotobooth/upload.php", {
        img: generatedImg.split(",")[1],
      })
      .then(function (response) {
        console.log(response);
        setQr(response.data.url);
        console.log(qr);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div className={styles.QrFeature}>
      <button
        onClick={handleSubmitQr}
        style={{ display: "flex", justifyContent: "center", width: "20vw" }}
      >
        QR
      </button>

      {showQrPopup && (
        <div className={styles.popupQr} onClick={() => setShowQrPopup(false)}>
          <div
            className={styles.qr}
            onClick={e => {
              e.stopPropagation();
            }}
          >
            {/* close */}
            <div className={styles.close} onClick={() => setShowQrPopup(false)}>
              <IoIosCloseCircle />
            </div>

            {/* header */}
            <header>
              <h2>Scan this QR to get Image</h2>
              <div className={styles.logoContainer}>
                <img src={logo} alt="logo" />
              </div>
            </header>
            <QRCode size={256} value={qr} className={styles.qrCode} />
          </div>
        </div>
      )}
    </div>
  );
}
