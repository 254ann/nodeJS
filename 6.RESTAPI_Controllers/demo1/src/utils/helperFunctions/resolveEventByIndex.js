import { eventData } from "../database/eventData";
export const resolveEventByIndex = (req, res, next) => {
    const {
      body,
      params: { id },
    } = req;
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) return res.sendStatus(400);
  
    const findEventIndex = eventData.findIndex((event) => {
      return event.id === parsedId;
    });
    if (findEventIndex === -1) {
      return res.send(404).json({
        status: 'failed',
        message: 'event not found'
      })
    }
    //lets bind the findEventIndex to the req obj
    req.findEventIndex = findEventIndex;
    next();
  };