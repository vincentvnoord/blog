package commands

import (
	"net/http"

	"github.com/vincentvnoord/blog/internal/auth"
	"github.com/vincentvnoord/blog/internal/config"
)

func Delete(postId string) {
	client := http.Client{}

	requestUrl := config.API_URL + "/posts/" + postId

	req, err := http.NewRequest("DELETE", requestUrl, nil)
	if err != nil {
		println("Error sending DELETE request:", err.Error())
		return
	}

	bearer, err := auth.GetSecretAsBearer()
	if err != nil {
		println("Error getting secret:", err.Error())
		return
	}

	req.Header.Set("Authorization", bearer)
	req.Header.Set("Content-Type", "application/json")

	res, err := client.Do(req)
	if err != nil {
		println("Error deleting post:", err.Error())
		return
	}

	defer res.Body.Close()

	if res.StatusCode != 200 {
		println("Unsuccessful delete, response code:", res.StatusCode)
		return
	}

	println("Post deleted successfully!")
}
