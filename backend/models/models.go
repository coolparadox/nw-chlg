package models

import (
	"gopkg.in/mgo.v2/bson"
)

type (
	Cpf struct {
		Id       bson.ObjectId `bson:"_id,omitempty" json:"id"`
		Name     string        `json:"name"`
		LastName string        `json:"lastname"`
	}
)
