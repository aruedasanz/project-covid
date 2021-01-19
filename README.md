# project
Template repository for final project
https://aruedasanz.github.io/project-covid/


The charts included in the site were generated from various datasets. Those datasets were transformed in the file excess.R stored in the code-and-data folder. The code retrieves excess death data from The Economist’s Github repository and Oxford Stringency Index data from Oxford COVID-19 Government Response Tracker Github repository, filters both dataset and calculates averages the year for each state in the US.  The code also retrieves other csv files which are on the folder, 2020_US_Region_Mobility_Report.csv which is Google Mobility data for US states in 2020, gdp.csv which is the GDP by state as of 2019 as reported by the Bureau of Economic Analysis, density.csv which reports the density by square mile for each state as reported by the U.S. Census Bureau in 2014, race.csv which contains the % of non-hispanic white population of each state as reported by the U.S. Census Bureau and party.csv, which contains the political party of each state governor at the beginning of the pandemic. The code finally appends all of these data frames and writes total.csv which contains all the variables which were analyzed.

Link to The Economist’s data: https://raw.githubusercontent.com/TheEconomist/covid-19-excess-deaths-tracker/master/output-data/excess-deaths/united_states_excess_deaths.csv

Link to Oxfod Data: https://raw.githubusercontent.com/OxCGRT/USA-covid-policy/master/data/OxCGRT_US_latest.csv

