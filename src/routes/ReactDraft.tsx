import React, { useState } from "react";
import styled from "styled-components";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftjsToHtml from "draftjs-to-html";

const Container = styled.div`
    width: 100%;
`;

const RowBox = styled.div`
    width: 100%;
    display: flex;
`;

const Viewer = styled.div`
    width: calc(50% - 40px);
    height: 400px;
    padding: 20px;
    margin-top: 20px;
    border: 2px solid gray;
`;

const Draft = () => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [htmlString, setHtmlString] = useState("");

    const updateTextDescription = async (state: any) => {
        await setEditorState(state);
        const html = draftjsToHtml(convertToRaw(editorState.getCurrentContent()));
        setHtmlString(html);
    };

    const uploadCallback = (file: any) => {
        console.log("이미지 업로드");
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open("POST", "https://api.imgur.com/3/image");
            xhr.setRequestHeader("Authorization", "Client-ID ##clientid##");
            const data = new FormData();
            data.append("image", file);
            xhr.send(data);
            xhr.addEventListener("load", () => {
                const response = JSON.parse(xhr.responseText);
                console.log(response);
                resolve(response);
            });
            xhr.addEventListener("error", () => {
                const error = JSON.parse(xhr.responseText);
                console.log(error);
                reject(error);
            });
        });
    };

    return (
        <>
            <div>draft test</div>
            <Container>
                <Editor
                    placeholder="게시글을 작성해주세요"
                    editorState={editorState}
                    onEditorStateChange={updateTextDescription}
                    toolbar={{
                        image: { uploadCallback: uploadCallback },
                    }}
                    localization={{ locale: "ko" }}
                    editorStyle={{
                        height: "400px",
                        width: "100%",
                        border: "3px solid lightgray",
                        padding: "20px",
                    }}
                />
            </Container>
            {/* <RowBox>
        <Viewer dangerouslySetInnerHTML={{ __html: htmlString }} />
        <Viewer>{htmlString}</Viewer>
      </RowBox> */}
        </>
    );
};

export default Draft;
