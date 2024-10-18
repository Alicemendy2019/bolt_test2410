from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# CORSミドルウェアを追加
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # フロントエンドのURLを指定
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class UrlRequest(BaseModel):
    url: str

class ContactRequest(BaseModel):
    name: str
    email: str
    subject: str
    message: str

@app.post("/api/company-info")
async def get_company_info(request: UrlRequest):
    # ここでは適当な会社情報を返します
    return {
        "name": "株式会社サンプル",
        "address": "東京都渋谷区サンプル町1-1-1",
        "phone": "03-1234-5678",
        "website": request.url
    }

@app.post("/api/contact")
async def submit_contact(request: ContactRequest):
    # ここではお問い合わせ情報を受け取ったことだけを返します
    print(f"Received contact: {request}")
    return {"message": "お問い合わせを受け付けました"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)