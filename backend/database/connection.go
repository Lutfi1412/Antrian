package database

import (
	"database/sql"
	"log"

	_ "github.com/go-sql-driver/mysql"
)

// InitializeDB membuka koneksi ke database MySQL dan mengembalikan objek *sql.DB
func InitializeDB() *sql.DB {
	dsn := "root:@tcp(localhost:3306)/db_antrian" // Ganti dengan data koneksi Anda
	db, err := sql.Open("mysql", dsn)
	if err != nil {
		log.Fatal("Error connecting to the database: ", err)
	}
	return db
}
