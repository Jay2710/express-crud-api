const prisma = require("../config/prisma");

// GET /users
const getUsers = async (req, res) => {
  try {
    const users = await prisma.users.findMany();

    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET /users/:id
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await prisma.users.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// POST /users
const createUser = async (req, res) => {
  try {
    const { username, name, lastname } = req.body;

    const user = await prisma.users.create({
      data: {
        username,
        name,
        lastname,
      },
    });

    res.status(201).json({
      success: true,
      message: "User created",
      id: user.id,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// PUT /users/:id
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, name, lastname } = req.body;

    const existingUser = await prisma.users.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    await prisma.users.update({
      where: {
        id: Number(id),
      },
      data: {
        username,
        name,
        lastname,
      },
    });

    res.json({
      success: true,
      message: "User updated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE /users/:id
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const existingUser = await prisma.users.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    await prisma.users.delete({
      where: {
        id: Number(id),
      },
    });

    res.json({
      success: true,
      message: "User deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};