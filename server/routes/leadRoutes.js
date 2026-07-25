const express = require("express");

const router = express.Router();

const {
  getAllLeads,
  createLead,
  updateLeadStatus,
  deleteLead,
} = require("../controllers/leadController");

const validateLead = require("../middleware/validateLead");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, getAllLeads);

router.post("/", validateLead, createLead);

router.put("/:id", authMiddleware, updateLeadStatus);

router.delete("/:id", authMiddleware, deleteLead);

module.exports = router;