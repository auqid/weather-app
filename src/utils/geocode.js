const request = require('request')


const geocode = (address,callback)=>{
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(address)}&limit=1&appid=4fe51acd6cf9fd2c487d03973cf669d6`
    request ({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to Connect',undefined)
        } else if (body.cod ===400){
            callback(body.error.message)
        } else {
            
            callback(undefined,{
                latitude : body[0].lat,
                longtitude: body[0].lon,
                location: body[0].state
            })
        }
    })
}

module.exports = geocode

