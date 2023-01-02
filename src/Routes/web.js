import express from "express";
import homeController from '../Controllers/homeController';
let router = express.Router();
//
const initWebRoute = (app) => { 
    router.get('/', homeController.getHomepage);
    router.get('/movies', homeController.getMoviespage);
    router.get('/Contact_Us', homeController.getContactUspage);
    router.get('/sign_in', homeController.getSignInpage);
    router.get('/ticket-booking', homeController.getTicketBookingpage);
    router.post('/process_sign_in', homeController.processSignIn);
    router.post('/process_sign_up', homeController.processSignUp);
    router.get('/process_sign_out', homeController.processSignOut);
    return app.use('/', router);
}
//
export default initWebRoute;