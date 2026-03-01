from flask import Flask, request, jsonify, send_from_directory
import json
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__, static_folder='.')

MENU_FILE = 'menu.json'
ADMIN_USERNAME = os.getenv("ADMIN_USERNAME", "admin@wafflelab.com")
ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD", "admin123")

def read_menu():
    if not os.path.exists(MENU_FILE):
        return []
    with open(MENU_FILE, 'r', encoding='utf-8') as f:
        return json.load(f)

def write_menu(data):
    with open(MENU_FILE, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2)

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/<path:path>')
def send_static(path):
    return send_from_directory('.', path)

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    if data.get('username') == ADMIN_USERNAME and data.get('password') == ADMIN_PASSWORD:
        return jsonify({"success": True, "message": "Login successful"})
    return jsonify({"success": False, "message": "Invalid credentials"}), 401

@app.route('/api/menu', methods=['GET'])
def get_menu():
    return jsonify(read_menu())

@app.route('/api/menu', methods=['POST'])
def add_item():
    new_item = request.json
    menu = read_menu()
    menu.append(new_item)
    write_menu(menu)
    return jsonify({"success": True, "item": new_item})

@app.route('/api/menu/<item_id>', methods=['PUT'])
def update_item(item_id):
    updated_data = request.json
    menu = read_menu()
    for i, item in enumerate(menu):
        if item['id'] == item_id:
            menu[i].update(updated_data)
            write_menu(menu)
            return jsonify({"success": True, "item": menu[i]})
    return jsonify({"success": False, "message": "Item not found"}), 404

@app.route('/api/menu/<item_id>', methods=['DELETE'])
def delete_item(item_id):
    menu = read_menu()
    new_menu = [item for item in menu if item['id'] != item_id]
    if len(new_menu) < len(menu):
        write_menu(new_menu)
        return jsonify({"success": True})
    return jsonify({"success": False, "message": "Item not found"}), 404

if __name__ == '__main__':
    app.run(debug=True, port=5000)
