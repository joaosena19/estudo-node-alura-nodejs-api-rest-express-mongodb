import livros from "../models/Livro.js";

class LivroController {

  static listarLivros = (req, res) => {
    let livrosQuery = livros.find();

    if(req.query.editora) {
      livrosQuery = livrosQuery.find({editora: req.query.editora})
    }

    livrosQuery
          .populate('autor', 'nome')
          .exec((err, livros) => {
            if(err) {
              res.status(400).send({message: `${err.message} - falha ao listar livros.`})
            } else {
              res.status(200).json(livros)
            }
          })
  }

  static listarLivroPorId = (req, res) => {
    const id = req.params.id;
  
    livros.findById(id)
        .populate('autor')
        .exec((err, livro) => {
        if (err) {
            res.status(400).send({ message: `${err.message} - ID inválido.` });
        } else if (!livro) {
            res.status(404).send({ message: 'Livro não encontrado.' });
        } else {
            res.status(200).send(livro);
        }
        });
  };

  static cadastrarLivro = (req, res) => {
    let livro = new livros(req.body);
    
    livro.save((err) => {
      
      if(err) {
        res.status(500).send({message: `${err.message} - falha ao cadastrar livro.`})
      } else {
        res.status(201).send(livro.toJSON())
      }
    })
  }

  static atualizarLivro = (req, res) => {
    const id = req.params.id;

    livros.findByIdAndUpdate(id, {$set: req.body}, (err) => {
      if(err) {
        res.status(500).send({message: `${err.message} - falha ao atualizar livro.`})
      } else {
        res.status(200).send({message: "Livro atualizado com sucesso"})
      }
    })  
  }

  static deletarLivro = (req, res) => {
    const id = req.params.id;
  
    livros.findByIdAndDelete(id, (err, livro) => {
      if (err) {
        res.status(500).send({ message: `${err.message} - falha ao deletar livro.` });
      } else if (!livro) {
        res.status(404).send({ message: 'Livro não encontrado.' });
      } else {
        res.status(200).send({message: 'Livro deletado com sucesso'});
      }
    });
  };  
}

export default LivroController