package services

import (
	"database/sql"
	"time"
)

// Queue represents a single queue record
type Queue struct {
	ID        int `json:"id"`
	NoAntrian int `json:"no_antrian"`
	Status    int `json:"status"`
	Selected  int `json:"selected"`
}

// GetAllgQueue fetches all queue data for today
func GetAllQueue(db *sql.DB) []Queue {
	// Ambil tanggal hari ini dengan zona waktu Indonesia
	loc, _ := time.LoadLocation("Asia/Jakarta")
	tanggal := time.Now().In(loc).Format("2006-01-02")

	// Query to fetch all queues for today
	rows, _ := db.Query("SELECT id, no_antrian, status, selected FROM tbl_antrian WHERE tanggal = ?", tanggal)
	defer rows.Close()
	var queues []Queue
	for rows.Next() {
		var queue Queue
		rows.Scan(&queue.ID, &queue.NoAntrian, &queue.Status, &queue.Selected)
		queues = append(queues, queue)
	}

	// Check for any error after the loo

	return queues
}
