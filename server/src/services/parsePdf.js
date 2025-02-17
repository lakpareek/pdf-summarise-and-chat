import pdfParse from "pdf-parse/lib/pdf-parse.js";
import fs from "fs/promises";

export const parsePdf = async (filePath) => {
    try {
        const dataBuffer = await fs.readFile(filePath);
        const data = await pdfParse(dataBuffer);
        return data.text;
    } catch (error) {
        console.error("Error parsing PDF:", error);
        throw error;
    }
};
