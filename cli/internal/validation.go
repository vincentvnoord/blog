package validation

import (
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

func ValidateDescription(description string) error {
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

func ValidateTitle(title string) error {
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

func ValidateFilePath(filePath string) error {
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
