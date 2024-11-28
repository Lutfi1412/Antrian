package handler

import (
	"encoding/json"
	"my-app-backend/database"
	"my-app-backend/services"
	"net/http"
	"time"
)

// AntrianHandler menangani permintaan untuk mendapatkan antrian baru
func AntrianHandler(w http.ResponseWriter, r *http.Request) {

	db := database.InitializeDB()
	defer db.Close()

	// Get next antrian number
	noAntrian := services.GetNextAntrian(db)

	// Ambil tanggal hari ini
	loc, _ := time.LoadLocation("Asia/Jakarta")
	tanggal := time.Now().In(loc).Format("2006-01-02")

	services.InsertAntrian(db, tanggal, noAntrian)
	response := map[string]string{"status": "Sukses"}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)
}
