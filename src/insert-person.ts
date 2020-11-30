import Person, { Gender } from "./entities/Person.js"


const name = document.querySelector<HTMLInputElement>("#name")!
const birth = document.querySelector<HTMLDataElement>("#birth")!
const gender = document.querySelector<HTMLSelectElement>("#gender")!
const formulario = document.querySelector<HTMLFormElement>("form")!
const answer = document.querySelector<HTMLDivElement>("#answer")!

    const people: Person[] = []


formulario.addEventListener("submit", (e: Event) => {
    e.preventDefault()

    const valueName = name.value.trim()




    if(!valueName) {
        answer.innerText = "O campo Nome é obrigatório!"
        name.focus()
        return
    }

   const regexName = /\w+\s\w+/g

  if(!regexName.test(valueName)) {
    answer.innerText = 'Informe seu Nome completo!'
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
  
  alert("Cadastro realizado com SUCESSO!")
  try {
    const pessoa = new Person(
        name.value,
        birth.value,
        gender.value === "f" ? Gender.Female : Gender.Male
    )

    people.push(pessoa)

    localStorage.setItem('person', JSON.stringify(people))

} finally {

}

})

