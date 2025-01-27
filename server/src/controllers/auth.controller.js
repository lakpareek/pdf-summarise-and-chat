import express from "express";
//ßimport pdf from "pdf-parse";
import fs from "fs";

export const signup = async (req, res) => {
    try {
        const { fullName, username, password } = req.body;
        console.log(req.body, "this is req.body")
        const newUser = {
            data: {
                fullName,
                username,
                password,
            },
        };
        if (newUser) {
            res.status(201).json({
                fullName: newUser.data.fullName,
                username: newUser.data.username,
                password: newUser.data.password,
            });
            
        }
        else {
            res.status(400).json({ error: "Invalid user data" });
        }
    }
    catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
export const login = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
};
export const logout = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
};
export const getMe = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
};