import { eventsData}  from '../utils/database/eventsData.mjs';

// Get all events
export const getAllEvents = (req, res) => {
    res.status(200).json({
        status: 'success',
        data: { events: eventsData }
    });
};

// Create a new event
export const createEvent = (req, res) => {
    const { body } = req;
    const newEvent = { id: eventsData[eventsData.length - 1].id + 1, ...body };
    eventsData.push(newEvent);
  
    return res.status(201).json({
        status: 'success',
        data: { event: newEvent }
    });
};

// Get a single event by ID
export const getEventById = (req, res) => {
    const { id } = req.params;
    const parsedId = parseInt(id, 10);
    const event = eventsData.find(eventObj => eventObj.id === parsedId);

    if (!event) {
        return res.status(404).json({
            status: 'fail',
            message: 'Event not found'
        });
    }
    
    res.status(200).json({
        status: 'success',
        data: { event }
    });
};

// Delete an event
export const deleteEvent = (req, res) => {
    const { id } = req.params;
    const parsedId = parseInt(id, 10);
    const findEventIndex = eventsData.findIndex(eventObj => eventObj.id === parsedId);

    if (findEventIndex === -1) {
        return res.status(404).json({
            status: 'fail',
            message: 'Event not found'
        });
    }

    eventsData.splice(findEventIndex, 1);

    res.status(204).json({
        status: 'success',
        data: null,
        message: 'Event deleted successfully',
    });
};
