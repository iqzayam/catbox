import FormData from "form-data";
import fetch from "node-fetch";

export const config = {
  api: {
    bodyParser: false, // jangan parse body otomatis
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).send("Method Not Allowed");
    return;
  }

  try {
    // kumpulkan body stream dari browser
    const chunks = [];
    for await (const chunk of req) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);

    // teruskan ke Catbox
    const catboxRes = await fetch("https://catbox.moe/user/api.php", {
      method: "POST",
      body: buffer,
      headers: {
        "Content-Type": req.headers["content-type"],
      },
    });

    const text = await catboxRes.text();
    res.status(200).send(text);
  } catch (err) {
    res.status(500).send("Error: " + err.message);
  }
}}
