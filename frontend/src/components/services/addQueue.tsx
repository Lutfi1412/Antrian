import axios from "axios";

export const addQueueNumber = async (queueNumber: number): Promise<void> => {
  try {
    await axios.post(
      "http://localhost:8080/api/queue/add",
      { queue_number: queueNumber },
      {
        headers: {
          "Content-Type": "application/json",
          // 'X-Requested-With': 'XMLHttpRequest',
        },
      }
    );
  } catch (error) {
    console.error("Error adding queue number:", error);
    throw error; // Rethrow to handle it in the component if needed
  }
};
