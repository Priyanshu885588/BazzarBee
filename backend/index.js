require("dotenv").config()
const express = require('express');
const app = express();

const connectDB = require("./db/db");
const userRoute = require("./routes/userRoutes")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/user",userRoute)


app.get('/start', (req, res) => {

  console.log('Starting the process...');
  res.send('Process completed successfully!');
});

// Start the server
const port = process.env.PORT || 3000; // Use environment variable or default port 3000
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