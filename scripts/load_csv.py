import asyncio
import csv
import ssl
import sys
from pathlib import Path

import aiomysql
import cuid2

ctx = ssl.create_default_context()

def get_past_registrations(file_path: Path):
    events = []

    with open(file_path, "r") as file:
        reader = csv.reader(file)
        next(reader) # Skip the header

        for row in reader:
            applicant_phone_no, applicant_name, applicant_email, application_no, events_registered, date_of_birth = row 
            events_registered = [int(eventId) for eventId in events_registered.split("/") if eventId != ""]
            applicant_phone_no = int(applicant_phone_no) if applicant_phone_no != "" else 1234567890

            events.append({
                "applicant_phone_no": applicant_phone_no,
                "applicant_name": applicant_name,
                "applicant_email": applicant_email,
                "application_no": application_no,
                "events_registered": events_registered,
                "date_of_birth": date_of_birth
            })
    
    return events
            

async def connect(host: str, user: str, password: str, db: str) -> aiomysql.Cursor:
    conn = await aiomysql.connect(
        host=host,
        user=user, 
        password=password, 
        db=db,
        ssl=ctx
    )
    print("Established connection to the database")

    cursor: aiomysql.Cursor = await conn.cursor()

    return cursor

async def insert_registrations(cursor: aiomysql.Cursor, registrations: list[dict]):

    data = []
    for registration in registrations:
        for event in registration["events_registered"]:
            random_id = cuid2.Cuid().generate()
            data.append((random_id, registration["applicant_phone_no"], registration["applicant_name"], registration["applicant_email"], registration["application_no"], event, registration["date_of_birth"]))

    res = await cursor.executemany(
        "INSERT INTO qrcodes (id, applicant_phone_no, applicant_name, applicant_email, application_no, event_id, date_of_birth) VALUES (%s, %s, %s, %s, %s, %s, %s) ON DUPLICATE KEY UPDATE applicant_phone_no=applicant_phone_no;",
        data
    )

    return res

async def main():
    if len(sys.argv) != 4:
        print("Usage: load_csv.py <file_path> <db_username> <db_password>")
        sys.exit(1)
    
    # Check if the file exists
    file_path = Path(sys.argv[1])

    if not file_path.exists() or not file_path.is_file() or not file_path.suffix == ".csv":
        print(f"File {sys.argv[1]} does not exist (or) is not a csv file")
        sys.exit(1)

    # Read the csv file
    registrations = get_past_registrations(file_path)
    print(f"Read {len(registrations)} registrations from the file")

    # Connect to the database
    db_name = sys.argv[2]
    db_password = sys.argv[3]

    cursor = await connect(
        "aws.connect.psdb.cloud",
        db_name,
        db_password,
        "vtapp2023"
    )

    res = await insert_registrations(cursor, registrations)
    print(f"Inserted {res} rows into the database")

asyncio.run(
    main()
)