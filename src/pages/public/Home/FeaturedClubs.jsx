const FeaturedClubs = () => {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">Featured Clubs</h2>
        <p className="text-lg mb-12 px-12">
          Join amazing clubs and connect with like-minded individuals.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto px-12">
          <div className="bg-white shadow-md rounded-md overflow-hidden">
            <div>
              <img src="/img/Club1.png" alt="Club 1" className="w-full h-48 object-cover" />
            </div>
            <div className="bg-white p-4">
              <h3 className="text-xl text-left font-bold mb-4">Chess Club</h3>
              <p className="text-gray-700 text-left">
                Sharpen your mind and strategic thinking with the Chess Club. All skill levels are
                welcome to join our friendly matches and tournaments.
              </p>
              <div className="flex justify-end"></div>
              <div className="flex justify-between py-4">
                <p className="text-gray-500 text-left">50+ members</p>
                <p className="text-gray-500 text-right">
                  <span className="text-[#6366f1] cursor-pointer hover:underline">View More →</span>
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white shadow-md rounded-md overflow-hidden">
            <div>
              <img src="/img/Club2.png" alt="Club 2" className="w-full h-48 object-cover" />
            </div>
            <div className="bg-white p-4">
              <h3 className="text-xl text-left font-bold mb-4">Book Club</h3>
              <p className="text-gray-700 text-left">
                Dive into captivating stories and engage in lively discussions with fellow book
                lovers. Explore various genres and expand your literary horizons.
              </p>
              <div className="flex justify-end"></div>
              <div className="flex justify-between py-4">
                <p className="text-gray-500 text-left">75+ members</p>
                <p className="text-gray-500 text-right">
                  <span className="text-[#6366f1] cursor-pointer hover:underline">View More →</span>
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white shadow-md rounded-md overflow-hidden">
            <div>
              <img src="/img/Club3.png" alt="Club 3" className="w-full h-48 object-cover" />
            </div>
            <div className="bg-white p-4">
              <h3 className="text-xl text-left font-bold mb-4">Photography Club</h3>
              <p className="text-gray-700 text-left">
                Capture the world through your lens with the Photography Club. Learn new techniques,
                share your work, and explore creative perspectives.
              </p>
              <div className="flex justify-end"></div>
              <div className="flex justify-between py-4">
                <p className="text-gray-500 text-left">100+ members</p>
                <p className="text-gray-500 text-right">
                  <span className="text-[#6366f1] cursor-pointer hover:underline">View More →</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedClubs;
