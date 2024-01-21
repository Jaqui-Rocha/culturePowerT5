// db.ts

import mongoose ,{ connection, connect } from 'mongoose';

import dotenv from 'dotenv';
dotenv.config();

const dbUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/seuBancoDeDados';

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });



connection.on('error', console.error.bind(console, 'Erro na conexão com o MongoDB:'));
db.once('open', () => {
  console.log('Conectado ao MongoDB!');
});

export default mongoose;
