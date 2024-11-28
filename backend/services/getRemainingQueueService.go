package services

import (
	"database/sql"
	"time"
)

func GetRemainingQueue(db *sql.DB) int {

	loc := time.FixedZone("Asia/Jakarta", 7*3600)
	tanggal := time.Now().In(loc).Format("2006-01-02")

	// Query untuk menghitung jumlah antrian berdasarkan tanggal
	var jumlahsisa int
	query := `SELECT count(id) as jumlah FROM tbl_antrian WHERE tanggal = ? AND status='0'`
	db.QueryRow(query, tanggal).Scan(&jumlahsisa)
	return jumlahsisa
}
