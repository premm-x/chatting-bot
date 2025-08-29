import dotenv from "dotenv"
dotenv.config()
import express from "express"
import cors from "cors"
import { axiosInstance } from "./config/axios.js"

const app = express();
app.use(express.json());
app.use(cors({
    origin: "*"
}))


app.get("/", (req, res) =>{
    res.send("Hello")
})

app.get("/welcome", async (req, res) =>{
    
    const response = await axiosInstance.get("/starter") 
    res.json(response.data)

})

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const response = await axiosInstance.post("/chat", { message });

    res.json(response.data); 
    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});








const port = process.env.PORT || 5000
app.listen(port, ()=>{
    console.log(`server is running on port: ${port}`)
})