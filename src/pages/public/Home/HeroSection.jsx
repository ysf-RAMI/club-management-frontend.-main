const HeroSection = () => {
  return (
    <section className="bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white min-h-screen flex justify-center items-center px-8">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-left max-w-xl">
          <h1 className="text-5xl font-bold mb-4">Welcome to ClubManager</h1>
          <p className="text-xl mb-8">
            Discover, join, and manage student clubs with ease. Connect with like- minded peers and
            create unforgettable experiences.
          </p>
          <div className="flex space-x-4">
            <a
              href="/register"
              className="text-lg font-semibold bg-white text-[#6366f1] px-8 py-3 rounded-md hover:bg-gray-100 transition duration-300"
            >
              Explore Clubs
            </a>
            <a
              href="/register"
              className="text-lg font-semibold text-white border-2 border-white px-8 py-3 rounded-md hover:bg-white hover:text-[#6366f1] transition duration-300"
            >
              Join Today
            </a>
          </div>
        </div>
        <div className="relative w-[500px] h-[400px] rounded-lg shadow-lg flex items-center justify-center p-4 overflow-hidden">
          <img
            src="/img/Hero.jpg"
            alt="Club Management Illustration"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
