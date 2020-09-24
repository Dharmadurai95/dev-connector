const jwt = require("jsonwebtoken");
async function dd() {
  let token = await jwt.sign({ id: "hello" }, "process.env.SECRET_KEY", {
    expiresIn: "15m",
  });
  return token;
}
dd()
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
// env-cmd -f ./config/.env
