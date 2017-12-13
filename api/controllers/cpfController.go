package controllers

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/coolparadox/cpf/api/common"
	"github.com/coolparadox/cpf/api/data"
	"github.com/coolparadox/cpf/api/models"
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
	// TODO(Rafael): controls for pagination (skip, limit etc)
	cpfs := repo.GetAll()
	j, err := json.Marshal(CpfsResource{Data: cpfs})
	if err != nil {
		common.DisplayAppError(w, err, "An unexpected error has occurred", http.StatusInternalServerError)
		return
	}

	// Send response back
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(j)
}

// Handler for HTTP Post - "/cpfs"
func CreateCpf(w http.ResponseWriter, r *http.Request) {
	var dataResource CpfResource

	// Decode the incoming json data
	err := json.NewDecoder(r.Body).Decode(&dataResource)
	if err != nil {
		common.DisplayAppError(w, err, "Invalid json data", http.StatusBadRequest)
		return
	}
	cpfData := &dataResource.Data

	// Sanity check the input
	if cpfData.IsCnpj {
		sanitized_cpf, err := models.ValidateCnpj(cpfData.Cpf);
		if err != nil {
			common.DisplayAppError(w, err, "Invalid CNPJ", http.StatusBadRequest)
			return
		}
		cpfData.Cpf = sanitized_cpf;
	} else {
		sanitized_cpf, err := models.ValidateCpf(cpfData.Cpf);
		if err != nil {
			common.DisplayAppError(w, err, "Invalid CPF", http.StatusBadRequest)
			return
		}
		cpfData.Cpf = sanitized_cpf;
	}

	// Access database
	context := NewContext()
	defer context.Close()
	c := context.DbCollection("cpfs")
	repo := &data.CpfRepository{c}

	// Safeguard against double entry
	cpfData2, err := repo.GetCpfByCpf(cpfData.Cpf);
	if err == nil {
		common.DisplayAppError(w, fmt.Errorf("CPF/CNPJ found at id %v", cpfData2.Id), "Duplicated CPF/CNPJ", http.StatusForbidden)
		return
	}

	// Store item
	repo.Create(cpfData)

	// Send response
	j, err := json.Marshal(dataResource)
	if err != nil {
		common.DisplayAppError(w, err, "An unexpected error has occurred", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(j)
}

// Handler for HTTP Get - "/cpfs/{id}"
func GetCpfById(w http.ResponseWriter, r *http.Request) {

	// Get id from incoming url
	vars := mux.Vars(r)
	id := vars["id"]

	// Create new context
	context := NewContext()
	defer context.Close()
	c := context.DbCollection("cpfs")

	// Retrieve by id
	repo := &data.CpfRepository{c}
	cpfData, err := repo.GetCpfById(id)
	if err != nil {
		if err == mgo.ErrNotFound {
			w.WriteHeader(http.StatusNotFound)
			return
		} else {
			common.DisplayAppError(w, err, "An unexpected error has occurred", http.StatusInternalServerError)
			return
		}
	}

	// Send response
	j, err := json.Marshal(CpfResource{cpfData})
	if err != nil {
		common.DisplayAppError(w, err, "An unexpected error has occurred", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(j)
}


// Handler for HTTP Delete - "/cpfs/{id}"
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
			common.DisplayAppError(w, err, "An unexpected error has occurred", http.StatusInternalServerError)
			return
		}
	}

	// Send response back
	w.WriteHeader(http.StatusOK)
}

