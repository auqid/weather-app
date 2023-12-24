const request = require('request')





const forecast =(lat,lon,callback)=>{
    const url = `http://api.weatherstack.com/current?access_key=5e3734f9ab3ef5d806f72b9b2dc34d84&query=${lat},${lon}`
    request({url,json:true}, (error,{body})=>{
        if(error){
            callback(error,undefined)
        }else if(body.error){
            callback(body.error,undefined)
        }else{
            callback( undefined, `Temperature is ${body.current.temperature} Degrees and it feels like ${body.current.feelslike}, it is ${body.current.weather_descriptions[0]}. `)

            }
        })
}

module.exports= forecast


