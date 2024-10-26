const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const productsRouter = require("./routes/products");
const usersRouter = require("./routes/users");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/products", productsRouter);
app.use("/users", usersRouter);

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});