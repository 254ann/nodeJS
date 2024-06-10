import express from "express";
import router from "./routes/index.mjs";
// import router from '../src/routes/index.mjs'
import eventRouter from '../src/routes/eventRoutes.mjs'
const app = express();
app.use(express.json());

//use our router
app.use(router)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server running at port: ${PORT}`);
});
