import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const ProblemSelector = ({
  problems,
  selectedProblems,
  setSelectedProblems,
  openNewProblemModal,
}) => {
  const renderProblems = () => {
    return problems.map((problem) => (
      <li key={problem.id} className="list-group-item">
        {selectedProblems && selectedProblems.id == problem.id ? (
          <span className="text-success">Chosen: &nbsp;</span>
        ) : (
          <button
            className="btn btn-primary mr-2"
            onClick={() => {
              setSelectedProblems(problem);
            }}
          >
            Choose
          </button>
        )}
        {problem.name}
      </li>
    ));
  };
  return (
    <div className="card" style={{ width: "18rem" }}>
      <div className="card-title d-flex justify-content-center">
        <h3 className="mt-3">Choose a problem!</h3>
      </div>
      <div className="card-body">
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
