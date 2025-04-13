import userService from "./user.service.js";


export const getAllUsers =async  (req, res)=> {
  const data = await userService.getAllUsers();
  res.send(data);
}


export const createUser = async (req, res)=> {
    const {name} = req.body;
    const data = await userService.createUser(name);
    res.send(data);
}

