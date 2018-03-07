# Import dependencies
import warnings
warnings.filterwarnings('ignore')

import os
import pandas as pd
import numpy as np
from sqlalchemy import create_engine, Column, Integer, String, Float
from sqlalchemy.ext.declarative import declarative_base
Base = declarative_base()

from sqlalchemy.orm import Session
import datetime as dt

violation_file = os.path.join('Speed_Camera_Violations.csv')
station_file = os.path.join('Stations', 'Divvy_Stations_2017_Q3Q4.csv')

# Read witih Pandas
violations_df = pd.read_csv(violation_file)
stations_df = pd.read_csv(station_file)

del stations_df['Unnamed: 7']   

stations_df['online_date'] = pd.to_datetime(stations_df['online_date'])
stations_df['online_date'] = stations_df['online_date'].dt.date
stations_df.rename(index=str, columns={"id": "station_id", "name":"station_name", "dpcapacity":"capacity"},inplace=True)

violations_df['violation_id'] = violations_df.index
violations_df['VIOLATION DATE'] = pd.to_datetime(violations_df['VIOLATION DATE'])
violations_df['VIOLATION DATE'] = violations_df['VIOLATION DATE'].dt.date
violations_df.rename(index=str, columns={"CAMERA ID": "camera_id", "VIOLATION DATE":"violation_date", "X COORDINATE":"x_coordinate", "Y COORDINATE":"y_coordinate"},inplace=True)

# Define a Base class for Station
class Stations(Base):
    __tablename__ = "stations"
    
    station_id = Column(Integer, primary_key=True)
    station_name = Column(String)
    city = Column(String)
    latitude = Column(Float)
    longitude = Column(Float)
    capacity = Column(Integer)
    online_date = Column(String)

# Define a Base class for Violations
class Violations(Base):
    __tablename__ = "violations"
    
    address = Column(String)
    camera_id = Column(String)
    violation_date = Column(String)
    violations = Column(Float)
    x_coordinate = Column(Float)
    y_coordinate = Column(Float)
    latitude = Column(Float)
    longitude = Column(Float)
    location = Column(String)
    violation_id = Column(Integer, primary_key=True)

# Create database engine
engine = create_engine("sqlite:///bikeshare_traffic.sqlite")

# Create tables in the database
Base.metadata.create_all(engine)

session = Session(bind=engine)

# Write data stored in a DataFrame to a SQL database
violations_df.to_sql(name='violations', con=engine, if_exists = 'replace', index=False)
stations_df.to_sql(name='stations', con=engine, if_exists = 'replace', index=False)
session.commit()

# Query the Stations table
station_list = session.query(Stations)
for station in station_list:
    print(station.station_id, station.station_name, station.city, station.latitude, station.longitude, station.capacity, station.online_date)

# Query the Stations table
violation_list = session.query(Violations)
for violation in violation_list:
    print(violation.address , violation.camera_id ,violation.violation_date ,violation.violations,
          violation.x_coordinate ,violation.y_coordinate ,violation.latitude ,violation.longitude,
          violation.location ,violation.violation_id )
    
if __name__ == '__main__':

    Base.metadata.drop_all(engine)

    # Create all tables
    Base.metadata.create_all(engine)