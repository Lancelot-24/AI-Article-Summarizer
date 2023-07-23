import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";

const axios = require("axios");

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
    try {
        const response = process.env.RAPID_API_KEY
        console.log(response);
        return {
          statusCode: 200,
          body: JSON.stringify({ key: response }),
        };
      } catch (err) {
        console.log(err);
        return {
          statusCode: 404,
          body: err.toString(),
        };
      }
};

export { handler };