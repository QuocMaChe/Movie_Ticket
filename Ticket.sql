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
	ID INT IDENTITY(1,1) NOT NULL,
	ID_PHIM INT,
	ID_KH INT,
	ID_GHE INT,
	ID_LICH INT,
	TIEN INT,
	SOLUONG INT,
	NGAY NVARCHAR(50),
	GIO CHAR(10),
	CONSTRAINT PK_VE PRIMARY KEY (ID,ID_PHIM,ID_KH,ID_GHE,ID_LICH)
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

CREATE 
--drop
TABLE LICH (
  ID INT IDENTITY(1,1) NOT NULL,
  ID_PHIM INT,
  ID_PHONG INT,
  CONSTRAINT PK_LICH PRIMARY KEY (ID,ID_PHIM,ID_PHONG)
) 


INSERT INTO LICH (ID_PHIM, ID_PHONG) VALUES
(1, 1),
(2, 2),
(1, 5),
( 1, 10),
( 1, 12),
( 1, 15),
( 1, 20),
( 1, 25),
( 1, 30);
go

CREATE TABLE RAP (
  ID INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
  TEN NVARCHAR(100),
  DIACHI NVARCHAR(100),
)
go

CREATE TABLE PHONG (
  ID INT IDENTITY(1,1) NOT NULL,
  ID_RAP INT,
  TEN NVARCHAR(100),
  CONSTRAINT PK_PHONG PRIMARY KEY (ID,ID_RAP)
) 


go

Create 
--drop
table GHE(
	ID INT IDENTITY(1,1) NOT NULL ,
	ID_PHONG INT ,
	COL CHAR(5),
	RO int,
	CONSTRAINT PK_GHE PRIMARY KEY (ID,ID_PHONG) 
)
go

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

ALTER TABLE PHONG
ADD CONSTRAINT FK_PHONG_RAP
FOREIGN KEY (ID_RAP)
REFERENCES RAP(ID)

ALTER TABLE LICH
ADD CONSTRAINT FK_LICH_PHIM
FOREIGN KEY (ID_PHIM)
REFERENCES PHIM(ID)

ALTER TABLE LICH
ADD CONSTRAINT FK_LICH_PHONG
FOREIGN KEY (ID_PHONG)
REFERENCES PHONG(ID)

ALTER TABLE GHE
ADD CONSTRAINT FK_GHE_PHONG
FOREIGN KEY (ID_PHONG)
REFERENCES PHONG(ID)

go

--insert into PHIM values('Avatar: The Way Of Water','10/12/2022','James Cameroon','Sam Worthington, Zoe Saldana, Kate Winslet, Sigourney Weaver, Stephen Lang',N'Những trích đoạn đầu tiên hé lộ diễn biến cuộc chiến tiếp theo','1 Hr 40min',N'Hành động, Khoa học viễn tưởng','/assets/images/banner1_.jpg','https://www.youtube.com/embed/o5F8MOz_IDw',100000);
--insert into PHIM values('Big Trip 2: Special Delivery','17/12/2022','Vasiliy Rovenskiy','Daniel Medvedev, Bernard Jacobsen, Stephen Thomas Ochsner',N'Đã một năm kể từ khi chú gấu Mic-Mic và chú thỏ Oscar trở lại sau cuộc phiêu lưu kỳ thú của họ','2 Hr 10min',N'Phiêu lưu, Hoạt hình','assets/images/banner2_.jpg','https://www.youtube.com/embed/o5F8MOz_IDw',70000)
--insert into PHIM values(N'Âm lượng hủy diệt','8/12/2022','Hwang In Ho','Lee Jong Suk, Kim Rae Won, Park Byung Eun, Cha Eun Woo',N'Tác phẩm xoay quanh nhân vật cựu phó đô đốc hải quân Kang Do Young (Kim Rae Won)','2 Hr 35min','Hành động, Trinh sát','/assets/images/banner3_.jpg','https://www.youtube.com/embed/o5F8MOz_IDw',80000)
--insert into PHIM values('One Piece: Film Red','26/11/2022','Eiichiro Ode','Ado, Tanaka Mayumi, Ikeda Shuichi',N'One Piece Film: Red là bộ phim hoạt hình anime của Nhật Bản thuộc thể loại kỳ ảo','1 Hr 55min',N'Phiêu lưu','/assets/images/po1.jpg','https://www.youtube.com/watch?v=L-aFL-bX1ao',90000)
--insert into PHIM values(N'Jailangkung: Búp Bê Gọi Hồn','22/9/2022','Kimo Stamboel',NULL,N'Phim Jailangkung: Búp bê gọi hồn là một câu chuyện mới trong series Jailangkung','1 Hr 32min',N'Kinh dị, Giật gân, Khoa học viễn tưởng','/assets/images/po2.jpg','https://www.youtube.com/watch?v=LdLSid_nOh0',70000)
--insert into PHIM values(N'Tro Tàn Rực Lửa','24/10/2022',N'Bùi Thạc Chuyên',N'Phương Anh Đào, Lê Công Hoàng',N'Tro tàn rực rỡ là một phim điện ảnh chính kịch của Việt Nam năm 2022 do Bùi Thạc Chuyên đạo diễn','1 Hr 57min',N'Tình cảm','/assets/images/po3.jpg','https://www.youtube.com/watch?v=36yF8g3SvWQ',65000)

INSERT INTO RAP (TEN, DIACHI) VALUES
(N'CGV Cộng Hòa', N'TP.Hồ Chí Minh'),
(N'Beta Tân Bình', N'TP.Hồ Chí Minh'),
(N'LOTTE Thủ Đức', N'TP.Hồ Chí Minh'),
(N'VinCom Thủ Đúc', N'TP.Hồ Chí Minh'),
(N'CGV Thủ Đức', N'TP.Hồ Chí Minh'),
(N'CGV Gò Vấp', N'TP.Hồ Chí Minh');

INSERT INTO PHONG (ID_RAP, TEN) VALUES
(1, 'ROOM 1'),
( 1, 'ROOM 2'),
(1, 'ROOM 3'),
( 1, 'ROOM 4'),
( 1, 'ROOM 5'),
( 2, 'ROOM 1'),
( 2, 'ROOM 2'),
( 2, 'ROOM 3'),
( 2, 'ROOM 4'),
( 2, 'ROOM 5'),
( 3, 'ROOM 1'),
( 3, 'ROOM 2'),
( 3, 'ROOM 3'),
( 3, 'ROOM 4'),
( 3, 'ROOM 5'),
( 4, 'ROOM 1'),
( 4, 'ROOM 2'),
( 4, 'ROOM 3'),
( 4, 'ROOM 4'),
( 4, 'ROOM 5'),
( 5, 'ROOM 1'),
( 5, 'ROOM 2'),
( 5, 'ROOM 3'),
( 5, 'ROOM 4'),
( 5, 'ROOM 5'),
( 6, 'ROOM 1'),
( 6, 'ROOM 2'),
( 6, 'ROOM 3'),
( 6, 'ROOM 4'),
( 6, 'ROOM 5');

go




select * from VE
select * from GHE
select * from LICH
select * from PHONG
select * from KHACHHANG
select * from RAP

SELECT * FROM PHIM WHERE THELOAI LIKE '%Khoa%'
SELECT * FROM PHIM WHERE THELOAI LIKE '%lưu%'

update PHIM set THELOAI=N'Hành động, Trinh sát' where ID=3

