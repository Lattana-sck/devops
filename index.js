import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 3000;
app.use(express.json());

app.get("/get", (req, res) => {
  res.send("Hello World!");
});

app.post("/createToken", async (req, res) => {
  const { DOCKERHUB_USERNAME, DOCKERHUB_PASSWORD } = req.body;

  try {
    const loginResponse = await axios.post("https://hub.docker.com/v2/users/login", {
      username: DOCKERHUB_USERNAME,
      password: DOCKERHUB_PASSWORD,
    });

    const token = loginResponse.data.token;

    if (token) {
      try {
        const listResponse = await axios.get(
          "https://hub.docker.com/v2/repositories/lattana/devops/tags",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const list = listResponse.data;

        if (list) {
          res.status(200).json({ token, list });
        } else {
          res.status(500).json({ error: "Internal Server Error" });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
