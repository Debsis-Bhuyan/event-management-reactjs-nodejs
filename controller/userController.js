import User from "../model/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

async function registerUser(userDTO) {
  try {
    const existingUser = await User.findOne({ email: userDTO.email });
    if (existingUser) {
      throw new Error(
        `${userDTO.email} already exists in our system. Please login.`
      );
    }

    const newUser = new User({
      fullName: userDTO.fullName,
      email: userDTO.email,
      password: userDTO.password,
      authProvider: userDTO.authProvider,
    });

    await newUser.save();
    return {
      statusCode: 200,
      message: "User created successfully",
      user: newUser,
    };
  } catch (error) {
    return {
      statusCode: 400,
      message: error.message || "Error occurred during user registration",
    };
  }
}

async function loginUser(loginRequest) {
  try {
    const user = await User.findOne({ email: loginRequest.email });
    if (!user) {
      throw new Error(
        `${loginRequest.email} does not exist in our system. Please register.`
      );
    }

    const isMatch = await bcrypt.compare(loginRequest.password, user.password);
    if (!isMatch) {
      throw new Error(
        "Login Unsuccessful. Please check your email and password."
      );
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );

    return {
      statusCode: 200,
      message: "Login Successful",
      user,
      token,
    };
  } catch (error) {
    return {
      statusCode: 400,
      message: error.message || "Error occurred during user login",
    };
  }
}

async function getAllUsers() {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw new Error("Error occurred while fetching users");
  }
}
async function getUserByToken(userId) {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    return {
      statusCode: 200,
      message: "User data retrieved successfully",
      user,
    };
  } catch (error) {
    return {
      statusCode: 404,
      message: error.message,
    };
  }
}

async function getUserById(userId) {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    return {
      statusCode: 200,
      message: "User data retrieved successfully",
      user,
    };
  } catch (error) {
    return {
      statusCode: 404,
      message: error.message,
    };
  }
}

async function deleteUser(userId) {
  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      throw new Error("User not found");
    }
    return {
      statusCode: 200,
      message: "User deleted successfully",
    };
  } catch (error) {
    return {
      statusCode: 404,
      message: error.message,
    };
  }
}

async function updateUser(id, userDetails) {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { fullName: userDetails.fullName },
      { new: true }
    );
    if (!updatedUser) {
      throw new Error("User not found");
    }
    return updatedUser;
  } catch (error) {
    throw new Error("Error occurred while updating user");
  }
}

export {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
  deleteUser,
  updateUser,
  getUserByToken,
};
