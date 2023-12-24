const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const path = require('path')
const express = require('express')
const app = express()
const hbs = require('hbs')



const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'templates')
const partialPath = path.join(__dirname,'templates/partials')


app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPath)

app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'weather',
        name:'auqid'
        
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:'auqid'
        
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name:'auqid'
        
    })
})


app.get('/weather',(req,res)=>{
    if (!req.query.address){
        return res.send({
            error:'Please provide an Address'
        })
    }

    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast : forecastData,
                address: req.query.address,
                location
                

            }
                
            )
        })
        
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        errorMessage: 'help article not found',
        name:'auqid'
        
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        errorMessage: 'help article not found',
        name:'auqid'
        
    })
})

app.listen(3000,()=>{
    console.log('App is up and running on Port 3000')
})