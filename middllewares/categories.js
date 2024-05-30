const category = require("../models/category");


const findAllCategories=async(req,res,next)=>{
    req.categoriesArray=await category.find({});
    next()
};
const createCategory=async(req,res,next)=>{
    try{
        console.log(req.body);
        req.category=await category.create(req.body);
        next();
    } catch(e){
        res.setHeader("Content-Type", "application/json");
        res.status(400).send(JSON.stringify({ message: "Ошибка создания категории" }));
    }
}
const findCategoryByld=async (req,res,next)=>{
    console.log('/GET /categories/:id');
    try{
        req.category=await category.findById(req.params.id);
        next();
    }catch(e){
        res.setHeader('Content-Type','application/json');
        res.status(404).send(JSON.stringify({message:'Категория не была найдена'}));
    }
}
const updateCategory=async (req,res,next)=>{
    try{
        req.category=await category.findByIdAndUpdate(req.params.id,req.body);
        next();
    }catch(e){
        res.setHeader('Content-Type','application/json');
        res.status(400).send(JSON.stringify({message:'Ошибка в обновлении игры'}));
    }
};
const deleteCategory=async (req,res,next)=>{
    try{
        req.category=await category.findByIdAndDelete(req.params.id);
        next();
    }catch(e){
        res.setHeader('Content-Type','application/json');
        res.status(400).send(JSON.stringify({message:'ошибка удалении категории'}));
    }
};
const checkIsCategoryExists = async (req, res, next) => {
    // Среди существующих в базе категорий пытаемся найти категорию с тем же именем,
    // с которым хотим создать новую категорию
    const isInArray = req.categoriesArray.find((category) => {
      return req.body.name === category.name;
    });
    // Если нашли совпадение, то отвечаем кодом 400 и сообщением
    if (isInArray) {
      res.setHeader("Content-Type", "application/json");
          res.status(400).send(JSON.stringify({ message: "Категория с таким названием уже существует" }));
    } else {
    // Если категория, которую хотим создать, действительно новая, то передаём управление дальше
      next();
    }
  }; 
  const checkEmptyName = async (req, res, next) => {
    if (!req.body.name) {
      res.setHeader("Content-Type", "application/json");
          res.status(400).send(JSON.stringify({ message: "Введите название категории" }));
    } else {
      next();
    }
  };
module.exports={findAllCategories,createCategory,findCategoryByld,updateCategory,deleteCategory,checkIsCategoryExists,checkEmptyName}