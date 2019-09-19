const request = require('request')

const weather = (weatherKey, lat, lon, callback) => {
    const weatherUrl = `https://api.darksky.net/forecast/${weatherKey}/${lat},${lon}?units=si`
    request({ url: weatherUrl, json: true }, (err,res) => {
    if (err){callback('Unable to connect to weather service')
    }else if (res.body.error){
        callback('Unable to get forcast')
    }else{
        callback(undefined, {
            temperature: res.body.currently.temperature,
            precipProbability: res.body.currently.precipProbability,
            summery: res.body.daily.data[0].summary,
            tempHigh: res.body.daily.data[0].temperatureHigh,
            tempLow: res.body.daily.data[0].temperatureLow,
        })
    // console.log(res.body.daily.data)
    }
})

}
module.exports = weather