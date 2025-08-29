from dotenv import load_dotenv
from fastapi import FastAPI
from pydantic import BaseModel
from langchain.chat_models import init_chat_model
import os

load_dotenv() 
app = FastAPI()


llm = init_chat_model(
    model="gemini-1.5-flash", 
    model_provider="google_genai",
    api_key=os.getenv("GOOGLE_API_KEY"),
    temperature=0.7
)


class ChatRequest(BaseModel):
    message: str

@app.post("/chat")
async def chat(request: ChatRequest):
    response = await llm.ainvoke(request.message)
    return {"reply": response.content}



@app.get("/")
def welcome():
    return{"msg" : "Hello, kaise ho..!"}

@app.get("/starter")
def welcome():
    return "welcome welcome py"