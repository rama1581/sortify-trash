import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white font-sans">
      {/* NAVBAR */}
      <header className="bg-white/10 backdrop-blur-md shadow-md fixed top-0 w-full z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          <div className="text-3xl font-bold text-emerald-400">SortifyTrash</div>
          <nav className="space-x-6 text-gray-300 font-medium">
            <Link to="/" className="hover:text-emerald-300">Home</Link>
            <Link to="/about" className="hover:text-emerald-300">About</Link>
          </nav>
        </div>
      </header>

      {/* MAIN */}
      <main className="pt-32 pb-20 px-6 max-w-6xl mx-auto">
        <section className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-extrabold mb-4 leading-tight tracking-tight text-white drop-shadow">
              AI-Based Trash Classifier
            </h1>
            <p className="text-lg text-gray-300 mb-8">
              Upload sampah dan dapatkan klasifikasi otomatis: <span className="text-emerald-400 font-semibold">Organik</span> atau <span className="text-emerald-400 font-semibold">Anorganik</span>.
            </p>
            <button className="bg-emerald-500 hover:bg-emerald-600 text-white py-3 px-6 rounded-xl shadow-lg transition">
              Mulai Upload
            </button>
          </div>
          <div className="flex justify-center">
            <div className="w-80 h-80 rounded-full border-8 border-emerald-400 overflow-hidden shadow-2xl transform hover:scale-105 transition">
              <img src="/trash.png" alt="Sampah" className="w-full h-full object-cover" />
            </div>
          </div>
        </section>

        {/* UPLOAD AREA */}
        <section className="mt-24">
          <h2 className="text-3xl font-semibold mb-6">Upload Gambar</h2>
          <div
            className="relative bg-white/5 backdrop-blur-lg border border-emerald-400 border-dashed p-10 rounded-xl text-center transition hover:bg-white/10 cursor-pointer"
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mx-auto h-12 w-12 text-emerald-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            <p className="mt-4 text-gray-300">Drag & drop atau klik untuk unggah</p>
          </div>

          {uploadedFile && (
            <div className="mt-6 bg-gray-800/60 backdrop-blur-md p-4 rounded-lg flex items-center justify-between border border-gray-600">
              <span className="text-gray-100 font-medium">{uploadedFile.name}</span>
              <button
                onClick={removeFile}
                className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-1 rounded-lg transition"
              >
                Hapus
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default LandingPage;
