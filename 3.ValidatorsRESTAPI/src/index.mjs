import express from "express";
import { query, validationResult, matchedData , body} from "express-validator";

const eventsData = [
  {
    id: 1,
    imageUrl:
      "https://images.unsplash.com/photo-1618519764620-7403abdbdfe9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    title: "Comic Con",
    price: 35,
    date: "October 15, 2021",
    location: "Los Angeles Convention Center",
    company: "Comic Con International",
  },
  {
    id: 2,
    imageUrl:
      "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YXJ0JTIwYW5kJTIwZGVzaWduJTIwZmFpcnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    title: "Art and Design Fair",
    price: 20,
    date: "November 12, 2021",
    location: "Navy Pier, Chicago",
    company: "Art and Design Expo LLC",
  },
];

const mysimpleMiddleware = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

const resolveEventIndexMiddleware = (req, res, next) => {
  const { id } = req.params;
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return res.sendStatus(404);

  const findEventIndex = eventsData.findIndex((event) => {
    return event.id === parsedId;
  });

  if (findEventIndex === -1) return res.sendStatus(404);

  // Bind findEventIndex to the request object
  req.findEventIndex = findEventIndex;
  next();
};

const app = express();

app.use(express.json());
app.use(mysimpleMiddleware);

// Creating the events
app.post("/api/events", 
  [
    body("title")
            .notEmpty().withMessage("Title cannot be empty")
            .isLength({min: 5, max:14}).withMessage("The title must be between 5 and 12 characters")
            .isString().withMessage("Title must be string")
            .trim()
            ,
            body("imageUrl").notEmpty().withMessage("image url cannot be empty")
            ,
            body("price")
            .notEmpty().withMessage("price cannot be empty")
            .isNumeric().withMessage("the price must be a numeric value")


  ],
  (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty())
      return res.status(400).json({errors: errors.array})

  const data = matchedData(req)  
  const { body } = req;
  const newEvent = { id: eventsData[eventsData.length - 1].id + 1, ...body };
  eventsData.push(newEvent);

  return res.status(201).send(newEvent);
});

// Reading the events
app.get("/api/events", (req, res) => {
  return res.send(eventsData);
});

// Reading a single event
app.get("/api/events/:id", resolveEventIndexMiddleware, (req, res) => {
  const { findEventIndex } = req;
  res.status(200).send(eventsData[findEventIndex]);
});

// Updating an event
app.put("/api/events/:id", resolveEventIndexMiddleware, (req, res) => {
  const { body, findEventIndex } = req;
  const id = parseInt(req.params.id);

  eventsData[findEventIndex] = { id, ...body };
  res.sendStatus(200);
});

// Deleting an event
app.delete("/api/events/:id", resolveEventIndexMiddleware, (req, res) => {
  const { findEventIndex } = req;
  eventsData.splice(findEventIndex, 1);
  res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server running at port: ${PORT}`);
});
