const validateLead = (req, res, next) => {
  const { name, email, budget, message } = req.body;

  if (!name || !email || !budget || !message) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Invalid email address",
    });
  }

  next();
};

module.exports = validateLead;