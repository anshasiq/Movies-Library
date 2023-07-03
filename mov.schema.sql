DROP TABLE IF EXISTS movies;
create table if not exists movies(
  id serial primary key,
  title varchar(200),
  typee varchar(200),
  comment varchar(200),
  year integer
);