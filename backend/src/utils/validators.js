import { sendResponse } from "../middlewares/responseMiddleware.js";

export const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const user = await User.create({ username, email, password });

    sendResponse(res, 
      { id: user._id, username: user.username, email: user.email }, 
      "User registered successfully", 
      true, 
      201
    );
  } catch (error) {
    next(error);
  }
};
