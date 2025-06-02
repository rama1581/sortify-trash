import React from "react";

const about = () => {
  return (
    <div className="bg-white text-gray-800 font-sans">
      {/* Hero / Banner */}
      <section className="bg-gray-300 h-[300px] flex items-center justify-center text-center">
        <h1 className="text-xl md:text-3xl font-bold text-gray-700">isinya bg sampah</h1>
      </section>

      {/* Fitur Utama */}
      <section className="py-10 px-4 sm:px-6 lg:px-20 bg-white">
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="w-[200px] h-[120px] bg-gray-100 rounded-lg shadow-md flex flex-col items-center justify-center"
            >
              <p className="text-lg font-semibold">100%</p>
              <p className="text-sm text-gray-600">blablabla</p>
            </div>
          ))}
        </div>
      </section>

      {/* Paragraf Penjelasan */}
      <section className="px-6 sm:px-12 lg:px-32 py-10 bg-white text-justify">
        <h2 className="text-xl font-semibold text-center mb-6">Paragraf tentang mengapa dibikin</h2>
        <p className="text-sm leading-relaxed text-gray-700">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed varius augue ac ex cursus, quis ullamcorper justo hendrerit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer bibendum nisi nec porta hendrerit. Nullam porttitor tortor vitae justo dignissim, non lacinia libero placerat. Donec et sapien sit amet sem suscipit varius. Phasellus vitae nunc at ante efficitur iaculis. In nec bibendum magna, in blandit augue. Integer et erat risus. Suspendisse tincidunt gravida ligula nec egestas. 
        </p>
        <p className="text-sm leading-relaxed text-gray-700 mt-4">
          Cras vel felis et libero laoreet efficitur. Sed at eros nao euismod efficitur. Aenean venenatis orci a velit porta, et porttitor nulla pharetra. Morbi sagittis lorem a erat tincidunt, nec sagittis sapien lobortis. Etiam semper mauris sed turpis finibus feugiat. Aliquam erat volutpat. Duis sed augue vel leo imperdiet blandit nec in risus. Suspendisse ut tellus at orci.
        </p>
      </section>
    </div>
  );
};

export default about;
