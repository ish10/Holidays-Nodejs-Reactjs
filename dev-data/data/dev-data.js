const fs= require('fs');
const mongoose =require('mongoose');
const dotenv = require('dotenv');


const Tour = require('../../Model/tourModel');
const User = require('../../Model/userModel');
const Comment = require('../../Model/commentModel');
dotenv.config({ path: './config.env' });

const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'));
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
const reviews = JSON.parse(
  fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8')
);

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
        
    await User.create(users, { validateBeforeSave: false });
  
      console.log('Data successfully loaded!');
    } catch (err) {
      console.log(err);
    }
    process.exit();
  };

importData();