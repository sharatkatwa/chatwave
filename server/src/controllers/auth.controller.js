import { createUser, findByEmailOrUsername } from "../dao/user.dao";
import UserModel from "../models/user.model.js";

const register = async (req, res) => {
  const { username, email, password } = req.body;
 const isUserExists = await findByEmailOrUsername({email, username})
  if (isUserExists)
    return res.status(400).json({ message: "username or email already exists" } );
    
    const newUser = await createUser({username,email, password})
    
    
  
};
