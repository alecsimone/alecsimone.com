export const endpoint =
   process.env.NODE_ENV === 'development'
      ? `http://localhost:1990`
      : `https://playground.alecsimone.com`;
export const endpointNoHTTP =
   process.env.NODE_ENV === 'development'
      ? `localhost:1990`
      : `playground.alecsimone.com`;
export const home =
   process.env.NODE_ENV === 'development'
      ? 'http://localhost:423'
      : 'https://alecsimone.com';
export const homeNoHTTP =
   process.env.NODE_ENV === 'development' ? 'localhost:423' : 'alecsimone.com';
