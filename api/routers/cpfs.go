package routers

import (
	"github.com/gorilla/mux"
	"github.com/coolparadox/cpf/api/controllers"
)

func SetCpfRouters(router *mux.Router) *mux.Router {
	router.HandleFunc("/cpfs", controllers.GetCpfs).Methods("GET")
	router.HandleFunc("/cpfs/{id}", controllers.GetCpfById).Methods("GET")
	router.HandleFunc("/cpfs/by_cpf/{cpf}", controllers.GetCpfByCpf).Methods("GET")
	router.HandleFunc("/cpfs", controllers.CreateCpf).Methods("POST")
	router.HandleFunc("/cpfs/{id}", controllers.DeleteCpf).Methods("DELETE")
	router.HandleFunc("/cpfs/{id}", controllers.UpdateCpf).Methods("PUT")
	return router
}
