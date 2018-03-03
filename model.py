'''
Module containing the database set-up
'''

# Import dependencies
import os
from sqlalchemy import create_engine, Column, Integer, String, func
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import Session

# Base definition
Base = declarative_base()

# Create engine

# dbpath = os.path.join('db', 'pets.sqlite')
# engine = create_engine(f'sqlite:///{dbpath}')


# # Pet class
# class Pet(Base):
#     __tablename__ = 'pets'
#     id = Column(Integer, primary_key=True)
#     name = Column(String(64))
#     pet_type = Column(String(64))
#     age = Column(Integer)

# Base.metadata.create_all(engine)

# # Create session
# session = Session(engine)


# if __name__ == '__main__':
#     # Drop table
#     Base.metadata.drop_all(engine)

#     # Create all tables
#     Base.metadata.create_all(engine)

#     # Add data to database
#     session.add_all([
#         Pet(name='Justin Timbersnake', age=3, pet_type='Snake'),
#         Pet(name='Pawtrick Stewart', age=7, pet_type='Dog'),
#         Pet(name='Farrah Pawcett', age=2, pet_type='Dog'),
#         Pet(name='Isaac Mewton', age=5, pet_type='Cat'),
#         Pet(name='Winston Purrchill', age=8, pet_type='Cat'),
#         Pet(name='Reese Whiskerspoon', age=3, pet_type='Cat'),
#         Pet(name='Dog Marley', age=10, pet_type='Dog'),
#     ])
#     session.commit()
