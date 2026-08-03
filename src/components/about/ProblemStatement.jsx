import Reveal from "../Reveal.jsx";
import problemStatementImg from "../../assets/problem-statement.jpg";
import "./problem-statement.css";

const ProblemStatement = () => {
  return (
    <section className="problem">
      <Reveal>
        <h2 className="problem_title">
          Tired of losing the thought before you've written it down?
        </h2>
        <p className="problem_body">
          By the time you've opened an app, made an account, or found the
          right folder, the idea is already gone. Fleetr strips all of that
          away: open it, type, done.
        </p>
      </Reveal>
      <Reveal delay={0.15}>
        <img
          className="problem_image"
          src={problemStatementImg}
          alt="The problem with losing fleeting thoughts"
        />
      </Reveal>
    </section>
  );
};

export default ProblemStatement;
