import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export function createUser(req, res) {
  console.log(req.body);
  const passwordHash = bcrypt.hashSync(req.body.password, 10);

  const userData = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: passwordHash,
    phone: req.body.phone || "NOT GIVEN",
    image:
      req.body.image ||
      "https://png.pngtree.com/png-clipart/20191120/original/pngtree-outline-user-icon-png-image_5045523.jpg",
    isBlocked: req.body.isBlocked || false,
  };

  const user = new User(userData);

  user
    .save()
    .then(() => {
      res.json({
        message: "User created successfully",
      });
    })
    .catch(() => {
      res.json({
        message: "Failed to create user",
      });
    });
}

export function loginUser(req, res) {
  const email = req.body.email;

  const password = req.body.password;
  console.log(req.body);

  User.findOne({
    email: email,
  }).then((user) => {
    if (user == null) {
      res.status(404).json({
        message: "User not found",
      });
    } else {
      const isPasswordCorrect = bcrypt.compareSync(password, user.password);
      if (isPasswordCorrect) {
        const token = jwt.sign(
          {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            isBlocked: user.isBlocked,
            isEmailVerified: user.isEmailVerified,
            image: user.image,
          },
          process.env.JWT_SECRET
        );

        res.json({
          token: token,
          role: user.role,
          message: "Login successful..",
        });
      } else {
        res.status(403).json({
          message: "Incorrect password",
        });
      }
    }
  });
}

export async function getUser(req, res) {
  try {
    if (isAdmin(req)) {
      console.log(req.user);
      const users = await User.find();
      return res.json(users);
    }
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ message: "Failed to fetch users" });
  }
}

export async function editUser(req, res) {
  console.log(req.body.email);
  console.log(req.body);
  
  if (!isAdmin(req)) {
    res.status(403).json({ message: "Access denied. Admins only." });
    return;
  }

  const data = req.body;
  const email = req.params.email;
  console.log("eeee",email);
  //to prevent overwriting the productId in the request body

  try {
    await User.updateOne(
      {
        email: email,
      },
      data
    );
    res.json({ message: "Product updated successfully" });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Failed to update product" });
    return;
  } 
}
export function isAdmin(req) {
  if (req.user == null) {
    return false;
  }

  if (req.user.role == "admin") {
    return true;
  } else {
    return false;
  }
}
