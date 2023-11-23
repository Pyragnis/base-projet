require('dotenv').config();
const { Pool } = require('pg');
const fs = require('fs');

const pool = new Pool({
  user: 'votre_utilisateur',
  host: '127.0.0.1',
  database: 'postgres',
  password: 'votre_mot_de_passe',
  port: 5432,
});




const setupScript = fs.readFileSync('./setup.sql', 'utf8');


const createDatabaseAndTables = async () => {
  try {
    const client = await pool.connect();
    const databaseCheck = await client.query('SELECT datname FROM pg_database WHERE datname = $1', ['spotify']);
    if (databaseCheck.rowCount === 0) {
        await client.query(`\c nom_de_votre_base; ${setupScript}`);
        client.release();
        console.log('Base de données et tables créées avec succès.');
    }
  } catch (error) {
    console.error('Erreur lors de la création de la base de données :', error);
  }
};

module.exports = { pool, createDatabaseAndTables };

