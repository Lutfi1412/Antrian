package handler

import (
	"encoding/json"
	"my-app-backend/database"
	"my-app-backend/services"
	"net/http"
)

// RequestBody untuk menerima tanggal dari permintaan
type DeleteDateRequest struct {
	Tanggal string `json:"tanggal"`
}

// DeleteDateHandler menangani penghapusan data berdasarkan tanggal
func DeleteDateHandler(w http.ResponseWriter, r *http.Request) {
	// Parse body request
	var reqBody DeleteDateRequest
	json.NewDecoder(r.Body).Decode(&reqBody)

	// Inisialisasi koneksi database
	db := database.InitializeDB()
	defer db.Close()

	services.DeleteDate(db, reqBody.Tanggal)
	// Kirim response sukses
	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Data deleted successfully"))
}
