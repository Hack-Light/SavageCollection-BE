const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  //to decode and validate the token
  try {
    const token =
      req.body.token || req.query.token || req.headers["x-access-token"];
    console.log(token);
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.userData = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Auth failed",
    });
  }
};
