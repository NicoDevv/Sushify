from fastapi import HTTPException
from database import get_db_connection
from typing import List, Dict, Any

def get_piatto_by_id(piatto_id: int):
    """
    Get detailed information about a specific dish, including its components.
    """
    connection = get_db_connection()
    try:
        with connection.cursor() as cursor:
            # Get dish details
            cursor.execute("""
                SELECT id_piatto, nome_piatto, descrizione, prezzo, categoria, immagine_url
                FROM piatto 
                WHERE id_piatto = %s
            """, (piatto_id,))
            piatto = cursor.fetchone()
            
            if not piatto:
                raise HTTPException(status_code=404, detail=f"Dish with ID {piatto_id} not found")
            
            # Get components for this dish
            cursor.execute("""
                SELECT c.id_componente, c.nome_componente, c.intolleranza
                FROM componenti c
                JOIN piatto_componenti pc ON c.id_componente = pc.id_c
                WHERE pc.cod_p = %s
            """, (piatto_id,))
            componenti = cursor.fetchall()
            
            # Format the response
            result = dict(piatto)
            result["componenti"] = componenti
            
            return result
    except Exception as e:
        if isinstance(e, HTTPException):
            raise e
        raise HTTPException(status_code=500, detail=f"Error retrieving dish information: {e}")
    finally:
        connection.close()

def get_componenti_modificabili(piatto_id: int):
    """
    Get all removable components for a specific dish.
    """
    connection = get_db_connection()
    try:
        with connection.cursor() as cursor:
            # Check if dish exists
            cursor.execute("SELECT id_piatto, nome_piatto FROM piatto WHERE id_piatto = %s", (piatto_id,))
            piatto = cursor.fetchone()
            
            if not piatto:
                raise HTTPException(status_code=404, detail=f"Dish with ID {piatto_id} not found")
            
            # Get all removable components for this dish
            cursor.execute("""
                SELECT c.id_componente, c.nome_componente, c.intolleranza, pc.rimuovibile
                FROM componenti c
                JOIN piatto_componenti pc ON c.id_componente = pc.id_c
                WHERE pc.cod_p = %s AND pc.rimuovibile = TRUE
            """, (piatto_id,))
            componenti = cursor.fetchall()
            
            # Format the response
            result = {
                "id_piatto": piatto["id_piatto"],
                "nome_piatto": piatto["nome_piatto"],
                "componenti_modificabili": componenti
            }
            
            return result
    except Exception as e:
        if isinstance(e, HTTPException):
            raise e
        raise HTTPException(status_code=500, detail=f"Error retrieving modifiable components: {e}")
    finally:
        connection.close()

def aggiungi_piatto_modificato_al_carrello(piatto_id: int, componenti_rimossi: List[int], cod_tablet: int = None):
    """
    Aggiunge un piatto modificato al carrello temporaneo.
    
    Args:
        piatto_id: ID del piatto da modificare
        componenti_rimossi: Lista degli ID dei componenti da rimuovere
        cod_tablet: ID del tablet che sta effettuando l'operazione (opzionale)
        
    Returns:
        Informazioni sul piatto aggiunto al carrello
    """
    connection = get_db_connection()
    try:
        with connection.cursor() as cursor:
            # Verifica che il piatto esista
            cursor.execute("SELECT id_piatto, nome_piatto FROM piatto WHERE id_piatto = %s", (piatto_id,))
            piatto = cursor.fetchone()
            
            if not piatto:
                raise HTTPException(status_code=404, detail=f"Piatto con ID {piatto_id} non trovato")
            
            # Verifica che i componenti siano validi e rimovibili
            for comp_id in componenti_rimossi:
                cursor.execute("""
                    SELECT pc.rimuovibile
                    FROM piatto_componenti pc
                    WHERE pc.cod_p = %s AND pc.id_c = %s
                """, (piatto_id, comp_id))
                
                result = cursor.fetchone()
                if not result:
                    raise HTTPException(status_code=400, 
                                      detail=f"Il componente con ID {comp_id} non è associato al piatto con ID {piatto_id}")
                
                if not result["rimuovibile"]:
                    # Ottieni il nome del componente per il messaggio di errore
                    cursor.execute("SELECT nome_componente FROM componenti WHERE id_componente = %s", (comp_id,))
                    comp_name = cursor.fetchone()["nome_componente"]
                    raise HTTPException(status_code=400, 
                                      detail=f"Il componente '{comp_name}' (ID {comp_id}) non può essere rimosso da questo piatto")
            
            # Crea un ordine temporaneo di tipo "carrello"
            cursor.execute("""
                INSERT INTO ordine (data_ordine, stato_ordine)
                VALUES (NOW(), 'carrello')
            """)
            connection.commit()
            
            # Ottieni l'ID dell'ordine appena creato
            cursor.execute("SELECT LAST_INSERT_ID() as id_ordine")
            ordine = cursor.fetchone()
            id_ordine = ordine["id_ordine"]
            
            # Ottieni l'ID della personalizzazione "rimuovi"
            cursor.execute("""
                SELECT id_personalizzazione 
                FROM personalizzazioni 
                WHERE tipo_personalizzazione = 'rimuovi'
            """)
            personalizzazione = cursor.fetchone()
            
            if not personalizzazione:
                raise HTTPException(status_code=500, detail="Tipo di personalizzazione 'rimuovi' non trovato nel database")
            
            pers_id = personalizzazione["id_personalizzazione"]
            
            # Crea un piatto personalizzato
            cursor.execute("""
                INSERT INTO piatto_personalizzato (cod_piatto, cod_pers)
                VALUES (%s, %s)
            """, (piatto_id, pers_id))
            connection.commit()
            
            # Ottieni l'ID del piatto personalizzato
            cursor.execute("SELECT LAST_INSERT_ID() as id_pp")
            piatto_pers = cursor.fetchone()
            id_pp = piatto_pers["id_pp"]
            
            # Associa il piatto personalizzato all'ordine (carrello)
            cursor.execute("""
                INSERT INTO ordine_personalizzato (cod_ordine, cod_pp)
                VALUES (%s, %s)
            """, (id_ordine, id_pp))
            connection.commit()
            
            # Aggiungi i componenti rimossi 
            for comp_id in componenti_rimossi:
                cursor.execute("""
                    INSERT INTO componenti_rimossi (cod_ordine, cod_piatto, cod_componente)
                    VALUES (%s, %s, %s)
                """, (id_ordine, piatto_id, comp_id))
            connection.commit()
            
            # Se è stato fornito un tablet, registra l'informazione (opzionale)
            if cod_tablet:
                # Qui potresti aggiungere una tabella o un campo per tener traccia del tablet associato al carrello
                pass
            
            # Ottieni i dettagli dei componenti rimossi per la risposta
            comp_details = []
            for comp_id in componenti_rimossi:
                cursor.execute("""
                    SELECT id_componente, nome_componente, intolleranza
                    FROM componenti
                    WHERE id_componente = %s
                """, (comp_id,))
                comp = cursor.fetchone()
                comp_details.append(comp)
            
            # Prepara la risposta
            response = {
                "id_carrello": id_ordine,  # Uso l'ID dell'ordine temporaneo come ID carrello
                "id_piatto": piatto["id_piatto"],
                "nome_piatto": piatto["nome_piatto"],
                "componenti_rimossi": comp_details,
                "message": "Piatto modificato aggiunto al carrello con successo"
            }
            
            return response
    except Exception as e:
        if isinstance(e, HTTPException):
            raise e
        raise HTTPException(status_code=500, detail=f"Errore durante l'elaborazione del piatto modificato: {e}")
    finally:
        connection.close()