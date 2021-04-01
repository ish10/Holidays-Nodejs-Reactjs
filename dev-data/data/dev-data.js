const fs= require('fs');
const mongoose =require('mongoose');
const dotenv = require('dotenv');
const fileread = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`,'utf-8'));
const Tour = require('../../Model/tourModel');
dotenv.config({ path: './config.env' });



const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
  );
  
  mongoose
    .connect(DB, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    })
    .then(() => console.log('DB connection successful!'));

const importData = async () => {
    try {
      await Tour.create(fileread);
      console.log('Data successfully loaded!');
    } catch (err) {
      console.log(err);
    }
    process.exit();
  };

importData();