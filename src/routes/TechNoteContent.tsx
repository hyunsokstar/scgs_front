import React, { ReactElement } from "react";
import { useParams } from "react-router-dom";

interface Props {}

function TechNoteContent({}: Props): ReactElement {
  const { notePk } = useParams();
  console.log("notePk check : ", notePk);
  

  return <div>tech note content</div>;
}

export default TechNoteContent;
