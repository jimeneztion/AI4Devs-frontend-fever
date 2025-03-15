import "./PositionDetail.css";

const RatingDots = ({ score, maxScore = 6 }) => {
  const dots = [];

  for (let i = 0; i < score; i++) {
    dots.push(<div key={i} className="rating-dot"></div>);
  }

  return <div className="rating">{dots}</div>;
};

export default RatingDots;
