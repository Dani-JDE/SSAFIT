DROP SCHEMA ssafit;
CREATE SCHEMA IF NOT EXISTS `ssafit` default CHARACTER SET utf8mb4 ;
USE `ssafit` ;
set sql_safe_updates=0;

-- -----------------------------------------------------
-- Table `video`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `video` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `video_key` VARCHAR(100) NOT NULL,
  `title` VARCHAR(100) NOT NULL,
  `url` VARCHAR(220) NOT NULL,
  `part` VARCHAR(50) NOT NULL,
  `channel_name` VARCHAR(50) NOT NULL,
  `view_cnt` INT NULL,
  PRIMARY KEY (`id`));


-- -----------------------------------------------------
-- Table `user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `user` (
  `id` INT AUTO_INCREMENT NOT NULL,
  `userid` VARCHAR(50) NOT NULL,
  `nickname` VARCHAR(45) NOT NULL,
  `pw` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL UNIQUE,
  `profile` INT NOT NULL default 0,
  PRIMARY KEY (`id`));
  
-- -----------------------------------------------------
-- Table `review`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `review` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `vid` INT NOT NULL,
  `uid` INT NOT NULL,
  `rate` INT default 0,
  `content` TEXT NOT NULL,
  `time` DATETIME default NOW(),
  `depth` INT default 0,
  `re_id` INT NULL,
  
  CONSTRAINT check( `rate` >=0 and `rate`<=10),
  PRIMARY KEY (`id`));

-- -----------------------------------------------------
-- Table `likes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `likes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uid` INT NOT NULL,
  `liked` INT NOT NULL,
  FOREIGN KEY(`liked`) REFERENCES `video`(`id`),
  FOREIGN KEY(`uid`) REFERENCES `user`(`id`),
  PRIMARY KEY (`id`));
  
  -- -----------------------------------------------------
-- Table `part`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS part (
  id INT NOT NULL AUTO_INCREMENT,
  part VARCHAR(30),
  PRIMARY KEY (id));
  
