create table if not exists Clients(
	userId bigint not null unique,
	firstname varchar(300) not null,
	lastname varchar(300) not null,
	birthDate timestamp,
	producerCard varchar(100),
	cpf varchar(30) not null,
	constraint fk_Client_Users foreign key(userId) references Users(id) on delete cascade on update cascade
) default charset="UTF8MB4";