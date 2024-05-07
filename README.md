I- installing project requirements : 
    1- if you're using windows you just double click on install_requirements.bat to install the requirements
    2- in case you're using other Operation system : 
        - open a shell or terminal on the project root path : then type "pip install -r requirements.txt" 
        ( in case you're using mac it's you possibly need to type pip3 install -r requirements.txt instead)

II- you can add your socks5 proxies into the proxies.txt file as a new line 

III- running the project :
    - on root path of the project type : "python main.py makes_models" for extracting makes and models only
    - or "python main.py cars" for extracting all cars informations 


IV- pocketbase integration: 
    1- add pocketbase.exe file into db folder 
    2- in the root path of the project type : '"db/pocketbase" serve' to launch the database server 
    3- through your browser access http://127.0.0.1:8090/_/ and register by adding user and pass 
    4- add these user and passwd into the utils/pipelines.py file (lines 26,27)
    5- run the project in the same old manner 