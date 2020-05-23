-- start delimiter
DELIMITER $$

-- check if email already registered
CREATE PROCEDURE IsEmailExists(IN mailId VARCHAR(100), OUT countMail INTEGER)
BEGIN 
    select count(email) into countMail from users where email = mailId;
END
$$
--check login and return user data
CREATE PROCEDURE checkLogin(IN mailId VARCHAR(100),IN passwd VARCHAR(60), OUT userExists INTEGER)
BEGIN
    If EXISTS(select * from users where email = mailId AND userpassword = passwd) THEN
    BEGIN
    set userExists=1;
    select email, fullname, roleId from users where email = mailId;
    END;
    ELSE
    BEGIN
    set userExists=0;
    END;
    END IF;
END;
$$

-- save user data
CREATE PROCEDURE saveUser(IN uname VARCHAR(10),IN umail VARCHAR(100),IN pass VARCHAR(40),In idrole INT(5))
BEGIN 
    INSERT INTO users(fullname,email,userpassword,roleId) values (uname,umail,pass,idrole);
END
$$

-- get users data based on role Id

-- save image data
CREATE PROCEDURE saveImage(IN iname VARCHAR(10),IN category VARCHAR(20),IN uri VARCHAR(20),IN dCount VARCHAR(10),In userId INT(5))
BEGIN 
    INSERT INTO images(ImageName,category,ImageUrl,uploadedBy,downloadCount) values (iname,category,uri,userId,dCount);
END
$$

-- get the list of images based on user
CREATE PROCEDURE increaseDownloadCount(In userid INT(5))
BEGIN
    update images set downloadCount = downloadCount +1 where uploadedBy = userid;
END
$$

DELIMITER ;

