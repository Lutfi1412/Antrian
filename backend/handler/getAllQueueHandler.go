package handler

import (
	"encoding/json"
	"my-app-backend/database"
	"my-app-backend/services" // Import the services package where GetAllgQueue is defined
	"net/http"

	_ "github.com/go-sql-driver/mysql"
)

// Struct for the response
type QueueResponse struct {
	Queues []services.Queue `json:"queues"` // List of queues
}

// Handler to get all the queue data
func GetAllQueueHandler(w http.ResponseWriter, r *http.Request) {
	// Set the response header to application/json

	w.Header().Set("Content-Type", "application/json")

	// Initialize the database connection
	db := database.InitializeDB()
	defer db.Close()

	queues := services.GetAllQueue(db)
	// Prepare the response data
	response := QueueResponse{Queues: queues}
	json.NewEncoder(w).Encode(response)
}
