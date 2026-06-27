import userModel from "../models/user.model.js";

export const findAllUsers = async() => {
  return await userModel.find().select("-password");
};

export const createUser = async({ username, password, email }) => {
  return await userModel.create({ username, password, email });
};

export const findByEmailOrUsername = async({email,username}) =>{
    const user = await userModel.findOne({$or:[{email},{username}]})
    return user
}