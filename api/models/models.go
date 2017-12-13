package models

import (
	"gopkg.in/mgo.v2/bson"
)

type (
	Cpf struct {
		Id          bson.ObjectId `bson:"_id,omitempty" json:"id"`
		Cpf         string        `json:"cpf"`
		IsCnpj      bool          `json:"is_cnpj"`
		Blacklisted bool          `json:"blacklisted"`
		Name        string        `json:"name"`
		Comment     string        `json:"comment"`
		// TODO(Rafael): further fields? phone address etc.
	}
)