-- -----------------------------------------------------
-- Table `watched`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `watched` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uid` INT NOT NULL,
  `watched` INT NOT NULL,
  FOREIGN KEY(`watched`) REFERENCES `video`(`id`),
  FOREIGN KEY(`uid`) REFERENCES `user`(`id`),
  PRIMARY KEY (`id`));
  
  -- -----------------------------------------------------
-- Table `chat`
-- -----------------------------------------------------
  CREATE TABLE IF NOT EXISTS `chat` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `uid` INT NOT NULL,
  `writer` VARCHAR(100) NOT NULL,
  `content` VARCHAR(220) NOT NULL,
  `reg_date` DATETIME DEFAULT NOW(),
  `chat_type` INT,
  `profile` INT,
  PRIMARY KEY (`id`));
  

commit;
SELECT * FROM video;
select * from user;
select * from likes;


DESC video;
DESC user;
DESC review;
DESC likes;
DESC watched;

SELECT * FROM video;

INSERT INTO user(userid, nickname, pw, email) VALUES
("hi", "??????", "54878", "hi@com"),
("seongeun", "??????", "12345", "se@com"),
("hyunho", "??????", "12345", "hh@com"),
("ahyoun", "??????", "12345", "ay@com"),
("junsung", "??????", "12345", "js@com"),
("eunjung", "??????", "12345", "ej@com"),
("daeun", "??????", "12345", "de@com");

INSERT INTO review (VID, UID, RATE, CONTENT, TIME, DEPTH, RE_ID)
values
(2, 1, 10, '???????????? ??? ?????? ?????????', now(), 0, 1), 
(2, 5, 0, '?????????', now(), 1, 1), 
(2, 2, 0, '??????~', now(), 1, 1),
(2, 2, 4, '??? ??????..', now(), 0, 4), 
(2, 3, 8, '???????????????', now(), 0, 5),
(2, 4, 4, '?????? ???????????????', now(), 0, 6), 
(1, 1, 4, '?????? ??????', now(), 0, 7), 
(1, 3, 10, '?????????????????? ???????????????~', now(), 0, 8), 
(3, 6, 10, '??????', now(), 0, 9), 
(3, 4, 0, '???????????????', now(), 1, 9);

INSERT INTO part (part)
  VALUES ("???"), ("??????"), ("??????"), ("??????"), ("??????"), ("??????"), ("??????");
  
INSERT INTO video (video_key, title, url, part, channel_name)
 VALUES
("o_pwMN40DLM","??? ??????, ?????? ????????? ?????????!","https://i.ytimg.com/vi/o_pwMN40DLM/maxresdefault.jpg","???","??????????????????"),
("oThYdH8ejXk","1300??? ?????? ???????????? &#39;?????? ?????????&#39;????????? ??????!?","https://i.ytimg.com/vi/oThYdH8ejXk/maxresdefault.jpg","???","??????????????? ?????? ????????????"),
("cfioLE83by0","?????? ?????? 5?????? ????????? ????????? l ????????????!","https://i.ytimg.com/vi/cfioLE83by0/maxresdefault.jpg","???","????????? SomiFit"),
("Yroqe56nNpM","??? ???????????? ?????? ?????? ???????????? 6??????","https://i.ytimg.com/vi/Yroqe56nNpM/maxresdefault.jpg","???","????????????"),
("VNFAfAM35QA","????????? ?????? ???????????????","https://i.ytimg.com/vi/VNFAfAM35QA/maxresdefault.jpg","???","??????TV"),
("EEqGCoTuYfQ","????????? ??? ??????, ????????? ???????????? ?????? (????????? ??????)","https://i.ytimg.com/vi/EEqGCoTuYfQ/maxresdefault.jpg","???","??????????????????"),
("7YenKNY3-YU","???????????? ???????????? ???????????? ???????????? ??? ?????????","https://i.ytimg.com/vi/7YenKNY3-YU/maxresdefault.jpg","???","??????TV"),
("pKoR-uJd_vk","?????? ???????????? ??? ?????? + ???????????? 1?????? ?????? ?????? ?????? ?????????","https://i.ytimg.com/vi/pKoR-uJd_vk/maxresdefault.jpg","???","?????????"),
("4t9u85AHQR0","??????????????? ????????? ???/?????? ?????? ????????? ???.???.???.??????? ????????? ??????","https://i.ytimg.com/vi/4t9u85AHQR0/maxresdefault.jpg","???","?????????"),
("E7TQPZCTYIs","???????????? ?????? ????????? ?????????? ???????????? ??????&amp;???","https://i.ytimg.com/vi/E7TQPZCTYIs/maxresdefault.jpg","???","?????????_Kim Kang min"),
("fr-5MKeRfVU","?????????????????? ????????????????????? ?????? , ??????????????? ???????????? [?????????]","https://i.ytimg.com/vi/fr-5MKeRfVU/maxresdefault.jpg","??????","?????????_Kim Kang min"),
("cBZnbTeld2w","?????????????????? 5?????? I ????????? ?????????+??????","https://i.ytimg.com/vi/cBZnbTeld2w/maxresdefault.jpg","??????","????????? FITVELY"),
("TN1UO5eziCU","????????? ??????1?????? ?????? &#39;????????????&#39;??? ??????? (ft.????????? ???????????? ????????? ????????????)","https://i.ytimg.com/vi/TN1UO5eziCU/maxresdefault.jpg","??????","??????????????? ?????? ????????????"),
("yxSt-h9A7_k","????????????? ?????? ?????? ?????? ?????? ??? ???????????? 6??????","https://i.ytimg.com/vi/yxSt-h9A7_k/maxresdefault.jpg","??????","????????????"),
("8thMw9JyxBE","?????? ????????? &#39;???&#39; ??????","https://i.ytimg.com/vi/8thMw9JyxBE/maxresdefault.jpg","??????","????????? GYM JONG KOOK"),
("8wNwg2mO5T8","&#39;?????????&#39;??? &#39;????????????&#39;??? ?????? ????????? ??????. (?????????????????? ???????????? ????????? ?????? ?????? ??????)","https://i.ytimg.com/vi/8wNwg2mO5T8/maxresdefault.jpg","??????","????????? ??????"),
("pzXiTG1rbs0","????????? ????????? ?????????! ????????? ???????????? ????????? 3????????????.","https://i.ytimg.com/vi/pzXiTG1rbs0/maxresdefault.jpg","??????","??????????????? ?????? ????????????"),
("gsFShSYOovU","Lv.3 ?????? ????????? ?????? ?????? ????????? ?????? (???????????????)","https://i.ytimg.com/vi/gsFShSYOovU/maxresdefault.jpg","??????","?????? Hulk's TV"),
("_geC1KPo2og","??????????????? ?????? ????????? ?????????(???????????? ?????? ???????????? ??????????????? ??????-???????????????)","https://i.ytimg.com/vi/_geC1KPo2og/maxresdefault.jpg","??????","???????????? ????????????"),
("hS7t-GzeyvE","????????? ??????????????? ?????? ???????????? ???????????? ??????. ?????? ????????? ??? ?????????!","https://i.ytimg.com/vi/hS7t-GzeyvE/maxresdefault.jpg","??????","??????TV"),
("bfxo9Phdkro","???????????? ????????? &#39;????????????&#39; 2??? ????????? ????????????!? (?????????????????? ?????? ??????!)","https://i.ytimg.com/vi/bfxo9Phdkro/maxresdefault.jpg","??????","??????????????? ?????? ????????????"),
("UqlUZFZgczk","???????????? ?????? ???????????? ???????????? ??????","https://i.ytimg.com/vi/UqlUZFZgczk/maxresdefault.jpg","??????","CHUL SOON HWANG"),
("qrt2fy_wmtU","???????????? ??????????????????! ????????? ????????????.","https://i.ytimg.com/vi/qrt2fy_wmtU/maxresdefault.jpg","??????","?????????"),
("d9m--yp_wyk","?????? ??????????????? ?????????!! ?????? ?????????????????? ??????+??????+?????? ?????? ??????????????????","https://i.ytimg.com/vi/d9m--yp_wyk/maxresdefault.jpg","??????","????????? FITVELY"),
("_is-VfJW44Y","??????????????? ???????????? ????????? &#39;??? ??????&#39;??? ???????????????!","https://i.ytimg.com/vi/_is-VfJW44Y/maxresdefault.jpg","??????","??????????????? ?????? ????????????"),
("c_5ENJWekbQ","Lv.4 10??? ?????? ????????? ?????? ???????????? ?????? (????????? ?????? ??????) [10mins Intense Chest Workout]","https://i.ytimg.com/vi/c_5ENJWekbQ/maxresdefault.jpg","??????","?????? Hulk's TV"),
("Lsh5fbtaWyM","&#39;?????? ??????&#39;??? ????????? ????????? ????????? ?????? 3??????! (????????????, ???????????????)","https://i.ytimg.com/vi/Lsh5fbtaWyM/maxresdefault.jpg","??????","????????????"),
("mnLzv7brYxA","???????????? ?????? ?????????, ??????","https://i.ytimg.com/vi/mnLzv7brYxA/maxresdefault.jpg","??????","?????????_Kim Kang min"),
("Eg8pR57_BB8","?????????????????? ??????????????? chest workout","https://i.ytimg.com/vi/Eg8pR57_BB8/maxresdefault.jpg","??????","???????????? [???????????? ?????? ??????????????????]"),
("58ce8JMEpTA","????????? ?????? ?????? ?????? ????????????? / IFBBPRO / ?????????","https://i.ytimg.com/vi/58ce8JMEpTA/maxresdefault.jpg","??????","???????????? The First"),
("QSCeJ__akl0","????????? ?????? ????????? ????????? ????????? ????????????","https://i.ytimg.com/vi/QSCeJ__akl0/maxresdefault.jpg","??????","???????????????"),
("tzN6ypk6Sps","??????????????? ????????? ??????? ????????? ?????? ???????????? ! [???????????? ?????????]","https://i.ytimg.com/vi/tzN6ypk6Sps/maxresdefault.jpg","??????","?????????_Kim Kang min"),
("js8z5wIZ0wg","(????????????X, ??????O) ?????? ????????????.. ????????????????? ????????? ???????????? 2??? ?????????","https://i.ytimg.com/vi/js8z5wIZ0wg/maxresdefault.jpg","??????","?????????"),
("3TyTGxBNwic","&#39;?????????&#39;??? ?????? ?????? ?????? ????????? ????????? ?????? ????????????!? (feat.?????????/?????????)","https://i.ytimg.com/vi/3TyTGxBNwic/maxresdefault.jpg","??????","??????????????? ?????? ????????????"),
("9ehdY_9B5jY","&#39;?????????&#39;??? &#39;?????????&#39;??? ????????? ????????? ?????? ?????? ??????!","https://i.ytimg.com/vi/9ehdY_9B5jY/maxresdefault.jpg","??????","???????????????"),
("KXYi6bI-UPE","Lv.5 13????????? ?????? ??????????????? ??????! ?????????100% ?????????. (????????? ????????? ??????) 13mins intense Legs Workout","https://i.ytimg.com/vi/KXYi6bI-UPE/maxresdefault.jpg","??????","?????? Hulk's TV"),
("u5OgcZdNbMo","?????? &#39;??????&#39;???????????? ?????????..","https://i.ytimg.com/vi/u5OgcZdNbMo/maxresdefault.jpg","??????","????????? GYM JONG KOOK"),
("NDsjmxTROEo","???????????? 11????????? ????????? ?????? [?????? ????????????]","https://i.ytimg.com/vi/NDsjmxTROEo/maxresdefault.jpg","??????","Thankyou BUBU"),
("pDFuLG0xrsU","??????????????????????? ????????? ???????????? ???????????? 15??? ??????!","https://i.ytimg.com/vi/pDFuLG0xrsU/maxresdefault.jpg","??????","?????????"),
("dpBYYEhdofI","????????? ??????, ????????? ???????????????, ????????? ????????? ????????? ???????????????? [???????????? ?????? ?????????] ?????? 7??? ??????","https://i.ytimg.com/vi/dpBYYEhdofI/maxresdefault.jpg","??????","????????? ???????????? Jiny diet"),
("NqSfpsJn8M8","???????????? ????????? ??? ????????? ??????????????????","https://i.ytimg.com/vi/NqSfpsJn8M8/maxresdefault.jpg","??????","?????????_Kim Kang min"),
("JY-RTxvAjAs","?????? ????????? ?????? ??????!! ???????????? 3??????","https://i.ytimg.com/vi/JY-RTxvAjAs/maxresdefault.jpg","??????","????????????"),
("n4L2Kvdtg-8","???????????? ????????? ??????, ???????????? ????????? ????????? ?????? - ?????? ???, ??????????????? ???","https://i.ytimg.com/vi/n4L2Kvdtg-8/maxresdefault.jpg","??????","?????????"),
("qkQdIMW1xlw","Lv.2 ???! ?????? ????????? ????????? ??? ?????? (??????,??????) ????????????","https://i.ytimg.com/vi/qkQdIMW1xlw/maxresdefault.jpg","??????","?????? Hulk's TV"),
("tONpT5wPXwU","???????????? ????????????, ???????????? Biceps workout (ENG Subtitle)","https://i.ytimg.com/vi/tONpT5wPXwU/maxresdefault.jpg","??????","CHUL SOON HWANG"),
("JwbdNTw9om8","????????? ?????? ?????? l ????????? ?????? ?????? 4?????? ????????? ????????? l ????????? ????????? ?????? ??????","https://i.ytimg.com/vi/JwbdNTw9om8/maxresdefault.jpg","??????","????????? V ?????????"),
("6WPslmiv_yI","ENG SUB) ?????? ????????? ????????? ?????? 7??????, Top 7 Worst Biceps Mistakes to Avoid","https://i.ytimg.com/vi/6WPslmiv_yI/maxresdefault.jpg","??????","??????????????????"),
("y3aMzyKqvNM","????????? - ?????? ?????? #2 [???????????? ??? ????????? ??????]","https://i.ytimg.com/vi/y3aMzyKqvNM/maxresdefault.jpg","??????","?????????"),
("XAFQmkdH614","????????? ????????? ????????? ?????? ????????? ????????? ?????? ?????? ??????","https://i.ytimg.com/vi/XAFQmkdH614/maxresdefault.jpg","??????","??????????????? ????????? ?????? ??????"),
("9GcM8R_uuQQ","????????? ????????? ?????? ??????????????? &#39;?????? ???&#39; ????????? ?????? (1/2)","https://i.ytimg.com/vi/9GcM8R_uuQQ/maxresdefault.jpg","??????","???????????? ????????????"),
("H7chkYEglGg","NABBA ?????? 3?????? ????????? ???????????? ?????????","https://i.ytimg.com/vi/H7chkYEglGg/maxresdefault.jpg","??????","?????????_Kim Kang min"),
("4vSP9HK3EN0","&#39;??? ?????????&#39; 2??? ???????????? ?????? ????????????!? (????????? ????????? ????????? ??????)","https://i.ytimg.com/vi/4vSP9HK3EN0/maxresdefault.jpg","??????","??????????????? ?????? ????????????"),
("ogyGQxuxxn4","?????? ???????????? ???????????? l ?????? ?????? ???????????? ???????????? ?????? ??????","https://i.ytimg.com/vi/ogyGQxuxxn4/maxresdefault.jpg","??????","?????????"),
("5azIr-srI6U","???????????????????????? ??????????????? ?????? ??????????????? ?????????!??????????????? ?????? ?????????????????? ???????????? ?????? ???????????? ?????????^^","https://i.ytimg.com/vi/5azIr-srI6U/maxresdefault.jpg","??????","???????????? ????????????"),
("OVxquTe8OmU","????????? ?????? - ?????? ??????#1","https://i.ytimg.com/vi/OVxquTe8OmU/maxresdefault.jpg","??????","?????????"),
("yCRy1o7tFnE","?????? ?????? ??? ????????? ????????? ?????? ?????? ??????????","https://i.ytimg.com/vi/yCRy1o7tFnE/maxresdefault.jpg","??????","??????????????? ????????? ?????? ??????"),
("EiEoZ0tlJ7o","??????????????? ????????? ?????????/???????????? Best (???????????? ????????????)","https://i.ytimg.com/vi/EiEoZ0tlJ7o/maxresdefault.jpg","??????","????????????"),
("ObEtLS9heOo","?????? ????????? ??? ????????? ?????? ??????, ???????????? ?????? ??? ?????? l ????????? ????????????","https://i.ytimg.com/vi/ObEtLS9heOo/maxresdefault.jpg","??????","?????????"),
("H-d4uvT9J2Y","???????????? ?????? ?????? ???????????? ????????? ???????????????(???????????? ????????????!)","https://i.ytimg.com/vi/H-d4uvT9J2Y/maxresdefault.jpg","??????","???????????? ????????????"),
("3Nqt05cRhpU","?????? ????????? ????????? ??? ???????????? ???????????? l ?????? ???????????? ????????????","https://i.ytimg.com/vi/3Nqt05cRhpU/maxresdefault.jpg","??????","????????????"),
("PjGcOP-TQPE","11????????? ?????? ????????? ?????? [?????? ????????????]","https://i.ytimg.com/vi/PjGcOP-TQPE/maxresdefault.jpg","??????","Thankyou BUBU"),
("7TLk7pscICk","(Sub)??????????????? 5??? ????????????!! ????????????! (?????? 2?????? ????????????!)","https://i.ytimg.com/vi/7TLk7pscICk/maxresdefault.jpg","??????","????????? SomiFit"),
("kETh8T3it4k","(????????????X, ??????O) ??????????????? ???????????? ??????????????????????????? ???????????? 1???????","https://i.ytimg.com/vi/kETh8T3it4k/maxresdefault.jpg","??????","?????????"),
("zcQ16cfJN9Q","9???! ????????? ??????????????? 11??? ????????????","https://i.ytimg.com/vi/zcQ16cfJN9Q/maxresdefault.jpg","??????","Thankyou BUBU"),
("SKCEpgEucFM","?????? ?????? ????????? ?????? -  ?????? ?????? ????????? ?????? ????????????????","https://i.ytimg.com/vi/SKCEpgEucFM/maxresdefault.jpg","??????","?????????"),
("sqQpL1wKW6M","12??? ???????????? ???????????? ??????????????? - ????????? ???????????? ?????????","https://i.ytimg.com/vi/sqQpL1wKW6M/maxresdefault.jpg","??????","?????????"),
("sVQqBDBZhmI","???????????? ?????? ??????! ???????????? ???!  [6 MINS ABS WORKOUT]","https://i.ytimg.com/vi/sVQqBDBZhmI/maxresdefault.jpg","??????","????????? SomiFit"),
("lRJZC342Bs0","???????????? ???????????? ??? ??????????????? ???! 16MIN STANDING ABS FOR BEGINNER","https://i.ytimg.com/vi/lRJZC342Bs0/maxresdefault.jpg","??????","MIZI"),
("iOSYLKBk894","???.???.???! ?????? ????????? ?????? ?????????5","https://i.ytimg.com/vi/iOSYLKBk894/maxresdefault.jpg","??????","Thankyou BUBU"),
("p623pewgTc0","[10???] ??????????????? ????????? ???????????????! 2?????? ????????? ????????? (?????? ??????!)","https://i.ytimg.com/vi/p623pewgTc0/maxresdefault.jpg","??????","????????? SomiFit");

DELETE FROM video WHERE id = 40;
DELETE FROM video WHERE id = 6;
DELETE FROM video WHERE id = 5;
DELETE FROM video WHERE id = 36;
SELECT r.id, rate, content, r.time, r.depth, r.re_id FROM review r
    JOIN user u
    ON r.uid = u.id
    WHERE vid = 1;