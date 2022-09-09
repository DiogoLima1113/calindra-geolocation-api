import { Router } from 'express';
const routes = Router();

import GeolocationController from './src/controllers/geolocation/GeolocationController';

const geolocationController = new GeolocationController();

routes.get('/geolocation/distancias', geolocationController.obterMatrizDistancias);

export default routes;