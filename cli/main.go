package main

import (
	"fmt"
	"os"

	"github.com/joho/godotenv"
	"github.com/vincentvnoord/blog/internal/commands"
)

func main() {
	args := os.Args

	if len(args) < 2 {
		fmt.Println("Usage: <command> [<args>]")
		fmt.Println("Available commands: upload")
		os.Exit(1)
	}

	godotenv.Load()

	command := args[1]

	switch command {
	case "upload":
		commands.Upload(args[2:])
	case "login":
		commands.Login()
	case "list":
		commands.List()
	default:
		fmt.Printf("Unknown command: %s\n", command)
	}
}
