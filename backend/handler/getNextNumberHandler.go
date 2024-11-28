package handler

import (
	"encoding/json"
	"my-app-backend/database"
	"my-app-backend/services"
	"net/http"
)

// Handler untuk mendapatkan nomor antrian berikutnya
func GetNextQueueHandler(w http.ResponseWriter, r *http.Request) {

	// Inisialisasi koneksi ke database
	db := database.InitializeDB()
	defer db.Close()

	noAntrian := services.GetNextNumber(db)
	// Menyiapkan response JSON
	response := map[string]interface{}{
		"next_number": noAntrian, // Mengirimkan nomor antrian dalam bentuk string
	}

	// Menetapkan header response
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)

	json.NewEncoder(w).Encode(response)
}
