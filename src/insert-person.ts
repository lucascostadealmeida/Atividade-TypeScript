import Person, { Gender } from "./entities/Person.js"
import { capitalize, slugify, trimAll } from "./stringsFunctions.js"



const name = document.querySelector<HTMLInputElement>("#name")!
const birth = document.querySelector<HTMLDataElement>("#birth")!
const gender = document.querySelector<HTMLSelectElement>("#gender")!
const formulario = document.querySelector<HTMLFormElement>("form")!
const answer = document.querySelector<HTMLDivElement>("#answer")!
const table = document.querySelector('table')!


type ObjectWithNome = {name: string}
const sortName = (a: ObjectWithNome , b: ObjectWithNome) => a.name.localeCompare(b.name)
const filterName = (text: Person) => text.name.includes(slugify(capitalize(trimAll(filter.value))))


    const people: Person[] = []


    showPerson()

formulario.addEventListener("submit", (e: Event) => {
    e.preventDefault()



    if(!name.value) {
        answer.innerText = "O campo Nome é obrigatório!"
        name.focus()
        return
    }

  if(!birth.value) {
      answer.innerText = "O campo Nascimento é obrigatório!"
      birth.focus()
      return
  }

  const birthDate = new Date(`${birth.value}T00:00:00`)

  if(Date.now() - Number(birthDate) < 0) {
      answer.innerText = "Sua data de nascimento está errada!"
      birth.focus()
      return
  }

  if(!gender.value) {
      answer.innerText = "O campo Sexo é obrigatório!"
      gender.focus()
      return
  }
  

  try {
    
    const pessoa = new Person(
        slugify(capitalize(trimAll(name.value))),
        new Date(birth.value),
        gender.value === "f" ? Gender.Female : Gender.Male
    )

    people.push(pessoa)

    localStorage.setItem('person', JSON.stringify(people))
    showPerson()



} finally {

}

})


//Mostrar na tela


function showPerson() {
  if (localStorage.getItem('person')) {
  
    const data = JSON.parse(localStorage.getItem('person')!)
    people.splice(0)
    for (const item of data) {
        people.push(new Person(
        item.name,
        item.birth,
        item.gender,
        ))
    }
  } 

  
  let aux = [...people].sort(sortName) //ordenando

  let lines = ''
  for (const pessoa of aux) {


   lines += `
      <tr>
        <td>${ (pessoa as Person).name }</td>
        <td>${ (pessoa as Person).birth }</td>
        <td>${ (pessoa as Person).gender   }</td>
      </tr>
    `
  }  
  table.className = 'table table-borderless'
  table.innerHTML = `
    <thead>
      <tr>
        <th>Nome</th>
        <th>Data de Nascimento</th>
        <th>Sexo</th>
      </tr>
    </thead>
    <tbody>
      ${lines}
    </tbody>
  `
}


const filter = document.querySelector<HTMLInputElement>("#filter")!
const btnClear = document.querySelector<HTMLButtonElement>("#btnClear")!
const formulario2 = document.querySelector<HTMLFormElement>("#form2")!

formulario2.addEventListener("submit", (e: Event) => {
e.preventDefault()
  
    if(!filter.value) {
      answer.innerText = "O campo Filtro é obrigatório!"
      filter.focus()
      return
    }
  filterPerson()
  btnClear.addEventListener("click", (e: Event) => {
    showPerson()
  })    
    
})

function filterPerson() {
  if (localStorage.getItem('person')) {
  
    const data = JSON.parse(localStorage.getItem('person')!)
    people.splice(0)
    for (const item of data) {
        people.push(new Person(
        item.name,
        item.birth,
        item.gender,
        ))
    }
  } 

let aux = people.filter(filterName)

  let lines = ''
  for (const pessoa of aux) {
 
 
   lines += `
      <tr>
        <td>${ (pessoa as Person).name }</td>
        <td>${ (pessoa as Person).birth }</td>
        <td>${ (pessoa as Person).gender   }</td>
      </tr>
    `
  }  
  table.className = 'table table-borderless'
  table.innerHTML = `
    <thead>
      <tr>
        <th>Nome</th>
        <th>Data de Nascimento</th>
        <th>Sexo</th>
      </tr>
    </thead>
    <tbody>
      ${lines}
    </tbody>
  `


}
