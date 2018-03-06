# Import dependencies
from flask import Flask, render_template, jsonify, request, redirect
import model


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

# List of trips

@app.route('/trips')
def trips():


# List of speeding incidents
@app.route('/speed_incidents')
def speed_incidents():



if __name__ == "__main__":
    app.run(debug=True)
