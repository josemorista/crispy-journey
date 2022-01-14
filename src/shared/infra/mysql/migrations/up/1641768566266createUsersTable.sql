create table if not exists Users(
	id bigint primary key not null auto_increment,
	email varchar(255) not null unique,
	password varchar(255) not null,
	kind enum('enterprise', 'client'),
	createdAt timestamp not null default CURRENT_TIMESTAMP,
	updatedAt timestamp not null default CURRENT_TIMESTAMP
) default charset="UTF8MB4";