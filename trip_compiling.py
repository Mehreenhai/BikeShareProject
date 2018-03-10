import csv
import urllib2
import pandas as pd
from datetime import datetime, timedelta

url_test =  "https://media.githubusercontent.com/media/Mehreenhai/BikeShareProject/master/Trips/Divvy_Trips_2014-Q3-07.csv"

files2 = ["Divvy_Trips_2014-Q3-07.csv", "Divvy_Trips_2014-Q3-0809.csv", "Divvy_Trips_2014-Q4.csv", "Divvy_Trips_2014_Q1Q2.csv",
         "Divvy_Trips_2015-Q1.csv", "Divvy_Trips_2015-Q2.csv", "Divvy_Trips_2015_07.csv","Divvy_Trips_2015_08.csv",
         "Divvy_Trips_2015_09.csv", "Divvy_Trips_2015_Q4.csv","Divvy_Trips_2016_04.csv", "Divvy_Trips_2016_05.csv", 
         "Divvy_Trips_2016_06.csv","Divvy_Trips_2016_Q1.csv", "Divvy_Trips_2016_Q3.csv", "Divvy_Trips_2016_Q4.csv",
         "Divvy_Trips_2017_Q3.csv", "Divvy_Trips_2017_Q4.csv"]
files = ["Divvy_Trips_2014-Q3-07.csv"]         
trip_id = []
start_time = []
user_type = []
gender = []
year = []

rides_df = pd.DataFrame()
for file in files2:
    url = "https://media.githubusercontent.com/media/Mehreenhai/BikeShareProject/master/Trips/"+file
    print(file)
    response = urllib2.urlopen(url)
    cr = csv.reader(response)


    for row in cr:
        if row[0] not in "trip_id":
            try:
                trip_id.append(row[0])
                year.append(pd.to_datetime(row[1]).strftime("%Y-%m-%d")[:4])
                user_type.append(row[9])
                gender.append(row[10])
            except:
                print("Error")
# print(len(trip_id))
# print(len(start_time))
# print(len(user_type))
# print(len(gender))

rides_df["trip_id"] = trip_id
rides_df["year"] = year
rides_df["user_type"] = user_type
rides_df["gender"] = gender

print(rides_df.head())

# rides_df.to_csv("all_trips.csv")

trips_count_df = rides_df.groupby(["year", "gender", "user_type"])
trips_count_df = trips_count_df["trip_id"].count()
trips_count_df.to_csv("trips_count.csv")

