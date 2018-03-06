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
                .query(Stations.latitude, Stations.longitude))

    station_lat = []
    station_long = []

    for row in results:
        station_lat.append(row[0])
        station_long.append(row[1])

    data = {
        "station_lat": station_lat,
        "station_long": station_long
    }

    return jsonify(data)

# List of trips

# @app.route('/trips')
# def trips():


# List of speeding incidents
@app.route('/speed_incidents')
def speed_incidents():

    results = (session
                .query(Violations.latitude, Violations.longitude))

    violation_lat = []
    violation_long = []

    for row in results:
        violation_lat.append(row[0])
        violation_long.append(row[1])

    data = {
        "violation_lat": violation_lat,
        "violation_long": violation_long
    }

    return jsonify(data)

if __name__ == "__main__":
    app.run(debug=True)
