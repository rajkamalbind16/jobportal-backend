import JWT from 'jsonwebtoken';

 const userAuth = async(req,res,next) =>{
    const authHeader =req.header.authorization 
    if(!authHeader || !authHeader.startsWith('Bearer')){
        next('Auth failed')
    }
    const token = authHeader.split('')[1];
    try{
        const payload =JWT.verify(token,process.env.JWT_SECRET);
        res.user={userId:payload.userId}
        next();
    } catch(error){
        next('Auth Failed');
    }
}

export default userAuth;