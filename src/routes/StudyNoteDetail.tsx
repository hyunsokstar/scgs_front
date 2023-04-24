import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

interface Props {}

const StudyNoteDetail = (props: Props) => {
  const { study_note_pk} = useParams();

  return <div>StudyNoteDetail {study_note_pk}</div>;
};

export default StudyNoteDetail;
