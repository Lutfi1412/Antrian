import axios from "axios";

export const fetchDates = async (): Promise<any> => {
  try {
    const response = await axios.get("http://localhost:8080/api/dates", {
      headers: {
        "Content-Type": "application/json",
        // 'X-Requested-With': 'XMLHttpRequest',
      },
    });

    // Log the entire response object to check its structure
    console.log("API Response:", response.data);

    // Log to ensure 'dates' exists in the response
    if (response.data && response.data.dates) {
      console.log("Dates fetched:", response.data.dates);
    } else {
      console.log("Dates not found in response.");
    }

    // Return the list of dates from the API response
    return response.data.dates || []; // Return an empty array if no dates
  } catch (error) {
    console.error("Error fetching dates:", error);
    throw error; // Rethrow error to be handled in the caller
  }
};
