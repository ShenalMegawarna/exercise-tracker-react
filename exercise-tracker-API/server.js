const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");

//importing the routes
const exerciseRouter = require("./routes/exercises");
const userRouter = require("./routes/users");


require("dotenv").config(); //This is used to provide the environment varables inside the dotenv file

//Use to create the express server
const app = express();
const port = process.env.port || 5000;

//the use of middleware
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

//Connecting to mondoDB Database
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
}); //useNewUrlParser-->the mondgoDB nodeJS driver rewrote the tool they use to parse the connection string, The this is the connection String parser
//useCreateIndex--> is use to deel with the mongoDB Depricating the Index function
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully.");
});

connection.on("error", (err) => {
  console.log(err);
});

//Create routes
app.use('/exercises', exerciseRouter)
app.use('/users', userRouter)


//Use to start the server
app.listen(port, () => {
  console.log(`server is running on port: ${port}`);
});
