# scripts/create_database.py
#!/usr/bin/env python3
"""
Script de création de base de données avec SQLAlchemy
"""

import sys
from sqlalchemy import create_engine, text
from database import DB_CONFIG, BASE_URL

def create_database():
    """Crée la base de données si elle n'existe pas"""
    
    print("🚀 Création de la base de données...")
    
    # Connexion sans base spécifique
    engine = create_engine(BASE_URL)
    
    try:
        with engine.connect() as conn:
            # Vérifier si la base existe
            result = conn.execute(
                text("SHOW DATABASES LIKE :db_name"), 
                {"db_name": DB_CONFIG["database"]}
            )
            database_exists = result.fetchone() is not None
            
            if database_exists:
                print(f"✅ Base de données '{DB_CONFIG['database']}' existe déjà")
                return True
            
            # Créer la base de données
            conn.execute(text(f"CREATE DATABASE {DB_CONFIG['database']} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci"))
            print(f"✅ Base de données '{DB_CONFIG['database']}' créée avec succès")
            
            # Donner les permissions (optionnel)
            conn.execute(text(f"GRANT ALL PRIVILEGES ON {DB_CONFIG['database']}.* TO '{DB_CONFIG['user']}'@'%'"))
            conn.execute(text("FLUSH PRIVILEGES"))
            print("✅ Permissions accordées")
            
            return True
            
    except Exception as e:
        print(f"❌ Erreur lors de la création de la base: {e}")
        return False

def create_tables():
    """Crée toutes les tables à partir des modèles"""
    
    print("📦 Création des tables...")
    
    from database import engine, Base
    
    try:
        # Créer toutes les tables
        Base.metadata.create_all(bind=engine)
        print("✅ Tables créées avec succès")
        return True
        
    except Exception as e:
        print(f"❌ Erreur lors de la création des tables: {e}")
        return False

def init_database():
    """Initialisation complète de la base de données"""
    
    print("=" * 50)
    print("🚀 INITIALISATION DE LA BASE DE DONNÉES")
    print("=" * 50)
    
    # Étape 1: Créer la base de données
    if not create_database():
        return False
    
    # Étape 2: Créer les tables
    if not create_tables():
        return False
    
    # Étape 3: Vérification finale
    print("🔍 Vérification finale...")
    try:
        from database import engine
        with engine.connect() as conn:
            tables = conn.execute(text("SHOW TABLES")).fetchall()
            print(f"✅ {len(tables)} table(s) créée(s): {[table[0] for table in tables]}")
            
    except Exception as e:
        print(f"❌ Erreur de vérification: {e}")
        return False
    
    print("=" * 50)
    print("🎉 BASE DE DONNÉES INITIALISÉE AVEC SUCCÈS!")
    print("=" * 50)
    return True

if __name__ == "__main__":
    success = init_database()
    sys.exit(0 if success else 1)