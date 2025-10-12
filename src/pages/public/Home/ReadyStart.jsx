const ReadyStart = () => {
  return (
    <section className="bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white py-20 text-center">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-xl mb-8 max-w-3xl mx-auto">
          Join thousands of students already using ClubManager to enhance their university
          experience.
        </p>
        <div className="flex justify-center space-x-4">
          <a
            href="/signup"
            className="bg-white text-[#6366f1] font-semibold px-8 py-3 rounded-md shadow-lg hover:bg-gray-100 transition duration-300"
          >
            Sign Up Now
          </a>
          <a
            href="/learn-more"
            className="bg-transparent border-2 border-white text-white font-semibold px-8 py-3 rounded-md shadow-lg hover:bg-white hover:text-[#6366f1] transition duration-300"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
};

export default ReadyStart;
