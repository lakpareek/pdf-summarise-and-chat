import express from "express";
import bcrypt from "bcrypt";
import generateToken from "../services/generateToken.js";
import { createUser, findUserByEmail } from "../models/userModel.js";
import pool from "../config/db.js";

export const signup = async (req, res) => {
    try {
        const { email, fullname, password } = req.body;
        if (!email || !fullname || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await createUser(email, fullname, hashedPassword);
        const token = generateToken(user.id, res);
        return res.status(201).json({ message: "User created successfully", user });
      } catch (err) {
        console.error(err);
        res.status(400).json({ message: "Error creating user", errorDetail: err.detail });
      }
};
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await findUserByEmail(email);
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
          return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = generateToken(user.id, res);
        return res.status(200).json({ message: "Login successful", user });
    } catch (error) {
        res.status(400).json({ message: "Error logging in", errorDetail: error.detail });
    }
};
export const logout = async (req, res) => {
    try {
        res.clearCookie("jwt", {
            httpOnly: true,
            sameSite: "None",
            secure: true, 
          });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


export const getMe = async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT id, fullname, email FROM users WHERE id = $1",
            [req.user.id]
        );

        const user = result.rows[0];

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({
            id: user.id,
            fullName: user.fullname,
            email: user.email,
        });
    } catch (error) {
        console.error("Error in getMe controller:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};