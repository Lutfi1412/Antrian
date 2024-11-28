package services

import (
	"database/sql"
)

// DeleteDate menghapus data dari tabel `tbl_antrian` berdasarkan tanggal
func DeleteDate(db *sql.DB, tanggal string) {
	query := "DELETE FROM tbl_antrian WHERE tanggal = ?"
	result, _ := db.Exec(query, tanggal)
	result.RowsAffected()
}
