import express from "express";
import {
  query,
  checkSchema,
  validationResult,
  matchedData,
} from "express-validator";
import {
  fetchingEventByQueryParams,
  creatingEventSchema,
} from "./mySchemas.mjs";

const app = express();
app.use(express.json());

const events = [
  {
    id: 1,
    imageUrl:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    title: "Summer Music Festival",
    price: 50,
    date: "March 20, 2021",
    location: "Uhuru national Park",
    company: "Pwani resort.",
  },
];

const fetchEventByIdMiddleware = (req, res, next) => {
  const {
    body,
    params: { id },
  } = req;

  const parsedId = parseInt(id);
  console.log(typeof parsedId);
  console.log(isNaN(parsedId));

  if (isNaN(parsedId)) {
    return res.sendStatus(400);
  }

  const eventIndex = events.findIndex((event) => {
    return event.id === parsedId;
  });

  console.log(events[eventIndex]);
  if (eventIndex === -1) {
    return res.sendStatus(404);
  }

  req.eventIndex = eventIndex;

  next();
};

app.get("/api/events", checkSchema(fetchingEventByQueryParams), (req, res) => {
  const { filter, value } = matchedData(req);
  if (!filter && !value) {
    return res.send(events);
  }

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  if (filter && value) {
    return res.send(events.filter((user) => user[filter].includes(value)));
  }
});

// get event by an id
app.get("/api/events/:id", fetchEventByIdMiddleware, (req, res) => {
  const errors = validationResult(req);
  // validator errors
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { eventIndex } = req;

  res.send(events[eventIndex]);
});

// creating an event
app.post("/api/events", checkSchema(creatingEventSchema), (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const data = matchedData(req);
  const new_event = { id: events.length + 1, ...data };
  events.push(new_event);
  res.sendStatus(200);
});

// updating an event
app.put(
  "/api/events/:id",
  fetchEventByIdMiddleware,
  checkSchema(creatingEventSchema),
  (req, res) => {
    const errors = validationResult(req);
    // validatet errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      eventIndex,
      params: { id },
    } = req;
    const parsedId = parseInt(id);
    const data = matchedData(req);

    events[eventIndex] = { id: parsedId, ...data };
    res.sendStatus(200);
  }
);

// deleting the event
app.delete("/api/events/:id", fetchEventByIdMiddleware, (req, res) => {
  const { eventIndex } = req;

  events.splice(eventIndex, 1);
  res.sendStatus(200);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server is running on port: ${port}`);
});