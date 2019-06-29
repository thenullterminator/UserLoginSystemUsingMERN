// Importing Basic Configuration.
require('./config/config');

// Importing third party utilities.
const cors=require('cors');
const morgan=require('morgan');
const session=require('express-session');
const flash=require('connect-flash');
const bcrypt=require('bcryptjs');
const _=require('lodash');
const express=require('express');
const bodyparser=require('body-parser');
const passport=require('passport');
const localstrategy=require('passport-local').Strategy;

// Importing User Defined utilities.
const {mongoose}=require('./database/mongooseconfig');
const {UserModel}=require('./models/user');
const {authenticate}=require('./middleware/authroute');
//Creating a new app.
const app=express();

// Setting up middlewares.
app.use(cors());
app.use(morgan('dev'));
app.use(express.static(__dirname+'/public'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Configuring passport local strategy.
passport.use(new localstrategy({
    usernameField:'email',
    passwordField:'password'
},(email,password,done)=>{
    
    UserModel.findOne({email}).then((user)=>{
        if(!user){
            return done(null,false,{message:'Email not registered.'});
        }

        bcrypt.compare(password,user.password,(err,res)=>{
            if(res){
                console.log(user);
                return done(null,user);
            }
            else{
                return done(null,false,{message:'Incorrect password'});
            }
        });
    }).catch((e)=>done(err));

}));
// Configuring Sessions.
passport.serializeUser((user,done)=>{
    done(null,user._id);
});

passport.deserializeUser((id,done)=>{
    UserModel.findById(id).then((user)=>{
        return done(null,user);
    },(err)=>done(err));
});


//Setting up a signup route
app.post('/signup',(req,res)=>{

    let body=_.pick(req.body,['name','email','password']);//Picking up name,email and password property from request body.
    let NewUser=new UserModel(body);//Creating a new instance of User Model

    // Saving to the Database.
    NewUser.save().then((credentials)=>{
        res.redirect('/dashboard');
    }).catch((e)=>{
        res.status(400).send(e);
    });

});

// Setting up login route.
app.post('/login',passport.authenticate('local'),(req,res)=>{
    res.redirect('/dashboard');
});

// Setting up profile route
app.post('/userprofile',(req,res)=>{
    if(req.user){
    res.send(req.user);
    }else{
        res.send({});
    }
});

//Setting up home route.
app.get('/',(req,res)=>{
    
    res.send(`Welcome!`);
});

// Setting up logout route.
app.get('/logout',(req,res)=>{
    req.logout();
    res.redirect('/');
});

// setting up port.
app.listen(process.env.PORT,()=>{
console.log(`Server is up on port ${process.env.PORT}`);
});