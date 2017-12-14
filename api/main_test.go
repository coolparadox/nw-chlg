package main_test

import (
	"encoding/json"
	"fmt"
	"github.com/coolparadox/cpf/api/controllers"
	"net/http"
	"strings"
	"testing"
)

// TODO(Rafael): Test for content instead of http status only
// TODO(Rafael): Reduce boilerplate code to increase maintainability

func TestGetAll(t *testing.T) {
	req, err := http.NewRequest("GET", "http://localhost:8080/cpfs", nil)
	if err != nil {
		t.Fatalf("%v", err)
	}
	c := http.Client{}
	resp, err := c.Do(req)
	if err != nil {
		t.Fatalf("%v", err)
	}
	if resp.StatusCode != http.StatusOK {
		t.Fatalf("unexpected http response status (expected %v %v, got %v)", http.StatusOK, http.StatusText(http.StatusOK), resp.Status)
	}
}

var kCpfPost string = "{" +
    "\"data\": {" +
        "\"blacklisted\": false," +
        "\"comment\": \"Hey we must hire this Rafael dude\"," +
        "\"cpf\": \"24603682832\"," +
        "\"is_cnpj\": false," +
        "\"name\": \"Rafael Lorandi\"" +
    "}" +
"}"

var kInvalidCpfPost string = "{" +
    "\"data\": {" +
        "\"blacklisted\": false," +
        "\"comment\": \"Hey we must hire this Rafael dude\"," +
        "\"cpf\": \"25603682832\"," +
        "\"is_cnpj\": false," +
        "\"name\": \"Rafael Lorandi\"" +
    "}" +
"}"

var kCnpjPost string = "{" +
    "\"data\": {" +
        "\"blacklisted\": false," +
        "\"comment\": \"Rafael Lorandi, this is our guy indeed!\"," +
        "\"cpf\": \"28234170000150\"," +
        "\"is_cnpj\": true," +
        "\"name\": \"Rafael Lorandi\"" +
    "}" +
"}"

var kInvalidCnpjPost string = "{" +
    "\"data\": {" +
        "\"blacklisted\": false," +
        "\"comment\": \"Rafael Lorandi, this is our guy indeed!\"," +
        "\"cpf\": \"29234170000150\"," +
        "\"is_cnpj\": true," +
        "\"name\": \"Rafael Lorandi\"" +
    "}" +
"}"

var kCpfPut string = "{" +
    "\"data\": {" +
        "\"blacklisted\": false," +
        "\"comment\": \"As soon as Rafael wants to join us, the better\"," +
        "\"cpf\": \"24603682832\"," +
        "\"is_cnpj\": false," +
        "\"name\": \"Rafael Lorandi\"" +
    "}" +
"}"

func TestAddInvalidCpf(t *testing.T) {
	req, err := http.NewRequest("POST", "http://localhost:8080/cpfs", strings.NewReader(kInvalidCpfPost))
	if err != nil {
		t.Fatalf("%v", err)
	}
	c := http.Client{}
	resp, err := c.Do(req)
	if err != nil {
		t.Fatalf("%v", err)
	}
	if resp.StatusCode != http.StatusBadRequest {
		t.Fatalf("unexpected http response status (expected %v %v, got %v)", http.StatusBadRequest, http.StatusText(http.StatusBadRequest), resp.Status)
	}
}

func TestAddInvalidCnpj(t *testing.T) {
	req, err := http.NewRequest("POST", "http://localhost:8080/cpfs", strings.NewReader(kInvalidCnpjPost))
	if err != nil {
		t.Fatalf("%v", err)
	}
	c := http.Client{}
	resp, err := c.Do(req)
	if err != nil {
		t.Fatalf("%v", err)
	}
	if resp.StatusCode != http.StatusBadRequest {
		t.Fatalf("unexpected http response status (expected %v %v, got %v)", http.StatusBadRequest, http.StatusText(http.StatusBadRequest), resp.Status)
	}
}

func TestAddCpf(t *testing.T) {
	req, err := http.NewRequest("POST", "http://localhost:8080/cpfs", strings.NewReader(kCpfPost))
	if err != nil {
		t.Fatalf("%v", err)
	}
	c := http.Client{}
	resp, err := c.Do(req)
	if err != nil {
		t.Fatalf("%v", err)
	}
	if resp.StatusCode != http.StatusCreated {
		t.Fatalf("unexpected http response status (expected %v %v, got %v)", http.StatusCreated, http.StatusText(http.StatusCreated), resp.Status)
	}
}

