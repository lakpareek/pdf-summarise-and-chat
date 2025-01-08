import express from "express";
//ßimport pdf from "pdf-parse";
import fs from "fs";

export const pdfToText = async (req, res) => {
  try {
    res.send("path working")
    console.log(req.data);
    //pdf conversion logic will go here later
  } catch (error) {
    console.log("Error in parsing pdf", error.message);
    res.status(500).json({ error: "error in pdf reading" });
  }
};
export const uploadPdf = async (req, res) => {
  try {
    res.send("path working")
    console.log(req);
    //function logic will go here later
  } catch (error) {
    console.log("Error in parsing pdf", error.message);
    res.status(500).json({ error: "error in pdf reading" });
  }
};
