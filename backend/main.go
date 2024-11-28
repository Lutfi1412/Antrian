package main

import (
	"log"
	"my-app-backend/handler"
	"net/http"

	"github.com/rs/cors"
)

func main() {
	// Register handler for the route
	http.HandleFunc("/api/queue/number", handler.JumlahAntrianHandler) // GET to fetch current queue number
	http.HandleFunc("/api/queue/add", handler.AntrianHandler)
	http.HandleFunc("/api/next", handler.GetNextQueueHandler) // POST to add new queue number
	http.HandleFunc("/api/remaining", handler.GetRemainingQueueHandler)
	http.HandleFunc("/api/now", handler.GetNowQueueHandler)
	http.HandleFunc("/api/all", handler.GetAllQueueHandler)
	http.HandleFunc("/api/updatestatus", handler.UpdateStatusHandler)
	http.HandleFunc("/api/dates", handler.GetDateQueueHandler)
	http.HandleFunc("/api/delete", handler.DeleteDateHandler)

	// Setup CORS middleware to allow requests from http://localhost:3000
	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000"},                   // Allow React frontend
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"}, // Allow GET, POST and OPTIONS methods
		AllowedHeaders:   []string{"Content-Type"},                            // Allow Content-Type header and X-Requested-With
		AllowCredentials: true,                                                // If you need credentials like cookies, you can set this to true
	})

	// Apply CORS middleware to the default HTTP handler
	handler := c.Handler(http.DefaultServeMux)

	// Start the server on port 8080
	log.Println("Server started on http://localhost:8080")
	http.ListenAndServe(":8080", handler)
}
