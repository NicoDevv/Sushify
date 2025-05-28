from fastapi.middleware.cors import CORSMiddleware

def add_cors_middleware(app):
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["http://localhost:7070", "http://127.0.0.1:7070"],  # Updated frontend ports
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )