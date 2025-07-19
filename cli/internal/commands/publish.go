package commands

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"

	"github.com/vincentvnoord/blog/internal/auth"
	"github.com/vincentvnoord/blog/internal/config"
)

type PublishResult struct {
	Slug string `json:"slug"`
}

func Publish(postId string) {
	client := http.Client{}

	requestUrl := fmt.Sprintf("%s/posts/%s/publish", config.API_URL, postId)

	req, err := http.NewRequest("POST", requestUrl, nil)
	if err != nil {
		fmt.Println("Error creating new request:", err)
		os.Exit(1)
	}

	err = auth.AddAuthorizationHeader(req)
	if err != nil {
		fmt.Println("Error adding authorization header to request:", err)
		os.Exit(1)
	}

	req.Header.Set("Content-Type", "application/json")

	res, err := client.Do(req)
	if err != nil {
		fmt.Println("Error publishing post:", err)
		os.Exit(1)
	}

	defer res.Body.Close()

	bodyBytes, err := io.ReadAll(res.Body)
	if err != nil {
		fmt.Printf("Error reading response body: %s\n", err)
		os.Exit(1)
	}

	if res.StatusCode != 200 {
		fmt.Printf("Unsuccesful publish, response %d: %s\n", res.StatusCode, string(bodyBytes))
		os.Exit(1)
	}

	publishResult := &PublishResult{}
	err = json.Unmarshal(bodyBytes, publishResult)
	if err != nil {
		fmt.Println("Error unmarshalling response body:", err)
		os.Exit(1)
	}

	fmt.Printf("Post published succesfully! You can read it here: %s/posts/%s\n", config.FRONTEND_URL, publishResult.Slug)
}
