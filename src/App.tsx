import {Html5QrcodeScanner, Html5QrcodeScanType} from 'html5-qrcode';
import {useEffect, useState} from "react";


function App() {

    const [productCode, setProductCode] = useState("null")

    useEffect(() => {
        const scanner = new Html5QrcodeScanner(
            "reader",
            {
                fps: 10,
                qrbox: { width: 250, height: 250 },
                supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
            },
            false
        );

        scanner.render(
            (decodedText, decodedResult) => {
                setProductCode(decodedText)
            },
            (errorMessage) => {
                // Optional: console.warn(errorMessage);
            }
        );

        // ✅ Return a synchronous cleanup function
        return () => {
            scanner.clear().catch((error) => {
                console.error("Failed to clear scanner", error);
            });
        };
    }, []);

    return (
        <div style={{ padding: 20 }}>
            <div id="reader" style={{ width: "300px" }} />
            <div>{productCode}</div>
        </div>
    );}

export default App