# Excess Death Data -----------------------------------

# Install and Load packages ------------------------------

library(tidyverse)
library(dplyr)
library(ggplot2)
library(lubridate)
library(haven)
library(readxl)
library(questionr)

# Set your folder here ------

setwd("C:/Users/Master/OneDrive/Master in Public Administration in International Development/DPI 691")


# Oxford Stringency Data ------

oxford <-read.csv("https://raw.githubusercontent.com/OxCGRT/USA-covid-policy/master/data/OxCGRT_US_latest.csv")

oxford_s <- oxford [ -c(1:2, 4:5, 7:59,61:69)]

oxford_s <- oxford_s %>%
    filter(oxford_s$Date >= 20200311) 

oxford_s <- oxford_s %>%
  filter(oxford_s$Date <= 20201231)

oxford_s <- oxford_s %>%
  filter(oxford_s$RegionName != "")

oxford_s <- oxford_s %>%
  group_by(RegionName) %>%
  mutate(Stringency = mean(StringencyIndex, na.rm = TRUE))

oxford_s <- oxford_s [ -c(2:3)]

oxford_s <- oxford_s [!duplicated(oxford_s$RegionName), ]

oxford_s$RegionName <- as.character(oxford_s$RegionName)
oxford_s$RegionName[oxford_s$RegionName == "Washington DC"] <-"District of Columbia"

oxford_s <- rename.variable(oxford_s, "RegionName", "state")

write.csv(oxford_s,"oxford.csv", row.names = F)

# The Economist Excess Death Data ------

excess <-read.csv("https://raw.githubusercontent.com/TheEconomist/covid-19-excess-deaths-tracker/master/output-data/excess-deaths/united_states_excess_deaths.csv")

excess_s <- excess [ -c(1, 3:6, 8, 13:14, 16)]

excess_s <- excess_s %>%
  filter(excess_s$week >= 11)

excess_s <- excess_s %>%
  filter(excess_s$region != "New York City")

excess_s_wa <- excess_s %>%
  group_by(region) %>%
  mutate(excess_deaths_per_100k_wa = mean(excess_deaths_per_100k, na.rm = TRUE)) %>%
  mutate(total_deaths_wa = mean(total_deaths, na.rm = TRUE)) %>%
  mutate(covid_deaths_wa = mean(covid_deaths, na.rm = TRUE)) %>%
  mutate(expected_deaths_wa = mean(expected_deaths, na.rm = TRUE)) %>%
  mutate(excess_deaths_wa = mean(excess_deaths, na.rm = TRUE))

excess_s_wa <- excess_s_wa [ -c(2:7)]

excess_s_wa <- excess_s_wa[!duplicated(excess_s_wa$region), ]

excess_s_wa <- excess_s_wa[order(-excess_s_wa$excess_deaths_per_100k_wa),]

excess_s_wa <- rename.variable(excess_s_wa, "region", "state")

top <- excess_s_wa [ -c(3:6)]

bottom <- top[43:52,]

top <- top[1:10,]

write.csv(bottom,"bottom.csv", row.names = FALSE)

write.csv(top,"top.csv", row.names = FALSE)

write.csv(excess_s_wa,"excess_wa.csv", row.names = FALSE)

# Retrieve Google Mobility  Data ------

mobility <-read.csv("2020_US_Region_Mobility_Report.csv", fill=TRUE)

mobility <-mobility [ -c(1:2, 4:7, 10:11, 14)]

mobility <- mobility %>%
  filter(mobility$sub_region_1 != "")

mobility$date  %>% as.Date(mobility$date)

mobility <- mobility%>%
  filter(mobility$date >= "2020-03-11") 

mobility <- mobility%>%
  filter(mobility$date <= "2020-12-31") 

mobility$mob <- (mobility$transit_stations_percent_change_from_baseline + mobility$workplaces_percent_change_from_baseline + mobility$retail_and_recreation_percent_change_from_baseline)/3

mobility <- mobility [ -c(3:5)]

mobility <- mobility %>%
  group_by(sub_region_1) %>%
  mutate(Mobility_a = mean(mob, na.rm = TRUE))

mobility <- mobility [ -c(2:3)]

mobility <- mobility [!duplicated(mobility <- mobility$sub_region_1), ]

mobility <- rename.variable(mobility, "sub_region_1", "state")

# Retrieve GDP  Data ------

gdp <-read.csv("gdp.csv", fill=TRUE)

# Retrieve Density  Data ------

density <-read.csv("density.csv", fill=TRUE)

density <- read_excel("density 2.xlsx")

write.csv(density,"density.csv", row.names = FALSE)

# Merging data frames ------

total <- merge(excess_s_wa, oxford_s, by=c("state"))

total <- merge(total, mobility, by=c("state"))

total <- merge(total, density, by=c("state"))

total <- merge(total, gdp, by=c("state"))

total <- total[order(-total$excess_deaths_per_100k_wa),]

write.csv(total,"total.csv", row.names = FALSE)
