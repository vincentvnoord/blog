package main

import (
	"flag"
	"fmt"
	"os"
	"path/filepath"
	"strings"
)

type BlogPost struct {
	Title       string
	Description string
	Content     string
}

func main() {
	args := os.Args

	if len(args) < 2 {
		fmt.Println("Usage: <command> [<args>]")
		fmt.Println("Available commands: upload")
		os.Exit(1)
	}

	command := args[1]

	switch command {
	case "upload":
		uploadCmd := flag.NewFlagSet("upload", flag.ExitOnError)

		title := uploadCmd.String("title", "", "Title of the blog post")
		description := uploadCmd.String("description", "", "Description of the blog post")
		uploadCmd.Parse(args[2:])

		filePath := uploadCmd.Arg(0)
		err := validateFilePath(filePath)
		if err != nil {
			fmt.Println(err)
			os.Exit(1)
		}

		err = validateDescription(*description)
		if err != nil {
			fmt.Println(err)
			os.Exit(1)
		}

		err = validateTitle(*title)
		if err != nil {
			fmt.Println(err)
			os.Exit(1)
		}

		fmt.Printf("Uploading file: %s with title: %s\n", filePath, *title)

		content, err := os.ReadFile(filePath)
		if err != nil {
			fmt.Printf("Error reading file: %s\n", err)
			os.Exit(1)
		}

		// Upload content and title to the server
		fmt.Printf("File content: %s\n", string(content))
		blogPOst := BlogPost{
			Title:       *title,
			Description: *description,
			Content:     string(content),
		}

		fmt.Printf("Blog post uploaded successfully: %+v\n", blogPOst)
	default:
		fmt.Printf("Unknown command: %s\n", command)
	}
}

func validateDescription(description string) error {
	if description == "" {
		return fmt.Errorf("Error: Description is required for upload command")
	}

	if len(description) < 10 {
		return fmt.Errorf("Error: Description must be at least 10 characters long")
	}

	if len(description) > 200 {
		return fmt.Errorf("Error: Description must not exceed 200 characters")
	}

	return nil
}

func validateTitle(title string) error {
	if title == "" {
		return fmt.Errorf("Error: Title is required for upload command")
	}

	if len(title) < 5 {
		return fmt.Errorf("Error: Title must be at least 5 characters long")
	}

	if len(title) > 60 {
		return fmt.Errorf("Error: Title must not exceed 60 characters")
	}

	return nil
}

func validateFilePath(filePath string) error {
	if filePath == "" {
		return fmt.Errorf("Error: File path is required for upload command: file/to/post.md")
	}

	info, err := os.Stat(filePath)

	if os.IsNotExist(err) {
		return fmt.Errorf("file does not exist: %s", filePath)
	}

	if info.IsDir() {
		return fmt.Errorf("file needs to be a valid markdown file: %s", filePath)
	}

	if strings.ToLower(filepath.Ext(filePath)) != ".md" {
		return fmt.Errorf("Error: file is not a markdown (.md) file")
	}

	return nil
}
