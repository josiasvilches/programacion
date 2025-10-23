import os
from sqlalchemy import text, create_engine

base_dir = os.path.abspath(os.path.dirname(__file__))
db_folder = os.path.join(base_dir, 'DB')
db_name = os.getenv('DATABASE_NAME', 'grupof.db')
db_full_path = os.path.join(db_folder, db_name)

engine = create_engine(f"sqlite:///{db_full_path}")

with engine.begin() as conn:
    cols = [r[1] for r in conn.execute(text("PRAGMA table_info(pedidos)")).fetchall()]
    if "hora_retiro" not in cols:
        conn.execute(text("ALTER TABLE pedidos ADD COLUMN hora_retiro TEXT"))
        print("Columna 'hora_retiro' agregada ✅")
    else:
        print("La columna 'hora_retiro' ya existe ✅")

    print(conn.execute(text("PRAGMA table_info(pedidos)")).fetchall())
