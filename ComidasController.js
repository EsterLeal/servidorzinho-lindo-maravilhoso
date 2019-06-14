const { connect } = require('./ComidasRepository')
const comidasModel = require('./ComidasSchema')

connect() //Para conectar o Mongo DB

const getAll = () => {
  return comidasModel.find((error, comidas) =>{
    return comidas
  })
}

const getById = (id) => {
  return comidasModel.findById(id) 
}

// const getById = (id) => {
//   return comidasModel.findById(
//     id,
//     (error, comida) => {
//       return comida
//     }
//   )
// }

const add = (comida) => {
  // condição (if) para que o post dê erro (400) em algum campo específico
  // EX: if nome === ester (400)
  const novaComida = new comidasModel(comida)
    return novaComida.save()
  }

const remove = (id) => {
  return comidasModel.findByIdAndDelete(id)
}
  

// update = nunca mexer no ID

const update = (id, comida) => {
  return comidasModel.findByIdAndUpdate(
    id,
    { $set: comida },
    { new: true }, // RETORNAR A COMIDA JA ATUALIZADA NO CALLBACK
    // function (error, comida) { // é o nosso callback
    //   return comida
    // }
  )

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