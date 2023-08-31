require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const employeeRouter = require('./routes/employees');

mongoose.set('strictQuery', true);
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser:true});
const db = mongoose.connection
db.once('open', ()=> console.log('Connected to Database!'))

app.use(cors());
app.use(express.json())


app.use('/employees', employeeRouter);

app.listen(8080, ()=> console.log('Server has started'))