const {sendAllCategories, sendCategoryById, sendCategoryUpdated, sendCategoryDeleted} = require('../controllers/categories');
const {findAllCategories, findCategoryByld, updateCategory, deleteCategory, checkIsCategoryExists,checkEmptyName} = require('../middllewares/categories');
const {createCategory}=require('../middllewares/categories');
const {sendCategoryCreated}=require('../controllers/categories');
const{checkAuth}=require('../middllewares/auth');
const categoriesRouter=require('express').Router();
categoriesRouter.get('/categories',findAllCategories,sendAllCategories);
categoriesRouter.get('/categories/:id',findCategoryByld,sendCategoryById);
categoriesRouter.delete('/categories/:id',checkAuth,deleteCategory,sendCategoryDeleted);
categoriesRouter.post(
    "/categories",
    findAllCategories,
    checkIsCategoryExists,
    checkEmptyName,
    checkAuth,
    createCategory,
    sendCategoryCreated
  );
  
  categoriesRouter.put(
    "/categories/:id",
    checkEmptyName,
    checkAuth,
    updateCategory,
    sendCategoryUpdated
  );
module.exports=categoriesRouter;