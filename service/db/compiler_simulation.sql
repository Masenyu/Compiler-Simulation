create database if not exists compiler_simulation;
use compiler_simulation;
/*select * from student_user;*/
create table if not exists student_user (
studentName varchar(30) NOT NULL, 
studentID varchar(12) NOT NULL, 
password varchar(30) NOT NULL, 
email varchar(50) NOT NULL,
primary key (studentID)
)default charset=utf8 ;
/*增改查*/

CREATE TABLE IF NOT EXISTS user_collection (
    studentID VARCHAR(12) NOT NULL,
    collectionID INT NOT NULL,
	collectionType varchar(4)  NOT NULL,
	data_content varchar(1200) NOT NULL,
    displayOrNot boolean NOT NULL,
	primary key(studentID,collectionID)
)  DEFAULT CHARSET=UTF8;
/*增删查*/