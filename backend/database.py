from sqlmodel import create_engine, Session

DATABASE_URL = "postgresql://admin:password@127.0.0.1:5432/shadowsop"

engine = create_engine(DATABASE_URL, echo=True)

def get_session():
    with Session(engine) as session:
        yield session
