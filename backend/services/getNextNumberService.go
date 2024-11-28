package services

import (
	"database/sql"
	"time"
)

func GetNextNumber(db *sql.DB) string {
	loc, _ := time.LoadLocation("Asia/Jakarta")
	tanggal := time.Now().In(loc).Format("2006-01-02")

	var noAntrian string
	query := `SELECT no_antrian FROM tbl_antrian WHERE tanggal = ? AND status = '0' ORDER BY no_antrian ASC LIMIT 1`
	db.QueryRow(query, tanggal).Scan(&noAntrian)

	return noAntrian
}
