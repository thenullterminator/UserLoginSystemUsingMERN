const authenticate=(req,res,next)=>{
    if(req.user !=undefined){
        next();
    }
    else{
        console.log('redirecting');
        res.redirect('/');
        next();
    }
};
module.exports={
    authenticate
}