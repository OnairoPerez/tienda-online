const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../backend/app');

//Modulos
const connectDB = require('../backend/database/connection');

chai.use(chaiHttp);
chai.should(); // Configura chai para usar should

describe('Registro y autentificación de usuarios', () => {
  //Conectar la base de datos
  before(async function () {
    this.timeout(10000);
    await connectDB();
  });

  let userID;
  const account = {
    "credentials": {
      "email": "monserrat.salmeron@example.com",
      "password": "P@ssw0rd"
    },
    "user": {
      "name": "Monserrat",
      "surname": "Salmeron",
      "cc": "8749449940",
      "address": "Calle 5, Apt 3B",
      "city": "Pasto",
      "tel": "3106806973"
    }
  }

  describe('POST /account/register', () => {
    it ('It should register user and account', done => {
      chai.request(app)
      .post('/api/account/register')
      .send(account)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.have.property('user_id').that.is.a('string');
        userID = res.body.user_id;
        done();
      });
    });
  });

  describe('POST /account/auth', () => {
    it('It should authenticate a user', done => {
      const { credentials } = account;
      chai.request(app)
        .post('/api/account/auth')
        .send(credentials)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('login susscefull');
          done();
        });
    });
  });

  describe('PATCH /update-user', () => {
    it('It should update user information', done => {
      let update = {
        user: {
          id: userID
        },
        data: {
          city: 'Palmira',
          tel: '3116358174'
        }
      }

      chai.request(app)
        .patch('/api/update-user')
        .send(update)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.should.have.property('document');
          res.body.document.should.be.an('object');
          res.body.document.should.have.property('_id').eql(userID);
          res.body.document.should.have.property('name').that.is.a('string');
          res.body.document.should.have.property('surname').that.is.a('string');
          res.body.document.should.have.property('cc').that.is.a('string');
          res.body.document.should.have.property('address').that.is.a('string');
          res.body.document.should.have.property('city').that.is.a('string').eql(update.data.city);
          res.body.document.should.have.property('tel').that.is.a('string').eql(update.data.tel);
          done();
        });
    });
  });

});