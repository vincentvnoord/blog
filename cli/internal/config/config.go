package config

import (
	"fmt"
	"os"
)

var API_URL = func() string {
	if url := os.Getenv("API_URL"); url != "" {
		fmt.Printf("Using API URL from environment: %s\n", url)
		return url
	}

	return "http://localhost:3000/api"
}()

var FRONTEND_URL = func() string {
	if url := os.Getenv("FRONTEND_URL"); url != "" {
		fmt.Printf("Using FRONTEND URL from environment: %s\n", url)
		return url
	}

	return "http://localhost:3000"
}()
