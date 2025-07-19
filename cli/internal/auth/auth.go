package auth

import (
	"fmt"
	"os"
	"path/filepath"
	"strings"
)

type Secret string

func (s Secret) AsBearer() string {
	return fmt.Sprintf("Bearer %s", s)
}

func GetSecret() (Secret, error) {
	userDir, err := os.UserConfigDir()
	if err != nil {
		return "", err
	}

	secretPath := filepath.Join(userDir, "blog", "secret")
	secret, err := os.ReadFile(secretPath)
	if err != nil {
		return "", fmt.Errorf("failed to read secret key from %s: %w", secretPath, err)
	}

	formatted := strings.TrimSpace(string(secret))

	return Secret(formatted), nil
}

func SaveSecret(secret string) error {
	userDir, err := os.UserConfigDir()
	if err != nil {
		return err
	}

	secretDir := filepath.Join(userDir, "blog")
	if err := os.MkdirAll(secretDir, 0755); err != nil {
		return fmt.Errorf("failed to create directory %s: %w", secretDir, err)
	}

	secretPath := filepath.Join(secretDir, "secret")
	if err := os.WriteFile(secretPath, []byte(secret), 0600); err != nil {
		return fmt.Errorf("failed to write secret key to %s: %w", secretPath, err)
	}

	return nil
}
