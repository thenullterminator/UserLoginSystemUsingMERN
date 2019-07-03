// Importing third party modules.
const mongoose=require('mongoose');
const validator=require('validator');
const bcrypt=require('bcryptjs');
// Creating new User Schema.
const UserSchema=new mongoose.Schema({

    firstName:{
        type:String,
        required:true,
        trim:true,
    },
    lastName:{
        type:String,
        required:true,
        trim:true,
    },
    username:{
        type:String,
        required:true,
        trim:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        minlength:2,
        trim:true,
        validate:{
            validator:validator.isEmail,
            message:'{VALUE} is not a valid E-mail'
        }
    },
    password:{
        type:String,
        require:true,
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