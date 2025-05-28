from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.responses import JSONResponse
from fastapi import Cookie
from middleware import add_cors_middleware
import mysql.connector
from datetime import datetime

app = FastAPI()

#! Aggiungi il middleware CORS
add_cors_middleware(app)

#! Credenziali del server
CREDENZIALI = {
    "email": "admin@domain.com",
    "password": "password123"
}

# Configurazione del database
DB_CONFIG = {
    "host": "localhost",
    "user": "root",
    "password": "",
    "database": "sushify"
}

def get_db_connection():
    """Crea una connessione al database"""
    try:
        conn = mysql.connector.connect(**DB_CONFIG)
        return conn
    except mysql.connector.Error as e:
        print(f"Errore di connessione al database: {e}")
        raise HTTPException(status_code=500, detail="Errore di connessione al database")

# Login endpoint
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
    
    # Set cookie with SameSite=None and secure=False for development
    response.set_cookie(
        key="access_token", 
        value=form_data.username, 
        httponly=True, 
        samesite="lax",     # Less restrictive
        secure=False,       # Set to True in production with HTTPS
        max_age=3600        # Cookie expiry in seconds (1 hour)
    )
    
    return response

# SEMPLIFICA: Funzione per la verifica utente che non effettua controlli
def verifica_utente_bypass():
    '''Funzione di verifica semplificata che non effettua controlli'''
    return "admin@domain.com"  # Restituisci sempre un utente valido

@app.get("/dashboard")
async def read_dashboard(current_user: str = Depends(verifica_utente_bypass)):
    return {"message": "Entrato nella dashboard!"}

@app.get("/")
def read_root():
    return {"message": "Sushify!"}

@app.get("/api/orders")
async def get_orders(current_user: str = Depends(verifica_utente_bypass)):
    """Recupera tutti gli ordini dal database con i relativi dettagli"""
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        
        # Query per ottenere gli ordini
        cursor.execute("""
            SELECT o.id_ordine, o.data_ordine, o.stato_ordine, t.id_tavolata, 
                   t.numero_posti, tv.numero_tavolo
            FROM ordine o
            JOIN tavolata t ON o.cod_tavolata = t.id_tavolata
            JOIN tavolo tv ON t.cod_tavolo = tv.id_tavolo
            ORDER BY o.data_ordine DESC
        """)
        orders = cursor.fetchall()
        
        # Trasforma i dati in un formato più adatto al frontend
        formatted_orders = []
        for order in orders:
            # Recupera i piatti per questo ordine
            cursor.execute("""
                SELECT op.quantita, p.id_piatto, p.nome_piatto, op.id_op
                FROM ordine_piatto op
                JOIN piatto p ON op.cod_piatto = p.id_piatto
                WHERE op.cod_ordine = %s
            """, (order['id_ordine'],))
            items = cursor.fetchall()
            
            # Recupera le personalizzazioni e le intolleranze per ciascun piatto
            order_items = []
            for item in items:
                item_id = item['id_op']
                
                # Verifica se c'è un piatto personalizzato
                cursor.execute("""
                    SELECT pp.id_pp, pers.tipo_personalizzazione, pers.descrizione, comp.intolleranza
                    FROM ordine_personalizzato op
                    JOIN piatto_personalizzato pp ON op.cod_pp = pp.id_pp
                    JOIN personalizzazioni pers ON pp.cod_pers = pers.id_personalizzazione
                    LEFT JOIN componenti comp ON pers.cod_comp = comp.id_componente
                    WHERE op.cod_ordine = %s
                """, (order['id_ordine'],))
                
                modifications = cursor.fetchall()
                
                # Recupera gli ingredienti del piatto
                cursor.execute("""
                    SELECT c.nome_componente
                    FROM piatto_componenti pc
                    JOIN componenti c ON pc.id_c = c.id_componente
                    WHERE pc.cod_p = %s
                """, (item['id_piatto'],))
                
                ingredients = [row['nome_componente'] for row in cursor.fetchall()]
                
                # Verifica se ci sono modifiche urgenti
                is_urgent = any(mod.get('tipo_personalizzazione') == 'urgente' for mod in modifications)
                
                formatted_mods = []
                for mod in modifications:
                    formatted_mods.append({
                        "description": mod['descrizione'],
                        "isAllergy": mod['intolleranza'] is not None
                    })
                
                order_items.append({
                    "id": str(item['id_piatto']),
                    "name": item['nome_piatto'],
                    "quantity": item['quantita'],
                    "ingredients": ingredients,
                    "modifications": formatted_mods,
                    "isUrgent": is_urgent
                })
            
            # Mappa lo stato dell'ordine
            status_mapping = {
                "nuovo": "new",
                "in preparazione": "in-progress",
                "completato": "completed"
            }
            
            status = status_mapping.get(order['stato_ordine'], "new")
            
            formatted_orders.append({
                "id": f"ORD{order['id_ordine']:03d}",
                "tableNumber": order['numero_tavolo'],
                "customerName": f"Tavolo {order['numero_tavolo']}",
                "items": order_items,
                "status": status,
                "createdAt": order['data_ordine'].isoformat() if order['data_ordine'] else datetime.now().isoformat(),
                "notes": None,
                "estimatedTime": None
            })
            
        cursor.close()
        conn.close()
        
        return formatted_orders
    except Exception as e:
        print(f"Errore nel recupero degli ordini: {e}")
        raise HTTPException(status_code=500, detail=f"Errore nel recupero degli ordini: {str(e)}")

@app.put("/api/orders/{order_id}/status")
async def update_order_status(
    order_id: str, 
    status_data: dict,
    current_user: str = Depends(verifica_utente_bypass)
):
    """Aggiorna lo stato di un ordine nel database"""
    try:
        # Estrai l'ID numerico dall'ID formattato (es. ORD001 -> 1)
        numeric_id = int(order_id.replace("ORD", ""))
        status = status_data.get("status", "")
        
        # Mappa gli stati dal frontend al database
        status_mapping = {
            "new": "nuovo",
            "in-progress": "in preparazione",
            "completed": "completato"
        }
        
        db_status = status_mapping.get(status)
        if not db_status:
            raise HTTPException(status_code=400, detail="Stato ordine non valido")
            
        conn = get_db_connection()
        cursor = conn.cursor()
        
        cursor.execute(
            "UPDATE ordine SET stato_ordine = %s WHERE id_ordine = %s",
            (db_status, numeric_id)
        )
        
        conn.commit()
        cursor.close()
        conn.close()
        
        return {"message": "Stato dell'ordine aggiornato con successo"}
    except Exception as e:
        print(f"Errore nell'aggiornamento dello stato dell'ordine: {e}")
        raise HTTPException(status_code=500, detail=f"Errore nell'aggiornamento dello stato: {str(e)}")
    
    

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=9090, reload=True)