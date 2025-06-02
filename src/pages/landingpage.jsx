import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { FiTrash2, FiDownload, FiFile } from "react-icons/fi";
import fotoHero from "../assets/foto.jpg"; // ✅ IMPORT GAMBAR

const LandingPage = () => {
  const navigate = useNavigate();
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setUploadedFile(e.dataTransfer.files[0]);
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 font-sans">
      <Navbar />
      <br />
      <main className="pt-24 px-6 max-w-6xl mx-auto">
        {/* HERO */}
        <section className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#2e7d32] mb-2">
              Sortify–<span className="text-gray-900">Trash</span>
            </h1>
            <p className="text-sm text-gray-600 mb-6">Clean Environment</p>
            <button className="bg-[#f97316] hover:bg-orange-500 text-white text-sm font-semibold py-2 px-4 rounded-lg shadow">
              Upload Photo
            </button>
          </div>

          {/* Right - Circular Image */}
          <div className="flex justify-center">
            <img
              src={fotoHero}
              alt="Sampah"
              className="w-72 h-72 object-cover rounded-full border-4 border-gray-200 shadow-lg"
            />
          </div>
        </section>

        {/* UPLOAD AREA */}
        <section className="mt-20">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-[#2e7d32] mb-4">Upload Files</h2>

            {/* Drop Zone */}
            <div
              className="border-2 border-dashed border-gray-300 rounded-lg py-10 text-center cursor-pointer hover:bg-gray-50 transition"
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              onClick={() => document.getElementById("fileInput").click()}
            >
              <input
                type="file"
                id="fileInput"
                className="hidden"
                onChange={handleFileChange}
              />
              <div className="flex justify-center text-[#2e7d32] mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <p className="text-gray-500">Drag & drop or click to choose files</p>
            </div>

            {/* File Info */}
            {uploadedFile && (
              <div className="mt-6 bg-white border border-gray-200 rounded-lg px-4 py-3 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-3">
                  <FiFile className="text-[#2e7d32] text-xl" />
                  <span className="text-gray-800 font-medium">{uploadedFile.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <FiDownload className="text-gray-500 cursor-pointer hover:text-gray-700" />
                  <button
                    onClick={removeFile}
                    className="bg-orange-400 hover:bg-orange-500 text-white text-sm px-4 py-1.5 rounded-md"
                  >
                    <FiTrash2 className="inline mr-2" />
                    Remove file
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
        <br /><br /><br />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;