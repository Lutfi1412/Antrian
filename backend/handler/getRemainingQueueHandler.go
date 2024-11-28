package handler

import (
	"encoding/json"
	"fmt"
	"my-app-backend/database"
	"my-app-backend/services"
	"net/http"
)

func GetRemainingQueueHandler(w http.ResponseWriter, r *http.Request) {
	db := database.InitializeDB()
	defer db.Close()

	jumlah_sisa := services.GetRemainingQueue(db)

	// Mengembalikan data sebagai JSON
	response := map[string]string{
		"jumlah_sisa": fmt.Sprintf("%d", jumlah_sisa), // Format angka antrian
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)
}
