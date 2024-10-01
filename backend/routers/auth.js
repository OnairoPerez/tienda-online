const { hashSync, compareSync, genSaltSync } = require('bcrypt');
const { sms, check } = require('../functions/utils');
const { Types } = require('mongoose');
const express = require('express');

//Modelos
const Auth = require('../database/models/Auth');
const User = require('../database/models/User');

//variables
const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const propsUser = ['name', 'surname', 'cc', 'address', 'city', 'tel'];

const router = express.Router();
router.use(express.json());

//Procesar los datos del body enviados en la petición
function body(req, res) {
  const body = req.body;

	//Datos
	const email = body.email;
	const password = body.password;

  if (check(email) || check(password)) {
    res.status(400).send(sms('Customer request is invalid due to missing or incorrect data'));
    return null;
  }

  return {email:email, password:password}
}

function checkProperties(data, props = []) {
  let verify = [];
  props.forEach((prop) => {
    const variable = data[prop];
    verify.push(check(variable));
  });

  return verify.some(Boolean);
}

function newAccount(id, data) {
  const { email, password } = data;

  //Hash para la contraseña
  const salt = genSaltSync(10);
  const hash = hashSync(password, salt);
  return new Auth({
    email: email,
    password: hash,
    user: new Types.ObjectId(id)
  });
}

function newUser(data) {
  //Crear un nuevo usuario
  return new User({
    name: data.name,
    surname: data.surname,
    cc: data.cc,
    address: data.address,
    city: data.city,
    tel: data.tel
  });
}

router.post('/account/register', async (req, res) => {
  const body = req.body;
  const { credentials, user } = body;

  //Verificar el contenido de los objetos principales
  if(check(credentials, 'object') || check(user, 'object')) {
    res.status(400).send(sms('Credentials or user data are missing'));
    return;
  }

  //Verificar las propiedad para el objeto credential
  const propsAccount = ['email', 'password'];
  if(checkProperties(credentials, propsAccount)) {
    res.status(400).send(sms('Missing or incorrect data for credentials'));
    return;
  }

  //Verificar si el correo es valido
  if(!regex.test(credentials.email)) {
    res.status(400).send(sms('The email is not valid'));
    return;
  }

  //Verificar las propiedades para el objeto user
  let docUser = null;
  if(!check(user.ref)) {
    try {
      let document = await User.findOne({cc: user.ref});
      if(document) {
        docUser = document;
      } else {
        res.status(404).send(sms('The user reference is incorrect'));
        return;
      }
    } catch {
      res.status(500).send(sms('Internal Server Error'));
      return;
    }
  } else if (checkProperties(user, propsUser)) {
    res.status(400).send(sms('Missing or incorrect data for users'));
    return;
  }

  //Guardar la información
  if(docUser != null) {
    const account = newAccount(docUser._id, credentials);
    account.save()
      .then(document => {
        if(document) {
          let message = {
            ...sms('Account registered correctly'),
            user_id: docUser._id
          }

          res.send(message);
        }
      })
      .catch((error) => {
        if(error.code === 11000) {
          res.status(409).send(sms('The email is already registered'));
        } else {
          res.status(500).send(sms('Internal Server Error'));
        }
      });
  } else {
    //Crear un nuevo usuario
    const objUser = newUser(user);

    try {
      //Comprobar si la información suministrada ya existe en la base de datos
      let verifyUser = await User.findOne({cc: user.cc}).exec();
      let verifyAccount = await Auth.findOne({email: credentials.email}).exec();

      if(verifyUser || verifyAccount) {
        res.status(409).send(sms('User or account already exists'));
        return;
      } 

      //Guarda el documento de usuario
      let firtsDoc = await objUser.save();

      //Crear y guardar un cuenta
      let account = newAccount(firtsDoc._id, credentials);
      let secondDoc = await account.save();

      if(firtsDoc && secondDoc) {
        let message = {
          ...sms('successful save'),
          user_id: firtsDoc._id
        }
        res.send(message);
      }
    } catch (error) {
      res.status(500).send(sms('Internal Server Error'));
    }
  }
});

router.post('/account/auth', (req, res) => {
  const data = body(req, res);
  if (data != null) {
    const {email, password} = data;

    //Verificar si el correo es valido
    if(!regex.test(email)) {
      res.status(400).send(sms('The email is not valid'));
      return;
    }

    //Buscar el documento en al base de datos por email
    Auth.findOne({email: email}).exec()
      .then(document => {
        if(document) {
          //Verificar la contraseña
          if (compareSync(password, document.password)) {
            res.send(sms('login susscefull'));
          } else {
            res.status(401).send(sms('Incorrect password'));
          }
        } else {
          res.status(404).send(sms('Incorrect email or unregistered account'));
        }
      });
  }
});

router.post('/new-user' , async (req, res) => {
  let body = req.body;

  //Verificar propiedades
  if(checkProperties(body, propsUser)) {
    res.status(400).send(sms('Missing or incorrect data for user'));
    return;
  }

  try {
    //Comprobar si existe en la base de datos
    const verify = await User.findOne({ cc: body.cc }).exec();
    if (verify) {
      res.status(409).send(sms('User already exists'));
      return;
    }

    //Creamos y guardamos un usuario
    const user = newUser(body);
    const document = user.save()
      .then(doc => {
        if (doc) {
          let message = {
            ...sms('successful save'),
            user_id: document._id
          };
          
          res.send(message);
        }
      })
      .catch(err => {
        console.log(err);
      });

    if(document) {
      let message = sms('successful save');
      message.user.id = document._id;
      res.send();
    }
  } catch {
    res.status(500).send(sms('Internal Server Error'));
  }
});

router.put("/update-user", (req, res) => {
  let body = req.body;
  let data = body.data;
  let userID = body.user.id;

  //Comprobar si el identificador está incluido en el cuerpo de la petición
  if (check(userID) && userID.length ===  24) {
    res.status(400).send(sms('Missing or incorrect data (user.id)'));
    return;
  }

  //Comprobar si se adjuntaron datos en la petición
  if (data == undefined) {
    res.status(400).send(sms('You must use (data) to specify the properties to update'));
  }

  //Definimos las propiedades que puede contener el objeto enviado por el cliente
  let properties = ['name', 'surname', 'cc', 'address', 'city', 'tel'];
  let verify = [];

  //Guardamos las comprobaciones en un arreglo
  for (const [key, value] of Object.entries(data)) {
    verify.push(properties.includes(key));
    verify.push(!check(value));
  }

  //Si las propiedad son correcta se realiza la actualización
  if (verify.every(Boolean)) {
    User.findOneAndUpdate({ _id: userID }, data, { new: true })
      .then(doc => {
        if (!doc) {
          res.status(404).send(sms('No user was found with that ID'));
        } else {
          let message = {
            ...sms('Successfully updated user'),
            document: doc
          } ;
          
          res.send(message);
        }
      })
      .catch(err => {
        res.status(500).send(sms('Internal Server Error'));
        console.log(err);
      });
  }
});

module.exports = router;
