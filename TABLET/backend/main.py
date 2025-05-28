from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from config import API_CONFIG
from api.endpoints import menu, piatto, ordine

app = FastAPI(
    title=API_CONFIG["title"],
    description=API_CONFIG["description"],
    version=API_CONFIG["version"]
)

# CORS configuration - Aggiunta entrambe le origini possibili
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5171",
        "http://127.0.0.1:5171"  # Aggiunta questa origine
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(menu.router)
app.include_router(piatto.router)
app.include_router(ordine.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to Sushify API"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8080, reload=True)