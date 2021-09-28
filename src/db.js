// mongo dataBase 연결
import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/wetube", {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
}); // 새로운 mongodb만드는 것은 / 뒤에 database이름을 적는다.

const db = mongoose.connection;

const handleOpen = () => console.log("🔥 Connected to DB ");
const handleError = (error) => console.log("❌ DB Error", error);

db.on("error", handleError);
db.once("open", handleOpen);
// on: 계속 발생 , once: 한번만
