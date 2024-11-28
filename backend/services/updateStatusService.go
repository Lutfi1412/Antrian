package services

import (
	"database/sql"
	"time"
)

// UpdateAntrianService memperbarui status antrian berdasarkan ID
func UpdateAntrianService(db *sql.DB, id int, status string, loket string, selected string) {
	tanggal := time.Now().Add(7 * time.Hour).Format("2006-01-02 15:04:05")
	db.Exec(`UPDATE tbl_antrian SET status=?, updated_date=?, loket=?, selected=? WHERE id=?`,
		status, tanggal, loket, selected, id)
}
