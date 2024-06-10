import express from "express"


const eventsData = [{
    "id":1 ,
    "imageUrl": "https://images.unsplash.com/photo-1618519764620-7403abdbdfe9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    "title": "Comic Con",
    "price": 35,
    "date": "October 15, 2021",
    "location": "Los Angeles Convention Center",
    "company": "Comic Con International"
},
{
    "id": 2,
    "imageUrl": "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YXJ0JTIwYW5kJTIwZGVzaWduJTIwZmFpcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    "title": "Art and Design Fair",
    "price": 20,
    "date": "November 12, 2021",
    "location": "Navy Pier, Chicago",
    "company": "Art and Design Expo LLC"
}];

const app = express()

app.use(express.json())

//creating the events
app.post("/api/events", (req, res) =>{
    const {body} =req
    const newEvent = {id: eventsData[eventsData.length -1].id +1, ...body}
    eventsData.push(newEvent)

    return res.status(201).send(newEvent)
})


//reading the events
app.get("/api/events", (req, res) =>{
    return res.send(eventsData)
})

//put method

app.get('/api/events/:id', (req, res) => {
    //from the request object destructure the object body and params
    const { params: {id} } =req

    const parsedId = parseInt(id)
    if(isNaN(parsedId))
        return res.sendStatus(400)

    const findEventIndex = eventsData.findIndex((event) =>{
        return event.id === parsedId
    })

    if(findEventIndex === -1)
        return res.sendStatus(404)

    //we want to get data of a specific id
    res.status(200).send(eventsData[findEventIndex])
    
});

app.put("/api/events/:id", (req, res) =>{
    //from the request object destructure the object body and params
    const {body, params: {id}} =req

    const parsedId = parseInt(id)
    if(isNaN(parsedId))
        return res.sendStatus(400)

    const findEventIndex = eventsData.findIndex((event) =>{
        return event.id === parsedId
    });

    if(findEventIndex === -1)
        return res.sendStatus(404)

    // now update the whole data on a particular id without changing the id
    eventsData[findEventIndex] = {id: parsedId, ...body}
    res.sendStatus(200)
});

app.delete('/api/events/:id', (req, res) =>{
    //from the request object destructure the object body and params
    const { params: {id} } =req
    const parsedId = parseInt(id)
    if(isNaN(parsedId))
        return res.sendStatus(404)

    const findEventIndex = eventsData.findIndex((event) =>{
        return event.id === parsedId
    })
    if(findEventIndex === -1)
        return res.sendStatus(404)

    eventsData.splice(findEventIndex, 1)
    res.sendStatus(200)
})

    

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {console.log(`server running at port: ${PORT}`)})