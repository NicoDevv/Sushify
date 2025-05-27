from fastapi import APIRouter, HTTPException, Query
from typing import Dict, Any, List
from models.schemas import (
    PiattoDetailResponse, 
    PiattoModificabileResponse,
    PiattoModificaRequest,
    PiattoCarrelloResponse,
    PiattoListResponse  # New schema
)
from services.piatto_service import (
    get_piatto_by_id, 
    get_componenti_modificabili,
    aggiungi_piatto_modificato_al_carrello,
    get_all_piatti  # New service function
)

router = APIRouter(
    prefix="/piatto",
    tags=["piatto"],
    responses={404: {"description": "Not found"}},
)

@router.get("", response_model=List[PiattoDetailResponse])
def get_all_dishes():
    """
    Get all available dishes with their components.
    This endpoint is used to populate the menu on the frontend.
    """
    return get_all_piatti()

@router.get("/{piatto_id}", response_model=PiattoDetailResponse)
def get_piatto_detail(piatto_id: int):
    """
    Get detailed information about a specific dish, including its components.
    """
    return get_piatto_by_id(piatto_id)

@router.get("/{piatto_id}/modifica", response_model=PiattoModificabileResponse)
def get_piatto_modificabile(piatto_id: int):
    """
    Get all removable components for a specific dish.
    This endpoint shows which components can be modified (removed) from the dish.
    """
    return get_componenti_modificabili(piatto_id)

@router.post("/{piatto_id}/modifica", response_model=PiattoCarrelloResponse)
def add_modified_dish_to_cart(
    piatto_id: int,
    request: PiattoModificaRequest,
    cod_tablet: int = Query(None, description="ID del tablet che sta effettuando l'operazione (opzionale)")
):
    """
    Aggiunge un piatto modificato al carrello.
    
    Questo endpoint accetta una lista di ID dei componenti da rimuovere dal piatto
    e crea un piatto personalizzato nel carrello temporaneo.
    
    Il piatto modificato non viene subito convertito in un ordine effettivo,
    ma viene salvato in un "carrello" temporaneo.
    """
    return aggiungi_piatto_modificato_al_carrello(
        piatto_id=piatto_id,
        componenti_rimossi=request.componenti_rimossi,
        cod_tablet=cod_tablet
    )