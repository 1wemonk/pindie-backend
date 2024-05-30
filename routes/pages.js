const pagesRouter = require("express").Router();
const {sendIndex,sendDashboard}=require('../controllers/auth');
const {checkAuth,checkCookiesJWT}=require('../middllewares/auth');
pagesRouter.get("/", sendIndex);

pagesRouter.get("/admin/**", checkCookiesJWT, checkAuth, sendDashboard); 
module.exports=pagesRouter;