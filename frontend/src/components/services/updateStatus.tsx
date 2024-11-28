export const updateStatus = async (
  id: number,
  status: string,
  loket: string,
  selected: string
): Promise<any> => {
  try {
    console.log("Request to update status with ID:", id);

    const response = await fetch("http://localhost:8080/api/updatestatus", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        // 'X-Requested-With': 'XMLHttpRequest',
      },
      body: JSON.stringify({ id, status, loket, selected }), // Send both id and status, assuming the API requires both
    });

    console.log("Response status:", response.status);
    console.log("Response statusText:", response.statusText);

    if (!response.ok) {
      const errorDetails = await response.text(); // Get the error details from the response
      console.error("API error:", errorDetails);
      throw new Error(`Failed to update status: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Response data:", data);
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Error while updating status");
  }
};
