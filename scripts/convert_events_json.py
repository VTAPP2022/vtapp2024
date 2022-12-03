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


def get_poster_link(poster: str):
    if not poster or not poster.startswith("https://i.imgur.com"):
        return "https://i.imgur.com/2jzM0wr.jpg"
    return poster


CSV_FILE_MAP = {
    "event_id": 0,
    "organiser": 1,
    "event_name": 2,
    "event_type": 3,
    "description": 6,
    "price": 4,
    "poster_url": 7,
}

FILTERS = {
    "price": lambda p: p if p else 0,
    "poster_url": get_poster_link,
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
                csv_val = row[value]
                if key in FILTERS.keys():
                    csv_val = FILTERS[key](csv_val)
                event[key] = csv_val
            events.append(event)

    with open(OUTPUT_FILE_PATH, "w+") as output_json:
        output_json.write(json.dumps(events))

    print("Converted to JSON and saved at: ", OUTPUT_FILE_PATH)
