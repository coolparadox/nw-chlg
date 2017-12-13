package data

import (
	"github.com/coolparadox/cpf/backend/models"
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

type CpfRepository struct {
	C *mgo.Collection
}

func (r *CpfRepository) Create(cpf *models.Cpf) error {
	obj_id := bson.NewObjectId()
	cpf.Id = obj_id
	err := r.C.Insert(&cpf)
	return err
}

func (r *CpfRepository) GetAll() []models.Cpf {
	var cpfs []models.Cpf
	iter := r.C.Find(nil).Iter()
	result := models.Cpf{}
	for iter.Next(&result) {
		cpfs = append(cpfs, result)
	}
	return cpfs
}

func (r *CpfRepository) Delete(id string) error {
	err := r.C.Remove(bson.M{"_id": bson.ObjectIdHex(id)})
	return err
}
