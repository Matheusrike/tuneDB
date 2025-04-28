create database tuneDB;
use tuneDB;

create table musics (
	id int primary key auto_increment,
	title varchar(255) not null,
	album varchar(255) not null,
	artist varchar(255) not null,
	duration varchar(255) not null
);

describe musics;

insert into musics (title, album, artist, duration) values
('Garota de Ipanema', 'Getz/Gilberto', 'Antônio Carlos Jobim', '5:21'),
('Numb', 'Meteora', 'Linkin Park', '3:07'),
('Livin On A Prayer', 'Slippery When Wet', 'Bon Jovi', '4:11'),
('Sweet Child o Mine', 'Appetite for Destruction', 'Guns N Roses', '5:56'),
('I Was Made For Loving You', 'Dynasty', 'Kiss', '4:29');

select * from musics;