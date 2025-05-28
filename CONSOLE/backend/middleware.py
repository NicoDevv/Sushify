from fastapi.middleware.cors import CORSMiddleware

def add_cors_middleware(app):
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],  # Permetti tutte le origini
        allow_credentials=True,
        allow_methods=["*"],  # Permetti tutti i metodi HTTP
        allow_headers=["*"],  # Permetti tutti gli header
    )