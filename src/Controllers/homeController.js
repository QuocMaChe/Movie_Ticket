import pool from "../configs/connectDB";
import multer from 'multer';
import session from "express-session";
import { response } from "express";
//User============================================================================================================================================================================================
let getHomepage = async (req, res) => {
    try{
        let data_movies=[];
        await pool.connect();
        let movies= await pool.request().query(`select * from PHIM`);
        data_movies=movies.recordset;
        
        return res.render('index.ejs',{
            dataUser: req.session.user,
            dataMovies: data_movies
        });
    }
    catch(err){
        console.log('check lỗi');
        return res.redirect('/');
    }
}
let getMoviespage = async (req, res) => {
    try{
        let data_movies=[];
        await pool.connect();
        let movies= await pool.request().query(`select * from PHIM `);
        data_movies=movies.recordset;
        return res.render('movies.ejs',{
            dataUser: req.session.user,
            dataMovies: data_movies
        });
    }
    catch(err){
        return res.redirect('/');
    }
}

let processMoviesDetailpage = async (req, res) => {
    try{
        let data_movie=[];
        let id=req.params.id
        await pool.connect();
        let movie= await pool.request().query(`select * from PHIM where ID='${id}'`);
        data_movie=movie.recordset;
        return res.render('movies_detail.ejs',{
            dataUser: req.session.user,
            dataMovie: data_movie
        });
    }
    catch(err){
        return res.redirect('/');
    }
}

let getContactUspage = async (req, res) => {
    try{
        
        await pool.connect();
        
        return res.render('Contact_Us.ejs',{
            dataUser: req.session.user
            
        });
    }
    catch(err){
        return res.redirect('/');
    }
}
let getSignInpage = async (req, res) => {
    return res.render('sign_in.ejs');
}
 
let getTicketBookingpage = async (req, res) => {
    try{
        let id=req.body.id;
        let days=[];
        let date=[];
        const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        for(let i=0;i<7;i++){
            const currentDay = new Date();
            currentDay.setDate(currentDay.getDate() + i); // even 32 is acceptable
            date.push(weekday[currentDay.getDay()]);
            days.push(`${currentDay.getDate()}`);
        }
        let hours=["7:00 AM","9:05 AM","10:00 AM","1:05 PM","3:00 PM","4:00 PM","9:00 PM","10:05 PM","11:00 PM"];
        
        if(!req.session.user){
            return res.redirect('/sign_in');
        }
       
        return res.render('ticket-booking.ejs',{
            dataUser: req.session.user,
            dataWeek: days,
            dataWeekday:date,
            dataHours: hours,
            idPhim: id
        });
    }
    catch(err){
        return res.redirect('/');
    }
}
let processSignIn = async (req, res) => {
    try{
        let email = req.body.email;
        let password = req.body.password;
        let data_user=[];
        await pool.connect();
        let user= await pool.request().query(`select * from KHACHHANG where EMAIL='${email}' and PWD ='${password}'`);
        data_user=user.recordset;
        if(data_user.length==1){
            req.session.user=data_user;
            return res.redirect('/');
        }else{
            return res.render('/sign_in');
        }
    }
    catch(err){
        return res.render('sign_in.ejs');
    }
}
let processSignOut = async (req, res) => {
    req.session.destroy((err) => {
        return res.redirect('/');
    });
}
let processSignUp = async (req, res) => {
    try{
        let name = req.body.name;
        let email = req.body.email;
        let password = req.body.password;
        await pool.connect();
        await pool.request().query(`insert into KHACHHANG(TEN,EMAIL,PWD) values (N'${name}','${email}','${password}')`);
        return res.redirect('/sign_in');
    }
    catch(err){
        return res.render('/sign_in');
    }
}
let processSearch = async (req, res) => {
    try{
        let search = req.body.search;
        let data_movies=[]
        await pool.connect();
        let movies = await pool.request().query(`SELECT * FROM PHIM WHERE TEN LIKE '%${search}%'`);
        data_movies=movies.recordset;
        return res.render('search_movie.ejs',{
            dataMovies: data_movies,
            dataUser: req.session.user
        });
    }
    catch(err){
        return res.redirect('/sign_in');
    }
}
let processContact = async (req, res) => {
    try{
        let firstname = req.body.fname;
        let lastname = req.body.lname;
        let mail = req.body.email;
        let sdt = req.body.num;
        let message = req.body.msg;
        await pool.connect();
        await pool.request().query(`insert into PHANHOI values(N'${firstname}',N'${lastname}','${mail}','${sdt}','${message}')`);
        return res.redirect('/Contact_Us');
    }
    catch(err){
        return res.render('/Contact_Us');
    }
}
//
let getSeatSelectionPage = async (req, res) => {
    try{
        if(!req.session.user){
            return res.redirect('/sign_in');
        }
        let id=req.body.id;
        let day=req.body.startDate;
        let time=req.body.startTime;
        await pool.connect();

        let seatA=[];
        let listA = await pool.request().query(`SELECT * FROM GHE WHERE COL='A'`);
        seatA=listA.recordset;

        let seatB=[];
        let listB = await pool.request().query(`SELECT * FROM GHE WHERE COL='B'`);
        seatB=listB.recordset;

        let seatC=[];
        let listC = await pool.request().query(`SELECT * FROM GHE WHERE COL='C'`);
        seatC=listC.recordset;

        let seatD=[];
        let listD = await pool.request().query(`SELECT * FROM GHE WHERE COL='D'`);
        seatD=listD.recordset;

        let seatE=[];
        let listE = await pool.request().query(`SELECT * FROM GHE WHERE COL='E'`);
        seatE=listE.recordset;

        let dataSeated=[];
        let seated = await pool.request().query(`SELECT ID_GHE FROM VE WHERE ID_PHIM='${id}' and NGAY='${day}' and GIO='${time}'`);
        for(let i=0; i<seated.recordset.length; i++){
            dataSeated.push(seated.recordset[i].ID_GHE);
        }

        return res.render('seat_sel.ejs',{
            dataSeatA: seatA,
            dataSeatB: seatB,
            dataSeatC: seatC,
            dataSeatD: seatD,
            dataSeatE: seatE,
            idPhim: id,
            day:day,
            time:time,
            dataSeated: dataSeated
        });
    }
    catch(err){
        return res.redirect('/');
    }
}

