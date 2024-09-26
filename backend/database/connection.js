const mongoose = require('mongoose');

//URI y Opciones para la conexión con MongoDB Atlas (urlencode credentials)
const uri = process.env.mongodb_uri;

//Realiza la conexión
async function connectDB() {
  const clientOptions = { 
    serverApi: { 
      version: '1', 
      strict: true, 
      deprecationErrors: true } 
  };
  
  try {
    await mongoose.connect(uri, clientOptions);
    console.log(`
    -----------------------
        Conexión exitosa 
            MongoDB
    -----------------------`
    );
  } catch (err) {
    console.log('[MongoDB] Error de conexión: ', err);
    process.exit(1); // Detiene la aplicación si no se puede conectar
  }
}

module.exports = connectDB;
