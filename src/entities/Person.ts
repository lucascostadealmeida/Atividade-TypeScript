/*
Crie um arquivo com uma classe denominada Person, 
a qual deve ser a exportação padrão deste arquivo, 
contendo as propriedades name do tipo String, birth do tipo 
Date e gender do tipo Gender.
Implemente também o construtor da classe, 
o qual deve receber parâmetros equivalentes 
a cada propriedade a ser preenchida em uma 
instância desta classe. 
Crie também (no mesmo arquivo) um enumerador denominado Gender, 
com os membros Male = 'm' e Female = 'f'.
*/

//Fazendo o enum do Gender, onde define o sexo da pessoa
export enum Gender {
    Female = `f`,
    Male = `m`
}

//Estruturando a class Person e construindo seu constructor
export class Person {
    name: string
    birth: Date
    gender: Gender

    constructor (name: string, birth: Date, gender: Gender) {
        this.name = name;
        this.birth = birth;
        this.gender = gender;
    }
}

export default Person