func TestAddCnpj(t *testing.T) {
	req, err := http.NewRequest("POST", "http://localhost:8080/cpfs", strings.NewReader(kCnpjPost))
	if err != nil {
		t.Fatalf("%v", err)
	}
	c := http.Client{}
	resp, err := c.Do(req)
	if err != nil {
		t.Fatalf("%v", err)
	}
	if resp.StatusCode != http.StatusCreated {
		t.Fatalf("unexpected http response status (expected %v %v, got %v)", http.StatusCreated, http.StatusText(http.StatusCreated), resp.Status)
	}
}

func TestAddSameCpf(t *testing.T) {
	req, err := http.NewRequest("POST", "http://localhost:8080/cpfs", strings.NewReader(kCpfPost))
	if err != nil {
		t.Fatalf("%v", err)
	}
	c := http.Client{}
	resp, err := c.Do(req)
	if err != nil {
		t.Fatalf("%v", err)
	}
	if resp.StatusCode != http.StatusConflict {
		t.Fatalf("unexpected http response status (expected %v %v, got %v)", http.StatusConflict, http.StatusText(http.StatusConflict), resp.Status)
	}
}

func TestAddSameCnpj(t *testing.T) {
	req, err := http.NewRequest("POST", "http://localhost:8080/cpfs", strings.NewReader(kCnpjPost))
	if err != nil {
		t.Fatalf("%v", err)
	}
	c := http.Client{}
	resp, err := c.Do(req)
	if err != nil {
		t.Fatalf("%v", err)
	}
	if resp.StatusCode != http.StatusConflict {
		t.Fatalf("unexpected http response status (expected %v %v, got %v)", http.StatusConflict, http.StatusText(http.StatusConflict), resp.Status)
	}
}

var id1 string

func TestGetByCpf(t *testing.T) {
	req, err := http.NewRequest("GET", "http://localhost:8080/cpfs/by_cpf/24603682832", nil)
	if err != nil {
		t.Fatalf("%v", err)
	}
	c := http.Client{}
	resp, err := c.Do(req)
	if err != nil {
		t.Fatalf("%v", err)
	}
	if resp.StatusCode != http.StatusOK {
		t.Fatalf("unexpected http response status (expected %v %v, got %v)", http.StatusOK, http.StatusText(http.StatusOK), resp.Status)
	}
	var dataResource controllers.CpfResource
	err = json.NewDecoder(resp.Body).Decode(&dataResource)
	if err != nil {
		t.Fatalf("invalid json data: %s", err)
	}
	id1 = dataResource.Data.Id.Hex()
}

func TestGetByAbsentCpf(t *testing.T) {
	req, err := http.NewRequest("GET", "http://localhost:8080/cpfs/by_cpf/02259449956", nil)
	if err != nil {
		t.Fatalf("%v", err)
	}
	c := http.Client{}
	resp, err := c.Do(req)
	if err != nil {
		t.Fatalf("%v", err)
	}
	if resp.StatusCode != http.StatusNotFound {
		t.Fatalf("unexpected http response status (expected %v %v, got %v)", http.StatusNotFound, http.StatusText(http.StatusNotFound), resp.Status)
	}
}

func TestGetByInvalidCpf(t *testing.T) {
	req, err := http.NewRequest("GET", "http://localhost:8080/cpfs/by_cpf/02259449957", nil)
	if err != nil {
		t.Fatalf("%v", err)
	}
	c := http.Client{}
	resp, err := c.Do(req)
	if err != nil {
		t.Fatalf("%v", err)
	}
	if resp.StatusCode != http.StatusBadRequest {
		t.Fatalf("unexpected http response status (expected %v %v, got %v)", http.StatusBadRequest, http.StatusText(http.StatusBadRequest), resp.Status)
	}
}

func TestUpdate(t *testing.T) {
	req, err := http.NewRequest("PUT", fmt.Sprintf("http://localhost:8080/cpfs/%s", id1), strings.NewReader(kCpfPut))
	if err != nil {
		t.Fatalf("%v", err)
	}
	c := http.Client{}
	resp, err := c.Do(req)
	if err != nil {
		t.Fatalf("%v", err)
	}
	if resp.StatusCode != http.StatusOK {
		t.Fatalf("unexpected http response status (expected %v %v, got %v)", http.StatusOK, http.StatusText(http.StatusOK), resp.Status)
	}
}

func TestDelete(t *testing.T) {
	req, err := http.NewRequest("DELETE", fmt.Sprintf("http://localhost:8080/cpfs/%s", id1), nil)
	if err != nil {
		t.Fatalf("%v", err)
	}
	c := http.Client{}
	resp, err := c.Do(req)
	if err != nil {
		t.Fatalf("%v", err)
	}
	if resp.StatusCode != http.StatusNoContent {
		t.Fatalf("unexpected http response status (expected %v %v, got %v)", http.StatusNoContent, http.StatusText(http.StatusNoContent), resp.Status)
	}
}

