import autores from "../models/Autor.js";

class AutorController {

  static listarAutores = (req, res) => {
    autores.find((err, autores) => {
      if(err) {
        res.status(400).send({message: `${err.message} - falha ao listar autores.`})
      } else {
        res.status(200).json(autores)
      }
    })
  }

  static listarAutorPorId = (req, res) => {
    const id = req.params.id;
  
    autores.findById(id, (err, autor) => {
      if (err) {
        res.status(400).send({ message: `${err.message} - ID inválido.` });
      } else if (!autor) {
        res.status(404).send({ message: 'Autor não encontrado.' });
      } else {
        res.status(200).send(autor);
      }
    });
  };

  static cadastrarAutor = (req, res) => {
    let autor = new autores(req.body);
    
    autor.save((err) => {
      
      if(err) {
        res.status(500).send({message: `${err.message} - falha ao cadastrar autor.`})
      } else {
        res.status(201).send(autor.toJSON())
      }
    })
  }

  static atualizarAutor = (req, res) => {
    const id = req.params.id;

    autores.findByIdAndUpdate(id, {$set: req.body}, (err) => {
      if(err) {
        res.status(500).send({message: `${err.message} - falha ao atualizar autor.`})
      } else {
        res.status(200).send({message: "Autor atualizado com sucesso"})
      }
    })  
  }

  static deletarAutor = (req, res) => {
    const id = req.params.id;
  
    autores.findByIdAndDelete(id, (err, autor) => {
      if (err) {
        res.status(500).send({ message: `${err.message} - falha ao deletar autor.` });
      } else if (!autor) {
        res.status(404).send({ message: 'Autor não encontrado.' });
      } else {
        res.status(200).send({message: 'Autor deletado com sucesso'});
      }
    });
  };  
}

export default AutorController