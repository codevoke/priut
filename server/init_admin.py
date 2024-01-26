from passlib.hash import pbkdf2_sha256
from models import *

def initialize_database():
    db.create_all()
    
    if not UserModel.find_by_username("admin"):
        admin = UserModel(
            username="admin",
            password=pbkdf2_sha256.hash("admin"),
        )
        db.session.add(admin)
        db.session.commit()