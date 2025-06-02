import React from "react";
import Navbar from "../components/Navbar"; // pastikan Navbar sudah dibuat dan diekspor
import fotoAbout from "../assets/about.jpg";

const About = () => {
  return (
    <div className="bg-white text-gray-800 font-sans">
      <Navbar />

      {/* Hero Gambar Sampah */}
      <section className="h-[300px] w-full overflow-hidden">
        <img
          src={fotoAbout}
          alt="About Banner"
          className="w-full h-full object-cover object-center"
        />
      </section>

      <br></br><br></br>

      {/* Fitur*/}
      <section className="py-10 px-4 sm:px-6 lg:px-20 bg-white">
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
          {[
            { jenis: "Sampah Sisa Makanan", persentase: "39,26%" },
            { jenis: "Sampah Plastik", persentase: "19,74%" },
            { jenis: "Sampah Kayu", persentase: "12,58%" },
          ].map((item, index) => (
            <div
              key={index}
              className="w-[200px] h-[120px] bg-[#EC5228]-100 rounded-lg shadow-md flex flex-col items-center justify-center"
            >
              <p className="text-lg font-semibold">{item.persentase}</p>
              <p className="text-sm text-white-600 text-center px-2">{item.jenis}</p>
            </div>
          ))}
        </div>
      </section>

      <br></br><br></br>
      
      {/* Paragraf Penjelasan */}
      <section className="px-6 sm:px-12 lg:px-32 py-10 bg-white text-justify">
        <h2 className="text-xl font-semibold text-center mb-6">Mengapa Sortify-trash dibuat</h2>
        <p className="text-sm leading-relaxed text-gray-700">
          Sortify Trash dibuat sebagai solusi inovatif untuk meningkatkan kesadaran dan efisiensi dalam pengelolaan sampah di lingkungan masyarakat. Banyaknya jenis sampah yang tercampur tanpa pemilahan yang tepat menyebabkan proses daur ulang menjadi tidak optimal dan berdampak buruk terhadap lingkungan. Dengan adanya Sortify Trash, pengguna dapat dengan mudah mengidentifikasi dan mengelompokkan sampah ke dalam kategori organik dan anorganik, sehingga proses daur ulang dapat berjalan lebih efektif. Selain itu, aplikasi ini juga bertujuan untuk mengedukasi masyarakat tentang pentingnya memilah sampah sejak dari rumah, sebagai langkah awal menuju gaya hidup yang lebih ramah lingkungan dan berkelanjutan.
        </p>
      </section>
    </div>
  );
};

export default About;
