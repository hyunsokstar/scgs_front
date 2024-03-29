import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Box } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query"; // 임포트 위치 최상단
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
    console.log('content : ', content);

    if (onChange) {
      onChange(content);
    }
  };

  const uploadImageMutation = useMutation(uploadImage, {
    onSuccess: ({ result }: any) => {
      alert('파일 업로드 성공');
    },
    onError: () => {
      console.error('파일 업로드 실패');
    },
  });

  const getImageUploadUrlMutation = useMutation(getUploadURL);

  const images_upload_handler = (
    blobInfo: any,
    success: (url: string) => void,
    failure: () => void
  ) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64data = reader.result;
      console.log('blobInfo.blob() : ', blobInfo.blob());

      getImageUploadUrlMutation.mutate(undefined, {
        onSuccess: (result: any) => {
          console.log('result : ', result);
          console.log('file to upload', blobInfo.blob());

          uploadImageMutation.mutate(
            {
              uploadURL: result.uploadURL,
              file: blobInfo.blob(),
            },
            {
              onSuccess: ({ result }: any) => {
                success(result.variants[0].url);
              },
            }
          );
        },
      });
    };
    reader.readAsDataURL(blobInfo.blob());
  };

  return (
    <Box sx={{ height: "60vh", overflowY: 'scroll' }}>
      <Editor
        apiKey={apiKey}
        value={initialValue}
        onEditorChange={handleEditorChange}
        init={{
          height: "100%",
          menubar: true,
          paste_webkit_styles: "color",
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount'
          ],
          toolbar:
            'undo redo | formatselect | ' +
            'bold italic forecolor backcolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | code styleselect | help',
          content_style: 'body { font-size: 14px; background-color: white; line-height: 1.5; }',
          style_formats: [
            { title: 'Inline Code', inline: 'code' },
            { title: 'Code Block', block: 'pre', classes: 'prettyprint linenums' }  
          ],
          ...init,
        }}
      />
    </Box>
  );
};

export default TinyMCEEditor;
