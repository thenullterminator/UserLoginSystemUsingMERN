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
passport.use(new localstrategy((username,password,done)=>{
   
    UserModel.findOne({username:username}).then((user)=>{
        
        if(!user){
            
            return done(null,false,{message:'User Name not registered.'});
        }

        bcrypt.compare(password,user.password,(err,res)=>{
            if(res){
                
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

    
    let body=_.pick(req.body,['firstName','lastName','username','email','password']);//Picking up name,email and password property from request body.
    let NewUser=new UserModel(body);//Creating a new instance of User Model

    // Saving to the Database.
    NewUser.save().then((credentials)=>{
        res.redirect('/login');
    }).catch((e)=>{
        res.status(400).send(e);
    });

});

// Setting up login route.
app.post('/login',(req,res)=>{

    passport.authenticate('local', (err, user, info)=> {
        console.log(user);
        if (err) { return next(err); }

        if (!user) { 
            console.log('here');
            return res.send({invalid:true}); 
        }

        req.logIn(user, (err)=> {
          if (err) { return next(err); }
          return res.send({invalid:false}); 
        });
      })(req,res);

});


// Setting up logout route.
app.get('/logout',(req,res)=>{
    req.logout();
    res.redirect('/');
});

// Setting up profile route for dashboard
app.post('/userprofile',(req,res)=>{
    if(req.user){
    res.send(req.user);
    }else{
        res.send({});
    }
});



//Setting up home route.
app.post('/',(req,res)=>{
    
    console.log(req.body);
    res.send();
});

// Setting up a route to check if a username is already registerd.
app.post('/checkusername',(req,res)=>{

    UserModel.findOne({username:req.body.username}).then((user)=>{
        if(user)
        {
            res.send({exist:true});
        }
        else
        {
            res.send({exist:false});
        }
    }).catch((e)=>{
        res.status(400).send(e);
    });

});


// setting up port.
app.listen(process.env.PORT,()=>{
console.log(`Server is up on port ${process.env.PORT}`);
});