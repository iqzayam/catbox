import { useState } from "react";

export default function Home() {
  const [file, setFile] = useState(null);
  const [link, setLink] = useState("");

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Pilih file dulu!");

    const formData = new FormData();
    formData.append("fileToUpload", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const text = await res.text();
    setLink(text);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0f172a] text-white">
      <h1 className="text-2xl font-bold mb-4">Upload ke Catbox</h1>
      <form onSubmit={handleUpload} className="space-y-3">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="block text-sm text-gray-300"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          Upload
        </button>
      </form>

      {link && (
        <p className="mt-4">
          ✅ Link:{" "}
          <a href={link} target="_blank" className="text-blue-400 underline">
            {link}
          </a>
        </p>
      )}
    </div>
  );
            }
