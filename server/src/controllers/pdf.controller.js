import express from "express";
import { parsePdf } from "../services/parsePdf.js";
import { uploadOnCloudinary } from "../services/cloudinary.js";
import { createPdf } from "../models/pdfModel.js";
import { generateSummary } from "../services/gemini.js";
import {
  createConversation,
  createMessage,
} from "../models/conversationsModel.js";

export const uploadPdf = async (req, res) => {
  try {
    // Initial validation
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: User ID is missing",
      });
    }

    const extractedText = await parsePdf(req.file.path);
    if (!extractedText) {
      return res.status(500).json({
        success: false,
        message: "Failed to extract text from PDF",
      });
    }

    console.log(extractedText);
    const summary = await generateSummary(extractedText);
    if (!summary || summary === "Summary generation failed.") {
      return res.status(500).json({
        success: false,
        message: "Failed to generate summary",
      });
    }
    // Attempt Cloudinary upload
    try {
      const cloudinaryResponse = await uploadOnCloudinary(req.file.path);
      const pdf = await createPdf(
        req.user.id,
        cloudinaryResponse.secure_url,
        req.file.originalname
      );
      const conversation = await createConversation(req.user.id, pdf.id, extractedText);
      const message = await createMessage(conversation.id, "model", summary);
      return res.status(200).json({
        success: true,
        message: "File uploaded on cloud successfully",
        localFile: {
          filename: req.file.filename,
          mimetype: req.file.mimetype,
        },
        cloudinary: {
          url: cloudinaryResponse.secure_url,
          public_id: cloudinaryResponse.public_id,
        },
      });
    } catch (cloudinaryError) {
      // Handle Cloudinary-specific errors
      return res.status(500).json({
        success: false,
        message: "Cloudinary upload failed",
        error: cloudinaryError.message,
      });
    }
  } catch (error) {
    // Handle any other errors
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
