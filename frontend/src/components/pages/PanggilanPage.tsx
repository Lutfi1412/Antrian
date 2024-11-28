import { useTextToSpeech } from "../hooks/TextToSpeech";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { CardPanggilan, CardTable } from "../layout";
import "../../App.css";
import { ButtonPanggilan } from "../common";
import {
  remainingQueueNumber,
  fetchQueueNumber,
  fetchNowNumber,
  fetchNextNumber,
  fetchAllNumber,
  updateStatus,
} from "../services";

const PanggilanPage: React.FC = () => {
  const [queueNumber, setQueueNumber] = useState<number>(0);
  const [antrianSelanjutnya, setAntrianSelanjutnya] = useState<string>("0");
  const [sisaAntrian, setSisaAntrian] = useState<number>(0);
  const [antrianSekarang1, setAntrianSekarang1] = useState<string>("0");
  const [antrianSekarang2, setAntrianSekarang2] = useState<string>("0");
  const [antrianSekarang3, setAntrianSekarang3] = useState<string>("0");
  const [queueData, setQueueData] = useState<any[]>([]);
  const [activeQueue, setActiveQueue] = useState<{
    queueId: number;
    loket: string;
  } | null>(null);

  const { speak, stop } = useTextToSpeech(); // Destructure speak and stop from the custom hook

  const columns = ["Nomor Antrian", "Status", "Loket 1", "Loket 2", "Loket 3"];

  const handleStatusUpdate = async (
    id: number,
    loket: string,
    status: string,
    selected: string
  ) => {
    try {
      console.log("Updating status for ID:", id); // Tambahkan log untuk debug
      const result = await updateStatus(id, status, loket, selected);
      console.log(result); // Menampilkan hasil dari update status
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  useEffect(() => {
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

        const allData = await fetchAllNumber();
        setQueueData(allData);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    fetchData();
  }, [
    // queueNumber,
    // antrianSelanjutnya,
    // sisaAntrian,
    // antrianSekarang1,
    // antrianSekarang2,
    // antrianSekarang3,
    // queueData
    activeQueue,
  ]);

  // Function to handle speak button click

  const handleSpeak = (
    queueNumber: number,
    loket: string,
    queueId: number,
    loketN: string,
    selected: string
  ): void => {
    const text = `Nomor antrian ${queueNumber} menuju ${loket}`;
    speak(text, "id-ID");
    handleStatusUpdate(queueId, loketN, "1", selected);
    setActiveQueue({ queueId, loket });
  };

  // Fungsi untuk menangani konfirmasi
  const handleConfirm = (queueId: number, loketN: string, selected: string) => {
    console.log(`Konfirmasi untuk antrian ID: ${queueId}`);
    setActiveQueue(null); // Sembunyikan tombol tambahan
    handleStatusUpdate(queueId, loketN, "2", selected);
    setActiveQueue({ queueId, loket: loketN });
  };

  // Fungsi untuk menangani pembatalan
  const handleCancel = (queueId: number, loketN: string, selected: string) => {
    console.log(`Pembatalan untuk antrian ID: ${queueId}`);
    handleStatusUpdate(queueId, loketN, "0", selected);
    setActiveQueue(null);
    setActiveQueue({ queueId, loket: loketN });
  };

  return (
    <div className="container pt-4">
      <div className="d-flex flex-column flex-md-row px-4 py-3 mb-4 bg-white rounded-2 shadow-sm">
        <div className="d-flex align-items-center me-md-auto">
          <i className="bi-mic-fill text-success me-3 fs-3"></i>
          <h1 className="h5 pt-2">Panggilan Antrian</h1>
        </div>
      </div>

      <div className="row">
        {/* Total Queue */}
        <div className="col-md-4 mb-4">
          <CardPanggilan
            jumlah={() => queueNumber}
            className="bi-people text-warning"
            className2="text-warning"
          >
            Jumlah Antrian
          </CardPanggilan>
        </div>

        {/* Next Queue */}
        <div className="col-md-4 mb-4">
          <CardPanggilan
            jumlah={() => antrianSelanjutnya}
            className="bi-person-plus text-info"
            className2="text-info"
          >
            Antrian Selanjutnya
          </CardPanggilan>
        </div>

        {/* Remaining Queue */}
        <div className="col-md-4 mb-4">
          <CardPanggilan
            jumlah={() => sisaAntrian}
            className="bi-person text-danger"
            className2="text-danger"
          >
            Sisa Antrian
          </CardPanggilan>
        </div>

        {/* Loket 1 */}
        <div className="col-md-4 mb-4">
          <CardPanggilan
            jumlah={() => antrianSekarang1}
            className="bi-person-check text-success"
            className2="text-success"
          >
            Antrian Loket 1
          </CardPanggilan>
        </div>

        {/* Loket 2 */}
        <div className="col-md-4 mb-4">
          <CardPanggilan
            jumlah={() => antrianSekarang2}
            className="bi-person-check text-success"
            className2="text-success"
          >
            Antrian Loket 2
          </CardPanggilan>
        </div>

        {/* Loket 3 */}
        <div className="col-md-4 mb-4">
          <CardPanggilan
            jumlah={() => antrianSekarang3}
            className="bi-person-check text-success"
            className2="text-success"
          >
            Antrian Loket 3
          </CardPanggilan>
        </div>
      </div>

      {/* Static Data Table with Status column hidden */}
      <div className="pt-4">
        <CardTable
          columns={columns}
          data={queueData.map((queue) => ({
            "Nomor Antrian": queue.no_antrian,
            Status: queue.status,
            "Loket 1": (
              <>
                {queue.status === 0 && queue.selected === 0 && (
                  <ButtonPanggilan
                    handlePanggilan={() =>
                      handleSpeak(
                        queue.no_antrian,
                        "Loket 1",
                        queue.id,
                        "1",
                        "1"
                      )
                    }
                    classname="btn btn-success btn-sm rounded-circle btn_mic"
                    classname2="bi-mic-fill"
                  />
                )}

                {queue.status === 1 && queue.selected === 1 && (
                  <>
                    <ButtonPanggilan
                      handlePanggilan={() =>
                        handleSpeak(
                          queue.no_antrian,
                          "Loket 1",
                          queue.id,
                          "1",
                          "1"
                        )
                      }
                      classname="btn btn-warning btn-sm rounded-circle btn_mic"
                      classname2="bi-mic-fill"
                    />
                    <ButtonPanggilan
                      handlePanggilan={() => handleConfirm(queue.id, "1", "0")}
                      classname="btn btn-success btn-sm rounded-circle mx-1 confirm-check"
                      classname2="bi-check-circle-fill"
                    />
                    <ButtonPanggilan
                      handlePanggilan={() => handleCancel(queue.id, "0", "0")}
                      classname="btn btn-danger btn-sm rounded-circle cancel-check"
                      classname2="bi-x-circle-fill"
                    />
                  </>
                )}

                {/* Jika tombol di Loket 3 tidak aktif, tampilkan tombol mic dengan status 1 */}
                {queue.status === 1 && queue.selected !== 1 && (
                  <ButtonPanggilan
                    handlePanggilan={() => {}}
                    classname="btn btn-warning btn-sm rounded-circle btn_mic"
                    classname2="bi-mic-fill"
                  />
                )}
                {queue.status === 2 && (
                  <ButtonPanggilan
                    handlePanggilan={() => {}}
                    classname="btn btn-secondary btn-sm rounded-circle"
                    classname2="bi-mic-fill"
                  />
                )}
              </>
            ),
            "Loket 2": (
              <>
                {queue.status === 0 && queue.selected === 0 && (
                  <ButtonPanggilan
                    handlePanggilan={() =>
                      handleSpeak(
                        queue.no_antrian,
                        "Loket 2",
                        queue.id,
                        "2",
                        "2"
                      )
                    }
                    classname="btn btn-success btn-sm rounded-circle btn_mic"
                    classname2="bi-mic-fill"
                  />
                )}

                {queue.status === 1 && queue.selected === 2 && (
                  <>
                    <ButtonPanggilan
                      handlePanggilan={() =>
                        handleSpeak(
                          queue.no_antrian,
                          "Loket 2",
                          queue.id,
                          "2",
                          "2"
                        )
                      }
                      classname="btn btn-warning btn-sm rounded-circle btn_mic"
                      classname2="bi-mic-fill"
                    />
                    <ButtonPanggilan
                      handlePanggilan={() => handleConfirm(queue.id, "2", "0")}
                      classname="btn btn-success btn-sm rounded-circle mx-1 confirm-check"
                      classname2="bi-check-circle-fill"
                    />
                    <ButtonPanggilan
                      handlePanggilan={() => handleCancel(queue.id, "0", "0")}
                      classname="btn btn-danger btn-sm rounded-circle cancel-check"
                      classname2="bi-x-circle-fill"
                    />
                  </>
                )}

                {/* Jika tombol di Loket 3 tidak aktif, tampilkan tombol mic dengan status 1 */}
                {queue.status === 1 && queue.selected !== 2 && (
                  <ButtonPanggilan
                    handlePanggilan={() => {}}
                    classname="btn btn-warning btn-sm rounded-circle btn_mic"
                    classname2="bi-mic-fill"
                  />
                )}
                {queue.status === 2 && (
                  <ButtonPanggilan
                    handlePanggilan={() => {}}
                    classname="btn btn-secondary btn-sm rounded-circle"
                    classname2="bi-mic-fill"
                  />
                )}
              </>
            ),
            "Loket 3": (
              <>
                {queue.status === 0 && (
                  <ButtonPanggilan
                    handlePanggilan={() =>
                      handleSpeak(
                        queue.no_antrian,
                        "Loket 3",
                        queue.id,
                        "3",
                        "3"
                      )
                    }
                    classname="btn btn-success btn-sm rounded-circle btn_mic"
                    classname2="bi-mic-fill"
                  />
                )}

                {queue.status === 1 && queue.selected === 3 && (
                  <>
                    <ButtonPanggilan
                      handlePanggilan={() =>
                        handleSpeak(
                          queue.no_antrian,
                          "Loket 3",
                          queue.id,
                          "3",
                          "3"
                        )
                      }
                      classname="btn btn-warning btn-sm rounded-circle btn_mic"
                      classname2="bi-mic-fill"
                    />
                    <ButtonPanggilan
                      handlePanggilan={() => handleConfirm(queue.id, "3", "0")}
                      classname="btn btn-success btn-sm rounded-circle mx-1 confirm-check"
                      classname2="bi-check-circle-fill"
                    />
                    <ButtonPanggilan
                      handlePanggilan={() => handleCancel(queue.id, "0", "0")}
                      classname="btn btn-danger btn-sm rounded-circle cancel-check"
                      classname2="bi-x-circle-fill"
                    />
                  </>
                )}

                {/* Jika tombol di Loket 3 tidak aktif, tampilkan tombol mic dengan status 1 */}
                {queue.status === 1 && queue.selected !== 3 && (
                  <ButtonPanggilan
                    handlePanggilan={() => {}}
                    classname="btn btn-warning btn-sm rounded-circle btn_mic"
                    classname2="bi-mic-fill"
                  />
                )}
                {queue.status === 2 && (
                  <ButtonPanggilan
                    handlePanggilan={() => {}}
                    classname="btn btn-secondary btn-sm rounded-circle"
                    classname2="bi-mic-fill"
                  />
                )}
              </>
            ),
          }))}
        />
      </div>
      <footer className="footer mt-auto py-4"></footer>
    </div>
  );
};

export default PanggilanPage;
