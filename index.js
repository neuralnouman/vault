import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3001;
var user = false;

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from public directory
app.use(express.static('public'));

// Password checker middleware - only for POST requests
function PasswordChecker(req, res, next) {
  console.log(req.body);
  
  // Only check password if req.body exists and has a password field
  if (req.body && req.body.password) {
    const password = req.body.password;
    if (password === "ILoveProgramming") {
      user = true;
    } else {
      user = false;
    }
  }
  next();
}

// Routes
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// Apply password checker only to the POST route
app.post("/check", PasswordChecker, (req, res) => {
  if (user === true) {
    res.sendFile(__dirname + "/public/secret.html");
  } else {
    res.sendFile(__dirname + "/public/index.html");
  }
});

app.listen(port, () => {
  console.log(`🚀 Vault server running on http://localhost:${port}`);
});