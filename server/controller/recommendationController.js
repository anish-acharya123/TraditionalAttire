const jwt = require("jsonwebtoken");
const { exec } = require("child_process");
const path = require("path");

// Middleware to verify token and execute recommendation logic
exports.verifyToken = (req, res) => {
  const token = req.cookies.token;
  console.log(token);

  if (!token) {
    return res.status(401).send("Access Denied");
  }

  try {
    // Verify the token
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    console.log(verified);
    req.user = verified;

    // Extract the email from the verified token
    const email = req.user.email;
    console.log(email);

    // Execute the Python recommendation script with the email argument
    const pythonScriptPath = path.join(
      __dirname,
      "../scripts/recommendation.py"
    );
    exec(`python ${pythonScriptPath} ${email}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${stderr}`);
        return res.status(500).send("Server Error");
      }

      // Parse the output from the Python script and return the recommendations
      const recommendations = JSON.parse(stdout);
      console.log(recommendations);
      res.json(recommendations);
    });
  } catch (error) {
    return res.status(400).send("internal server error");
  }
};
