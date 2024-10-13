import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  try {
    // Get the token from the req.cookie.token

    const token = req.cookies.token;
    console.log(token);
    if (!token) {
      return res.status(401).json({ message: "User is not Authenticate due to token is not taken" });
    }

    // after getting the token verify it using jwt.verify

    const decode = await jwt.verify(token, process.env.SECRET_KEY);

    if (!decode) {
      return res.status(401).json({ message: "User is not Authenticate" });
    }
    console.log(decode);

    // decode contains the data stored in tokendata
    // tokendata ={userId=_id}; it contain userId

    // after getting the userId store it in req.id

    req.id = decode.userId;

    next();
  } catch (error) {
    console.log(error);
  }
};

export default isAuthenticated;
