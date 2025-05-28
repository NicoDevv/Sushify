from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.responses import JSONResponse
from fastapi import Cookie
from middleware import add_cors_middleware

app = FastAPI()

#! Aggiungi il middleware CORS
add_cors_middleware(app)

#! Credenziali del server
CREDENZIALI = {
    "email": "admin@domain.com",
    "password": "password123"
}

@app.post("/token")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    '''Gestione del login tramite OAuth2PasswordRequestForm --> passare le credenziali tramite x-www-form-urlencoded '''
    
    if form_data.username != CREDENZIALI["email"] or form_data.password != CREDENZIALI["password"]:
        raise HTTPException( # Solleva un'eccezione
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Credenziali non valide",
            headers={"WWW-Authenticate": "Bearer"}, # Specifica il tipo di autenticazione richiesta
        )
    response = JSONResponse(content={"message": "Login avvenuto con successo"})
    
    response.set_cookie(key="access_token", value=form_data.username, httponly=True) # Imposta un cookie
    
    return response

def verifica_utente(access_token: str = Cookie(None)): 
    '''Verifica che l'utente sia loggato tramite cookie'''
    
    if access_token != CREDENZIALI["email"]: # Se l'access_token non corrisponde a quello salvato nel server 
        raise HTTPException( # Solleva un'eccezione
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token", 
            headers={"WWW-Authenticate": "Bearer"}, # Specifica il tipo di autenticazione richiesta
        )
    return access_token

@app.get("/dashboard")
async def read_dashboard(current_user: str = Depends(verifica_utente)):
    return {"message": "Entrato nella dashboard!"}

@app.get("/")
def read_root():
    return {"message": "Sushify!"}