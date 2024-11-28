import axios from "axios";

// Function to fetch the latest queue number
export const remainingQueueNumber = async (): Promise<number> => {
  try {
    const response = await axios.get("http://localhost:8080/api/remaining", {
      headers: {
        "Content-Type": "application/json",
        // 'X-Requested-With': 'XMLHttpRequest',
      },
    });
    return response.data.jumlah_sisa; // Ganti queue_number dengan jumlah_antrian
  } catch (error) {
    console.error("Error fetching queue number:", error);
    throw error; // Rethrow to handle it in the component if needed
  }
};
