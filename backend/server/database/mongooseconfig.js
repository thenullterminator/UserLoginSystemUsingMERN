// Importing third party module.
const mongoose=require('mongoose');

mongoose.Promise=global.Promise;
mongoose.set('useFindAndModify',false);

// Connecting To Database.
mongoose.connect(process.env.MONGODB_URI,{useNewUrlParser:true});

module.exports={
    mongoose
};