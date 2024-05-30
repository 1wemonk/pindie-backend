const {sendAllUsers, sendUserByld, sendUserUpdated, sendUserDeleted,sendMe} = require('../controllers/users');
const {findAllUsers, findUsersById, updateUser, deleteUser,checkIsUserExists,checkEmptyNameAndEmail,checkEmptyNameAndEmailAndPassword,hashPassword} = require('../middllewares/users');
const {createUsers}=require('../middllewares/users.js');
const {sendUserCreated}=require('../controllers/users.js');
const {checkAuth}=require('../middllewares/auth');
const usersRouter=require('express').Router();
usersRouter.get('/users',findAllUsers,sendAllUsers);
usersRouter.get('/users/:id',findUsersById,sendUserByld);

usersRouter.delete('/users/:id',checkAuth,deleteUser,sendUserDeleted);
// routes/users.js
// routes/users.js
usersRouter.get('/me',checkAuth,sendMe);
usersRouter.post(
  "/users",
  findAllUsers,
  checkIsUserExists,
  checkEmptyNameAndEmailAndPassword,
  checkAuth,
  hashPassword,
  createUsers,
  
  sendUserCreated
);
usersRouter.put(
  "/users/:id",
  checkEmptyNameAndEmail,
  checkAuth,
  updateUser,
  sendUserUpdated
); 
module.exports=usersRouter;