package models

/*

CPF and CNPJ validation algorithms were adapted from:
<https://gopher.net.br/validacao-de-cpf-e-cnpj-em-go/>

Original author: Arthur Mastropietro

*/

import (
	"errors"
	"fmt"
	"strconv"
	"strings"
	"unicode"
)

// TODO(Rafael): improve detail of error messages
func ValidateCpf(cpf string) (string, error) {
	cpf = strings.Replace(cpf, ".", "", -1)
	cpf = strings.Replace(cpf, "-", "", -1)
	for _, c := range cpf {
		if !unicode.IsDigit(c) {
			return cpf, errors.New("invalid CPF")
		}
	}
	cpf = fmt.Sprintf("%011v", cpf)
	if len(cpf) != 11 {
		return cpf, errors.New("invalid CPF")
	}
	var eq bool
	var dig string
	for _, val := range cpf {
		if len(dig) == 0 {
			dig = string(val)
		}
		if string(val) == dig {
			eq = true
			continue
		}
		eq = false
		break
	}
	if eq {
		return cpf, errors.New("invalid CPF")
	}

	i := 10
	sum := 0
	for index := 0; index < len(cpf)-2; index++ {
		pos, _ := strconv.Atoi(string(cpf[index]))
		sum += pos * i
		i--
	}

	prod := sum * 10
	mod := prod % 11
	if mod == 10 {
		mod = 0
	}
	digit1, _ := strconv.Atoi(string(cpf[9]))
	if mod != digit1 {
		return cpf, errors.New("invalid CPF")
	}
	i = 11
	sum = 0
	for index := 0; index < len(cpf)-1; index++ {
		pos, _ := strconv.Atoi(string(cpf[index]))
		sum += pos * i
		i--
	}
	prod = sum * 10
	mod = prod % 11
	if mod == 10 {
		mod = 0
	}
	digit2, _ := strconv.Atoi(string(cpf[10]))
	if mod != digit2 {
		return cpf, errors.New("invalid CPF")
	}

	return cpf, nil
}

// TODO(Rafael): improve detail of error messages
func ValidateCnpj(cnpj string) (string, error) {
	cnpj = strings.Replace(cnpj, ".", "", -1)
	cnpj = strings.Replace(cnpj, "-", "", -1)
	cnpj = strings.Replace(cnpj, "/", "", -1)
	for _, c := range cnpj {
		if !unicode.IsDigit(c) {
			return cnpj, errors.New("invalid CNPJ")
		}
	}
	cnpj = fmt.Sprintf("%014v", cnpj)
	if len(cnpj) != 14 {
		return cnpj, errors.New("invalid CNPJ")
	}

	algs := []int{5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2}
	var algProdCpfDig1 = make([]int, 12, 12)
	for key, val := range algs {
		intParsed, _ := strconv.Atoi(string(cnpj[key]))
		sumTmp := val * intParsed
		algProdCpfDig1[key] = sumTmp
	}
	sum := 0
	for _, val := range algProdCpfDig1 {
		sum += val
	}
	digit1 := sum % 11
	if digit1 < 2 {
		digit1 = 0
	} else {
		digit1 = 11 - digit1
	}
	char12, _ := strconv.Atoi(string(cnpj[12]))
	if char12 != digit1 {
		return cnpj, errors.New("invalid CNPJ")
	}
	algs = append([]int{6}, algs...)

	var algProdCpfDig2 = make([]int, 13, 13)
	for key, val := range algs {
		intParsed, _ := strconv.Atoi(string(cnpj[key]))

		sumTmp := val * intParsed
		algProdCpfDig2[key] = sumTmp
	}
	sum = 0
	for _, val := range algProdCpfDig2 {
		sum += val
	}

	digit2 := sum % 11
	if digit2 < 2 {
		digit2 = 0
	} else {
		digit2 = 11 - digit2
	}
	char13, _ := strconv.Atoi(string(cnpj[13]))
	if char13 != digit2 {
		return cnpj, errors.New("invalid CNPJ")
	}

	return cnpj, nil
}

