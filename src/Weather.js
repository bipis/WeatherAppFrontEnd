import React, {useState} from 'react';

const api = {
    url: "http://localhost:52145/api/weather/getweather/"
}

const Weather = () => {
    const [weatherData, setWeatherData] = useState({});
    const [location, setLocation] = useState("");

    console.log(weatherData);

    const handleInputKeyPress = (event) => {
        if(event.key === "Enter"){
            fetch(`${api.url}/${location}`)
            .then(response => response.json())
            .then(result => {
                setWeatherData(result);
                setLocation("");
            });
        }
    };

    const handleInputChange = (event) => {
        setLocation(event.target.value);
    };

    const dataBuilder = (parDate) => {
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "October", "November", "December"];
        let days = ["Sunday", "Mondey", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
        let day = days[parDate.getDay()];
        let date = parDate.getDate();
        let month = months[parDate.getMonth()];
        let year = parDate.getFullYear();
    
        return `${day} ${date} ${month} ${year}`;
      };

    return (
        <div className="weather-box">
            <input
                className="search-bar"
                placeholder = "Enter town .."
                onChange={handleInputChange}
                value={location}
                onKeyPress={handleInputKeyPress} 
            />
        {(typeof weatherData.TownName != 'undefined') ? (
            (<div className="main-box">
                <div className="location-box">
                    <div className="location">{weatherData.TownName}, {weatherData.Country}</div>
                    <div className="date">{dataBuilder(new Date())}</div>
                </div>
                <hr/>
                <div className="temp-box">
                    <div className="temp">{Math.round(weatherData.Temperature)} C</div>
                    <div className="description">{weatherData.Description}</div>
                </div>
            </div>)
        ) : ('')
        }
        </div>
    )
}

export default Weather;