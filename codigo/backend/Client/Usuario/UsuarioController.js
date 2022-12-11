const express = require("express");
const router = express.Router();
const User = require("./Usuario");

router.post("/user/save", (req, res) => {
  const myArr = {
    nome: req.body.nome,
    email: req.body.email,
    senha: req.body.senha,
    idade: req.body.idade,
    genero: req.body.genero,
  };

  if (myArr.nome != undefined) {
    User.create({
      email: myArr.email,
      senha: myArr.senha,
      nome: myArr.nome,
      idade: myArr.idade,
      genero: myArr.genero,
    }).then(() => {
      res.json({
        msg: "Sucesso",
        status: true,
      });
    });
  } else {
    res.json({ msg: "Erro ao registrar usuario", status: false });
  }
});

router.post("/user/update/:id", (req, res) => {
  const myArr = {
    id: req.params.id,
    nome: req.body.nome,
    email: req.body.email,
    senha: req.body.senha,
    idade: req.body.idade,
    genero: req.body.genero,
  };
  if (myArr.id != undefined) {
    User.update(
      {
        nome: myArr.nome,
        email: myArr.email,
        senha: myArr.senha,
        idade: myArr.idade,
        genero: myArr.genero,
      },
      {
        where: {
          id: myArr.id,
        },
      }
    ).then(() => {
      res.json({
        msg: "Sucesso",
        status: true,
      });
    });
  } else {
    res.json({ msg: "Erro ao registrar atualizacao", status: false });
  }
});

router.post("/user/delete/:id", (req, res) => {
  const myArr = {
    id: req.params.id,
  };
  if (myArr.nome != undefined) {
    User.destroy({
      where: {
        id: myArr.id,
      },
    }).then(() => {
      res.json({
        msg: "Sucesso",
        status: true,
      });
    });
  } else {
    res.json({ msg: "Erro ao registrar exclusao", status: false });
  }
});

// router.post("/user/save", (req, res) => {
//   var nome = req.body.nome;
//   var email = req.body.email;
//   var senha = req.body.senha;
//   var idade = req.body.idade;
//   var genero = req.body.genero;

//   if (nome != undefined) {
//     User.create({
//       email: email,
//       senha: senha,
//       nome: nome,
//       idade: idade,
//       genero: genero,
//     }).then(() => {
//       res.json({ msg: "User registrado com sucesso", status: true });
//     });
//   } else {
//     res.json({ msg: "Erro ao registrar usuario", status: false });
//   }
// });

router.get("/user", (req, res) => {
  User.findAll().then((user) => {
    res.json({ user: user });
  });
});

router.get("/user/:id", (req, res) => {
  User.findByPk(req.params.id).then((user) => {
    res.json({ user: user });
  });
});

router.post("/users/check", (req, res) => {
  User.findOne({
    attributes: ["id", "email", "nome"],
    where: {
      email: req.body.email,
      senha: req.body.senha,
    },
  })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.log(err);
      res.json({ msg: "Erro usuario não encontrado", detail: err });
    });
});

router.post("/user/email", (req, res) => {
  var email = req.body.email;
  var password = req.body.senha;

  if (email != undefined && password != undefined) {
    User.findOne({ where: { email: email } }).then((user) => {
      if (user != undefined) {
        if (user.senha === password) {
          res.json({ msg: "email efetuado com sucesso", status: true, user });
        } else {
          res.json({ msg: "usuário inválido", status: false });
        }
      } else {
        res.json({ msg: "Situação não permite o email", status: false });
      }
    });
  } else {
    res.json({ msg: "campo vazio", stauts: false });
  }
});

module.exports = router;
