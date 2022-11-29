import jwt from "jsonwebtoken";

// The req can be populated in the middleware 
// The data added can be accessed in the next handler

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];  // keys are always received in lowercase at the backend
    const isCustomAuth = token.length < 500;

    let decodedData;

    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, "test");

      req.userID = decodedData.id;
    } else {
      decodedData = jwt.decode(token);
      req.userID = decodedData.sub;
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;