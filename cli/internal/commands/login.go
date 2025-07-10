package commands

import (
	"fmt"
	"os"
	"strings"
	"syscall"

	"github.com/vincentvnoord/blog/internal/auth"
	"golang.org/x/term"
)

func Login() {
	fmt.Println("Please enter your API secret:")
	bytePassword, err := term.ReadPassword(int(syscall.Stdin))
	if err != nil {
		fmt.Println("Error reading password:", err)
		os.Exit(1)
	}

	secret := strings.TrimSpace(string(bytePassword))
	auth.SaveSecret(secret)
}
