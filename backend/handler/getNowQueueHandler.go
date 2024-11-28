package handler

import (
	"encoding/json"
	"my-app-backend/database"
	"my-app-backend/services"
	"net/http"
)

func GetNowQueueHandler(w http.ResponseWriter, r *http.Request) {

	loket := r.URL.Query().Get("loket")

	// Inisialisasi koneksi ke database
	db := database.InitializeDB()
	defer db.Close()

	// Mendapatkan nomor antrian dengan menggunakan fungsi GetNowQueue
	noAntrian := services.GetNowQueue(db, loket)
	// Menyiapkan response JSON
	response := map[string]interface{}{
		"now": noAntrian,
	}

	// Menetapkan header response
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)

	json.NewEncoder(w).Encode(response)
}
