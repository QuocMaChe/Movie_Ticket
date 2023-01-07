import express from "express";
import homeController from '../Controllers/homeController';
let router = express.Router();
//
const initWebRoute = (app) => { 
    router.get('/', homeController.getHomepage);
    router.get('/movies', homeController.getMoviespage);
    router.get('/Contact_Us', homeController.getContactUspage);
    router.get('/sign_in', homeController.getSignInpage);
    router.post('/ticket-booking', homeController.getTicketBookingpage);
    router.post('/process_sign_in', homeController.processSignIn);
    router.post('/process_sign_up', homeController.processSignUp);
    router.get('/process_sign_out', homeController.processSignOut);
    router.get('/movies_detail/id/:id', homeController.processMoviesDetailpage);
    router.post('/seat_selection', homeController.getSeatSelectionPage);
    router.post('/search', homeController.processSearch);
    router.post('/process_contact', homeController.processContact);
    router.post('/bill', homeController.getBillpage);
    router.post('/paid', homeController.processPay);
    router.get('/history', homeController.getTicketspage);
    return app.use('/', router);
}
//
export default initWebRoute;