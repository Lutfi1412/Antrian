package services

import (
	"database/sql"
)

// DateWithLoketCount struct menyimpan data tanggal dan jumlah data per loket
type DateWithLoketCount struct {
	Tanggal string `json:"tanggal"`
	Jumlah  int    `json:"jumlah"`
	Loket1  int    `json:"loket1"`
	Loket2  int    `json:"loket2"`
	Loket3  int    `json:"loket3"`
}

// GetDateQueueWithLoketCount mengambil tanggal unik dan jumlah data per loket
func GetDateService(db *sql.DB) []DateWithLoketCount {
	query := `
        SELECT 
            tanggal,
            COUNT(id) AS jumlah,
            SUM(CASE WHEN loket = 1 THEN 1 ELSE 0 END) AS loket1,
            SUM(CASE WHEN loket = 2 THEN 1 ELSE 0 END) AS loket2,
            SUM(CASE WHEN loket = 3 THEN 1 ELSE 0 END) AS loket3
        FROM tbl_antrian
        GROUP BY tanggal
        ORDER BY tanggal;
    `

	rows, _ := db.Query(query)
	defer rows.Close()

	var dates []DateWithLoketCount
	for rows.Next() {
		var date DateWithLoketCount
		rows.Scan(&date.Tanggal, &date.Jumlah, &date.Loket1, &date.Loket2, &date.Loket3)
		dates = append(dates, date)
	}

	return dates
}
