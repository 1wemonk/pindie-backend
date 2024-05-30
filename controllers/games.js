const sendAllGames=(req,res)=>{
    res.setHeader('Content-Type','application/json');
    res.end(JSON.stringify(req.gamesArray));
    
};
const sendGameCreated = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(req.game));
};
const sendGameById = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(req.game));
};
// Файл controllers/games.js

const SendGameUpdated = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.status(200).send(JSON.stringify({ message: "Игра успешно обновлена" }));
};
const sendGameDeleted=(req,res)=>{
  res.setHeader('Content-Type','application/json');
  res.end(JSON.stringify(req.game));
}
module.exports={sendAllGames,sendGameCreated,sendGameById,SendGameUpdated,sendGameDeleted}
