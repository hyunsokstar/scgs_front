import React, { useState } from "react";
import FroalaEditorComponent from "react-froala-wysiwyg";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/themes/dark.min.css";
import "froala-editor/js/plugins.pkgd.min.js";

const FloalaEditor = () => {
  const [content, setContent] = useState("");

  const handleModelChange = (model: string) => {
    setContent(model);
  };

  const config = {
    key: "YOUR_API_KEY",
    attribution: false,
    placeholderText: "Type something",
    height: 500,
    imageUploadURL: "/upload_image",
    imageAllowedTypes: ["jpeg", "jpg", "png", "gif"],
    videoUploadURL: "/upload_video",
    videoAllowedTypes: ["mp4", "webm", "ogg"],
    toolbarButtons: {
      moreText: {
        buttons: [
          "bold",
          "italic",
          "underline",
          "strikeThrough",
          "subscript",
          "superscript",
          "fontFamily",
          "fontSize",
          "textColor",
          "backgroundColor",
          "inlineClass",
          "inlineStyle",
          "clearFormatting",
        ],
      },
      moreParagraph: {
        buttons: [
          "alignLeft",
          "alignCenter",
          "alignRight",
          "alignJustify",
          "formatOLSimple",
          "formatUL",
          "paragraphFormat",
          "paragraphStyle",
          "lineHeight",
          "outdent",
          "indent",
          "quote",
        ],
      },
      moreRich: {
        buttons: [
          "insertLink",
          "insertImage",
          "insertVideo",
          "insertTable",
          "emoticons",
          "fontAwesome",
          "specialCharacters",
          "embedly",
          "insertFile",
          "insertHR",
        ],
      },
      moreMisc: {
        buttons: [
          "undo",
          "redo",
          "fullscreen",
          "print",
          "getPDF",
          "spellChecker",
          "selectAll",
          "html",
        ],
        align: "right",
        buttonsVisible: 2,
      },
    },
  };

  return (
    <div>
      <FroalaEditorComponent
        tag="textarea"
        model={content}
        onModelChange={handleModelChange}
        config={config}
      />
    </div>
  );
};

export default FloalaEditor;