import { Router } from "express";
import authenticateToken from "../middleware/authMiddleware.js";
import {
  deleteUser,
  getAllUsers,
  getUserById,
  getUserByToken,
  loginUser,
  registerUser,
  updateUser,
} from "../controller/userController.js";

const router = Router();

router.post("/register", async (req, res) => {
  const response = await registerUser(req.body);
  res.status(response.statusCode).json(response);
});

router.post("/login", async (req, res) => {
  const response = await loginUser(req.body);
  res.status(response.statusCode).json(response);
});

router.get("/all-users", async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get(
  "/user",
  authenticateToken,
  async (req, res) => {const response = await getUserByToken(req.user.id); return res.status(200).json(response)}
);

router.get("/:id", async (req, res) => {
  const response = await getUserById(req.params.id);
  res.status(response.statusCode).json(response);
});

// router.get("/user", authenticateToken, async (req, res) => {
//   console.log(req.user);
//   console.log("Hello");
//   const response = await getUserByToken(req.user.id);
//   res.status(200).json(response);
// });

router.delete("/users/:id", authenticateToken, async (req, res) => {
  const response = await deleteUser(req.params.id);
  res.status(response.statusCode).json(response);
});

router.put("/users/:id", async (req, res) => {
  try {
    const updatedUser = await updateUser(req.params.id, req.body);
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
