CREATE TABLE users (
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
);
