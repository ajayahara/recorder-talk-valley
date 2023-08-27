# Navigator Object
    1.online:-returns a boolean.It helps us to know if the user is online or not.
    2.geolocation:-
        const {geolocation} = navigator
        const geolocationSuccess = (pos) => {
        const location=pos.coords;
        console.log("Your latitude is",location.latitude,"and Longitude is",location.longitude);
        }
        const geolocationError = (err) => {
            console.log("Error in finding your location", err)
        }
        const geolocationOption = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
        }
        geolocation.getCurrentPosition(geolocationSuccess, geolocationError, geolocationOption)
