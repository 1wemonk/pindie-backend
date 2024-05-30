const sendAllCategories=(req,res)=>{
    res.setHeader('Content-Type','application/json');
    res.end(JSON.stringify(req.categoriesArray));
};
// controllers/categories.js
const sendCategoryCreated = (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(req.category));
  };
const sendCategoryById=(req,res)=>{
   res.setHeader('Content-Type','application/json');
   res.end(JSON.stringify(req.category));
}
const sendCategoryUpdated=(req,res)=>{
  res.setHeader('Content-Type','application/json');
  res.status(200).send(JSON.stringify({ message: "Категория успешно обнавлена" }));
};
const sendCategoryDeleted=(req,res)=>{
  res.setHeader('Content-Type','application/json');
  res.end(JSON.stringify(req.category));
};
module.exports={sendAllCategories,sendCategoryCreated,sendCategoryById,sendCategoryUpdated,sendCategoryDeleted}