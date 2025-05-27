from fastapi import HTTPException
from database import get_db_connection

def get_all_menus_info():
    """
    Get basic information about all available menus.
    """
    connection = get_db_connection()
    try:
        with connection.cursor() as cursor:
            # Get all menus
            cursor.execute("SELECT id_menu, nome_menu FROM menu")
            menus = cursor.fetchall()
            
            result = {
                "message": "Per visualizzare un menu specifico, visita l'endpoint /menu/{id_menu}",
                "available_menus": []
            }
            
            # Add menu information to the response
            for menu in menus:
                result["available_menus"].append({
                    "id": menu["id_menu"],
                    "nome": menu["nome_menu"]
                })
            
            return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving menu information: {e}")
    finally:
        connection.close()

def get_menu_by_id(menu_id: int):
    """
    Get a specific menu by ID with only the dish names.
    """
    connection = get_db_connection()
    try:
        with connection.cursor() as cursor:
            # Get menu details
            cursor.execute("SELECT id_menu, nome_menu FROM menu WHERE id_menu = %s", (menu_id,))
            menu = cursor.fetchone()
            
            if not menu:
                raise HTTPException(status_code=404, detail=f"Menu with ID {menu_id} not found")
            
            # Get all dish names in this menu
            cursor.execute("""
                SELECT p.nome_piatto FROM piatto p
                JOIN piatto_menu pm ON p.id_piatto = pm.cod_p
                WHERE pm.cod_menu = %s
            """, (menu_id,))
            dishes = cursor.fetchall()
            
            # Add dish names to the menu
            dish_names = [dish["nome_piatto"] for dish in dishes]
            
            return {
                "id_menu": menu["id_menu"],
                "nome_menu": menu["nome_menu"],
                "piatti": dish_names
            }
    except Exception as e:
        if isinstance(e, HTTPException):
            raise e
        raise HTTPException(status_code=500, detail=f"Error retrieving menu dish names: {e}")
    finally:
        connection.close()