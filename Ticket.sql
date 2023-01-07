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
go
CREATE
--ALTER DROP
TABLE PHIM(
	ID INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
	TEN NVARCHAR(100) NOT NULL,
	NGAYKC NVARCHAR(30),
	AUTHOR NVARCHAR(100),
	ACTOR NVARCHAR(100),
	MOTA NVARCHAR(1000) NOT NULL,
	THOILUONG CHAR(100) NOT NULL,
	THELOAI NVARCHAR(100),
	IMGPATH CHAR(100),
	TRAILER CHAR(100),
	TIEN INT
)
go
CREATE
--ALTER DROP
TABLE VE(
	ID INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
	ID_PHIM INT,
	ID_KH INT,
	ID_GHE INT,
	TIEN INT,
	SOLUONG INT,
	NGAY NVARCHAR(50),
	GIO CHAR(10),
)

go

CREATE
--ALTER
TABLE PHANHOI(
	ID INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
	FirstName NVARCHAR(100),
	LastName NVARCHAR(100),
	EMAIL CHAR(100),
	SDT CHAR(13),
	MESS NVARCHAR(100)
)

go

--insert into PHIM values('Avatar: The Way Of Water','10/12/2022','James Cameroon','Sam Worthington, Zoe Saldana, Kate Winslet, Sigourney Weaver, Stephen Lang',N'Những trích đoạn đầu tiên hé lộ diễn biến cuộc chiến tiếp theo','1 Hr 40min',N'Hành động, Khoa học viễn tưởng','/assets/images/banner1_.jpg','https://www.youtube.com/embed/o5F8MOz_IDw',100000);
--insert into PHIM values('Big Trip 2: Special Delivery','17/12/2022','Vasiliy Rovenskiy','Daniel Medvedev, Bernard Jacobsen, Stephen Thomas Ochsner',N'Đã một năm kể từ khi chú gấu Mic-Mic và chú thỏ Oscar trở lại sau cuộc phiêu lưu kỳ thú của họ','2 Hr 10min',N'Phiêu lưu, Hoạt hình','assets/images/banner2_.jpg','https://www.youtube.com/embed/o5F8MOz_IDw',70000)
--insert into PHIM values(N'Âm lượng hủy diệt','8/12/2022','Hwang In Ho','Lee Jong Suk, Kim Rae Won, Park Byung Eun, Cha Eun Woo',N'Tác phẩm xoay quanh nhân vật cựu phó đô đốc hải quân Kang Do Young (Kim Rae Won)','2 Hr 35min','Hành động, Trinh sát','/assets/images/banner3_.jpg','https://www.youtube.com/embed/o5F8MOz_IDw',80000)
--insert into PHIM values('One Piece: Film Red','26/11/2022','Eiichiro Ode','Ado, Tanaka Mayumi, Ikeda Shuichi',N'One Piece Film: Red là bộ phim hoạt hình anime của Nhật Bản thuộc thể loại kỳ ảo','1 Hr 55min',N'Phiêu lưu','/assets/images/po1.jpg','https://www.youtube.com/watch?v=L-aFL-bX1ao',90000)
--insert into PHIM values(N'Jailangkung: Búp Bê Gọi Hồn','22/9/2022','Kimo Stamboel',NULL,N'Phim Jailangkung: Búp bê gọi hồn là một câu chuyện mới trong series Jailangkung','1 Hr 32min',N'Kinh dị, Giật gân, Khoa học viễn tưởng','/assets/images/po2.jpg','https://www.youtube.com/watch?v=LdLSid_nOh0',70000)
--insert into PHIM values(N'Tro Tàn Rực Lửa','24/10/2022',N'Bùi Thạc Chuyên',N'Phương Anh Đào, Lê Công Hoàng',N'Tro tàn rực rỡ là một phim điện ảnh chính kịch của Việt Nam năm 2022 do Bùi Thạc Chuyên đạo diễn','1 Hr 57min',N'Tình cảm','/assets/images/po3.jpg','https://www.youtube.com/watch?v=36yF8g3SvWQ',65000)


select * from KHACHHANG
select * from PHANHOI
go
Create 
--drop
table GHE(
	ID INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
	COL CHAR(5),
	RO int
)

update GHE set RO=1 where ID=9
update GHE set RO=2 where ID=10
update GHE set RO=3 where ID=11
update GHE set RO=4 where ID=12
update GHE set RO=5 where ID=13
update GHE set RO=6 where ID=14
update GHE set RO=7 where ID=15
update GHE set RO=8 where ID=16

update GHE set RO=1 where ID=17
update GHE set RO=2 where ID=18
update GHE set RO=3 where ID=19
update GHE set RO=4 where ID=20
update GHE set RO=5 where ID=21
update GHE set RO=6 where ID=22
update GHE set RO=7 where ID=23
update GHE set RO=8 where ID=24

update GHE set RO=1 where ID=25
update GHE set RO=2 where ID=26
update GHE set RO=3 where ID=27
update GHE set RO=4 where ID=28
update GHE set RO=5 where ID=29
update GHE set RO=6 where ID=30
update GHE set RO=7 where ID=31
update GHE set RO=8 where ID=32

update GHE set RO=1 where ID=33
update GHE set RO=2 where ID=34
update GHE set RO=3 where ID=35
update GHE set RO=4 where ID=36
update GHE set RO=5 where ID=37
update GHE set RO=6 where ID=38
update GHE set RO=7 where ID=39
update GHE set RO=8 where ID=40



insert into GHE values('A',1);
insert into GHE values('A',2);
insert into GHE values('A',3);
insert into GHE values('A',4);
insert into GHE values('A',5);
insert into GHE values('A',6);
insert into GHE values('A',7);
insert into GHE values('A',8);

insert into GHE values('B',1);
insert into GHE values('B',2);
insert into GHE values('B',3);
insert into GHE values('B',4);
insert into GHE values('B',5);
insert into GHE values('B',6);
insert into GHE values('B',7);
insert into GHE values('B',8);

insert into GHE values('C',1);
insert into GHE values('C',2);
insert into GHE values('C',3);
insert into GHE values('C',4);
insert into GHE values('C',5);
insert into GHE values('C',6);
insert into GHE values('C',7);
insert into GHE values('C',8);

insert into GHE values('D',1);
insert into GHE values('D',2);
insert into GHE values('D',3);
insert into GHE values('D',4);
insert into GHE values('D',5);
insert into GHE values('D',6);
insert into GHE values('D',7);
insert into GHE values('D',8);

insert into GHE values('E',1);
insert into GHE values('E',2);
insert into GHE values('E',3);
insert into GHE values('E',4);
insert into GHE values('E',5);
insert into GHE values('E',6);
insert into GHE values('E',7);
insert into GHE values('E',8);

----KHÓA NGOẠI
--ID_PHIM INT,
--ID_KH INT,
--ID_GHE INT,
ALTER TABLE VE
ADD CONSTRAINT FK_VE_PHIM
FOREIGN KEY (ID_PHIM)
REFERENCES PHIM(ID)

ALTER TABLE VE
ADD CONSTRAINT FK_VE_KHACHHANG
FOREIGN KEY (ID_KH)
REFERENCES KHACHHANG(ID)

ALTER TABLE VE
ADD CONSTRAINT FK_VE_GHE
FOREIGN KEY (ID_GHE)
REFERENCES GHE(ID)

delete from VE where ID=5
select * from VE

select * from GHE