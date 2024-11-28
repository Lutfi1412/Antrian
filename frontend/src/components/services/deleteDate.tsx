export const deleteDate = async (tanggal: string): Promise<void> => {
  try {
    const response = await fetch("http://localhost:8080/api/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        // 'X-Requested-With': 'XMLHttpRequest',
      },
      body: JSON.stringify({ tanggal }),
    });
    if (!response.ok) {
      throw new Error(`Error deleting date: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error in deleteDate:", error);
    throw error;
  }
};
