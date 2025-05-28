from fastapi import HTTPException
from database import get_db_connection
from typing import List, Dict, Any
from models.schemas import OrderRequest
import datetime

def create_order(order_data: OrderRequest):
    """
    Create a new order in the database from the cart items.
    
    Args:
        order_data: Order request containing cart items, table number, and menu type
    
    Returns:
        Information about the created order
    """
    connection = get_db_connection()
    try:
        with connection.cursor() as cursor:
            # First, create a new tavolata record with the table number
            cursor.execute("""
                INSERT INTO tavolata (numero_posti, cod_tavolo)
                VALUES (1, %s)
            """, (order_data.tavolo,))
            connection.commit()
            
            # Get the new tavolata ID
            cursor.execute("SELECT LAST_INSERT_ID() as id_tavolata")
            tavolata_result = cursor.fetchone()
            id_tavolata = tavolata_result["id_tavolata"]
            
            # Create a new order with status 'confermato' and link it to the tavolata
            cursor.execute("""
                INSERT INTO ordine (data_ordine, stato_ordine, cod_tavolata)
                VALUES (NOW(), 'confermato', %s)
            """, (id_tavolata,))
            connection.commit()
            
            # Get the new order ID
            cursor.execute("SELECT LAST_INSERT_ID() as id_ordine")
            order_result = cursor.fetchone()
            id_ordine = order_result["id_ordine"]
            
            # Add all items from the cart to the order
            for item in order_data.items:
                # Check if the dish has modifications
                has_modifications = item.componenti_rimossi and len(item.componenti_rimossi) > 0
                
                if has_modifications:
                    # Handle modified dishes
                    
                    # First, check if the personalizzazioni table has any records, 
                    # if not, create a 'rimuovi' personalizzazione
                    cursor.execute("SELECT COUNT(*) as count FROM personalizzazioni")
                    count_result = cursor.fetchone()
                    
                    if count_result["count"] == 0:
                        cursor.execute("""
                            INSERT INTO personalizzazioni (tipo_personalizzazione, descrizione)
                            VALUES ('rimuovi', 'Rimuovi ingredienti')
                        """)
                        connection.commit()
                    
                    # Get personalizzazione ID for 'rimuovi'
                    cursor.execute("""
                        SELECT id_personalizzazione 
                        FROM personalizzazioni 
                        WHERE tipo_personalizzazione = 'rimuovi'
                    """)
                    pers_result = cursor.fetchone()
                    
                    if not pers_result:
                        # Create a new 'rimuovi' personalizzazione if it doesn't exist
                        cursor.execute("""
                            INSERT INTO personalizzazioni (tipo_personalizzazione, descrizione)
                            VALUES ('rimuovi', 'Rimuovi ingredienti')
                        """)
                        connection.commit()
                        
                        cursor.execute("SELECT LAST_INSERT_ID() as id_personalizzazione")
                        pers_result = cursor.fetchone()
                    
                    pers_id = pers_result["id_personalizzazione"]
                    
                    # Create a personalized dish
                    cursor.execute("""
                        INSERT INTO piatto_personalizzato (cod_piatto, cod_pers)
                        VALUES (%s, %s)
                    """, (item.id, pers_id))
                    connection.commit()
                    
                    # Get the personalized dish ID
                    cursor.execute("SELECT LAST_INSERT_ID() as id_pp")
                    pp_result = cursor.fetchone()
                    id_pp = pp_result["id_pp"]
                    
                    # Associate the personalized dish with the order
                    cursor.execute("""
                        INSERT INTO ordine_personalizzato (cod_ordine, cod_pp)
                        VALUES (%s, %s)
                    """, (id_ordine, id_pp))
                    connection.commit()
                    
                    # Add removed components
                    if item.componenti_rimossi:
                        for comp_id in item.componenti_rimossi:
                            # Check if componenti_rimossi table exists, create it if not
                            cursor.execute("""
                                CREATE TABLE IF NOT EXISTS componenti_rimossi (
                                    id_cr INT AUTO_INCREMENT PRIMARY KEY,
                                    cod_ordine INT,
                                    cod_piatto INT,
                                    cod_componente INT,
                                    FOREIGN KEY (cod_ordine) REFERENCES ordine(id_ordine),
                                    FOREIGN KEY (cod_piatto) REFERENCES piatto(id_piatto),
                                    FOREIGN KEY (cod_componente) REFERENCES componenti(id_componente)
                                )
                            """)
                            connection.commit()
                            
                            cursor.execute("""
                                INSERT INTO componenti_rimossi (cod_ordine, cod_piatto, cod_componente)
                                VALUES (%s, %s, %s)
                            """, (id_ordine, item.id, comp_id))
                    connection.commit()
                    
                else:
                    # Handle standard dishes
                    # Check if ordine_piatto table exists, create it if not
                    cursor.execute("""
                        CREATE TABLE IF NOT EXISTS ordine_piatto (
                            id_op INT AUTO_INCREMENT PRIMARY KEY,
                            cod_ordine INT,
                            cod_piatto INT,
                            quantita INT DEFAULT 1,
                            FOREIGN KEY (cod_ordine) REFERENCES ordine(id_ordine),
                            FOREIGN KEY (cod_piatto) REFERENCES piatto(id_piatto)
                        )
                    """)
                    connection.commit()
                    
                    # Insert with quantity
                    cursor.execute("""
                        INSERT INTO ordine_piatto (cod_ordine, cod_piatto, quantita)
                        VALUES (%s, %s, %s)
                    """, (id_ordine, item.id, item.quantity))
                    connection.commit()
            
            # Return order confirmation
            return {
                "id_ordine": id_ordine,
                "tavolo": order_data.tavolo,
                "tipo_menu": order_data.tipo_menu,
                "num_items": len(order_data.items),
                "data_ordine": datetime.datetime.now().isoformat(),
                "message": "Ordine confermato con successo"
            }
    except Exception as e:
        if isinstance(e, HTTPException):
            raise e
        raise HTTPException(status_code=500, detail=f"Errore durante la creazione dell'ordine: {e}")
    finally:
        connection.close()