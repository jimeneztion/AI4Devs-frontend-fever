import { useDrag } from "react-dnd";
import "./PositionDetail.css";
import RatingDots from "./RatingDots";

const CandidateCard = ({ candidate, candidateId }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "CANDIDATE",
    item: {
      id: candidateId,
      name: candidate.fullName,
      currentStep: candidate.currentInterviewStep,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className="candidate-card"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <div className="candidate-name">{candidate.fullName}</div>
      <RatingDots score={candidate.averageScore} />
    </div>
  );
};

export default CandidateCard;
