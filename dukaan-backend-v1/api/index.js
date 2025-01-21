const bodyParser = require("body-parser");
const express = require("express");
const dbConnect = require("../config/dbConnect");
const { notFound, errorHandler } = require("../middlewares/errorHandler");
const app = express();
const dotenv = require("dotenv").config();
const PORT = 4000;
const authRouter = require("../routes/authRoute");
const productRouter = require("../routes/productRoute");
const blogRouter = require("../routes/blogRoute");
const categoryRouter = require("../routes/prodcategoryRoute");
const blogcategoryRouter = require("../routes/blogCatRoute");
const brandRouter = require("../routes/brandRoute");
const colorRouter = require("../routes/colorRoute");
const enqRouter = require("../routes/enqRoute");
const couponRouter = require("../routes/couponRoute");
const uploadRouter = require("../routes/uploadRoute");
const apiKeyRouter = require("../routes/apiKeyRoute");
const publicRouter = require("../routes/publicRoute");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");

dbConnect();
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/api/user", authRouter);
app.use("/api/product", productRouter);
app.use("/api/blog", blogRouter);
app.use("/api/category", categoryRouter);
app.use("/api/blogcategory", blogcategoryRouter);
app.use("/api/brand", brandRouter);
app.use("/api/coupon", couponRouter);
app.use("/api/color", colorRouter);
app.use("/api/enquiry", enqRouter);
app.use("/api/upload", uploadRouter);
app.use('/api/apikey', apiKeyRouter);
app.use('/api/public',publicRouter)
app.get('/', async (req, res) => {
    
    res.status(200).json({
      message: 'Hello from E-Comm ',
    });
  });


app.use(notFound);
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server is running  at PORT ${PORT}`);
});

// Export the Express app as a serverless function
// module.exports = app;
// module.exports.handler = (req, res) => {
//   return app(req, res);
// };