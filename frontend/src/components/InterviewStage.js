import { useDrop } from "react-dnd";
import CandidateCard from "./CandidateCard";
import "./PositionDetail.css";

const InterviewStage = ({ stage, candidates, onDropCandidate }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "CANDIDATE",
    drop: (item) => onDropCandidate(item.id, stage.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const stageFilteredCandidates = candidates.filter(
    (candidate) => candidate.currentInterviewStep === stage.name
  );

  return (
    <div
      ref={drop}
      className="interview-stage"
      style={{
        backgroundColor: isOver ? "#e8f5e9" : "#f5f5f5",
        transition: "background-color 0.3s",
      }}
    >
      <h3 className="stage-title">{stage.name}</h3>

      {stageFilteredCandidates.length > 0 ? (
        stageFilteredCandidates.map((candidate, index) => (
          <CandidateCard
            key={index}
            candidate={candidate}
            candidateId={index}
          />
        ))
      ) : (
        <div className="empty-stage-message">
          No hay candidatos en esta fase
        </div>
      )}
    </div>
  );
};

export default InterviewStage;
