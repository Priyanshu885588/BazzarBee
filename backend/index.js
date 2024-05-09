require("dotenv").config()
const express = require('express');
const app = express();

const connectDB = require("./db/db");
const userRoute = require("./routes/userRoutes")
const productRoute = require("./routes/productRoutes")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/user",userRoute)

app.use("/api/v1/product",productRoute)


app.get('/start', (req, res) => {

  console.log('Starting the process...');
  res.send('Process completed successfully!');
});


const port = process.env.PORT || 3000; 
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log("server is listening on ", port);
    });
  } catch (error) {
    console.log(error);
  }
};

start();