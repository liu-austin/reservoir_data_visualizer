# Reservoir Data Visualizer

## Install Dependencies
`npm i` 
## Set Up & Seed Database
Note: This will require PostgreSQL shell, psql, installed on your system. If you cannot get psql onto your machine, use your own PostgreSQL editor to run the following file:
`./db/setup.sql`\
Otherwise, if you have psql, run: \
`npm run setup`
## Start Application
To start the application, run: \
`npm start`\
Open up `localhost:3000`

## Weird Finding
From the Assessment Prompt, if you choose site_no values from sites in the first two metadata links,
those site_no values do not correspond to any site_no value in the daily data collection links provided. In fact, there is no daily data for sites outside of New Mexico, even though such sites are provided in the metadata. \
Also, the daily data from those links those not contain values for dates from 2018, 2019.