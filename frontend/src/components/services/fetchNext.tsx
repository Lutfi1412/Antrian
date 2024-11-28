import axios from "axios";

// Function to fetch the latest queue number
export const fetchNextNumber = async (): Promise<string> => {
  try {
    const response = await axios.get("http://localhost:8080/api/next", {
      headers: {
        "Content-Type": "application/json",
        // 'X-Requested-With': 'XMLHttpRequest',
      },
    });
    return String(response.data.next_number || "0"); // Adjust to match backend response field
  } catch (error) {
    console.error("Error fetching queue number:", error);
    throw error; // Rethrow to handle it in the component if needed
  }
};

// export const fetchNextNumberAsync = async () => {
//   try {
//     const nextQueue = await fetchNextNumber();

//     return {
//       nextQueue
//     };
//   } catch (error) {
//     console.error("Error fetching all queue data:", error);
//     throw error;
//   }
// };
