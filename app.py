# Import dependencies
from flask import Flask, render_template, jsonify, request, redirect
from model import session, Violations, Stations


#################################################
# Flask Setup
#################################################

app = Flask(__name__)

#################################################
# Routes
#################################################


# Main route
@app.route('/')
def home():
    return render_template('index.html')

# List of stations

@app.route('/stations')
def stations():
    results = (session
                .query(Stations.latitude, Stations.longitude, Stations.online_date))

    station_lat = []
    station_long = []
    online_date = []

    for row in results:
        station_lat.append(row[0])
        station_long.append(row[1])
        online_date.append(row[2])

    data = {
        "station_lat": station_lat,
        "station_long": station_long,
        "online_date": online_date
    }

    return jsonify(data)

# List of trips

# @app.route('/trips')
# def trips():


# List of speeding incidents
@app.route('/speed_violations')
def speed_incidents():

    results = (session
                .query(Violations.latitude, Violations.longitude,
                       Violations.violations, Violations.violation_date, Violations.address ))

    violation_lat = []
    violation_long = []
    violation_count = []
    violation_date = []
    violation_address = []


    for row in results:
        violation_lat.append(row[0])
        violation_long.append(row[1])
        violation_count.append(row[2])
        violation_date.append(row[3])
        violation_address.append(row[4])


    data = {
        "violation_lat": violation_lat,
        "violation_long": violation_long,
        "violation_count": violation_count,
        "violation_date": violation_date,
        "violation_address": violation_address
    }

    return jsonify(data)

if __name__ == "__main__":
    app.run(debug=True)
