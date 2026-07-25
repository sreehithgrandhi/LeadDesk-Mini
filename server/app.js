const express = require("express");
const cors = require("cors");
require("dotenv").config();
const adminRoutes = require("./routes/adminRoutes");

const leadRoutes = require("./routes/leadRoutes");
const pool = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());


app.use("/api/leads", leadRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");

    res.json({
      success: true,
      message: "LeadFlow Backend is Connected!",
      databaseTime: result.rows[0].now,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Database Connection Failed",
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});