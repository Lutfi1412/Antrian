package services

import (
	"database/sql"
	"time"
)

func GetNowQueue(db *sql.DB, loket string) string {
	// Mengambil tanggal hari ini dengan zona waktu Indonesia
	loc, _ := time.LoadLocation("Asia/Jakarta")
	tanggal := time.Now().In(loc).Format("2006-01-02")

	// Query untuk mencari nomor antrian berdasarkan tanggal, status, dan loket
	var noAntrian string
	query := `SELECT no_antrian FROM tbl_antrian WHERE tanggal = ? AND status = '2' AND loket = ? ORDER BY updated_date DESC LIMIT 1`
	db.QueryRow(query, tanggal, loket).Scan(&noAntrian)

	return noAntrian
}
