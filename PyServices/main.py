from dotenv import load_dotenv
from fastapi import FastAPI
from pydantic import BaseModel
from langchain.chat_models import init_chat_model
import os
import asyncio
from fastapi.middleware.cors import CORSMiddleware

load_dotenv() 
app = FastAPI()

origins = [
    "https://chatting-ai-frontend.onrender.com/",  # your frontend
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,      
    allow_credentials=True,
    allow_methods=["*"],         
    allow_headers=["*"],      
)

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
    print(response)
    return {"reply": response.content}



@app.get("/")
def welcome():
    print("response")
    return{"reply" : "Hello, kaise ho..!"}

@app.get("/starter")
def welcome2():
    return "welcome welcome py"
