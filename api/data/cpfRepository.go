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

func (r *CpfRepository) GetCpfById(id string) (models.Cpf, error) {
	var answer models.Cpf
	if !bson.IsObjectIdHex(id) {
		return answer, mgo.ErrNotFound
	}
	err := r.C.FindId(bson.ObjectIdHex(id)).One(&answer)
	return answer, err
}

func (r *CpfRepository) GetCpfByCpf(cpf string) (models.Cpf, error) {
	var answer models.Cpf
	err := r.C.Find(bson.M{"cpf": cpf}).One(&answer)
	return answer, err
}

func (r *CpfRepository) Delete(id string) error {
	if !bson.IsObjectIdHex(id) {
		return mgo.ErrNotFound
	}
	err := r.C.Remove(bson.M{"_id": bson.ObjectIdHex(id)})
	return err
}

func (r *CpfRepository) Update(id string, cpf *models.Cpf) (models.Cpf, error) {
  // log.Printf("Update %v %v", id, *cpf);
	if !bson.IsObjectIdHex(id) {
		return *cpf, mgo.ErrNotFound
	}
	err := r.C.UpdateId(bson.ObjectIdHex(id), bson.M{
		"$set": bson.M{
			"cpf": cpf.Cpf,
			"is_cnpj": cpf.IsCnpj,
			"blacklisted": cpf.Blacklisted,
			"name": cpf.Name,
			"comment": cpf.Comment,
			},
		})
  if err != nil {
    // log.Printf("UpdateId error %v", err)
    return *cpf, err
  }
	var answer models.Cpf
	err = r.C.FindId(bson.ObjectIdHex(id)).One(&answer)
	if err != nil {
    // log.Printf("FindId error %v", err)
    return *cpf, err
	}
  // log.Printf("answer %v", answer)
	return answer, err
}

