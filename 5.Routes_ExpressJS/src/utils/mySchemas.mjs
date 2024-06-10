const fetchingEventByQueryParams = {
    filter: {
      notEmpty: {
        errorMessage: "field must not be empty",
      },
      isLength: {
        options: { min: 5, max: 12 },
        errorMessage: "field must be between 5 and 12 characters",
      },
      isString: {
        errorMessage: "field must be a string",
      },
    },
    value: {
      notEmpty: {
        errorMessage: "value field must not be empty",
      },
      isLength: {
        options: { min: 5, max: 12 },
        errorMessage: "value field must be between 5 and 12 characters",
      },
      isString: {
        errorMessage: "value field must be a string",
      },
    },
  };
  
  const creatingEventSchema = {
    imageUrl: {
      notEmpty: {
        errorMessage: "imageUrl must not be empty",
      },
     
      isString: {
        errorMessage: "imageUrl must be a string",
      },
    },
    title: {
      notEmpty: {
        errorMessage: "title must not be empty",
      },
      isLength: {
        options: { min: 5 },
        errorMessage: "title must be between 5 and 12 characters",
      },
      isString: {
        errorMessage: "title must be a string",
      },
    },
    price: {
      notEmpty: {
        errorMessage: "price must not be empty",
      },
      isNumeric: {
        errorMessage: "price must be a number",
      },
    },
    date: {
      notEmpty: {
        errorMessage: "date must not be empty",
      },
      isString: {
        errorMessage: "date must be a string",
      },
    },
    location: {
      notEmpty: {
        errorMessage: "location must not be empty",
      },
      isLength: {
        options: { min: 5 },
        errorMessage: "location must be between 5 and 12 characters",
      },
      isString: {
        errorMessage: "location must be a string",
      },
    },
    company: {
      notEmpty: {
        errorMessage: "company must not be empty",
      },
      isLength: {
        options: { min: 5 },
        errorMessage: "company must be between 5 and 12 characters",
      },
      isString: {
        errorMessage: "company must be a string",
      },
    },
  };
  
  export { fetchingEventByQueryParams, creatingEventSchema };
  
  