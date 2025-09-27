from flask import Flask, request, jsonify
from flask_cors import CORS
from faker import Faker
import random
from datetime import datetime, date
import decimal

app = Flask(__name__)
app.config["JSON_SORT_KEYS"] = False   
CORS(app)

fake = Faker()

# Get all safe faker methods
def get_safe_methods(fake_instance):
    methods = []
    for method_name in dir(fake_instance):
        if method_name.startswith("_"):
            continue
        try:
            attr = getattr(fake_instance, method_name)
            if callable(attr):
                methods.append(method_name)
        except TypeError:
            continue
    return methods

string_methods = get_safe_methods(fake)

# Match field_name directly to known faker methods
def find_direct_faker_method(field_name, methods_list):
    field_name = field_name.lower().replace(" ", "_")
    if field_name in methods_list:
        return getattr(fake, field_name)
    return None

# Generate data based on type
def generate_dynamic_value(field_name, field_type):
    lname = field_name.lower().replace(" ", "_")

    # --- STRING TYPE ---
    if field_type == "string":
        if "gender" in lname:
            return random.choice(["Male", "Female"])
        if "email" in lname:
            return fake.email()
        if "ip" in lname:
            return fake.ipv4()

        # Try direct faker match
        faker_method = find_direct_faker_method(lname, string_methods)
        if faker_method:
            try:
                value = faker_method()
                if isinstance(value, (datetime, date)):
                    return value.isoformat()
                if isinstance(value, decimal.Decimal):
                    return float(value)
                return str(value)
            except:
                return fake.word()
        else:
            return fake.word()

    # --- INTEGER TYPE ---
    elif field_type == "int":
        if "age" in lname:
            return random.randint(1, 120)
        elif "id" in lname or "count" in lname or "num" in lname:
            return random.randint(1000, 9999)
        else:
            return random.randint(0, 1000)

    # --- FLOAT TYPE ---
    elif field_type == "float":
        return round(random.uniform(1, 1000), 2)

    # --- BOOLEAN TYPE ---
    elif field_type in ("bool", "boolean"):
        return random.choice([True, False])

    # --- DATE TYPE ---
    elif field_type == "date":
        return fake.date()

    # --- FALLBACK ---
    else:
        return fake.word()
    
# API Endpoint
@app.route("/", methods=["POST"])
def generate_json():
    data = request.json
    fields = data.get("fields", [])
    num_records = data.get("rows", 10)

    result = []
    for _ in range(num_records):
        record = {}
        for field in fields:  # preserves input order
            field_name = field.get("name")
            field_type = field.get("type")
            record[field_name] = generate_dynamic_value(field_name, field_type)
        result.append(record)

    return jsonify({"records": result})

if __name__ == "__main__":
    app.run(debug=True)
