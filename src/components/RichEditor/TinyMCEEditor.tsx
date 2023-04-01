import React from "react";
import { Editor } from "@tinymce/tinymce-react";

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
      console.log("base64data : ", base64data);
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
    };
    reader.readAsDataURL(blobInfo.blob());
  };

  return (
    <Editor
      apiKey={apiKey}
      value={initialValue}
      onEditorChange={handleEditorChange}
      init={{
        height: 500,
        menubar: true,
        plugins: [
          "advlist autolink lists link image charmap print preview anchor",
          "searchreplace visualblocks code fullscreen",
          "insertdatetime media table paste code help wordcount",
        ],
        toolbar:
          "undo redo | formatselect | " +
          "bold italic backcolor | alignleft aligncenter " +
          "alignright alignjustify | bullist numlist outdent indent | " +
          "removeformat | help",
        language: "ko_KR", // 사용할 언어를 설정합니다. 한국어로 설정하려면 'ko_KR'로 설정합니다.
        images_upload_handler,
        paste_data_images: true,

        ...init,
      }}
    />
  );
};

export default TinyMCEEditor;
