import {DataSource} from 'typeorm';
import db from '../config/db.config.js';

const connection = new DataSource(db.dbOptions);

connection.initialize().then(connection => {
    console.log('Successfully connected to PostgreSQL');
}).catch(err => {
    console.log('Error: ', err);
});

export default connection;
