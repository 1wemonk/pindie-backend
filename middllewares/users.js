const user = require("../models/user.js");
const bcrypt=require('bcryptjs');
const findAllUsers = async (req, res, next) => {
  console.log("GET /api/users");
  req.usersArray = await user.find({}, { password: 0 });
  next();
};
const hashPassword=async(req,res,next)=>{
  try{
    const salt =await bcrypt.genSalt(10);
    const hash=await bcrypt.hash(req.body.password,salt);
    req.body.password=hash;
  next();
  }catch(e){
    res.setHeader('Content-Type','application/json');
    res.status(400).send(JSON.stringify({message:'Возникла ошибка при хешировании пароля'}));
  }
};
const createUsers=async(req,res,next)=>{
    console.log("POST /users");
    try{
        console.log(req.body)
        req.user=await user.create(req.body);
        next();
    } catch(e){
        res.setHeader("Content-Type",'application/json');
        res.status(400).send(JSON.stringify({message:'ошибка создания пользователя'}));
    }
}
const findUsersById = async (req, res, next) => {
  console.log("GET /api/users/:id");
  try {
    req.user = await user.findById(req.params.id, { password: 0 });
    next();
  } catch (error) {
    res.status(404).send("User not found");
  }
};
const updateUser=async (req,res,next)=>{
    try{
        req.user=await user.findByIdAndUpdate(req.params.id,req.body);
        next();
    }catch(e){
        res.setHeader('Content-Type','application/json');
        res.status(400).send(JSON.stringify({message:'ошибка в обновлении данных пользователя'}));
    }
};
const deleteUser=async (req,res,next)=>{
    try{
        req.user=await user.findByIdAndDelete(req.params.id);
        next();
    }catch(e){
        res.setHeader('Content-Type','application/json');
        res.status(400).send(JSON.stringify({message:'ошибка в удалении пользователя'}));
    }
};
const checkEmptyNameAndEmailAndPassword = async (req, res, next) => {
    if (!req.body.username || !req.body.email || !req.body.password) {
      res.setHeader("Content-Type", "application/json");
          res.status(400).send(JSON.stringify({ message: "Введите имя, email и пароль" }));
    } else {
      next();
    }
  };
  const checkEmptyNameAndEmail = async (req, res, next) => {
    if (!req.body.username || !req.body.email) {
      res.setHeader("Content-Type", "application/json");
          res.status(400).send(JSON.stringify({ message: "Введите имя и email" }));
    } else {
      next();
    }
  };
  const checkIsUserExists = async (req, res, next) => {
    const isInArray = req.usersArray.find((user) => {
      return req.body.email === user.email;
    });
    if (isInArray) {
      res.setHeader("Content-Type", "application/json");
          res.status(400).send(JSON.stringify({ message: "Пользователь с таким email уже существует" }));
    } else {
      next();
    }
  };
module.exports={findAllUsers,createUsers,findUsersById,updateUser,deleteUser,checkEmptyNameAndEmailAndPassword,checkIsUserExists,checkEmptyNameAndEmail,hashPassword};