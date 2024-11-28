import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { CardPanggilan } from "../layout";
import "../../App.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import {
  remainingQueueNumber,
  fetchQueueNumber,
  fetchNowNumber,
  fetchNextNumber,
} from "../services";

const CustomerPage: React.FC = () => {
  const [queueNumber, setQueueNumber] = useState<number>(0);
  const [antrianSelanjutnya, setAntrianSelanjutnya] = useState<string>("0");
  const [sisaAntrian, setSisaAntrian] = useState<number>(0);
  const [antrianSekarang1, setAntrianSekarang1] = useState<string>("0");
  const [antrianSekarang2, setAntrianSekarang2] = useState<string>("0");
  const [antrianSekarang3, setAntrianSekarang3] = useState<string>("0");

  // Fetch data function
  const fetchData = async () => {
    try {
      const queue = await fetchQueueNumber();
      setQueueNumber(queue);

      const next = await fetchNextNumber();
      setAntrianSelanjutnya(next);

      const remaining = await remainingQueueNumber();
      setSisaAntrian(remaining);

      const now1 = await fetchNowNumber("1");
      setAntrianSekarang1(now1);

      const now2 = await fetchNowNumber("2");
      setAntrianSekarang2(now2);

      const now3 = await fetchNowNumber("3");
      setAntrianSekarang3(now3);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  useEffect(() => {
    // Initial data fetch
    fetchData();

    // Set an interval to fetch data every 1.5 seconds
    const interval = setInterval(fetchData, 1500); // 1500 ms = 1.5 seconds

    // Cleanup the interval when the component unmounts
    return () => clearInterval(interval);
  }, []); // Empty dependency array to run this effect only once when the component mounts

  const toggleFullscreen = () => {
    const element = document.documentElement; // Fullscreen for the entire document
    if (!document.fullscreenElement) {
      element.requestFullscreen?.().catch((err) => {
        console.error("Error attempting to enable fullscreen:", err.message);
      });
    } else {
      document.exitFullscreen?.();
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center">
      <div className="row align-items-center justify-content-center">
        <div className="col-md-4 mb-6">
          <CardPanggilan
            jumlah={() => queueNumber}
            className="bi-people text-warning"
            className2="text-warning"
          >
            Jumlah Antrian
          </CardPanggilan>
        </div>
        <div className="col-md-4 mb-6">
          <CardPanggilan
            jumlah={() => antrianSelanjutnya}
            className="bi-person-plus text-info"
            className2="text-info"
          >
            Antrian Selanjutnya
          </CardPanggilan>
        </div>
        <div className="col-md-4 mb-6">
          <CardPanggilan
            jumlah={() => sisaAntrian}
            className="bi-person text-danger"
            className2="text-danger"
          >
            Sisa Antrian
          </CardPanggilan>
        </div>
        <div className="col-md-4 mb-6">
          <CardPanggilan
            jumlah={() => antrianSekarang1}
            className="bi-person-check text-success"
            className2="text-success"
          >
            Antrian Loket 1
          </CardPanggilan>
        </div>
        <div className="col-md-4 mb-6">
          <CardPanggilan
            jumlah={() => antrianSekarang2}
            className="bi-person-check text-success"
            className2="text-success"
          >
            Antrian Loket 2
          </CardPanggilan>
        </div>
        <div className="col-md-4 mb-6">
          <CardPanggilan
            jumlah={() => antrianSekarang3}
            className="bi-person-check text-success"
            className2="text-success"
          >
            Antrian Loket 3
          </CardPanggilan>
        </div>
      </div>
      <button
        className="btn btn-primary position-fixed bottom-0 end-0 m-4 rounded-circle"
        onClick={toggleFullscreen}
        style={{
          width: "60px",
          height: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <i className="bi bi-arrows-fullscreen"></i>
      </button>
    </div>
  );
};

export default CustomerPage;
