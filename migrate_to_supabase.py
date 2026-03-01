import json
import urllib.request
import urllib.error
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

def migrate():
    # 1. Read local menu.json
    try:
        with open('menu.json', 'r', encoding='utf-8') as f:
            menu_data = json.load(f)
    except Exception as e:
        print(f"Error reading menu.json: {e}")
        return

    # 2. Upload to Supabase 'menu' table
    headers = {
        "apikey": SUPABASE_KEY,
        "Authorization": f"Bearer {SUPABASE_KEY}",
        "Content-Type": "application/json",
        "Prefer": "resolution=merge-duplicates"
    }
    
    endpoint = f"{SUPABASE_URL}/rest/v1/menu"
    
    print(f"Migrating {len(menu_data)} items to Supabase...")
    
    data = json.dumps(menu_data).encode('utf-8')
    req = urllib.request.Request(endpoint, data=data, headers=headers, method='POST')
    
    try:
        with urllib.request.urlopen(req) as response:
            status = response.getcode()
            if status in [201, 200, 204]:
                print("Migration successful!")
            else:
                print(f"Migration failed. Status: {status}")
    except urllib.error.HTTPError as e:
        print(f"Migration failed. Status: {e.code}")
        print(f"Response: {e.read().decode()}")
        print("\nNOTE: Ensure you have created a 'menu' table in your Supabase project with columns: id (text PK), name (text), price (int), desc (text), img (text), category (text), flavor (text)")
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    migrate()

if __name__ == "__main__":
    migrate()
