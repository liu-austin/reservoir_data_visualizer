// jshint esversion:6
import React from 'react';
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';

const MarkedMap = (props) => {
    const defaultPosition = [35, -112];
    return (
        <LeafletMap center={defaultPosition}
        zoom={6}
        maxZoom={10}
        attributionControl={true}
        zoomControl={true}
        doubleClickZoom={true}
        scrollWheelZoom={true}
        dragging={true}
        animate={true}
        easeLinearity={0.35}
        >
            <TileLayer 
            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
            />
            {
                props.locations.length ? 
                (
                    props.locations.map((location ,i) => {
                        let markerLocation = [Number(location.dec_lat_va), Number(location.dec_long_va)];

                        return (
                            <>
                            <Marker onClick={() => {
                                props.selectMarker(location.site_no);
                            }} onMouseOver={e => {e.target.openPopup();}} onMouseOut={e => {e.target.closePopup();}} position={markerLocation}>
                            <Popup >
                                {`Station Name: ${location.station_nm}, Station ID: ${location.site_no}`}
                            </Popup>
                            </Marker>
                            </>
                        )
                    })
                ) 
                : 
                (
                    null
                )
            }
        </LeafletMap>
    );
};

export default MarkedMap;