/*Crie um arquivo com uma classe denominada Document, a qual deve 
ser a exportação padrão deste arquivo, contendo as propriedades title 
do tipo String, subtitle do tipo String, publishedAt dos tipos Date ou
Number, author do tipo Person. Implemente também o construtor da 
classe, o qual deve receber parâmetros equivalentes a cada propriedade,
a serem preenchidas em uma instância desta classe. Não se esqueça de 
importar a classe Person neste arquivo, para que ela possa ser 
utilizada para tipagem da propriedade author.
*/

//Importando a class Person
 import Person from "./Person.js"

//Estruturando a class Document e construindo seu constructor
export class Document {
    title: string
    subtitle: string
    publishedAt: Date | number
    author: Person

    constructor (title: string, subtitle: string, publishedAt: Date | number, author: Person) {
        this.title = title
        this.subtitle = subtitle
        this.publishedAt = publishedAt
        this.author = author
    }
}

export default Document
