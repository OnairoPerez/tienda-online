const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../backend/app');

//Modulos
const connectDB = require('../backend/database/connection');

chai.use(chaiHttp);
chai.should(); // Configura chai para usar should

describe('Productos', () => {
  let productID; // Variable para almacenar el ID del producto

  //Conectar la base de datos
  before(async function() {
    this.timeout(10000);
    await connectDB();
  });

  describe('/POST product', () => {
    it('it should POST a product', (done) => {
      let product = {
        name: 'Frijol Diana Bola Roja X 500g',
        img: 'https://http2.mlstatic.com/D_NQ_NP_928148-MCO49719657863_042022-O.webp',
        price: 7000,
        purchased: 20,
        stock: 40,
        category: '668d83300ba3893f54dddba2',
        brand: '668d8d86248966b6cd02a99a'
      };
      chai.request(app)
        .post('/api/products/new')
        .send(product)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.should.have.property('document');
          productID = res.body.document.web_id; // Guardar el ID del producto
          done();
        });
    });
  });

  describe('/GET/:id product', () => {
    it('it should GET a product by the given id', (done) => {
      chai.request(app)
        .get('/api/products/get/' + productID)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('web_id').that.is.a('string');
          res.body.should.have.property('name').that.is.a('string');
          res.body.should.have.property('img').that.is.a('string');
          res.body.should.have.property('price').that.is.a('number');
          res.body.should.have.property('purchased').that.is.a('number');
          res.body.should.have.property('stock').that.is.a('number');
          res.body.should.have.property('category').that.is.a('string');
          res.body.should.have.property('brand').that.is.a('string');
          done();
        });
    });
  });

  describe('/PUT/:id product', () => {
    it('it should UPDATE a product by the given id', (done) => {
      let data = {
        purchased: 14,
        stock: 20
      }

      chai.request(app)
        .put('/api/products/update/' + productID)
        .send(data)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('document');
          res.body.should.have.property('message');
          res.body.document.should.be.an('object');
          res.body.document.should.have.property('purchased').eql(data.purchased);
          res.body.document.should.have.property('stock').eql(data.stock);
          done();
        });
    });
  });

});