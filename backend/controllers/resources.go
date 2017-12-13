package controllers

import (
	"github.com/coolparadox/cpf/backend/models"
)

type (
	// For Get - /cpfs
	CpfsResource struct {
		Data []models.Cpf `json:"data"`
	}
	// For Post/Put - /cpfs
	CpfResource struct {
		Data models.Cpf `json:"data"`
	}
)
