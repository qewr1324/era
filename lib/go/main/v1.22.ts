export function generate(params: any): string {
	return `package main

import (
	"log"
	"net/http"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

type User struct {
	ID        uint      \`json:"id"\`
	Username  string    \`json:"username"\`
	Email     string    \`json:"email"\`
	CreatedAt time.Time \`json:"created_at"\`
}

var users = []User{
	{ID: 1, Username: "john_doe", Email: "john@example.com", CreatedAt: time.Now()},
	{ID: 2, Username: "jane_doe", Email: "jane@example.com", CreatedAt: time.Now()},
}

func main() {
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found")
	}

	router := gin.Default()

	router.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "Welcome to Go API",
		})
	})

	router.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"status":    "ok",
			"timestamp": time.Now().Unix(),
		})
	})

	api := router.Group("/api")
	{
		api.GET("/users", getUsers)
		api.GET("/users/:id", getUserByID)
		api.POST("/users", createUser)
	}

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Server starting on port %s", port)
	router.Run(":" + port)
}

func getUsers(c *gin.Context) {
	c.JSON(http.StatusOK, users)
}

func getUserByID(c *gin.Context) {
	id := c.Param("id")
	
	for _, user := range users {
		if string(rune(user.ID)) == id {
			c.JSON(http.StatusOK, user)
			return
		}
	}
	
	c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
}

func createUser(c *gin.Context) {
	var newUser User
	
	if err := c.ShouldBindJSON(&newUser); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	
	newUser.ID = uint(len(users) + 1)
	newUser.CreatedAt = time.Now()
	users = append(users, newUser)
	
	c.JSON(http.StatusCreated, newUser)
}`;
}
