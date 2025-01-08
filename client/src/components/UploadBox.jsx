import React, { useState } from 'react';
import axios from 'axios';

const UploadBox = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            alert("Please select a PDF file to upload.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);
        console.log(file);

        try {
            const response = await axios.post('http://localhost:3001/api/pdf/uploadpdf', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('File uploaded successfully:', response.data);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    return (
        <div className="bg-slate-500 w-[50vw] h-[15vw] rounded-3xl flex flex-col items-center justify-center p-4">
            <input
                type="file"
                accept="application/pdf"
                id="pdfInput"
                onChange={handleFileChange}
                className="mb-4"
            />
            <button
                onClick={handleUpload}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
                Upload PDF
            </button>
        </div>
    );
};

export default UploadBox;