const HeroSection = () => {
  return (
    <section className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white min-h-[calc(100vh-80px)] flex items-center px-6 md:px-8 pt-20">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div className="text-left space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Welcome to <br />
              <span className="text-yellow-300">ClubManager</span>
            </h1>

            <p className="text-lg md:text-xl text-purple-100 leading-relaxed">
              Discover, join, and manage student clubs with ease. Connect with like-minded peers and
              create unforgettable experiences on campus.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a
                href="/clubs"
                className="inline-flex items-center justify-center text-lg font-semibold bg-white text-indigo-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition duration-300 shadow-lg"
              >
                Explore Clubs
              </a>
              <a
                href="/register"
                className="inline-flex items-center justify-center text-lg font-semibold text-white border-2 border-white px-8 py-3 rounded-lg hover:bg-white hover:text-indigo-600 transition duration-300"
              >
                Join Today
              </a>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative hidden lg:block">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 border border-white/20">
              <img
                src="/img/image.png"
                alt="Club Management Illustration"
                className="w-full h-[400px] object-cover rounded-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
