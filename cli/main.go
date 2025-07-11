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
		fmt.Println("Available commands:")
		fmt.Println("login - Prompts for API key and stores it in config file")
		fmt.Println("upload - Uploads markdown file to blog")
		fmt.Println("list - Lists all blog posts")
		fmt.Println("publish - Publish a blog post by ID")
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
	case "publish":
		commands.Publish(2)
	default:
		fmt.Printf("Unknown command: %s\n", command)
	}
}
