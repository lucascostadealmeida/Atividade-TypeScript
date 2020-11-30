import Book from "./entities/Book.js"
import Periodical from "./entities/Periodical.js"
import Person from "./entities/Person.js"


const select = document.querySelector<HTMLSelectElement>("select")!
const form = document.querySelector<HTMLFormElement>("form")!

select.addEventListener("change", (e: Event) => {
    e.preventDefault()

    setchoice()
    

})



function setchoice() {
    let choice = select.value

    if(choice==="b") {
        author()
        InsertBook()
    }else if(choice ==='p') {
        author2()
        InsertPeriodical()
    }
    
    else{
       form.innerHTML = `
       <br>
        <p>Selecione o que deseja cadastrar</p>
       `
    }
}


function InsertBook() {
    const title = document.querySelector<HTMLInputElement>("#title")!
    const subtitle = document.querySelector<HTMLInputElement>("#subtitle")!
    const publishedAt = document.querySelector<HTMLDataElement>("#publishedAt")!
    const author = document.querySelector<HTMLSelectElement>("#author")!
    const isbn = document.querySelector<HTMLInputElement>("#isbn")!
    const edition = document.querySelector<HTMLInputElement>("#edition")!
    const volume = document.querySelector<HTMLInputElement>("#volume")!
    const answer = document.querySelector<HTMLDivElement>("#answer")!
    const formulario = document.querySelector<HTMLFormElement>("form")!

    const books: Book[] = []

    formulario.addEventListener("submit", (e: Event) => {
        e.preventDefault()

        const valueTitle = title.value.trim()

        if(!valueTitle) {
            answer.innerText = "O campo Títilo é obrigatório!"
            title.focus()
            return
        }

        const valueSubtitle = subtitle.value.trim()

        if(!valueSubtitle) {
            answer.innerText = "O campo Subtítilo é obrigatório!"
            subtitle.focus()
            return
        }

        if(!publishedAt.value) {
            answer.innerText = "O campo Data de Publicação é obrigatório!"
            publishedAt.focus()
            return
        }

        const pub = new Date(`${publishedAt.value}T00:00:00`)

        if(Date.now() - Number(pub) < 0) {
            answer.innerText = "O livro deve ter lançando no passado!"
            publishedAt.focus()
            return
        }


        if(!isbn.value) {
            answer.innerText = "O campo ISBN é obrigatório!"
            isbn.focus()
            return
        }

        if(!edition.value) {
            answer.innerText = "O campo de Edição é obrigatório!"
            edition.focus()
            return
        }

        if(!volume.value) {
            answer.innerText = "O campo Volume é obrigatório!"
            volume.focus()
            return
        }

        alert("Cadastro realizado com SUCESSO!")

        try {
            const livro = new Book(
                title.value,
                subtitle.value,
                publishedAt.value,
                author.value,
                isbn.value,
                edition.value,
                volume.value
            )

            books.push(livro)

            localStorage.setItem('book', JSON.stringify(books))
        } finally{

        }

    })    
}

function author() {
    const authors: Person[] = []
    
    if(localStorage.getItem('person')) {
        const data = JSON.parse(localStorage.getItem('person')!)

        authors.splice(0)

        for (let item of data) {
            authors.push(new Person(
                item.name,
                item.birth,
                item.gender
            ))
        }
    }
    let lines = ''

    for(const author of authors ) {
        console.log((author as any))
        lines += `
        <option>${(author as Person).name} ${(author as Person).birth} ${(author as Person).gender}</option>

        `
    }
   
        form.innerHTML = `
        <br>
        
        <form novalidate>
            <input id="title" placeholder="Informe o Títilo">
            <input id="subtitle" placeholder="Informe o Subtítilo">
            <input id="publishedAt" type="date" placeholder="Informe a Data de Publicação">
            <select id="author" required>
            <option value="">Autor</option>
            ${lines}
            <input id="isbn" placeholder="Informe o ISBN">
            <input id="edition" placeholder="Informe a Edição">
            <input id="volume" placeholder="Informe o Volume">
            <button>Cadastrar</button>
        </form>

        <div id="answer"></div>
        `
    
}

function InsertPeriodical() {
    const title = document.querySelector<HTMLInputElement>("#title")!
    const subtitle = document.querySelector<HTMLInputElement>("#subtitle")!
    const publishedAt = document.querySelector<HTMLDataElement>("#publishedAt")!
    const author = document.querySelector<HTMLSelectElement>("#author")!
    const issn = document.querySelector<HTMLInputElement>("#issn")!
    const volume = document.querySelector<HTMLInputElement>("#volume")!
    const issue = document.querySelector<HTMLInputElement>("#issue")!
    const answer = document.querySelector<HTMLDivElement>("#answer")!
    const formulario = document.querySelector<HTMLFormElement>("form")!

    const periodicals: Periodical[] = []

    formulario.addEventListener("submit", (e: Event) => {
        e.preventDefault()

        const valueTitle = title.value.trim()

        if(!valueTitle) {
            answer.innerText = "O campo Títilo é obrigatório!"
            title.focus()
            return
        }

        const valueSubtitle = subtitle.value.trim()

        if(!valueSubtitle) {
            answer.innerText = "O campo Subtítilo é obrigatório!"
            subtitle.focus()
            return
        }

        if(!publishedAt.value) {
            answer.innerText = "O campo Data de Publicação é obrigatório!"
            publishedAt.focus()
            return
        }

        const pub = new Date(`${publishedAt.value}T00:00:00`)

        if(Date.now() - Number(pub) < 0) {
            answer.innerText = "O livro deve ter lançando no passado!"
            publishedAt.focus()
            return
        }


        if(!issn.value) {
            answer.innerText = "O campo ISSN é obrigatório!"
            issn.focus()
            return
        }


        if(!volume.value) {
            answer.innerText = "O campo Volume é obrigatório!"
            volume.focus()
            return
        }

        if(!issue.value) {
            answer.innerText = "O campo ISSUE é obrigatório!"
            issue.focus()
            return
        }

        alert("Cadastro realizado com SUCESSO!")

        try {
            const periodico = new Periodical(
                title.value,
                subtitle.value,
                publishedAt.value,
                author.value,
                issn.value,
                volume.value,
                issue.value,
            )

            periodicals.push(periodico)

            localStorage.setItem('periodical', JSON.stringify(periodicals))
        } finally{

        }

    })    
}

function author2() {
    const authors: Person[] = []
    
    if(localStorage.getItem('person')) {
        const data = JSON.parse(localStorage.getItem('person')!)

        authors.splice(0)

        for (let item of data) {
            authors.push(new Person(
                item.name,
                item.birth,
                item.gender
            ))
        }
    }
    let lines = ''

    for(const author of authors ) {
        console.log((author as any))
        lines += `
        <option>${(author as Person).name} ${(author as Person).birth} ${(author as Person).gender}</option>

        `
    }
   
        form.innerHTML = `
        <br>
        
        <form novalidate>
            <input id="title" placeholder="Informe o Títilo">
            <input id="subtitle" placeholder="Informe o Subtítilo">
            <input id="publishedAt" type="date" placeholder="Informe a Data de Publicação">
            <select id="author" required>
            <option value="">Autor</option>
            ${lines}
            <input id="issn" placeholder="Informe o ISSN">
            <input id="volume" placeholder="Informe o Volume">
            <input id="issue" placeholder="Informe ISSUE">
            <button>Cadastrar</button>
        </form>

        <div id="answer"></div>
        `
    
}