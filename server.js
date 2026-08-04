const express = require("express");
const db = require("./config/db");
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
const userRoutes = require("./routes/users");
app.get("/", (req, res) => {
  res.send("Hello from Express API!");
});
async function testDatabaseConnection() {
  try {
    const connection = await db.getConnection();
    console.log("✅ Database connected successfully!");
    connection.release();
  } catch (error) {
    console.error("❌ Database connection failed");
    console.error(error.message);
  }
}
testDatabaseConnection();
app.use("/users", userRoutes);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
