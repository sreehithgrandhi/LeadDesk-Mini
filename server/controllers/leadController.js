const pool = require("../config/db");

const getAllLeads = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM leads
       ORDER BY created_at DESC`
    );

    res.status(200).json({
      success: true,
      leads: result.rows,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch leads",
    });
  }
};

const createLead = async (req, res) => {
  try {
    const { name, email, budget, message } = req.body;

    const result = await pool.query(
      `INSERT INTO leads
      (name, email, budget, message)
      VALUES ($1, $2, $3, $4)
      RETURNING *`,
      [name, email, budget, message]
    );

    res.status(201).json({
      success: true,
      lead: result.rows[0],
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to create lead",
    });
  }
};

const updateLeadStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const result = await pool.query(
      `UPDATE leads
       SET status = $1,
           updated_at = NOW()
       WHERE id = $2
       RETURNING *`,
      [status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    res.status(200).json({
      success: true,
      lead: result.rows[0],
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to update lead",
    });
  }
};

const deleteLead = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `DELETE FROM leads
       WHERE id = $1
       RETURNING *`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Lead deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to delete lead",
    });
  }
};

module.exports = {
  getAllLeads,
  createLead,
  updateLeadStatus,
  deleteLead,
};