import axios from "axios";
export const fetchNowNumber = async (loket: string): Promise<string> => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/now?loket=${loket}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.now; // Menyesuaikan dengan respon dari backend
  } catch (error) {
    console.error("Error fetching queue number:", error);
    throw error; // Rethrow untuk penanganan error lebih lanjut di komponen
  }
};
