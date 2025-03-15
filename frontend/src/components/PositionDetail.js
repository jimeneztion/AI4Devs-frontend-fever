import { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useNavigate, useParams } from "react-router-dom";
import {
  getCandidatesByPosition,
  getInterviewFlowByPosition,
  updateCandidateStage,
} from "../services/positionService";
import InterviewStage from "./InterviewStage";
import "./PositionDetail.css";

const PositionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [positionName, setPositionName] = useState("");
  const [interviewSteps, setInterviewSteps] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch interview flow
        const flowData = await getInterviewFlowByPosition(id);
        setPositionName(flowData.positionName);
        setInterviewSteps(flowData.interviewFlow.interviewSteps);

        // Fetch candidates
        const candidatesData = await getCandidatesByPosition(id);
        setCandidates(candidatesData);

        setLoading(false);
      } catch (err) {
        setError("Error al cargar los datos. Por favor, inténtelo de nuevo.");
        setLoading(false);
        console.error("Error fetching position detail data:", err);
      }
    };

    fetchData();
  }, [id]);

  const handleDropCandidate = async (candidateId, newStageId) => {
    // Find the stage name from the stage ID
    const targetStage = interviewSteps.find((step) => step.id === newStageId);
    if (!targetStage) return;

    // Get the actual candidate from the candidates list
    const candidate = candidates[candidateId];

    try {
      // Create a deep copy of the candidates array
      const updatedCandidates = [...candidates];

      // Update the candidate's current stage locally first (optimistic update)
      updatedCandidates[candidateId] = {
        ...candidate,
        currentInterviewStep: targetStage.name,
      };

      setCandidates(updatedCandidates);

      // Then update in backend
      await updateCandidateStage(candidateId, {
        applicationId: candidateId.toString(),
        currentInterviewStep: newStageId.toString(),
      });
    } catch (err) {
      console.error("Error updating candidate stage:", err);
      // Revert the optimistic update if the API call fails
      setCandidates([...candidates]);
    }
  };

  const handleBack = () => {
    navigate("/positions");
  };

  if (loading) {
    return (
      <div className="loading-container" aria-live="polite">
        <p>Cargando...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container" aria-live="assertive">
        <p>{error}</p>
        <button onClick={handleBack}>Volver a posiciones</button>
      </div>
    );
  }

  return (
    <div className="position-detail">
      <div className="position-header">
        <button
          onClick={handleBack}
          className="back-button"
          aria-label="Volver a la lista de posiciones"
        >
          ←
        </button>
        <h1 className="position-title">{positionName}</h1>
      </div>

      <DndProvider backend={HTML5Backend}>
        <div className="interview-flow" role="main">
          {interviewSteps.map((stage) => (
            <InterviewStage
              key={stage.id}
              stage={stage}
              candidates={candidates}
              onDropCandidate={handleDropCandidate}
            />
          ))}
        </div>
      </DndProvider>
    </div>
  );
};

export default PositionDetail;
