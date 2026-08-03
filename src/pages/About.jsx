import Hero from "../components/about/Hero.jsx";
import ProblemStatement from "../components/about/ProblemStatement.jsx";
import Features from "../components/about/Features.jsx";
import FeedbackBanner from "../components/FeedbackBanner.jsx";
import Footer from "../components/Footer.jsx";
import PageTransition from "../components/PageTransition.jsx";

const About = () => {
  return (
    <PageTransition>
      <Hero />
      <ProblemStatement />
      <Features />
      <FeedbackBanner />
      <Footer />
    </PageTransition>
  );
};

export default About;
