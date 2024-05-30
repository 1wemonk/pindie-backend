const game = require("../models/game")

const findAllGames = async (req, res, next) => {
  if(req.query["categories.name"]) { 
    req.gamesArray = await game.findGameByCategory(req.query["categories.name"]);
    next();
    return;
  }
  // Поиск всех игр в проекте
  req.gamesArray = await game
    .find({})
    .populate("categories")
    .populate({
      path: "users",
      select: "-password" // Исключим данные о паролях пользователей
    })
  next();
};
const createGame = async (req, res, next) => {
  console.log("POST /games");
  try {
    console.log(req.body);
    req.game = await game.create(req.body);
    next();
  } catch (error) {
      res.setHeader("Content-Type", "application/json");
        res.status(400).send(JSON.stringify({ message: "Ошибка создания игры" }));
  }
};
const findGameById = async (req, res, next) => {
  try {
      // Пробуем найти игру по id
    req.game = await game
      .findById(req.params.id) // Поиск записи по id
      .populate("categories") // Загрузка связанных записей о категориях
      .populate({path:"users",select:'-password'}); // Загрузка связанных записей о пользователях
    next(); // Передаём управление в следующую функцию
  } catch (error) {
    // На случай ошибки вернём статус-код 404 с сообщением, что игра не найдена
    res.status(404).send({ message: "Игра не найдена" });
  }
}; 
const updateGame = async (req, res, next) => {
  try {
      // В метод передаём id из параметров запроса и объект с новыми свойствами
    req.game = await game.findByIdAndUpdate(req.params.id, req.body);
    next();
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(JSON.stringify({ message: "Ошибка обновления игры" }));
  }
};
const deleteGame=async (req,res,next)=>{
  try{
  req.game=await game.findByIdAndDelete(req.params.id);
  next();
  }catch(e){
    res.setHeader('Content-Type','application/json');
    res.status(400).send(JSON.stringify({message:'ошибка  удалении игры'}));
  }
};
const checkIsVoteRequest = async (req, res, next) => {
  // Если в запросе присылают только поле users
if (Object.keys(req.body).length === 1 && req.body.users) {
  req.isVoteRequest = true;
}
next();

};
const checkEmptyFields = async (req, res, next) => {
  if(req.isVoteRequest) {
    next();
    return;
  }
  if (
    !req.body.title ||
    !req.body.description ||
    !req.body.image ||
    !req.body.link ||
    !req.body.developer
  ) {
    // Если какое-то из полей отсутствует, то не будем обрабатывать запрос дальше,
    // а ответим кодом 400 — данные неверны.
    res.setHeader("Content-Type", "application/json");
        res.status(400).send(JSON.stringify({ message: "Заполни все поля" }));
  } else {
    // Если всё в порядке, то передадим управление следующим миддлварам
    next();
  }
};
const checkIfCategoriesAvaliable = async (req, res, next) => {
  if(req.isVoteRequest) {
    next();
    return;
  }
  // Проверяем наличие жанра у игры
if (!req.body.categories || req.body.categories.length === 0) {
  res.setHeader("Content-Type", "application/json");
      res.status(400).send(JSON.stringify({ message: "Выбери хотя бы одну категорию" }));
} else {
  next();
}
};
const checkIfUsersAreSafe = async (req, res, next) => {
  // Проверим, есть ли users в теле запроса
if (!req.body.users) {
  next();
  return;
}
// Cверим, на сколько изменился массив пользователей в запросе
// с актуальным значением пользователей в объекте game
// Если больше чем на единицу, вернём статус ошибки 400 с сообщением
if (req.body.users.length - 1 === req.game.users.length) {
  next();
  return;
} else {
  res.setHeader("Content-Type", "application/json");
      res.status(400).send(JSON.stringify({ message: "Нельзя удалять пользователей или добавлять больше одного пользователя" }));
}
};
const checkIsGameExists = async (req, res, next) => {
  const isInArray = req.gamesArray.find((game) => {
    return req.body.title === game.title;
  });
  if (isInArray) {
    res.setHeader("Content-Type", "application/json");
        res.status(400).send(JSON.stringify({ message: "Игра с таким названием уже существует" }));
  } else {
    next();
  }
};
module.exports={findAllGames,createGame,findGameById,updateGame,deleteGame,checkEmptyFields,checkIfCategoriesAvaliable,checkIfUsersAreSafe,checkIsGameExists,checkIsVoteRequest}