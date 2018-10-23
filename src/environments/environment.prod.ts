import * as process from 'process'

export const environment = {
  production: true,
  google_maps_key: process.env.GOOGLE_MAPS_KEY,
  PG_USER: process.env.PG_USER,
  PG_PASSWORD: process.env.PG_PASSWORD, 
  PG_DATABASE: process.env.PG_DATABASE
};
