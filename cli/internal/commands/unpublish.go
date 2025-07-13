package commands

import (
	"fmt"
	"io"
	"net/http"
	"os"

	"github.com/vincentvnoord/blog/internal/auth"
	"github.com/vincentvnoord/blog/internal/config"
)

func Unpublish(postId string) {
	client := http.Client{}

	requestUrl := fmt.Sprintf("%s/posts/%s/unpublish", config.API_URL, postId)

	req, err := http.NewRequest("POST", requestUrl, nil)
	if err != nil {
		fmt.Println("Error sending POST request:", err)
		os.Exit(1)
	}

	bearer, err := auth.GetSecretAsBearer()
	if err != nil {
		fmt.Printf("Error getting secret: %s", err)
		os.Exit(1)
	}

	req.Header.Set("Authorization", bearer)
	req.Header.Set("Content-Type", "application/json")

	res, err := client.Do(req)
	if err != nil {
		fmt.Println("Error unpublishing post:", err)
		os.Exit(1)
	}

	defer res.Body.Close()

	bodyBytes, err := io.ReadAll(res.Body)
	if err != nil {
		fmt.Printf("Error reading response body: %s\n", err)
		os.Exit(1)
	}

	if res.StatusCode != 200 {
		fmt.Printf("Unsuccesful unpublish, response %d: %s\n", res.StatusCode, string(bodyBytes))
		os.Exit(1)
	}

	fmt.Println("Post unpublished succesfully!")
}
