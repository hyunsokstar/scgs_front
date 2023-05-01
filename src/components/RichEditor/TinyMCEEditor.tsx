import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Box } from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"; // 임포트 위치 최상단
import { getUploadURL, uploadImage } from "../../api";


interface Props {
  initialValue?: string;
  onChange?: (content: string) => void;
  apiKey: string;
  init?: any;
}

const TinyMCEEditor: React.FC<Props> = ({
  initialValue,
  onChange,
  apiKey,
  init,
}) => {
  const handleEditorChange = (content: string) => {
    console.log("content : ", content);

    if (onChange) {
      onChange(content);
    }
  };

  const images_upload_handler = (
    blobInfo: any,
    success: (url: string) => void,
    failure: () => void
  ) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64data = reader.result;
      console.log("blobInfo.blob() : ", blobInfo.blob());

      //   fetch('https://example.com/upload', {
      //     method: 'POST',
      //     body: JSON.stringify({ image: base64data }),
      //     headers: {
      //       'Content-Type': 'application/json'
      //     },
      //   })
      //   .then(response => {
      //     if (!response.ok) {
      //       throw new Error('Network response was not ok');
      //     }
      //     return response.json();
      //   })
      //   .then(data => {
      //     success(data.url);
      //   })
      //   .catch(error => {
      //     console.error('Error:', error);
      //     failure();
      //   });

      // eslint-disable-next-line react-hooks/rules-of-hooks
      const uploadImageMutation = useMutation(uploadImage, {
        onSuccess: ({ result }: any) => {
          success(result.variants[0].url);
          alert("파일 업로드 성공")
        },
        onError: () => {
          failure();
        }
      });

      // eslint-disable-next-line react-hooks/rules-of-hooks
      const getImageUploadUrlMutation = useMutation(getUploadURL, {
        onSuccess: (result: any) => {
          console.log("result : ", result);
          console.log("file to upload", blobInfo.blob());
    
          uploadImageMutation.mutate({
            uploadURL: result.uploadURL,
            file: blobInfo.blob(),
          });
        },
      });

      getImageUploadUrlMutation.mutate();

    };
    reader.readAsDataURL(blobInfo.blob());
  };

  return (
    <Box>
      <Editor
        apiKey={apiKey}
        value={initialValue}
        onEditorChange={handleEditorChange}
        init={{
          height: 500,
          menubar: true,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "print",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "paste",
            "code",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | formatselect | " +
            "bold italic backcolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          // language: "ko_KR", // 사용할 언어를 설정합니다. 한국어로 설정하려면 'ko_KR'로 설정합니다.
          images_upload_handler,
          paste_data_images: true,
          content_style: ".mce-menu { z-index: 9999; }",
          ...init,
        }}
      />
    </Box>
  );
};

export default TinyMCEEditor;
