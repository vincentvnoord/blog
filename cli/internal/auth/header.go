package auth

import "net/http"

func AddAuthorizationHeader(req *http.Request) error {
	secret, err := GetSecret()
	if err != nil {
		return err
	}

	req.Header.Set("Authorization", secret.AsBearer())
	return nil
}
