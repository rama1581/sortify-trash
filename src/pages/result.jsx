import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";

const result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { result, imageUrl } = location.state || {};

  useEffect(() => {
    if (!result || !imageUrl) {
      navigate("/");
    }
  }, [result, imageUrl, navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
        <br></br><br></br><br></br>
      <main className="flex-grow flex flex-col items-center justify-center px-4 py-10">
        <div className="w-80 h-80 rounded-full overflow-hidden shadow-lg mb-6">
          <img
            src={imageUrl}
            alt="Hasil Klasifikasi"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-8 bg-[#3F7D58] border border-[#3F7D58] rounded-lg text-center shadow-md max-w-xl w-full">
          <h3 className="text-2xl text-white mb-2 font-semibold">Hasil Klasifikasi</h3>
          <p className="text-xl text-white">
            Sampah tersebut termasuk: <strong className="text-white-100">{result?.toUpperCase()}</strong>
          </p>
        </div>
      </main>
      <br></br><br></br><br></br>
      <Footer />
    </div>
  );
};

export default result;
