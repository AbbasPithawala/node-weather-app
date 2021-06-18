const request = require('request')

const weather_conditions = (cordinates1,cordinates2, callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=74f6c88251c408fddda2507db25c560a&query='+ encodeURIComponent(cordinates1)+','+ encodeURIComponent(cordinates2)
    request({url, json:true}, (error, {body})=>{             //object data has been destructured to = {body}
        if(error){
                    callback("Unable to connect!", undefined)
                }else if(body.error, undefined){
                    callback("Location Not Found!")
                }else{
                const data = body
                callback(undefined, data.current.weather_descriptions + ". It is currently "+ data.current.temperature + " degrees out. It feels like " + data.current.feelslike + " degrees out." )
            }
    })

}

module.exports = weather_conditions
