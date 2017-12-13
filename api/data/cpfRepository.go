package data

import (
	"github.com/coolparadox/cpf/api/models"
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
	var answer []models.Cpf
	iter := r.C.Find(nil).Iter()
	result := models.Cpf{}
	for iter.Next(&result) {
		answer = append(answer, result)
	}
	return answer
}

func (r *CpfRepository) GetCpf(cpf string) (models.Cpf, error) {
	var answer models.Cpf
	err := r.C.Find(bson.M{"cpf": cpf}).One(&answer)
	return answer, err
}

func (r *CpfRepository) Delete(id string) error {
	err := r.C.Remove(bson.M{"_id": bson.ObjectIdHex(id)})
	return err
}
