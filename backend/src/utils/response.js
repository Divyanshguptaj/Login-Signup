// Standardized API response middleware/helper
export const sendResponse = (res, data = null, message = "", success = true, statusCode = 200) => {
    return res.status(statusCode).json({
      success,
      message,
      data,
    });
  };
  
  // Example usage in controller:
  // sendResponse(res, user, "User created successfully", true, 201)  