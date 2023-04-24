import React from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { type_for_study_note_content } from "../types/study_note_type";
import { apiForGetStuyNoteContentList } from "../apis/study_note_api";


interface Props {}

const StudyNoteDetail = (props: Props) => {
  const { study_note_pk} = useParams();
  const queryClient = useQueryClient();

  const {
    data: data_for_study_note_content_list,
    isLoading: logind_for_study_note_content_list,
    refetch: refetch_for_study_note_content_list,
  } = useQuery<type_for_study_note_content>(
    [
      "apiForGetStuyNoteContentList",
      study_note_pk,
      "apiForGetStuyNoteContentList",
    ],
    apiForGetStuyNoteContentList
  );

  console.log("data_for_study_note_content_list : ", data_for_study_note_content_list);
  

  return <div>StudyNoteDetail {study_note_pk}</div>;
};

export default StudyNoteDetail;
