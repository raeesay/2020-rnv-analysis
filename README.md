# RNV Frontend

This project visualises delay data from the RNV GmbH on a webpage. The data was acquired and made accessible in [previous student projects](https://git-dbs.ifi.uni-heidelberg.de/practicals/2020_rnv_analysis/-/tree/master/).

## Installation and Requirements

General requirement are a stable internet connection, Python v3.7 or higher and Python modules that can be installed with

`pip install uvicorn elasticsearch fastapi`
	
In order to run the website locally the backend must be cloned. Furthermore credentials need to be specified, in particular to access the Elasticsearch index `delay_data` therefore they must be saved in [evaluation](https://git-dbs.ifi.uni-heidelberg.de/practicals/2021-rnv-frontend/-/tree/master/backend/rnv_analysis/evaluation) as `config.json` (see the [template](https://git-dbs.ifi.uni-heidelberg.de/practicals/2021-rnv-frontend/-/blob/master/backend/rnv_analysis/evaluation/config_template.json)):

    es_username = "$ELASTICSEARCH_USERNAME"
    es_secret = "$USER_SECRET"
    es_delay_index = "$ELASTICSEARCH_INDEX"
    es_host = "$ELASTICSEARCH_HOST"
    es_scheme = "https"
	
For more information, please observe the instructions of the [previous project](https://git-dbs.ifi.uni-heidelberg.de/practicals/2020_rnv_analysis/-/tree/master/)

## Usage

Once the requirements are fulfilled, simply start the Uvicorn server in the terminal
	
`python3 -m uvicorn --app-dir=rnv_analysis/evaluation fastAPI_getters:app`

and open the webpage `rnv-delays.html` in your browser.
The user can specify a linegroup and a time frame with the searchbars. Upon submission, plots will be generated showing
* the average delays for each station
* the average delays per hour

upon arrival and departure for the selected linegroup (total of four charts)
There is also a rudimentary interactive map based on OpenStreetMap that is focused on the Heidelberg Bismarckplatz area and a table that shows the user's submission.
To ensure results, please specify the time frame within the year of 2020, as there is missing information from previous years.
