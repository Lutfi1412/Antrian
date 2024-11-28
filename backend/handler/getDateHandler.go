package handler

import (
	"encoding/json"
	"fmt"
	"my-app-backend/database"
	"my-app-backend/services"
	"net/http"
)

// Struct untuk response
type DateWithLoketResponse struct {
	Dates []services.DateWithLoketCount `json:"dates"`
}

// Handler untuk mendapatkan data tanggal dan jumlah per loket
func GetDateQueueHandler(w http.ResponseWriter, r *http.Request) {
	// Set response header ke JSON
	w.Header().Set("Content-Type", "application/json")

	// Inisialisasi koneksi database
	db := database.InitializeDB()
	defer db.Close()

	// Panggil fungsi dari service
	dates := services.GetDateService(db)

	// Persiapkan response
	response := DateWithLoketResponse{Dates: dates}

	// Kirimkan response dalam format JSON
	if err := json.NewEncoder(w).Encode(response); err != nil {
		http.Error(w, fmt.Sprintf("Error encoding JSON response: %v", err), http.StatusInternalServerError)
		return
	}
}
