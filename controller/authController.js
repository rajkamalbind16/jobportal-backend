import userModel from "../model/userModel.js"

 export const registerController =async(req,res,next) =>{
try {
    const {name,email,password} =req.body
    //validate
    if(!name){
        // return res.status(400).send({success:false,message:'check name'})

        next("please check your name");
    }

    if(!email){
        // return res.status(400).send({success:false,message:'check email'})
        next("please check your email");
    }

    if(!password){
        // return res.status(400).send({success:false,message:'check pasword'})
        next("please check your password");
    }

    const existingUser =await userModel.findOne({email})
    if(existingUser){
        // return res.status(200).send({
        //     success:false,
        //     message:'Email already exit',
        // })

        next("Email already exit");
    }

  

    const user=await userModel.create({name,email,password});
      //token
      const token =user.createJWT()

    res.status(201).send({
        success:true,
        message:'user created successfully',
        user:{
            name:user.name,
            email:user.email,
            location:user.location,
        },
        token,
    })



} catch (error) {
    // console.log(error)
    // res.status(400).send({
    //     message:'Error in regiter controller',
    //     success:false,
    //     error
    // })
    
    //middleawre
    next(error);
}
}


export const loginController = async(req,res,next) => {
  const {email,password} =req.body;
  //vallidation
  if(!email|| !password){
    next('please enter all fields')
  }

  // find user by email
  const user =await userModel.findOne({email}).select("+password")
  if(!user){
    next('invaild user');
  }

  //compare password
  const isMatch = await user.comparePassword(password)
  if(!isMatch){
    next('invalid username and passowrd');
  }
  user.password=undefined;
  const token = user.createJWT();
  res.status(200).json({success:true,message:'login Successfully',user,token,});
};

