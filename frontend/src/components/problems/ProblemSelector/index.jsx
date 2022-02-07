import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const ProblemSelector = ({
  problems,
  selectedProblems,
  setSelectedProblems,
  openNewProblemModal,
  takenProblems,
}) => {
  const renderProblemItem = (problem) => {
    if (selectedProblems && selectedProblems.id == problem.id)
      return <span className="text-success">Chosen:&nbsp;</span>;
    if (takenProblems.includes(problem.id))
      return <span className="text-danger">Taken:&nbsp;</span>;

    return (
      <button
        className="btn btn-primary mr-2"
        onClick={() => {
          setSelectedProblems(problem);
        }}
      >
        Choose
      </button>
    );
  };
  const renderProblems = () => {
    return problems.map((problem) => (
      <li key={problem.id} className="list-group-item">
        {renderProblemItem(problem)}
        {problem.name}
      </li>
    ));
  };
  return (
    <div className="card" style={{ width: "18rem" }}>
      <div className="card-title d-flex justify-content-center">
        <h3 className="mt-3">Choose a problem!</h3>
      </div>
      <div
        className="card-body"
        style={{ overflowY: "auto", maxHeight: "50vh" }}
      >
        <div className="d-flex justify-content-center">
          <button className="btn btn-text mb-2" onClick={openNewProblemModal}>
            Create new
          </button>
        </div>
        {problems ? (
          <ul className="list-group">{renderProblems()}</ul>
        ) : (
          <FontAwesomeIcon icon={faSpinner} className="fa-spin" />
        )}
      </div>
    </div>
  );
};

export default ProblemSelector;
