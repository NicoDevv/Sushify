from fastapi import APIRouter, HTTPException, Body
from typing import Dict, Any, List
from models.schemas import OrderRequest, OrderResponse
from services.ordine_service import create_order

router = APIRouter(
    prefix="/ordine",
    tags=["ordine"],
    responses={404: {"description": "Not found"}},
)

@router.post("", response_model=OrderResponse)
def submit_order(order_data: OrderRequest):
    """
    Submit a new order to the database.
    This endpoint receives cart items and saves them as a confirmed order.
    """
    return create_order(order_data)