from pydantic import BaseModel
from typing import List, Dict, Optional, Any
from datetime import datetime

class SimpleMenuResponse(BaseModel):
    id_menu: int
    nome_menu: str
    piatti: List[str]

class ComponenteResponse(BaseModel):
    id_componente: int
    nome_componente: str
    intolleranza: Optional[str] = None

class ComponenteModificabileResponse(BaseModel):
    id_componente: int
    nome_componente: str
    intolleranza: Optional[str] = None
    rimuovibile: bool

class PiattoDetailResponse(BaseModel):
    id_piatto: int
    nome_piatto: str
    descrizione: Optional[str] = None
    prezzo: float
    categoria: str
    immagine_url: Optional[str] = None
    componenti: List[ComponenteResponse] = []

class PiattoModificabileResponse(BaseModel):
    id_piatto: int
    nome_piatto: str
    componenti_modificabili: List[ComponenteModificabileResponse] = []

# Nuovi modelli per la gestione del carrello
class PiattoModificaRequest(BaseModel):
    componenti_rimossi: List[int] = []  # Lista degli ID dei componenti da rimuovere

class PiattoCarrelloResponse(BaseModel):
    id_carrello: int
    id_piatto: int
    nome_piatto: str
    componenti_rimossi: List[ComponenteResponse] = []
    message: str