let participantes = [
  {
    nome: "Mayk Brito",
    email: "mayk@gmail.com",
    dataInscricao: new Date(2024, 2, 21, 19, 20),
    dataCheckIn: new Date(2024, 2, 25, 22, 00)
  },
  {
    nome: "Lucas Neto",
    email: "lucas@gmail.com",
    dataInscricao: new Date(2024, 1, 18, 20, 10),
    dataCheckIn: new Date(2024, 2, 18, 20, 20)
  },
  {
    nome: "Ana Silva",
    email: "ana@gmail.com",
    dataInscricao: new Date(2024, 0, 15, 10, 30),
    dataCheckIn: new Date(2024, 1, 10, 15, 45)
  },
  {
    nome: "Pedro Santos",
    email: "pedro@gmail.com",
    dataInscricao: new Date(2024, 1, 5, 14, 50),
    dataCheckIn: new Date(2024, 1, 25, 9, 15)
  },
  {
    nome: "Maria Oliveira",
    email: "maria@gmail.com",
    dataInscricao: new Date(2024, 0, 10, 18, 20),
    dataCheckIn: new Date(2024, 1, 8, 17, 30)
  },
  {
    nome: "Carlos Silva",
    email: "carlos@gmail.com",
    dataInscricao: new Date(2024, 1, 28, 12, 40),
    dataCheckIn: new Date(2024, 2, 3, 10, 10)
  },
  {
    nome: "Mariana Souza",
    email: "mariana@gmail.com",
    dataInscricao: new Date(2024, 0, 5, 9, 15),
    dataCheckIn: new Date(2024, 0, 10, 18, 00)
  },
  {
    nome: "Gustavo Lima",
    email: "gustavo@gmail.com",
    dataInscricao: new Date(2024, 2, 1, 15, 30),
    dataCheckIn: new Date(2024, 2, 15, 16, 20)
  },
  {
    nome: "Patrícia Alves",
    email: "patricia@gmail.com",
    dataInscricao: new Date(2024, 0, 20, 21, 10),
    dataCheckIn: new Date(2024, 1, 5, 14, 50)
  },
  {
    nome: "Rafaela Costa",
    email: "rafaela@gmail.com",
    dataInscricao: new Date(2024, 1, 10, 17, 45),
    dataCheckIn: new Date(2024, 1, 22, 10, 30)
  }
];

const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao)

  let dataCheckIn = dayjs(Date.now()).to(participante.dataCheckIn)

  if(participante.dataCheckIn == null) {
    dataCheckIn = `
    <button
      data-email= "${participante.email}"
      onclick="fazerCheckIn(event)"
    >
      Confimar check-in
    </button>
    `
  }

  return `
  <tr>
    <td>
      <strong>
      ${participante.nome}
      </strong>
      <br>
      <small>
        ${participante.email}
      </small>
    </td>
    <td>${dataInscricao}</td>
    <td>${dataCheckIn}</td>
  </tr>
  `
}


const atualizarLIsta = (participantes) => {
  let output = ""
  for(let participante of participantes) {
    output = output + criarNovoParticipante(participante)

  }

  document.querySelector('tbody').innerHTML = output
}

atualizarLIsta(participantes)

const adicionarParticipante = (event) => {
  event.preventDefault()

  const dadosDoFormulario = new FormData(event.target)
  const participante = {
    nome: dadosDoFormulario.get('nome'),
    email: dadosDoFormulario.get('email'),
    dataInscricao: new Date(),
    dataCheckIn: null
  }

  // verificar se participante já existe
  const participanteExiste = participantes.find((p) => p.email.toLowerCase() == participante.email.toLowerCase()
  )


  if(participanteExiste) {
    alert('Email já cadastrado!')
    return
  }

  participantes = [
    participante, ...participantes]
    atualizarLIsta(participantes)

    //limpar formuláio
    event.target.querySelector('[name="nome"]').value = ""
    event.target.querySelector('[name="email"]').value = ""
}

const fazerCheckIn = (event) => {
  const mensagemConfimacao = 'Tem certeza que deseja fazer o check-in?'

  if(confirm(mensagemConfimacao) == false) {
    return 
  }


  const participante = participantes.find((p) => {
    return p.email == event.target.dataset.email
  })

  participante.dataCheckIn = new Date()

  atualizarLIsta(participantes)
}