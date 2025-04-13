import userService from "./user.service.js";


export async function getAllUsers(req, res) {
  const data = await userService.getAllUsers();
  res.send(data);
}


export async function createUser(req, res) {
    const {name} = req.body;
    const data = await userService.createUser(name);
    return data  
}

