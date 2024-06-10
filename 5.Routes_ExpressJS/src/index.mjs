import express from "express";
import router from "./routes/eventsRoutes.mjs"; // Make sure the path is correct
const app = express();
app.use(express.json());

// use our router
app.use(router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server running at port: ${PORT}`);
});
