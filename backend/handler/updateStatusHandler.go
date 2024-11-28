package handler

import (
	"encoding/json"
	"my-app-backend/database"
	"my-app-backend/services"
	"net/http"
)

// UpdateStatusHandler untuk memperbarui status antrian
func UpdateStatusHandler(w http.ResponseWriter, r *http.Request) {

	var requestData struct {
		ID       int    `json:"id"`
		Status   string `json:"status"`
		Loket    string `json:"loket"`
		Selected string `json:"selected"`
	}
	json.NewDecoder(r.Body).Decode(&requestData)

	db := database.InitializeDB()
	defer db.Close()

	services.UpdateAntrianService(db, requestData.ID, requestData.Status, requestData.Loket, requestData.Selected)

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(struct {
		Message string `json:"message"`
	}{"Status antrian berhasil diperbarui"})
}
