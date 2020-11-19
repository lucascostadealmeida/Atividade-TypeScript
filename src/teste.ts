//Importando as class Person, Book e Periodical
import Person, { Gender } from "./entities/Person.js"
import Book from "./entities/Book.js"
import Periodical from "./entities/Periodical.js"

//Declarando o valor da variável "birth" da class Person
let birth = new Date('2002-02-08T00:00:00')

//Declarando os valores das variáveis "name", "Gender" e utilizando o valor da variável "birth" que foi atribuída anteriormente  
let person = new Person("Lucas", birth, Gender.Male)

//Testando as atribuições na class Person
const teste = new Person ("Lucas",birth , Gender.Male)

//Testando as atribuições na class Book
const teste2 = new Book("Programa", "Aspira" ,1,person, 2, 3, 4)

//Testando as atribuições na class Periodical
const teste3 = new Periodical ("Programa", "Aspira",1, person, 2, 3, 4)

//Armazenando os dados num array auxiliar
const aux = [teste, teste2, teste3]

//Mostrando os dados com o auxílio do console
console.log(aux)