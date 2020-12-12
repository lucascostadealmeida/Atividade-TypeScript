import Book from "./entities/Book.js"
import Periodical from "./entities/Periodical.js"
import Person from "./entities/Person.js"
import stringsFuncitons, { capitalize, slugify, trimAll } from "./stringsFunctions.js"


const select = document.querySelector<HTMLSelectElement>("select")!
const form = document.querySelector<HTMLFormElement>("form")!
const sortBook = (a: Book , b: Book) => a.title.localeCompare(b.title)
const sortPeriodical = (a: Periodical , b: Periodical) => a.title.localeCompare(b.title)




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
  
    titleBook()

    formulario.addEventListener("submit", (e: Event) => {
        e.preventDefault()


        if(!title.value) {
            answer.innerText = "O campo Títilo é obrigatório!"
            title.focus()
            return
        }


        if(!subtitle.value) {
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
                trimAll(capitalize(slugify(title.value))),
                trimAll(capitalize(slugify(subtitle.value))),
                publishedAt.value,
                author.value,
                parseInt(isbn.value),
                parseInt(edition.value),
                parseInt(volume.value)
            )

            books.push(livro)

            localStorage.setItem('book', JSON.stringify(books))
            titleBook()
        } finally{

        }

    })
    const filter = document.querySelector<HTMLInputElement>("#filter")!
    const btnClear = document.querySelector<HTMLButtonElement>("#btnClear")!
    const formulario2 = document.querySelector<HTMLFormElement>("#form2")!
    const filterTitleBook = (text: Book) => text.title.includes(slugify(capitalize(trimAll(filter.value))))
    
    function filterBook() {

        const table = document.querySelector('table')!
    const books: Book[] = []
    
    if(localStorage.getItem('book')) {
        const data = JSON.parse(localStorage.getItem('book')!)

        books.splice(0)

        for (let item of data) {
            books.push(new Book(
                item.title,
                item.subtitle,
                item.publishedAt,
                item.author,
                item.isbn,
                item.edition,
                item.volume
            ))
        }
    }

    let aux = books.filter(filterTitleBook)

    let lines = ''
    for (const livro of aux) {
     lines += `
        <tr>
          <td>${ (livro as Book).title }</td>
          <td>${ (livro as Book).subtitle }</td>
          <td>${ (livro as Book).publishedAt}</td>
          <td>${ (livro as Book).author}</td>
          <td>${ (livro as Book).isbn}</td>
          <td>${ (livro as Book).edition}</td>
          <td>${ (livro as Book).volume}</td>
        </tr>
      `
    }  
    table.className = 'table table-borderless'
    table.innerHTML = `
      <thead>
        <tr>
          <th>Título</th>
          <th>Subtítilo</th>
          <th>Publicado em</th>
          <th>Autor</th>
          <th>ISBN</th>
          <th>Edição</th>
          <th>Volume</th>
        </tr>
      </thead>
      <tbody>
        ${lines}
      </tbody>
    `

    }

    formulario2.addEventListener("submit", (e: Event) => {
        e.preventDefault()
          
            if(!filter.value) {
              answer.innerText = "O campo Filtro é obrigatório!"
              filter.focus()
              return
            }
          filterBook()
          btnClear.addEventListener("click", (e: Event) => {
            titleBook()
          })    
            
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
        <form novalidate id="form2">
        <br>
            <input id="filter" placeholder="Informe o título">
            <button id="btnFilter">Filtrar</button>
            <button id="btnClear" type="reset">Limpar</button>
        </form>
        <table></table>
        <div id="answer"></div>
        `
    
}



function titleBook() {
    const table = document.querySelector('table')!
    const books: Book[] = []
    
    if(localStorage.getItem('book')) {
        const data = JSON.parse(localStorage.getItem('book')!)

        books.splice(0)

        for (let item of data) {
            books.push(new Book(
                item.title,
                item.subtitle,
                item.publishedAt,
                item.author,
                item.isbn,
                item.edition,
                item.volume
            ))
        }
    }

    let aux = [...books].sort(sortBook) //ordenando

    let lines = ''
    for (const livro of aux) {
     lines += `
        <tr>
          <td>${ (livro as Book).title }</td>
          <td>${ (livro as Book).subtitle }</td>
          <td>${ (livro as Book).publishedAt}</td>
          <td>${ (livro as Book).author}</td>
          <td>${ (livro as Book).isbn}</td>
          <td>${ (livro as Book).edition}</td>
          <td>${ (livro as Book).volume}</td>
        </tr>
      `
    }  
    table.className = 'table table-borderless'
    table.innerHTML = `
      <thead>
        <tr>
          <th>Título</th>
          <th>Subtítilo</th>
          <th>Publicado em</th>
          <th>Autor</th>
          <th>ISBN</th>
          <th>Edição</th>
          <th>Volume</th>
        </tr>
      </thead>
      <tbody>
        ${lines}
      </tbody>
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
    
    titlePeriodical()

    formulario.addEventListener("submit", (e: Event) => {
        e.preventDefault()


        if(!title.value) {
            answer.innerText = "O campo Títilo é obrigatório!"
            title.focus()
            return
        }


        if(!subtitle.value) {
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
                trimAll(capitalize(slugify(title.value))),
                trimAll(capitalize(slugify(subtitle.value))),
                publishedAt.value,
                author.value,
                issn.value,
                volume.value,
                issue.value,
            )

            periodicals.push(periodico)

            localStorage.setItem('periodical', JSON.stringify(periodicals))
            titlePeriodical()
        } finally{

        }

    })
    const filter = document.querySelector<HTMLInputElement>("#filter")!
    const btnClear = document.querySelector<HTMLButtonElement>("#btnClear")!
    const formulario2 = document.querySelector<HTMLFormElement>("#form2")!
    const filterTitlePeriodical = (text: Periodical) => text.title.includes(slugify(capitalize(trimAll(filter.value))))

    function filterPeriodical() {
        const table = document.querySelector('table')!
        
        if(localStorage.getItem('periodical')) {
            const data = JSON.parse(localStorage.getItem('periodical')!)
    
            periodicals.splice(0)
    
            for (let item of data) {
                periodicals.push(new Periodical(
                    item.title,
                    item.subtitle,
                    item.publishedAt,
                    item.author,
                    item.issn,
                    item.volume,
                    item.issue
    
                ))
            }
        }
    
        let aux = periodicals.filter(filterTitlePeriodical)
        
        let lines = ''
        for (const periodico of aux) {
         lines += `
            <tr>
              <td>${ (periodico as Periodical).title }</td>
              <td>${ (periodico as Periodical).subtitle }</td>
              <td>${ (periodico as Periodical).publishedAt}</td>
              <td>${ (periodico as Periodical).author}</td>
              <td>${ (periodico as Periodical).issn}</td>
              <td>${ (periodico as Periodical).volume}</td>
              <td>${ (periodico as Periodical).issue}</td>
            </tr>
          `
        }  
        table.className = 'table table-borderless'
        table.innerHTML = `
          <thead>
            <tr>
              <th>Título</th>
              <th>Subtítilo</th>
              <th>Publicado em</th>
              <th>Autor</th>
              <th>ISSN</th>
              <th>Volume</th>
              <th>ISSUE</th>
            </tr>
          </thead>
          <tbody>
            ${lines}
          </tbody>
        `
      
    }

    formulario2.addEventListener("submit", (e: Event) => {
        e.preventDefault()
          
            if(!filter.value) {
              answer.innerText = "O campo Filtro é obrigatório!"
              filter.focus()
              return
            }
          filterPeriodical()
          btnClear.addEventListener("click", (e: Event) => {
            titlePeriodical()
          })    
            
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
        <form novalidate id="form2">
        <br>
            <input id="filter" placeholder="Informe o título">
            <button id="btnFilter">Filtrar</button>
            <button id="btnClear" type="reset">Limpar</button>
        </form>
        <table></table>
        <div id="answer"></div>
        `
    
}

function titlePeriodical() {
    const table = document.querySelector('table')!
    const periodicals: Periodical[] = []
    
    if(localStorage.getItem('periodical')) {
        const data = JSON.parse(localStorage.getItem('periodical')!)

        periodicals.splice(0)

        for (let item of data) {
            periodicals.push(new Periodical(
                item.title,
                item.subtitle,
                item.publishedAt,
                item.author,
                item.issn,
                item.volume,
                item.issue

            ))
        }
    }

    let aux = [...periodicals].sort(sortPeriodical) //ordenando

    let lines = ''
    for (const periodico of aux) {
     lines += `
        <tr>
          <td>${ (periodico as Periodical).title }</td>
          <td>${ (periodico as Periodical).subtitle }</td>
          <td>${ (periodico as Periodical).publishedAt}</td>
          <td>${ (periodico as Periodical).author}</td>
          <td>${ (periodico as Periodical).issn}</td>
          <td>${ (periodico as Periodical).volume}</td>
          <td>${ (periodico as Periodical).issue}</td>
        </tr>
      `
    }  
    table.className = 'table table-borderless'
    table.innerHTML = `
      <thead>
        <tr>
          <th>Título</th>
          <th>Subtítilo</th>
          <th>Publicado em</th>
          <th>Autor</th>
          <th>ISSN</th>
          <th>Volume</th>
          <th>ISSUE</th>
        </tr>
      </thead>
      <tbody>
        ${lines}
      </tbody>
    `
}