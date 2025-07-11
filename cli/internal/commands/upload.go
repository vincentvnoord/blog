package commands

import (
	"bytes"
	"encoding/json"
	"flag"
	"fmt"
	"io"
	"net/http"
	"os"

	validation "github.com/vincentvnoord/blog/internal"
	"github.com/vincentvnoord/blog/internal/auth"
	"github.com/vincentvnoord/blog/internal/config"
)

type BlogPostCreate struct {
	Title       string `json:"title"`
	Description string `json:"description"`
	Content     string `json:"content"`
}

type BlogPost struct {
	BlogPostCreate
	ID          int     `json:"id"`
	Slug        string  `json:"slug"`
	CreatedAt   string  `json:"created_at"`
	PublishedAt *string `json:"published_at"`
}

type BlogPostUploadResponse struct {
	ID int `json:"id"`
}

func Upload(args []string) {
	uploadCmd := flag.NewFlagSet("upload", flag.ExitOnError)

	title := uploadCmd.String("title", "", "Title of the blog post")
	description := uploadCmd.String("description", "", "Description of the blog post")
	uploadCmd.Parse(args)

	filePath := uploadCmd.Arg(0)
	err := validation.ValidateFilePath(filePath)
	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}

	err = validation.ValidateDescription(*description)
	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}

	err = validation.ValidateTitle(*title)
	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}

	fmt.Printf("Uploading file: %s with title: %s\n", filePath, *title)

	content, err := os.ReadFile(filePath)
	if err != nil {
		fmt.Printf("%s\n", err)
		os.Exit(1)
	}

	blogPost := BlogPostCreate{
		Title:       *title,
		Description: *description,
		Content:     string(content),
	}

	blogPostResponse, err := sendRequest(&blogPost)
	if err != nil {
		fmt.Printf("Error uploading blog post: %s\n", err)
		os.Exit(1)
	}

	fmt.Printf("Blog post uploaded successfully with ID: %d\n", blogPostResponse.ID)
	fmt.Println("You can view your blog post at:", fmt.Sprintf("%s/posts/drafts/%d", config.FRONTEND_URL, blogPostResponse.ID))
}

func sendRequest(blogPost *BlogPostCreate) (*BlogPostUploadResponse, error) {
	body, err := json.Marshal(blogPost)
	if err != nil {
		return nil, fmt.Errorf("Error marshalling blog post: %s", err)
	}

	client := &http.Client{}

	requestUrl := fmt.Sprintf("%s/posts/upload", config.API_URL)
	req, err := http.NewRequest("POST", requestUrl, bytes.NewReader(body))
	if err != nil {
		return nil, fmt.Errorf("Error creating request: %s", err)
	}

	bearer, err := auth.GetSecretAsBearer()
	if err != nil {
		return nil, fmt.Errorf("Error getting secret: %s", err)
	}

	req.Header.Set("Authorization", bearer)
	req.Header.Set("Content-Type", "application/json")

	res, err := client.Do(req)
	if err != nil {
		return nil, fmt.Errorf("Error making POST request: %s\n", err)
	}
	defer res.Body.Close()

	bodyBytes, err := io.ReadAll(res.Body)
	if err != nil {
		return nil, fmt.Errorf("Error reading response body: %s\n", err)
	}

	if res.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("Failed to upload blog post, response %d: %s\n", res.StatusCode, string(bodyBytes))
	}

	blogPostResponse := &BlogPostUploadResponse{}
	err = json.Unmarshal(bodyBytes, blogPostResponse)
	if err != nil {
		return nil, fmt.Errorf("Error unmarshalling response: %s\n", err)
	}

	return blogPostResponse, nil
}
