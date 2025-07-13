package config

import (
	"encoding/json"
	"fmt"
	"io"
	"os"
	"path/filepath"
)

type AppConfig struct {
	ApiUrl      string `json:"apiUrl"`
	FrontendUrl string `json:"frontendUrl"`
}

var (
	API_URL      string
	FRONTEND_URL string
)

func configDir() (string, error) {
	userDir, err := os.UserConfigDir()
	if err != nil {
		return "", err
	}

	configDir := filepath.Join(userDir, "blog")
	return configDir, nil
}

func init() {
	configDir, err := configDir()
	if err != nil {
		fmt.Printf("Failed to create user config directory path %s: %s", configDir, err)
	}

	if err := os.MkdirAll(configDir, 0755); err != nil {
		fmt.Printf("failed to create directory %s: %s", configDir, err)
	}

	filePath := filepath.Join(configDir, "config.json")

	// Read or create the config file
	file, err := os.OpenFile(filePath, os.O_RDWR|os.O_CREATE, 0644)
	if err != nil {
		fmt.Printf("failed to get config file: %s", err)
	}
	defer file.Close()

	bytes, err := io.ReadAll(file)
	if err != nil {
		fmt.Printf("failed to read config file: %s", err)
	}

	if len(bytes) == 0 {
		// Generate config and don't continue to try to parse the existing file!
		conf, err := generateConfig(file)
		if err != nil {
			fmt.Printf("Failed to generate config: %s", err)
		}

		setGlobalVariables(conf)
		return
	}

	// Parse the json
	appConfig := &AppConfig{}
	err = json.Unmarshal(bytes, appConfig)
	if err != nil {
		fmt.Printf("failed to parse json: %s\n", err)
	}

	// Set the global variables
	setGlobalVariables(appConfig)
}

func setGlobalVariables(appConfig *AppConfig) {
	API_URL = appConfig.ApiUrl
	FRONTEND_URL = appConfig.FrontendUrl
}

func generateConfig(file *os.File) (*AppConfig, error) {
	defaultConfig := AppConfig{
		ApiUrl:      "http://localhost:3000/api",
		FrontendUrl: "http://localhost:3000",
	}

	encoded, err := json.MarshalIndent(defaultConfig, "", "	")

	if err != nil {
		return nil, fmt.Errorf("Error during MarshalIndent: %s", err)
	}

	file.Truncate(0)
	file.Seek(0, 0)

	if _, err := file.Write(encoded); err != nil {
		return nil, fmt.Errorf("Failed to write generated config: %s", err)
	}

	return &defaultConfig, nil
}
