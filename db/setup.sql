DROP DATABASE IF EXISTS reservoir_data;

CREATE DATABASE reservoir_data;

\c reservoir_data;

CREATE TABLE metadata (
    agency_cd varchar(255),
    site_no integer,
    station_nm varchar(255),
    site_tp_cd varchar(255),
    dec_lat_va varchar(255),
    dec_long_va varchar(255),
    coord_acy_cd varchar(255),
    dec_coord_datum_cd varchar(255),
    alt_va varchar(255),
    alt_acy_va varchar(255),
    alt_datum_cd varchar(255),
    huc_cd integer
);

CREATE TABLE daily_data (
    agency_cd varchar(255),
    site_no integer,
    date_time date,
    data_val varchar(255),
    data_type varchar(255)
);