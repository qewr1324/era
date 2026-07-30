export function generate(params: any): string {
	return `from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import uvicorn

app = FastAPI(
    title="My API",
    version="1.0.0"
)

class User(BaseModel):
    id: int
    username: str
    email: str
    is_active: bool = True

class UserCreate(BaseModel):
    username: str
    email: str
    password: str

fake_users_db = []

@app.get("/")
async def root():
    return {"message": "Welcome to FastAPI"}

@app.get("/api/users", response_model=List[User])
async def get_users():
    return fake_users_db

@app.post("/api/users", response_model=User)
async def create_user(user: UserCreate):
    new_user = User(
        id=len(fake_users_db) + 1,
        username=user.username,
        email=user.email
    )
    fake_users_db.append(new_user)
    return new_user

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)`;
}
