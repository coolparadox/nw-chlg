package routers

import (
	"github.com/gorilla/mux"
	"github.com/coolparadox/cpf/backend/controllers"
)

func SetCpfRouters(router *mux.Router) *mux.Router {
	router.HandleFunc("/cpfs", controllers.GetCpfs).Methods("GET")
	router.HandleFunc("/cpfs", controllers.CreateCpf).Methods("POST")
	router.HandleFunc("/cpfs/{id}", controllers.DeleteCpf).Methods("DELETE")
	return router
}
