import mongoose from 'mongoose';

const connectionString = "mongodb+srv://admin:@cluster0.hmaqukh.mongodb.net/alura?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(connectionString);

let db = mongoose.connection;

export default db;
