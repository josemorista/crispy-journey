create table if not exists Enterprises(
	userId bigint not null unique,
	name varchar(300) not null,
	foundationDate timestamp not null,
	cnpj varchar(30) not null,
	constraint fk_Enterprises_Users foreign key(userId) references Users(id) on delete cascade on update cascade
) default charset="UTF8MB4";