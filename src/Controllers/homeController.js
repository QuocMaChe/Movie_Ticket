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
        if(!req.session.user){
            return res.redirect('/sign_in');
        }
        await pool.connect();
       
        return res.render('ticket-booking.ejs',{
            dataUser: req.session.user
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
        return res.render('/sign_in');
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
        return res.render('//Contact_Us');
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
    processContact
}