package services

import (
	"database/sql"
)

func GetNextAntrian(db *sql.DB) int {
	var noAntrian int
	var result sql.NullInt64 // Gunakan sql.NullInt64 untuk menangani nilai NULL
	query := "SELECT max(no_antrian) FROM tbl_antrian WHERE tanggal = CURDATE()"
	db.QueryRow(query).Scan(&result)
	if result.Valid {
		noAntrian = int(result.Int64) + 1
	} else {
		noAntrian = 1
	}
	return noAntrian
}

// InsertAntrian menambahkan data antrian baru ke dalam tabel
func InsertAntrian(db *sql.DB, tanggal string, noAntrian int) {
	query := `INSERT INTO tbl_antrian (tanggal, no_antrian) VALUES (?, ?)`
	db.Exec(query, tanggal, noAntrian)
}
