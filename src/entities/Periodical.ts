/*
Crie um arquivo com uma classe denominada Periodical, a qual deve ser a 
exportação padrão deste arquivo, contendo as propriedades issn do tipo Number, 
volume do tipo Number e issue 
do tipo Number. Garanta que a classe Periodical herde as outras propriedades a 
partir da classe Document. Implemente também o construtor da classe, o qual deve
receber parâmetros 
equivalentes a cada propriedade da classe Document e desta própria classe, a serem 
preenchidas em uma instância desta classe. Lembre-se que o construtor de uma 
classe filha deve chamar o 
construtor da classe pai para enviar os parâmetros corretos a serem preenchidos 
como propriedades herdadas da classe pai. Não se esqueça de importar a classe 
Document neste arquivo, para que 
ela possa ser utilizada na herança.
*/

//Importando as class Document e Person
import Document from "./Document.js"
import Person from "./Person.js"

//Estruturando a class Periodical onde algumas atribuições são herdadas da class Document. E por fim construindo o constructor da class Periodical
export class Periodical extends Document {
    issn: number
    volume: number
    issue: number

    constructor (title: string, subtitle: string, publishedAt: Date | number, author: Person, issn: number, volume: number, issue:number) {
        super(title, subtitle, publishedAt, author)
        this.issn = issn
        this.volume = volume
        this.issue = issue
    }
}

export default Periodical
