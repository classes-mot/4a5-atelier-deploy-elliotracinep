//express et mongoose
import express from 'express';
import { connectDB } from './util/bd.js';

import messageRoutes from './routes/messages-routes.js';


const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/db-deploy';

// Connexion à MongoDB
await connectDB(MONGODB_URI);


const app = express();
// chercher les variables d'environnemnt
const PORT = process.env.PORT || 3000;
// section des middlewares

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // header et value * quels domaines peuvent acceder a notre serveur
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  ); //quel header sont autorisés ( pourait etre * pour tout)
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE'); // quelles methodes HTTP sont autorisées
  next();
});

app.use('/api/messages', messageRoutes);

//connexion BD + demarrage serveur web

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
