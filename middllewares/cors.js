// Вместо нашего адреса вставь свой
// Можно ещё не удалять адреса с localhost, но мы удалили для краткости
const allowedCors = ["http://localhost:3001", 
                     "http://localhost:3000",
                     "https://pinbackwemonk.nomorepartiesco.ru", 
                     "https://pinbackwemonk.nomorepartiesco.ru/api",
                     "https://pinfrontwemonk.nomorepartiesco.ru"];

function cors(req, res, next) {
  const { origin } = req.headers;

  if (allowedCors.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization");
  next();
}

module.exports = cors; 
