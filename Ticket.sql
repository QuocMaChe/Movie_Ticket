use DOAN_NMCNPM
go

CREATE
--ALTER
TABLE KHACHHANG(
	ID INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
	TEN NVARCHAR(100) NOT NULL,
	EMAIL CHAR(100) NOT NULL,
	PWD CHAR(100) NOT NULL,
)

CREATE
--ALTER
TABLE PHIM(
	ID INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
	TEN NVARCHAR(100) NOT NULL,
	MOTA CHAR(100) NOT NULL,
	THOILUONG CHAR(100) NOT NULL,

)

go
insert into KHACHHANG values(N'Nguyễn Quốc Anh','zp19d0z@gmail.com','1234');
insert into KHACHHANG values(N'Nguyễn Quốc Vinh','quocmache@gmail.com','1234');
insert into KHACHHANG values(N'Nguyễn Quốc Vũ','quocanhnguyen@gmail.com','1234');
insert into KHACHHANG values(N'Nguyễn Quốc Tùng','quocanhnguyen1@gmail.com','1234');
insert into KHACHHANG values(N'Nguyễn Quốc Huy','quocanhnguyen2@gmail.com','1234');
delete KHACHHANG where ID=8
select * from KHACHHANG where EMAIL='zp19d0z@gmail.com' and PWD ='1234'