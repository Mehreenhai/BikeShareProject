# Import dependencies
from flask import Flask, render_template, jsonify, request, redirect
from sqlalchemy import func
from model import session, Violations, Stations, Trips


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
   
    violation_analysis = (session
                 .query(func.substr(Violations.violation_date,0,5), func.sum(Violations.violations))
                 .filter(func.substr(Violations.violation_date,0,5).in_(["2014","2015","2016","2017"]))
                 .group_by(func.substr(Violations.violation_date,0,5))
                 .all()
                 )

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
        "violation_analysis": violation_analysis,
        "violation_lat": violation_lat,
        "violation_long": violation_long,
        "violation_count": violation_count,
        "violation_date": violation_date,
        "violation_address": violation_address
    }

    return jsonify(data)

# List of trips

@app.route('/trips')
def trips():

        results = (session
                    .query(Trips.count_id, Trips.year, Trips.gender, Trips.user_type, Trips.trip_count))

        year_analysis = (session
                            .query(Trips.year, func.sum(Trips.trip_count)).group_by(Trips.year).all()
                            )

        gender_analysis = (session
                            .query(Trips.gender, func.sum(Trips.trip_count))
                            .filter(Trips.gender.isnot(None))
                            .group_by(Trips.gender)
                            .all()
                            )

        user_type_analysis = (session
                                .query(Trips.year, Trips.user_type, func.sum(Trips.trip_count))
                                .group_by(Trips.year, Trips.user_type)
                                .filter(Trips.user_type.in_(["Subscriber","Customer"]))
                                .all()
                                )


        count_id = []
        year = []
        gender = []
        user_type = []
        trip_count = []


        for row in results:

            count_id.append(row[0])
            year.append(row[1])
            gender.append(row[2])
            user_type.append(row[3])
            trip_count.append(row[4])


        data = {
            "user_type_analysis": user_type_analysis,
            "gender_analysis":gender_analysis,
            "year_analysis":year_analysis,
            "count_id": count_id,
            "year": year,
            "gender": gender,
            "user_type": user_type,
            "trip_count": trip_count
        }

        return jsonify(data)

if __name__ == "__main__":
    app.run(debug=True)
