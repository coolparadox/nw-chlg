package controllers

import (
	"encoding/json"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/coolparadox/cpf/backend/common"
	"github.com/coolparadox/cpf/backend/data"
	"gopkg.in/mgo.v2"
)

// Handler for HTTP Get - "/cpfs"
func GetCpfs(w http.ResponseWriter, r *http.Request) {
	// Create new context
	context := NewContext()
	defer context.Close()
	c := context.DbCollection("cpfs")
	repo := &data.CpfRepository{c}
	// Get all cpfs form repository
	cpfs := repo.GetAll()
	j, err := json.Marshal(CpfsResource{Data: cpfs})
	if err != nil {
		common.DisplayAppError(w, err, "An unexpected error has occurred", 500)
		return
	}
	// Send response back
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(j)
}

// Handler for HTTP Post - "/cpfs"
// Create a new Showtime document
func CreateCpf(w http.ResponseWriter, r *http.Request) {
	var dataResource CpfResource
	// Decode the incoming Cpf json
	err := json.NewDecoder(r.Body).Decode(&dataResource)
	if err != nil {
		common.DisplayAppError(w, err, "Invalid Cpf data", 500)
		return
	}
	cpf := &dataResource.Data
	// Create new context
	context := NewContext()
	defer context.Close()
	c := context.DbCollection("cpfs")
	// Create Cpf
	repo := &data.CpfRepository{c}
	repo.Create(cpf)
	// Create response data
	j, err := json.Marshal(dataResource)
	if err != nil {
		common.DisplayAppError(w, err, "An unexpected error has occurred", 500)
		return
	}
	// Send response back
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(j)
}

// Handler for HTTP Delete - "/cpfs/{id}"
// Delete a Cpf document by id
func DeleteCpf(w http.ResponseWriter, r *http.Request) {
	// Get id from incoming url
	vars := mux.Vars(r)
	id := vars["id"]

	// Create new context
	context := NewContext()
	defer context.Close()
	c := context.DbCollection("cpfs")

	// Remove cpf by id
	repo := &data.CpfRepository{c}
	err := repo.Delete(id)
	if err != nil {
		if err == mgo.ErrNotFound {
			w.WriteHeader(http.StatusNotFound)
			return
		} else {
			common.DisplayAppError(w, err, "An unexpected error ahs occurred", 500)
			return
		}
	}

	// Send response back
	w.WriteHeader(http.StatusNoContent)
}
