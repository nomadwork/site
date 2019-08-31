const arrayExample = require("../json/teste.json");

var api = {};

api.verifyEmail = (req, res) => {
  const email = req.body.email;
  if (email === "nomadwork@gmail.com") {
    res.status(200).send();
  } else {
    res.status(404).send({ msg: "E-mail não cadastrado" });
  }
};

api.login = (req, res) => {
  const email = req.body.email;
  const password = Buffer.from(req.body.passwordEncode, "base64").toString(
    "ascii"
  );

  if (email == "nomadwork@gmail.com" && password === "123456") {
    res
      .status(200)
      .send({
        email: "nomadwork@gmail.com",
        name: "nomad",
        token: "xxasd123e1"
      });
  } else {
    res.status(404).send({ msg: "Senha incorreta" });
  }
};

api.register = (req, res) => {
  const { name, email, password, date, gender } = req.body;

  if (email === "nomadwork@gmail.com") {
    res.status(409).end("E-mail já cadastrado");
  } else {
    res.status(200).end();
  }
};

module.exports = api;
