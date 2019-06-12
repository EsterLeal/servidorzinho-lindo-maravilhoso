const { connect } = require('./ComidasRepository')
const comidasModel = require('./ComidasSchema')

// Para conectar o Mongo DB
connect()

const getAll = async () => {
  return comidasModel.find((error, comidas) =>{
    return comidas
  })
}

const getById = async (id) => {
  return comidasModel.findById(
    id,
    (error, comida) => {
      return comida
    }
  )
}

const add = (comida) => {
  const novaComida = new comidasModel({
    nome : comida.nome,
    descricao: comida.descricao
  })

  novaComida.save()
}

const remove = (id) => {
  comidas.pratosFavoritos = getAll().filter((comida) => {
    return comida.id !== id
  })
}

// update = nunca mexer no ID

const update = (id, comida) => {
  let comidaCadastrada = getAll().find(comida =>{
    return comida.id === id
  })

  if(comidaCadastrada === undefined){ // nao encontrou a comida
    return false
  }
  else {
    if(comida.nome !== undefined) {
      comidaCadastrada.nome = comida.nome
    }
    if(comida.descricao !== undefined) {
      comidaCadastrada.descricao = comida.descricao
    }

    return true
  }
}

// const comidaAtualizada = {
//   ...comidaCadastrada, 
//   // spread atualizado do ES6
//   ...comida
// }

module.exports = {
  getAll,
  getById,
  add,
  remove,
  update
}