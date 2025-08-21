import formidable from "formidable";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false, // penting!
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const form = new formidable.IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: "Form parse error" });
    }

    try {
      const file = fs.createReadStream(files.fileToUpload.filepath);

      const formData = new FormData();
      formData.append("reqtype", "fileupload");
      formData.append(
        "fileToUpload",
        file,
        files.fileToUpload.originalFilename
      );

      const response = await fetch("https://catbox.moe/user/api.php", {
        method: "POST",
        body: formData,
      });

      const text = await response.text();
      res.status(200).send(text);
    } catch (error) {
      res.status(500).json({ error: "Upload gagal", detail: error.message });
    }
  });
}
