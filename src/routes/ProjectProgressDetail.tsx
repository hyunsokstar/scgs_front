import React, { ReactElement, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"; // 임포트 위치 최상단
import { useParams } from "react-router-dom";
import { getOneProjectTask } from "../apis/user_api";
import {
  IOneTaskForProjectTaskType,
  ITypeForTaskDetailUpdateForm,
} from "../types/project_progress/project_progress_type";

import { Box, useToast, Heading, Text, Button } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import "react-datetime/css/react-datetime.css";
import {
  apiForCreateTaskUrlForTask,
  apiForDeleteTaskUrlForTaskWithPk,
  apiForUpdateTaskUrlForTaskForPk,
  createRefImageForTask,
  deleteOneRefImageForTask,
  updateProjectApiByPk,
} from "../apis/project_progress_api";
import { getUploadURL, uploadImage } from "../api";
import ExtraTasksTable from "../components/ExtraTasksTable";
import ModalButtonForExtraTask from "../components/modal/ModalButtonForExtraTask";
import TestListForTaskDetail from "../components/TestList/TestListForTaskDetail";
import TableForTechNote from "../components/Table/TableForTechNote";
import ChatStyleBoard from "../components/ChatStyleBoard";
import UpdateFormForTaskDetail from "../components/Form/UpdateFormForTaskDetail";
import ModalButtonForGetTaskListForIntergration from "../components/modal/ModalButtonForGetTaskListForIntergration";

interface Props {}

// 1122
function ProjectProgressDetail({}: Props): ReactElement {
  const { taskPk } = useParams();
  const [taskUrls, setTaskUrls] = useState<any>([]);

  const queryClient = useQueryClient();
  const toast = useToast();

  const {
    data: taskData,
    isLoading: isLoadingForTaskData,
    refetch: refetchForTaskDetail,
  } = useQuery<IOneTaskForProjectTaskType>(
    ["getOneProjectTask", taskPk, "ProjectProgressDetail"],
    getOneProjectTask
  );

  const [submitting, setSubmitting] = useState(false);
  const { register, handleSubmit, watch, reset } =
    useForm<ITypeForTaskDetailUpdateForm>();

  const [started_at, set_started_at] = useState<any>();
  const [due_date, set_due_date] = useState<Date>();
  const [refer_images, set_refer_images] = useState<any>();
  const [isHovering, setIsHovering] = useState(false);
  const [isUploadingForRefImage, setIsUploadingForRefImage] = useState(false);

  // const [isChecked, setIsChecked] = useState(false);
  const [isCheckedForShowTechNote, setIsCheckedForShowTechNote] =
    useState(false);

  const handleChange = () =>
    setIsCheckedForShowTechNote(!isCheckedForShowTechNote);

  useEffect(() => {
    set_refer_images(taskData?.task_images);
  }, [taskData]);

  const updateMutation = useMutation(updateProjectApiByPk, {
    onMutate: () => {
      console.log("mutation starting");
    },
    onSuccess: (data) => {
      console.log("success : ", data);
      toast({
        title: "project task update success",
        status: "success",
      });
      refetchForTaskDetail();
      // navigate("/estimates");
    },
    onError: (error) => {
      console.log("mutation has an error");
    },
  });

  const onSubmit = ({
    writer,
    task,
    task_description,
    importance,
    task_completed,
    cash_prize,
    is_urgent_request,
  }: ITypeForTaskDetailUpdateForm) => {
    // alert("submit 확인");

    setSubmitting(true);
    console.log("watch : ", watch(), started_at, due_date);
    // console.log("data for field values: ", data);

    updateMutation.mutate({
      taskPk: taskPk,
      writer,
      task,
      // task_url1,
      // task_url2,
      task_description,
      importance,
      task_completed,
      started_at: started_at,
      due_date: due_date,
      cash_prize,
      is_urgent_request,
    });

    setSubmitting(false);
  };

  const handleChangeForStartedAt = (newDate: any) => {
    set_started_at(newDate);
  };

  const invalidDateForStartedAt = (current: {
    isBefore: (arg0: Date, arg1: string) => any;
  }) => {
    // 현재 날짜 이전의 모든 날짜를 선택 불가능하도록 설정

    if (due_date) {
      return current.isBefore(new Date(due_date), "day");
    } else {
      return true;
    }
  };

  const invalidDateForCompletedAt = (current: {
    isSameOrAfter: (arg0: Date, arg1: string) => any;
  }) => {
    return current.isSameOrAfter(new Date(started_at), "day");
  };

  const handleDragOver = (event: any) => {
    event.preventDefault();
    // 드래그 오버 시 Box 배경색을 투명 회색으로 설정
    if (!event.currentTarget.textContent.includes("drag image")) {
      event.currentTarget.style.zIndex = "1";
      // event.currentTarget.style.opacity = 0.5;
      event.currentTarget.style.textAlign = "center";
      event.currentTarget.style.backgroundColor = "rgba(128, 128, 128, 0.5)";
    }
  };

  const handleDragLeave = (event: any) => {
    // 드래그 떠날 시 Box 배경색을 초기화
    event.currentTarget.style = "";
  };
  let imageFile: Blob | MediaSource;

  const createRefImageForTaskMutation = useMutation(createRefImageForTask, {
    onSuccess: (result) => {
      console.log("result : ", result);
      setIsUploadingForRefImage(false);
      refetchForTaskDetail();

      toast({
        status: "success",
        title: "Profile Image uploaded!",
        isClosable: true,
        description: "Feel free to upload more images.",
      });
    },
  });

  const uploadImageMutation = useMutation(uploadImage, {
    onSuccess: ({ result }: any) => {
      console.log("result : ", result);
      console.log("result.variants[0] : ", result.variants[0]);

      createRefImageForTaskMutation.mutate({
        taskPk: taskPk,
        image_url: `https://imagedelivery.net/GDnsAXwwoW7vpBbDviU8VA/${result.id}/public`,
      });
    },
  });

  const getImageUploadUrlMutation = useMutation(getUploadURL, {
    onSuccess: (result: any) => {
      console.log("result : ", result);
      console.log("file to upload", imageFile);

      uploadImageMutation.mutate({
        uploadURL: result.uploadURL,
        file: imageFile,
      });
    },
  });

  const handleDrop = (event: any) => {
    event.preventDefault();
    setIsUploadingForRefImage(true);
    imageFile = event.dataTransfer.files[0];
    // setImageToUpload(imageFile)

    if (imageFile) {
      const imageUrl = URL.createObjectURL(imageFile);

      set_refer_images((prevImages: any) => [
        { image_url: imageUrl },
        ...prevImages,
      ]);
    }

    getImageUploadUrlMutation.mutate();
  };

  const deleteRefImageMutation = useMutation(
    (lef_image_pk: number) => {
      return deleteOneRefImageForTask(lef_image_pk);
    },
    {
      onSettled: () => {
        // setSelectedItems([]);
      },
      onSuccess: (data) => {
        console.log("data : ", data);
        if (refetchForTaskDetail) {
          refetchForTaskDetail();
        }
        toast({
          title: "delete task url success !",
          status: "success",
        });
      },
      onError: (error) => {
        console.log("delete mutation has an error ", error);
        toast({
          title: `delete mutation has an error :  ${error}`,
          status: "error",
        });
      },
    }
  );

  const delete_lef_image_handler = (lef_image_pk: any) => {
    deleteRefImageMutation.mutate(lef_image_pk);
  };

  const mutationForCreateTaskUrlForTask = useMutation(
    apiForCreateTaskUrlForTask,
    {
      onMutate: () => {
        console.log("mutation starting");
      },
      onSuccess: (data) => {
        console.log("data : ", data);

        toast({
          title: "Task URL 추가",
          description: "Task URL을 추가하였습니다.",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        queryClient.refetchQueries(["getOneProjectTask"]);
      },
      onError: (error: any) => {
        console.log("error.response : ", error.response);
        console.log("mutation has an error", error.response.data);
      },
    }
  );

  const handleAddTaskUrl = () => {
    mutationForCreateTaskUrlForTask.mutate(taskPk);
  };

  const updateTaskUrl = (index: number, newUrl: string) => {
    console.log("newUrl : ", newUrl);

    const updatedTaskUrls = [...taskUrls];
    console.log("updatedTaskUrls : ", updatedTaskUrls);

    updatedTaskUrls[index] = newUrl;
    setTaskUrls(updatedTaskUrls);
  };

  const mutationForUpdateTaskUrlForTaskForPk = useMutation(
    apiForUpdateTaskUrlForTaskForPk,
    {
      onSuccess: (result: any) => {
        console.log("result : ", result);
        queryClient.refetchQueries(["getOneProjectTask"]);
        setTaskUrls([]);
        toast({
          status: "success",
          title: "task url update success",
          description: result.message,
        });
      },
    }
  );

  const testUrlPatternAndUpdate = (pk: number, taskUrlForUpdate: string) => {
    try {
      const parsedUrl = new URL(taskUrlForUpdate);
      if (parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:") {
        // alert(`task_url(id:${pk}) update to : ${taskUrlForUpdate}`);
        mutationForUpdateTaskUrlForTaskForPk.mutate({ pk, taskUrlForUpdate });
      } else {
        alert("Invalid URL: " + taskUrlForUpdate);
        return;
      }
    } catch (error) {
      alert("Invalid URL: " + taskUrlForUpdate);
      return;
    }
  };

  // fix 0531
  // const mutationForDeleteTaskUrlForTaskWithPk = useMutation(
  const mutationForDeleteTaskUrlForTaskWithPk = useMutation(
    (pk: string | number) => {
      return apiForDeleteTaskUrlForTaskWithPk(pk);
    },
    {
      onSettled: () => {
        // setSelectedItems([]);
      },
      onSuccess: (data) => {
        console.log("data : ", data);

        queryClient.refetchQueries(["getOneProjectTask"]);

        toast({
          title: "delete comment 성공!",
          status: "success",
        });
      },
    }
  );

  // fix 0531
  const buttonHandlerForDeleteTaskUrl = (pk: number) => {
    mutationForDeleteTaskUrlForTaskWithPk.mutate(pk);
  };

  const buttonHandlerForOpenTaskUrl = (pk: number, index: number) => {
    console.log("url for update : ", taskUrls[index]);
    const taskUrlForUpdate = taskUrls[index];

    if (taskUrlForUpdate) {
      testUrlPatternAndUpdate(pk, taskUrlForUpdate);
    } else {
      alert("The input hasn't been modified, so I won't perform an update");
    }
  };
  const handlerForOpenUrl = (url: string) => {
    window.open(url, "_blank");
  };

  // 2244
  if (isLoadingForTaskData) {
    return <Box>Loading</Box>;
  }

  if (!(taskData || isLoadingForTaskData)) {
    return <Box>Loading..</Box>;
  } else {
    return (
      <Box>
        <Box
          display={"flex"}
          border={"0px solid black"}
          width="100%"
          height={"700px"}
          mt={5}
          px={1}
        >
          <Box width={"50%"} border={"0px solid black"}>
            <Box>
              <Heading size="md">Update Form For Task Detail</Heading>
            </Box>
            <UpdateFormForTaskDetail
              handleAddTaskUrl={handleAddTaskUrl}
              taskData={taskData}
              taskUrls={taskUrls}
              updateTaskUrl={updateTaskUrl}
              buttonHandlerForDeleteTaskUrl={buttonHandlerForDeleteTaskUrl}
              buttonHandlerForOpenTaskUrl={buttonHandlerForOpenTaskUrl}
              handlerForOpenUrl={handlerForOpenUrl}
              invalidDateForStartedAt={invalidDateForStartedAt}
              handleChangeForStartedAt={handleChangeForStartedAt}
              invalidDateForCompletedAt={invalidDateForCompletedAt}
              submitting={submitting}
              isUploadingForRefImage={isUploadingForRefImage}
              handleDragOver={handleDragOver}
              handleDragLeave={handleDragLeave}
              handleDrop={handleDrop}
              refer_images={refer_images}
              setIsHovering={setIsHovering}
              isHovering={isHovering}
              register={register}
              handleSubmit={handleSubmit}
              onSubmit={onSubmit}
              delete_lef_image_handler={delete_lef_image_handler}
            />
          </Box>

          <Box width={"50%"}>
            <Box width={"100%"} border={"0px solid green"}>
              <Heading size="md">Briefing Board</Heading>
            </Box>{" "}
            <Box
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"flex-start"}
              width="100%"
              height="620px"
              mb={0}
              px={2}
            >
              <Box width={"100%"} height={"100%"} border={"0px solid red"}>
                {!isCheckedForShowTechNote ? (
                  <ChatStyleBoard
                    taskPk={taskData.pk}
                    task_manager={taskData?.task_manager}
                    task_comments={taskData?.task_comments}
                    refetch={refetchForTaskDetail}
                  />
                ) : (
                  <TableForTechNote isForTask={true} taskPk={taskData?.pk} />
                )}
              </Box>
            </Box>
          </Box>
        </Box>
        <br />
        <br />
        <Box fontSize={"20px"} mt={5}>
          <Text fontFamily="Arial, sans-serif">Test List For Task</Text>
        </Box>
        <Box bg={"white"} width={"100%"} border={"1px solid black"}>
          <TestListForTaskDetail
            taskPk={taskPk}
            testData={taskData?.tests_for_tasks}
            refetch={refetchForTaskDetail}
          />
        </Box>
        <br /> <br />
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          fontSize="20px"
        >
          <Box fontFamily="Arial, sans-serif">부가 업무 리스트</Box>
          <ModalButtonForGetTaskListForIntergration
            button_text="부가 업무 가져 오기!"
            modal_title_text="Task List For Task Intergration !"
          />

          <ModalButtonForExtraTask
            taskPk={taskPk}
            refetch={refetchForTaskDetail}
            button_text="부가 업무 추가"
          />
        </Box>
        <ExtraTasksTable
          extra_tasks={taskData.extra_tasks}
          orginal_task_pk={taskPk}
          refetch={refetchForTaskDetail}
          // refetch={refetchForTaskDetail}
        />
      </Box>
    );
  }
}

export default ProjectProgressDetail;
