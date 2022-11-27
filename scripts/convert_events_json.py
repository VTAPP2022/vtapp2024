import csv
import json
import sys
from pathlib import Path

CURRENT_DIR = Path(__file__).parent
INPUT_FILE_PATH = CURRENT_DIR / "events.csv" if len(sys.argv) < 2 else Path(sys.argv[1])
OUTPUT_FILE_PATH = (
    CURRENT_DIR / "../public/data/events_list.json"
    if len(sys.argv) < 3
    else Path(sys.argv[2])
)

CSV_FILE_MAP = {
    "event_id": 0,
    "organiser": 1,
    "event_name": 2,
    "event_type": 3,
    "description": 5,
}

if __name__ == "__main__":
    events = []
    print("Converting {} to JSON".format(INPUT_FILE_PATH.name))

    with open(INPUT_FILE_PATH, newline="") as events_csv:
        events_reader = csv.reader(events_csv, delimiter=",")
        next(events_reader)  # Skip headings

        for row in events_reader:
            event = {}
            for key, value in CSV_FILE_MAP.items():
                event[key] = row[value]
            events.append(event)

    with open(OUTPUT_FILE_PATH, "w+") as output_json:
        output_json.write(json.dumps(events))

    print("Converted to JSON and saved at: ", OUTPUT_FILE_PATH)
