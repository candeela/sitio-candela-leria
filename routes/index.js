var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var novedadesModel = require('../models/novedadesModel');

/* GET home page. */
router.get('/',async  function (req, res, next) {
  var novedades = await novedadesModel.getNovedades();

  res.render('index', {
    novedades
  });
});


router.post('/', async (req, res, next) => {

  console.log(req.body)

  var nombre = req.body.nombre;
  var apellido = req.body.apellido;
  var email = req.body.email;
  var telefono = req.body.telefono;
  var mensaje = req.body.mensaje;

  var obj = {
    to: 'kevarkiancandela2@gmail.com',
    subjet: 'Contacto desde la pagina web Leria Accesorios',
    html: nombre + " " + apellido + "quiere mas info al correo:" + email + "<br> Hizo el siguiente comentario: " + mensaje + ". <br> Y su telefono es:" + telefono
  }

  var transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  var info = await transport.sendMail(obj);

  res.render('index',{
    message:' Mensaje enviado',
  });
});

module.exports = router;
