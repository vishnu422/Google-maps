import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery, setSearchResults } from '../actions/mapActions';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Grid, Typography } from '@mui/material'

const AutocompleteComponent = () => {

    const [selectedLocation, setSelectedLocation] = useState(null);
    const [map, setMap] = useState(null);
    const dispatch = useDispatch();
    const searchQuery = useSelector(state => state.mapReducer.searchQuery);
    const searchResults = useSelector(state => state.mapReducer.searchResults);

    const handleQueryChange = (event, newValue) => {
        dispatch(setSearchQuery(event.target.value));
    };

    const handlePlaceSelect = (place) => {
        console.log("handlePlaceSelect", place)
        setSelectedLocation(place);
        if (map && place && place.geometry && place.geometry.location) {
            map.setCenter(place.geometry.location);
            new window.google.maps.Marker({
                position: place.geometry.location,
                map,
                title: place.name,
            });
        }
    };

    useEffect(() => {
        if (map === null) {
            setMap(new window.google.maps.Map(document.getElementById('map'), {
                center: { lat: 0, lng: 0 },
                zoom: 5,
            }));
        }
    }, [map]);



    useEffect(() => {
        const autocomplete = new window.google.maps.places.AutocompleteService();
        if (searchQuery) {
            const request = {
                input: searchQuery,
                types: ['geocode']
            };
            autocomplete.getPlacePredictions(
                request,
                (predictions, status) => {
                    if (status === 'OK') {
                        dispatch(setSearchResults(predictions));
                    }
                }
            );
        }
    }, [searchQuery]);

    return (
        <React.Fragment>
            <Grid
                textAlign="center"
                style={{marginBottom: '2rem'}}
            >
                <Typography variant='h4'>
                    Google Map Auto Search
                </Typography>
            </Grid>
            <Autocomplete
                options={searchResults}
                getOptionLabel={option => option.description}
                onChange={(_, value) => handlePlaceSelect(value)}
                renderInput={params => (
                    <TextField
                        {...params}
                        onChange={(event) => {
                            handleQueryChange(event)
                        }}
                        label="Search Location"
                        variant="outlined"
                        fullWidth
                    />
                )}
            />
            <div id="map" style={{ height: '400px', width: '100%', margin: '10px 0' }}></div>
        </React.Fragment>

    );
};

export default AutocompleteComponent;
