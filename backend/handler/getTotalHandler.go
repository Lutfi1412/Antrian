package handler

import (
	"encoding/json"
	"fmt"
	"my-app-backend/database"
	"my-app-backend/services"
	"net/http"
)

func JumlahAntrianHandler(w http.ResponseWriter, r *http.Request) {

	db := database.InitializeDB()
	defer db.Close()

	jumlahAntrian := services.GetJumlahAntrian(db)

	// Mengembalikan data sebagai JSON
	response := map[string]string{
		"jumlah_antrian": fmt.Sprintf("%d", jumlahAntrian), // Format angka antrian
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)
}
