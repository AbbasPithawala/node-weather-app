const request = require('request')

const geocode = (address, callback) => {
    url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYWJiYXNyajgiLCJhIjoiY2twd3RlcjEwMWdpcjJ1bm95a3kwbjg2OSJ9.L6AzRK-1A0csq75ET1N_NQ&limit=1'
    request({url, json: true},(error, {body})=>{    //object data has been destructured to = {body}
        if(error){
            callback("Unable to connect..!", undefined)
        }else if(body.features.length===0){
            callback("Unable to  find location. Please try another!", undefined)
        }else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode