// server.js

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

// Database connection
mongoose.connect("mongodb://localhost:27017/afghansInAmericaDB", { useNewUrlParser: true, useUnifiedTopology: true });

// User schema and model
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
});

const User = mongoose.model("User", userSchema);

// Signup route
app.post("/signup", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();
        res.redirect("/login.html");
    } catch (error) {
        res.status(500).send("Error signing up, please try again.");
    }
});

// Login route
app.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).send("Invalid username or password.");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).send("Invalid username or password.");
        }

        const token = jwt.sign({ id: user._id }, "secret_key", { expiresIn: "1h" });

        res.cookie("token", token, { httpOnly: true });
        res.redirect("/index.html");
    } catch (error) {
        res.status(500).send("Error logging in, please try again.");
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
