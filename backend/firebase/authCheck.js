const { app } = require("./init");

const getAuthToken = (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    req.authToken = req.headers.authorization.split(" ")[1];
  } else {
    req.authToken = null;
  }
  next();
};

const checkIfAuthenticated = (req, res, next) => {
  getAuthToken(req, res, async () => {
    try {
      const { authToken } = req;
      const userInfo = await app.verifyIdToken(authToken);
      req.authId = userInfo.uid;
      return next();
    } catch (error) {
      res.status(401).send({ error: "You are not logged in." });
    }
  });
};

module.exports = { checkIfAuthenticated };