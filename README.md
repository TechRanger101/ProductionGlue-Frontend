# Bytbil Car WebSite Scraper

Install requirements : 

    - "pip install -r requirements.txt"  ( in case using Mac or Linux, "pip3 install -r requirements.txt")

Pocketbase integration: 

    1- '"db/pocketbase" serve' to launch the database server 
    
    2- access http://127.0.0.1:8090/_/ and register by adding user and pass 
    
    3- add these user and passwd into the utils/pipelines.py file (lines 26,27)

Run the project :
    
    - "python main.py makes_models" for extracting makes and models only
    
    - "python main.py cars" for extracting all cars informations 
