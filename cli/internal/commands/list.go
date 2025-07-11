package commands

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"text/tabwriter"
	"time"

	"github.com/vincentvnoord/blog/internal/auth"
	"github.com/vincentvnoord/blog/internal/config"
)

func List() {
	w := tabwriter.NewWriter(os.Stdout, 1, 1, 3, ' ', 0)

	blogPosts, err := makeRequest()
	if err != nil {
		fmt.Printf("%s", err)
		os.Exit(1)
	}

	fmt.Fprintln(w, "ID\tSlug\tTitle\tCreated at\tPublished at")

	for i := range blogPosts {
		blogPost := blogPosts[i]
		published := "-"
		if blogPost.PublishedAt != nil {
			published = formatDateTime(*blogPost.PublishedAt)
		}

		createdAt := formatDateTime(blogPost.CreatedAt)

		fmt.Fprintf(w, "%d\t%s\t%s\t%s\t%s\n", blogPost.ID, blogPost.Slug, blogPost.Title, createdAt, published)
	}

	w.Flush()
}

func formatDateTime(originalDate string) string {
	formatted := ""
	parsedTime, err := time.Parse(time.RFC3339, originalDate)
	if err != nil {
		formatted = "Error formatting"
	} else {
		converted := parsedTime.Local()
		formatted = converted.Format("02-01-2006 15:04:05")
	}

	return formatted
}

func makeRequest() ([]BlogPost, error) {
	client := &http.Client{}

	requestUrl := fmt.Sprintf("%s/posts", config.API_URL)
	req, err := http.NewRequest("GET", requestUrl, nil)
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
		return nil, fmt.Errorf("Error making GET request: %s\n", err)
	}
	defer res.Body.Close()

	bodyBytes, err := io.ReadAll(res.Body)
	if err != nil {
		return nil, fmt.Errorf("Error reading response body: %s\n", err)
	}

	if res.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("Failed to get list of blog posts, response %d: %s\n", res.StatusCode, string(bodyBytes))
	}

	blogPostResponse := &[]BlogPost{}
	err = json.Unmarshal(bodyBytes, blogPostResponse)
	if err != nil {
		return nil, fmt.Errorf("Error unmarshalling response: %s\n", err)
	}

	return *blogPostResponse, nil
}
