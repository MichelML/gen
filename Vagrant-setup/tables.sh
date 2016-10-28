PGUSER=myapp PGPASSWORD=dbpass psql -h localhost myapp -c 'CREATE TABLE events ( 
id serial PRIMARY KEY, 
createdby text NOT NULL, 
datecreated date NOT NULL, 
style text NOT NULL, 
eventname text NOT NULL, 
eventtype text, 
eventhost text, 
eventtel text, 
eventemail text, 
eventurl text, 
eventguests text, 
eventlocation text NOT NULL, 
eventstartdate text NOT NULL, 
eventstarttime text NOT NULL, 
eventenddate text NOT NULL, 
eventendtime text NOT NULL, 
eventdetails text NOT NULL 
);'

PGUSER=myapp PGPASSWORD=dbpass psql -h localhost myapp -c 'CREATE TABLE users ( 
firstname text not null, 
lastname text not null, 
displayname text not null, 
email text PRIMARY KEY, 
pw text, 
googlelogin boolean not null, 
firstvisit date not null, 
image text not null, 
imagebig text not null, 
contacts text, 
bio text 
);'
