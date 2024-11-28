import axios from "axios";

export const fetchAllNumber = async (): Promise<any> => {
  try {
    const response = await axios.get("http://localhost:8080/api/all", {
      headers: {
        "Content-Type": "application/json",
        // 'X-Requested-With': 'XMLHttpRequest',
      },
    });

    // Log the entire response to check the structure
    console.log("API Response:", response.data);

    // Ensure the response has the 'queues' field and return it
    return response.data.queues || []; // Return an empty array if no queues
  } catch (error) {
    console.error("Error fetching queue data:", error);
    throw error; // Rethrow error to be handled in the caller
  }
};
