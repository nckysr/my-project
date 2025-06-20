import { createClient } from "@supabase/supabase-js";
import { useState } from "react";
import mediaUpload from "../utils/mediaUploadPage";

export default function TestPage() {
  const [count, setCount] = useState(0);
  const [image, setImage] = useState(null);

  const url = "https://gnioxlulczbvkqyzquky.supabase.co";
  const key =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImduaW94bHVsY3pidmtxeXpxdWt5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAzMTg3NDksImV4cCI6MjA2NTg5NDc0OX0.zSm6-4M6OuKKKUbF2uwL2cBwto-7yKK3krGLhdUcM1A";

  const supabase = createClient(url, key);

  function fileUpload() {
    mediaUpload(image)
      .then((res) => {console.log("File uploaded successfully:", res);})
      .catch((err) => {console.error("File upload failed:", err);});
  }
  return (
    <>
      <div>
        <input
          onChange={(e) => {
            setImage(e.target.files[0]);
            console.log("Selected file:", e.target.files[0]);
          }}
          type="file"
          className="w-full h-full bg-white text-center rounded-lg"
          placeholder="Type here"
        />
        <button
          onClick={fileUpload}
          className="bg-green p-2 rounded-lg shadow-md hover:bg-gray-200 transition duration-200 cursor-pointer"
        >
          Upload
        </button>
      </div>

      <div className="w-full h-screen bg-red-500 flex justify-center items-center">
        <div className="w-[200px] h-[200px] bg-blue-500 flex justify-center items-center">
          <button
            onClick={() => {
              setCount(count - 1);
            }}
            className="bg-white p-2 rounded-lg shadow-md hover:bg-gray-200 transition duration-200 cursor-pointer"
          >
            -
          </button>

          <span className="mx-4 text-xl font-bold">{count}</span>

          <button
            onClick={() => {
              setCount(count + 1);
            }}
            className="bg-white p-2 rounded-lg shadow-md hover:bg-gray-200 transition duration-200 cursor-pointer"
          >
            +
          </button>
        </div>
        <div className="w-[200px] h-[200px] bg-green-500 flex justify-center items-center">
          <div className="w-[150px] h-[150px] bg-red-500 flex justify-center items-center">
            <div className="w-[100px] h-[100px] bg-blue-500 flex justify-center items-center">
              <div className="w-[50px] h-[50px] bg-pink-500 flex justify-center items-center"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
