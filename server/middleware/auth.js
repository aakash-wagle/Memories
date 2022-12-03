import jwt from "jsonwebtoken";

// The req can be populated in the middleware
// The data added can be accessed in the next handler

const auth = async (req, res, next) => {
  try {
    console.log("Middleware triggered");
    const token = req.headers.authorization.split(" ")[1]; // keys are always received in lowercase at the backend
    // const isCustomAuth = token.length < 500;
    const isGoogleAuth = token.indexOf("apps.googleusercontent.com");
    console.log(`Token: ${token}`);
    console.log(`isGoogleAuth: ${isGoogleAuth}`);
    let decodedData;

    if (token && isGoogleAuth!==-1) {
      decodedData = jwt.decode(token);
      // console.log(`decodedData: ${decodedData}`);
      req.userID = decodedData?.sub;
      // console.log(`${req.userID} req.userID`);
    } else {
      console.log(`In custom auth`);
      
      decodedData = jwt.verify(token, "test");

      console.log(`${decodedData} decodedData`);
      req.userID = decodedData?.id;
      console.log(`${req.userID} req.userID`);

    }
    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
