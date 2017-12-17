package routers

import (
	"github.com/gorilla/mux"
	"net/http"
)

func InitRoutes() *mux.Router {
	router := mux.NewRouter().StrictSlash(false)
	router = SetCpfRouters(router)
	router.PathPrefix("/").Handler(http.FileServer(http.Dir("/root/public/")))
	return router
}
