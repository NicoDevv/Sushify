from fastapi import APIRouter, HTTPException
from typing import Dict, Any, List
from models.schemas import SimpleMenuResponse
from services.menu_service import get_all_menus_info, get_menu_by_id

router = APIRouter(
    prefix="/menu",
    tags=["menu"],
    responses={404: {"description": "Not found"}},
)

@router.get("", response_model=Dict[str, Any])
def get_menu_dish_names():
    """
    Get all menu names with a message guiding to specific menus.
    """
    return get_all_menus_info()

@router.get("/{menu_id}", response_model=SimpleMenuResponse)
def get_menu_dish_names_by_id(menu_id: int):
    """
    Get a specific menu by ID with only the names of dishes in it.
    """
    return get_menu_by_id(menu_id)