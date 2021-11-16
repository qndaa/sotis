import React from "react";

const AllSectionsTable = ({
  sections,
  selectedSections,
  setSelectedSections,
}) => {
  const renderRows = () =>
    sections.map((section, index) => (
      <tr key={index}>
        <td>
          <input
            type="checkbox"
            checked={selectedSections[index]}
            onChange={(e) => {
              selectedSections[index] = true;
              const copy = selectedSections.slice();
              setSelectedSections([]);
              setSelectedSections(copy);
            }}
          />
        </td>
        <td>{section.title}</td>
      </tr>
    ));
  return (
    <table className="table">
      <thead className="thead-dark">
        <tr>
          <th scope="col">Add</th>
          <th>Section title</th>
        </tr>
      </thead>
      <tbody>{renderRows()}</tbody>
    </table>
  );
};

export default AllSectionsTable;
