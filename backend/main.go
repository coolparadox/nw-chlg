package main

import (
	"log"
	"net/http"

	"github.com/coolparadox/cpf/backend/common"
	"github.com/coolparadox/cpf/backend/routers"
)

func main() {

	common.StartUp()
	router := routers.InitRoutes()
	server := &http.Server{
		Addr:    common.AppConfig.Server,
		Handler: router,
	}
	log.Println("Starting to serve...")
	server.ListenAndServe()
}
