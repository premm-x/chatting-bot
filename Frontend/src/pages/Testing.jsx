import { useState } from "react"
import { axiosInstance } from "../config/backendAPI/axios"
import { createClient } from "@supabase/supabase-js";


const Testing = () => {

    // Initialize Supabase
    const supabaseUrl = "https://zqnkajaswfwkbahakofh.supabase.co";
    const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpxbmthamFzd2Z3a2JhaGFrb2ZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY0NTY3MjgsImV4cCI6MjA3MjAzMjcyOH0.sSxaR5DG5tQ5lQK-uqBPjDEbqpcIVySxcJLMLycE_0A"; // From Supabase → Project Settings → API
    const supabase = createClient(supabaseUrl, supabaseKey);

    const [res, setRes] = useState()

    const [file, setFile] = useState(null);
    const [fileUrl, setFileUrl] = useState("");

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const uploadFile = async () => {
        if (!file) return alert("Please select a file first!");

        const fileName = `${Date.now()}_${file.name}`;

        // Upload file to bucket
        const { data, error } = await supabase.storage
            .from("agentFileStorage") // 👈 change this to your bucket name
            .upload(fileName, file);

        if (error) {
            console.error("Upload error:", error.message);
            alert(error.message);
            return;
        }

        // Get public URL
        const { data: publicUrl } = supabase.storage
            .from("agentFileStorage")
            .getPublicUrl(fileName);

        setFileUrl(publicUrl.publicUrl);
    };

    async function submitHandler() {

        setRes(await axiosInstance.get('/welcome'))

        console.log(res)

    }


    return (
        <div className="p-4">
            <h2 className="text-lg font-bold">Upload File to Supabase</h2>

            <input type="file" onChange={handleFileChange} className="my-2" />
            
            <button
                onClick={uploadFile}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                Upload
            </button>

            {fileUrl && (
                <div className="mt-4">
                    <p>✅ File uploaded successfully!</p>
                    <a
                        href={fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                    >
                        {fileUrl}
                    </a>
                </div>
            )}

        </div>
    );

}

export default Testing







function FileUpload() {

    return (
        <div>

            <h1>Testing</h1>

            <button onClick={() => {
                submitHandler()
            }}>Click</button>

            <p>{res && res.data}</p>

        </div>
    )

    
}
