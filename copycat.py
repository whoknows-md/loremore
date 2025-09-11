import json
import csv
from faker import Faker
import random
import os

# Initialize Faker
fake = Faker()

# Number of records
num_records = int(input("How many records needed: "))

# Supported datatypes and how to generate them
type_map = {
    "string": lambda: fake.word(),
    "int": lambda: random.randint(1000, 9999),
    "float": lambda: round(random.uniform(1.0, 100.0), 2),
    "date": lambda: fake.date(),
    "boolean": lambda: random.choice([True, False])
}

print("\nAvailable data types:")
for t in type_map.keys():
    print("-", t)

# Ask how many fields initially
num_fields = int(input("\nHow many fields do you want? "))

field_definitions = []

# Function to add fields
def add_fields(count):
    for _ in range(count):
        field_name = input("\nEnter your field name (e.g., email, user_id): ").strip()
        dtype = input("Enter data type (string, int, float, date, boolean): ").strip().lower()

        if dtype not in type_map:
            print("Invalid datatype! Defaulting to string.")
            dtype = "string"

        field_definitions.append((field_name, dtype))

# Add initial fields
add_fields(num_fields)

# Ask if more fields are needed
while True:
    choice = input("\nDo you want to add another field? (yes/no): ").strip().lower()
    if choice == "yes":
        add_fields(1)
    else:
        break

# Generate data
data = []
for i in range(1, num_records + 1):
    record = {}
    for field_name, dtype in field_definitions:
        record[field_name] = type_map[dtype]()
    data.append(record)

# Output directory
output_dir = r"d:\Program\API"
os.makedirs(output_dir, exist_ok=True)

# Save JSON
json_path = os.path.join(output_dir, "output.json")
with open(json_path, "w", encoding="utf-8") as json_file:
    json.dump(data, json_file, indent=4, ensure_ascii=False)


print(f"\nFiles saved at:\n{json_path}")

