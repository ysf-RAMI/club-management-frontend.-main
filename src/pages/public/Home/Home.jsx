import FeaturedClubs from './FeaturedClubs';
import HeroSection from './HeroSection';
import ReadyStart from './ReadyStart';
import UpComingEvents from './UpComingEvents';
import WhyChoose from './WhyChoose';

const Home = () => {
  return (
    <>
      <HeroSection />
      <div className="max-w-7xl mx-auto">
        <FeaturedClubs />
      </div>

      <UpComingEvents />

      <div className="max-w-7xl mx-auto">
        <WhyChoose />
      </div>

      <ReadyStart />
    </>
  );
};

export default Home;
