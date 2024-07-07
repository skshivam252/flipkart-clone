import User from '../models/user-schema.js'


export const userSignUp=async (request,response)=>{
  try{
    const user = request.body;
    const newUser = new User(user)
    await newUser.save()
    response.status(200).json({message:user})
  }
  catch(err){
    response.status(500).json({message:err.message})
  }
}

export const userLogin=async(request, response)=>{
  try{
    console.log(request.body)
    const username=request.body.username;
    const password = request.body.password;

    let user= await User.findOne({ username: username, password:password})
    if (user) {
      console.log(user)
      return response.status(200).json({data:user});
    }
    else {
      return response.status(501).json(`Inavlid login`)
    }
  }
  catch(err){
    response.status(500).json({ message: err.message })
  }
}