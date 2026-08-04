const db = require("../config/db");

// GET /users
const getUsers = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM users");

    res.status(200).json({
      success: true,
      data: rows,
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

    const [rows] = await db.query(
      "SELECT * FROM users WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      data: rows[0],
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
    console.log("GET /users called");
    console.log(process.env.DB_HOST);
    console.log(process.env.DB_USER);
    const { username, name, lastname } = req.body;

    const [result] = await db.query(
      "INSERT INTO users (username, name, lastname) VALUES (?, ?, ?)",
      [username, name, lastname]
    );

    res.status(201).json({
      success: true,
      message: "User created",
      id: result.insertId,
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

    const [result] = await db.query(
      `UPDATE users
       SET username = ?, name = ?, lastname = ?
       WHERE id = ?`,
      [username, name, lastname, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

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

    const [result] = await db.query(
      "DELETE FROM users WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

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