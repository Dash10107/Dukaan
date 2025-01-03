const bodyParser = require("body-parser");
const express = require("express");
const dbConnect = require("./config/dbConnect");
const { notFound, errorHandler } = require("./middlewares/error.handler");
const authRotes = require("./routes/auth.route")
const productRoutes = require("./routes/product.route")
const app = express();
const dotenv = require("dotenv")
const PORT = process.env.port || 5000;
const morgan = require("morgan");
const cors = require("cors");
dotenv.config({});
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', async (req, res) => {
    
    res.status(200).json({
      message: 'Hello from Dukaan',
    });
  });



app.use("/api/v1/user",authRotes);
app.use("/api/v1/product",productRoutes);
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
    dbConnect();
    console.log(`Server is running on port ${PORT}`);
    });