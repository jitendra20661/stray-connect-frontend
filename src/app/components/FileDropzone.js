"use client";
import React, { useState } from "react";

export default function FileDropzone() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Allow only image files (JPEG, PNG, GIF, etc.)
        if (!file.type.startsWith("image/")) {
            setError("Please upload an image file (JPG, PNG, GIF, etc.).");
            e.target.value = ""; // Reset input
            return;
        }

        setIsLoading(true);
        setError(null);
        setSuccess(false);

        // Create FormData and append file
        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch("https://customer-churn-backend.onrender.com/predict", {
                method: "POST",
                headers: { Accept: "application/json" },
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Upload failed. Please try again.");
            }

            const result = await response.json();
            setSuccess(true);
            console.log("Upload successful:", result);
        } catch (error) {
            setError(error.message);
            console.log("Upload error:", error);
        } finally {
            setIsLoading(false);
            e.target.value = ""; // Reset input
        }
    };

    return (
        <div className="w-full">
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            {success && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                    File uploaded successfully!
                </div>
            )}

            <div className="flex items-center justify-center w-full">
                <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer 
                    bg-gray-50 dark:hover:bg-gray-300 dark:bg-gray-300 hover:bg-gray-100 
                    dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                    {isLoading ? (
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white mb-4"></div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Processing file...</p>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg
                                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 16"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                />
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-500">
                                <span className="font-semibold">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-700">Upload an Image (JPG, PNG, GIF)</p>
                        </div>
                    )}
                    <input
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                        accept="image/*" // Allow only images
                        onChange={handleFileChange}
                        disabled={isLoading}
                    />
                </label>
            </div>
        </div>
    );
}
