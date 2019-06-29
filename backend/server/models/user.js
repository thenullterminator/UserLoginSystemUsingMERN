// Importing third party modules.
const mongoose=require('mongoose');
const validator=require('validator');
const bcrypt=require('bcryptjs');
// Creating new User Schema.
const UserSchema=new mongoose.Schema({

    name:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        unique:true,
        required:true,
        minlength:5,
        trim:true,
        validate:{
            validator:validator.isEmail,
            message:'{VALUE} is not a valid E-mail'
        }
    },
    password:{
        type:String,
        require:true,
        minlength:6
    }
});

// Setting up mongoose middleware for hashing password before storage
UserSchema.pre('save',function(next){
    let user=this;

    if(user.isModified('password')){

        bcrypt.genSalt(10,(err,salt)=>{

            bcrypt.hash(user.password,salt,(err,hash)=>{
                user.password=hash;
                next();
            });
        });
    }
    else{
        next();
    }
});

// Creating new User Model.
const UserModel=mongoose.model('User_Data',UserSchema);
module.exports={
    UserModel
};