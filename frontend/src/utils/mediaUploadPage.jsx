import { createClient } from "@supabase/supabase-js";
import { useState } from "react";

const url = "https://gnioxlulczbvkqyzquky.supabase.co";
const key =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImduaW94bHVsY3pidmtxeXpxdWt5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAzMTg3NDksImV4cCI6MjA2NTg5NDc0OX0.zSm6-4M6OuKKKUbF2uwL2cBwto-7yKK3krGLhdUcM1A";

const supabase = createClient(url, key);

export default function mediaUpload(file) {
  const mediaUploadPromise = new Promise((resolve, reject) => {
    if (file == null) {
      reject("No file selected");
      return;
    }
    const timestamp = new Date().getTime();
    const newName = timestamp + file.name;
    supabase.storage
      .from("userimages")
      .upload(newName, file, { upsert: false, cacheControl: "3600" })
      .then(() => {
        const publicUrl = supabase.storage
          .from("userimages")
          .getPublicUrl(newName).data.publicUrl;
        console.log(publicUrl);
        resolve(publicUrl);
      })
      .catch((err) => {
        console.log(err);
        reject("File upload failed: " + err.message);
      });  
  });
  return mediaUploadPromise;
}
