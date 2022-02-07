import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
const DomainSelector = ({ domains, selectedDomains, setSelectedDomains }) => {
  const renderDomains = () =>
    domains &&
    domains
      .filter(
        (domain) =>
          !selectedDomains.map((domain) => domain.id).includes(domain.id)
      )
      .map((domain) => (
        <li key={domain.id} className="list-group-item">
          <button
            className="btn btn-primary mr-2"
            onClick={() => {
              setSelectedDomains([...selectedDomains, domain]);
            }}
          >
            Add
          </button>
          {domain.name}
        </li>
      ));
  return (
    <div className="card" style={{ overflowY: "auto", maxHeight: "50vh" }}>
      <div className="card-title d-flex justify-content-center mt-3">
        <h3>Add domains!</h3>
      </div>
      <div className="card-body">
        {domains.length > 0 ? (
          <ul className="list-group">{renderDomains()}</ul>
        ) : (
          <div className="d-flex justify-content-center">
            <FontAwesomeIcon icon={faSpinner} className="fa-spin" />
          </div>
        )}
      </div>
    </div>
  );
};

export default DomainSelector;
