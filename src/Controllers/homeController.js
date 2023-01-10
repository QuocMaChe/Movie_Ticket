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
        let id_phim=req.params.id_phim;
        let id_phong=req.params.id_phong;
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
            idPhim: id_phim,
            idPhong: id_phong
        });
    }
    catch(err){
        console.log(err);
        return res.redirect('/');
    }
}
let processSignIn = async (req, res) => {
    try{
        let email = req.body.email;
        let password = req.body.password;
        if(email == '' || password == ''){
            let error=2;
            return res.render('sign_in.ejs',{
                Error:error
            });
        }
        let data_user=[];
        await pool.connect();
        let user= await pool.request().query(`select * from KHACHHANG where EMAIL='${email}' and PWD ='${password}'`);
        data_user=user.recordset;
        if(data_user.length==1){
            req.session.user=data_user;
            return res.redirect('/');
        }else{
            let error=1;
            return res.render('sign_in.ejs',{
                Error:error
            });
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
        if(name == '' || email == '' || password == ''){
            let error=2;
            return res.render('sign_in.ejs',{
                Error:error
            });
        }
        await pool.connect();
        let data_users=[];
        let users=await pool.request().query(`select * from KHACHHANG where EMAIL='${email}'`);
        data_users=users.recordset;
        if(data_users.length>=1){
            let error=1;
            return res.render('sign_in.ejs',{
                Error:error
            });
        }else{
            await pool.request().query(`insert into KHACHHANG(TEN,EMAIL,PWD) values (N'${name}','${email}','${password}')`);
            return res.redirect('/sign_in');
        }
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
        return res.redirect('/');
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
        let id_phong=req.body.id_phong;
        let day=req.body.startDate;
        let time=req.body.startTime;
        await pool.connect();

        let seatA=[];
        let listA = await pool.request().query(`SELECT * FROM GHE WHERE COL='A' AND ID_PHONG='${id_phong}'`);
        seatA=listA.recordset;

        let seatB=[];
        let listB = await pool.request().query(`SELECT * FROM GHE WHERE COL='B' AND ID_PHONG='${id_phong}'`);
        seatB=listB.recordset;

        let seatC=[];
        let listC = await pool.request().query(`SELECT * FROM GHE WHERE COL='C' AND ID_PHONG='${id_phong}'`);
        seatC=listC.recordset;

        let seatD=[];
        let listD = await pool.request().query(`SELECT * FROM GHE WHERE COL='D' AND ID_PHONG='${id_phong}'`);
        seatD=listD.recordset;

        let seatE=[];
        let listE = await pool.request().query(`SELECT * FROM GHE WHERE COL='E' AND ID_PHONG='${id_phong}'`);
        seatE=listE.recordset;

        let dataSeated=[];
        let seated = await pool.request().query(`SELECT ID_GHE FROM VE WHERE ID_PHIM='${id}' and NGAY='${day}' and GIO='${time}'`);
        for(let i=0; i<seated.recordset.length; i++){
            dataSeated.push(seated.recordset[i].ID_GHE);
        }

        await pool.request().query(` INSERT INTO LICH VALUES('${id}', '${id_phong}')`);

        let schedule=[];
        let scheme = await pool.request().query(`SELECT * FROM LICH WHERE ID_PHIM='${id}' and ID_PHONG='${id_phong}'`);
        schedule=scheme.recordset;

        return res.render('seat_sel.ejs',{
            dataSeatA: seatA,
            dataSeatB: seatB,
            dataSeatC: seatC,
            dataSeatD: seatD,
            dataSeatE: seatE,
            day:day,
            time:time,
            dataSeated: dataSeated,
            Schedule:schedule
        });
    }
    catch(err){
        console.log(err);
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
        let seat=req.body.seats;
        let seats=[];

        if(typeof seat == 'string'){
            seats.push(seat)
        }else{
            seats=seat;
        } 

        await pool.connect();
        let schedule=[];
        let scheme = await pool.request().query(`SELECT * FROM LICH WHERE ID='${id}'`);
        schedule=scheme.recordset;

        let id_phong=schedule[0].ID_PHONG;
        let id_phim=schedule[0].ID_PHIM;

        let data_movie=[];
        let movie = await pool.request().query(`SELECT * FROM PHIM WHERE ID='${id_phim}'`);
        data_movie=movie.recordset;

        let data_room=[];
        let room=await pool.request().query(`SELECT * FROM PHONG WHERE ID='${id_phong}'`);
        data_room=room.recordset;

        let id_rap=data_room[0].ID_RAP;

        let data_branch=[];
        let branch=await pool.request().query(`SELECT * FROM RAP WHERE ID='${id_rap}'`);
        data_branch=branch.recordset;

        return res.render('bill.ejs',{
            dataMovie: data_movie,
            dataBranch: data_branch,
            dataRoom: data_room,
            dataSchedule: schedule,
            day: day,
            time: time,
            seats: seats,
            dataUser: req.session.user
        });
    }
    catch(err){
        console.log(err);
        return res.redirect('/');
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
        
        let data_schedule=[];
        for(let i=0; i<data_tickets.length; i++){
            let scheme = await pool.request().query(`SELECT * FROM LICH WHERE ID='${data_tickets[i].ID_LICH}'`);
            data_schedule.push(scheme.recordset[0]);
        }
        
       
        let data_rooms=[];
        for(let i=0; i<data_tickets.length; i++){
            let rooms = await pool.request().query(`SELECT * FROM PHONG WHERE ID='${data_schedule[i].ID_PHONG}'`);
            data_rooms.push(rooms.recordset[0]);
        }

        let data_branchs=[];
        for(let i=0; i<data_tickets.length; i++){
            let branchs = await pool.request().query(`SELECT * FROM RAP WHERE ID='${data_rooms[0].ID_RAP}'`);
            data_branchs.push(branchs.recordset[0]);
        }

        return res.render('history.ejs',{
            dataTickets: data_tickets,
            dataUser: req.session.user,
            dataMovies: data_movies,
            dataChairs: data_chairs,
            dataRooms:data_rooms,
            dataBranchs: data_branchs
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
        let id_lich=req.body.id_lich
        let seats=req.body.seats;

        let day=req.body.day;
        let time=req.body.time;

        let data_movie=[];
        let movies= await pool.request().query(`SELECT * FROM PHIM WHERE ID='${id_phim}'`);
        data_movie=movies.recordset;

        let tien=data_movie[0].TIEN;
        let soluong=seats.length;
        for(let i=0; i<seats.length; i++){
            await pool.request().query(`insert into VE values('${id_phim}','${id_kh}','${seats[i]}','${id_lich}','${tien}','${soluong}',N'${day}','${time}')`)
        }
        return res.redirect('/history');
    }
    catch(err){
        return res.redirect('/');
    }
}

let getBranchspage = async (req, res) => {
    try{
        let id_phim=req.body.id;
        if(!req.session.user){
            return res.redirect('/sign_in');
        }
        await pool.connect();
        let data_branchs=[];
        let branchs= await pool.request().query(`SELECT * FROM RAP`);
        data_branchs=branchs.recordset;
        return res.render('branchs.ejs',{
            dataUser: req.session.user,
            dataBranchs: data_branchs,
            idPhim: id_phim
        });
    }
    catch(err){
        return res.redirect('/');
    }
}

let getRoomspage = async (req, res) => {
    try{
        let id_rap=req.params.id;
        let id_phim=req.params.id_phim;
        if(!req.session.user){
            return res.redirect('/sign_in');
        }
        await pool.connect();
        let data_rooms=[];
        let rooms= await pool.request().query(`SELECT * FROM PHONG WHERE ID_RAP='${id_rap}'`);
        data_rooms=rooms.recordset;
        
        return res.render('rooms.ejs',{
            dataUser: req.session.user,
            dataRooms: data_rooms,
            idPhim: id_phim
        });
    }
    catch(err){
        console.log(err)
        return res.redirect('/');
    }
}

let getMoviesTypepage = async (req, res) => {
    try{
        let search = req.params.id;
        let name;
        if(search==1){
            name='Hành';
        }else if(search==2){
            name='Trinh';
        }else if(search==3){
            name='Phiêu';
        }else if(search==5){
            name='Giật';
        }else if(search==5){
            name='Kinh';
        }else if(search==6){
            name='Khoa';
        }else if(search==7){
            name='Hoạt';
        }else{
            name='Tình';
        }

        let data_movies=[]
        await pool.connect();
        let movies = await pool.request().query(`SELECT * FROM PHIM WHERE THELOAI LIKE '%${name}%'`);
        data_movies=movies.recordset;
        return res.render('movies_type.ejs',{
            dataMovies: data_movies,
            dataUser: req.session.user
        });
    }
    catch(err){
        return res.redirect('/');
    }
}
//Admin
let getAdminpage = async (req, res) => {
    try{
        let data_movies=[];
        await pool.connect();
        let movies= await pool.request().query(`select * from PHIM `);
        data_movies=movies.recordset;
        return res.render('./admin/admin_index.ejs',{
            dataMovies: data_movies
        });
    }
    catch(err){
        return res.redirect('/admin');
    }
}
let getAdminContactpage = async (req, res) => {
    try{
        let data_contacts=[];
        await pool.connect();
        let contacts= await pool.request().query(`select * from PHANHOI `);
        data_contacts=contacts.recordset;
        console.log(data_contacts);
        return res.render('./admin/contacts.ejs',{
            dataContacts: data_contacts
        });
    }
    catch(err){
        return res.redirect('/admin');
    }
}

let getAdminAddMoviepage = async (req, res) => {
    try{
        return res.render('./admin/addmovie.ejs');
    }
    catch(err){
        return res.redirect('/admin');
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
    processPay,
    getBranchspage,
    getRoomspage,
    getMoviesTypepage,
    getAdminpage,
    getAdminContactpage,
    getAdminAddMoviepage
}