let getBillpage = async (req, res) => {
    try{
        if(!req.session.user){
            return res.redirect('/sign_in');
        }
        let id=req.body.id;
        let day=req.body.day;
        let time=req.body.time;
        let seats=req.body.seats;
        await pool.connect();
        let data_movies=[];
        let movies = await pool.request().query(`SELECT * FROM PHIM WHERE ID='${id}'`);
        data_movies=movies.recordset;
        return res.render('bill.ejs',{
            dataMovies: data_movies,
            day: day,
            time: time,
            seats: seats,
            dataUser: req.session.user
        });
    }
    catch(err){
        return res.redirect('/ticket-booking');
    }
}

let getTicketspage = async (req, res) => {
    try{
        if(!req.session.user){
            return res.redirect('/sign_in');
        }
        await pool.connect();
        let id=req.session.user[0].ID;
        let data_tickets=[];

        let tickets = await pool.request().query(`SELECT * FROM VE WHERE ID_KH=${id}`);
        data_tickets=tickets.recordset;

        let data_movies=[];
        for(let i=0; i<data_tickets.length; i++){
            let movie = await pool.request().query(`SELECT * FROM PHIM WHERE ID='${data_tickets[i].ID_PHIM}'`);
            data_movies.push(movie.recordset[0]);
        }

        let data_chairs=[];
        for(let i=0; i<data_tickets.length; i++){
            let chair = await pool.request().query(`SELECT * FROM GHE WHERE ID='${data_tickets[i].ID_GHE}'`);
            data_chairs.push(chair.recordset[0]);
        }

        var d = new Date(); // for now
        let hours=d.getHours();
        let min=d.getMinutes();
        let sec=d.getSeconds()
        let time_pay=hours+":"+ min+":"+sec;

        return res.render('history.ejs',{
            dataTickets: data_tickets,
            dataUser: req.session.user,
            dataMovies: data_movies,
            dataChairs: data_chairs,
            timePay: time_pay
        });
    }
    catch(err){
        return res.redirect('/');
    }
}

let processPay = async (req, res) => {
    try{
        if(!req.session.user){
            return res.redirect('/sign_in');
        }
        await pool.connect();
        let id_kh=req.session.user[0].ID;
        let id_phim=req.body.id;
        let seats=req.body.seats;

        let day=req.body.day;
        let time=req.body.time;

        let data_movie=[];
        let movies= await pool.request().query(`SELECT * FROM PHIM WHERE ID='${id_phim}'`);
        data_movie=movies.recordset;

        let tien=data_movie[0].TIEN;
        let soluong=seats.length;
        for(let i=0; i<seats.length; i++){
            if(seats[i]!=','){
                await pool.request().query(`insert into VE values('${id_phim}','${id_kh}','${seats[i]}','${tien}','${soluong}',N'${day}','${time}')`)
            }
        }
        return res.redirect('/history');
    }
    catch(err){
        return res.redirect('/');
    }
}

module.exports = {
    getHomepage,
    getContactUspage,
    getMoviespage,
    getSignInpage,
    processSignUp,
    processSignIn,
    getTicketBookingpage,
    processSignOut,
    processMoviesDetailpage,
    processSearch,
    processContact,
    getSeatSelectionPage,
    getBillpage,
    getTicketspage,
    processPay
}