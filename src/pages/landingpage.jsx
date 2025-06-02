import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import fotoHero from "../assets/foto.jpg";

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

  const handleSubmit = async () => {
    if (!uploadedFile) return;

    const formData = new FormData();
    formData.append("file", uploadedFile);

    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      const imageUrl = URL.createObjectURL(uploadedFile);

      navigate("/result", {
        state: {
          result: data.result,
          imageUrl: imageUrl,
        },
      });
    } catch (error) {
      console.error("Error saat upload:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f3f3] text-gray-800 font-sans flex flex-col">
      <Navbar />
      <main className="pt-24 px-4 sm:px-8 md:px-16 lg:px-32 flex-1">
        {/* HERO */}
        <section className="grid md:grid-cols-2 items-center gap-10">
          <div className="text-left pl-20">
            <h1 className="text-6xl font-extrabold text-[#3F7D58] leading-tight">
              Sortify–<span className="text-gray-900">Trash</span>
            </h1>
            <p className="text-sm text-gray-600 mt-1 mb-6">Clean Environment</p>
          </div>
          <div className="flex justify-center">
            <img
              src={fotoHero}
              alt="Sampah"
              className="w-[300px] h-[300px] rounded-full object-cover border-4 border-white shadow-lg"
            />
          </div>
        </section>

        {/* UPLOAD AREA */}
        <section className="mt-16 mb-20">
          <div className="bg-white max-w-3xl mx-auto rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-black mb-4">Upload Files</h2>

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
              <div className="flex justify-center text-black mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <p className="text-gray-500 text-sm">Drag & drop atau klik untuk upload gambar</p>
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

            <br />
            <button
              onClick={handleSubmit}
              className="bg-[#3F7D58] text-white hover:bg-[#64A47E] hover:text-black py-3 px-6 rounded-xl shadow-lg transition"
            >
              Klasifikasikan Sekarang
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
