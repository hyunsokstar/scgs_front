import React, { ReactElement } from "react";
import TableForTechNote from "../components/Table/TableForTechNote";

interface Props {}

function TechNote({}: Props): ReactElement {
  return (
    <div>
      <TableForTechNote />
    </div>
  );
}

export default TechNote;
