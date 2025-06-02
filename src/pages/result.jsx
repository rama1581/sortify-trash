import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { result, accuracy, imageUrl } = location.state || {};

  useEffect(() => {
    if (!result || !imageUrl) {
      navigate("/");
    }
  }, [result, imageUrl, navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-grow flex flex-col items-center justify-center px-4 py-16">
        <div className="w-80 h-80 rounded-full overflow-hidden shadow-lg mb-6">
          <img
            src={imageUrl}
            alt="Hasil Klasifikasi"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-8 bg-[#3F7D58] border border-[#3F7D58] rounded-lg text-center shadow-md max-w-xl w-full">
          <h3 className="text-2xl text-white mb-2 font-semibold">Hasil Klasifikasi</h3>
          <p className="text-xl text-white mb-1">
            Sampah tersebut termasuk:{" "}
            <strong className="text-white-100">{result?.toUpperCase()}</strong>
          </p>
          {accuracy !== undefined && (
            <p className="text-sm text-white">
              Akurasi model: <strong>{accuracy}%</strong>
            </p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Result;
