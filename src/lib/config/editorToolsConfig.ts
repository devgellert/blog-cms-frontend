import { EditorConfig } from "@editorjs/editorjs";
import { AxiosResponse } from "axios";
import api from "../../api";
const ImageTool = require("@editorjs/image");
const Header = require("@editorjs/header");
const SimpleImage = require("@editorjs/simple-image");
const Underline = require("@editorjs/underline");

const editorToolsConfig: EditorConfig["tools"] = {
    Header,
    SimpleImage,
    Underline,
    image: {
        class: ImageTool,
        config: {
            endpoints: {
                byFile: `${process.env.REACT_APP_API}/upload-image`, // Your backend file uploader endpoint
                byUrl: "http://localhost:8008/fetchUrl" // Your endpoint that provides uploading by Url
            },
            uploader: {
                /**
                 * Upload file to the server and return an uploaded image data
                 * @param {File} file - file selected from the device or pasted by drag-n-drop
                 * @return {Promise.<{success, file: {url}}>}
                 */
                uploadByFile(file: any) {
                    // your own uploading logic here

                    const formData = new FormData();
                    formData.append("image", file);
                    const promise = api.post("/upload-image", formData, {
                        headers: {
                            "Content-Type": "multipart/form-data"
                        }
                    });

                    return promise.then((response: AxiosResponse<{ fileName: string }>) => {
                        return {
                            success: 1,
                            file: {
                                url: `${process.env.REACT_APP_MEDIA_URL}/${response.data.fileName}`
                            }
                        };
                    });
                }

                // /**
                //  * Send URL-string to the server. Backend should load image by this URL and return an uploaded image data
                //  * @param {string} url - pasted image URL
                //  * @return {Promise.<{success, file: {url}}>}
                //  */
                // uploadByUrl(url){
                //     // your ajax request for uploading
                //     return MyAjax.upload(file).then(() => {
                //         return {
                //             success: 1,
                //             file: {
                //                 url: 'https://codex.so/upload/redactor_images/o_e48549d1855c7fc1807308dd14990126.jpg',,
                //             // any other image data you want to store, such as width, height, color, extension, etc
                //         }
                //     }
                //     })
                // }
            }
        }
    }
};

export default editorToolsConfig;
