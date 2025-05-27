import pymysql
from pymysql.cursors import DictCursor
from fastapi import HTTPException
from config import DB_CONFIG

def get_db_connection():
    """
    Create and return a connection to the database.
    """
    try:
        connection = pymysql.connect(
            host=DB_CONFIG["host"],
            user=DB_CONFIG["user"],
            password=DB_CONFIG["password"],
            db=DB_CONFIG["db"],
            charset=DB_CONFIG["charset"],
            cursorclass=DictCursor
        )
        return connection
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database connection failed: {e}")