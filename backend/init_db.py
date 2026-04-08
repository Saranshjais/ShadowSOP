import psycopg2
from database import DATABASE_URL
import os

def init_db():
    conn = psycopg2.connect(DATABASE_URL)
    conn.autocommit = True
    cursor = conn.cursor()
    
    schema_path = os.path.join(os.path.dirname(__file__), "schema.sql")
    with open(schema_path, "r") as f:
        schema = f.read()
        
    try:
        # Drop tables if they exist to start fresh
        cursor.execute("DROP TABLE IF EXISTS edge_cases, steps, sops, companies CASCADE;")
        cursor.execute(schema)
        print("Database schema successfully rebuilt!")
    except Exception as e:
        print(f"Error initializing DB: {e}")
    finally:
        cursor.close()
        conn.close()

if __name__ == "__main__":
    init_db()
