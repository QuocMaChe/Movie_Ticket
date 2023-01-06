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
	TRAILER CHAR(100)
)
go
CREATE
--ALTER
TABLE VE(
	ID INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
	ID_PHIM INT,
	ID_KH INT,
	TEN_GHE CHAR(10),
	TIEN INT,
	SOLUONG INT,
	NGAY CHAR(10),
	GIO CHAR(10),
)

go


--insert into PHIM values('Avatar: The Way Of Water','10/12/2022','James Cameroon','Sam Worthington, Zoe Saldana, Kate Winslet, Sigourney Weaver, Stephen Lang',N'Những trích đoạn đầu tiên hé lộ diễn biến cuộc chiến tiếp theo','1 Hr 40min',N'Hành động, Khoa học viễn tưởng','/assets/images/banner1_.jpg','https://www.youtube.com/embed/o5F8MOz_IDw');
--insert into PHIM values('Big Trip 2: Special Delivery','17/12/2022','Vasiliy Rovenskiy','Daniel Medvedev, Bernard Jacobsen, Stephen Thomas Ochsner',N'Đã một năm kể từ khi chú gấu Mic-Mic và chú thỏ Oscar trở lại sau cuộc phiêu lưu kỳ thú của họ','2 Hr 10min',N'Phiêu lưu, Hoạt hình','assets/images/banner2_.jpg','https://www.youtube.com/embed/o5F8MOz_IDw')
--insert into PHIM values(N'Âm lượng hủy diệt','8/12/2022','Hwang In Ho','Lee Jong Suk, Kim Rae Won, Park Byung Eun, Cha Eun Woo',N'Tác phẩm xoay quanh nhân vật cựu phó đô đốc hải quân Kang Do Young (Kim Rae Won)','2 Hr 35min','Hành động, Trinh sát','/assets/images/banner3_.jpg','https://www.youtube.com/embed/o5F8MOz_IDw')
--insert into PHIM values('One Piece: Film Red','26/11/2022','Eiichiro Ode','Ado, Tanaka Mayumi, Ikeda Shuichi',N'One Piece Film: Red là bộ phim hoạt hình anime của Nhật Bản thuộc thể loại kỳ ảo','1 Hr 55min',N'Phiêu lưu','/assets/images/po1.jpg','https://www.youtube.com/watch?v=L-aFL-bX1ao')
--insert into PHIM values(N'Jailangkung: Búp Bê Gọi Hồn','22/9/2022','Kimo Stamboel',NULL,N'Phim Jailangkung: Búp bê gọi hồn là một câu chuyện mới trong series Jailangkung','1 Hr 32min',N'Kinh dị, Giật gân, Khoa học viễn tưởng','/assets/images/po2.jpg','https://www.youtube.com/watch?v=LdLSid_nOh0')
--insert into PHIM values(N'Tro Tàn Rực Lửa','24/10/2022',N'Bùi Thạc Chuyên',N'Phương Anh Đào, Lê Công Hoàng',N'Tro tàn rực rỡ là một phim điện ảnh chính kịch của Việt Nam năm 2022 do Bùi Thạc Chuyên đạo diễn','1 Hr 57min',N'Tình cảm','/assets/images/po3.jpg','https://www.youtube.com/watch?v=36yF8g3SvWQ')



SELECT * FROM PHIM
WHERE TEN LIKE "%one%"