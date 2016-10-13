CREATE TABLE events (
    id serial PRIMARY KEY,
    createdby text NOT NULL,
    style text NOT NULL,
    eventname text NOT NULL,
    eventtype text,
    eventguests text,
    eventlocation text NOT NULL,
    eventstartdate text NOT NULL,
    eventstarttime text NOT NULL,
    eventenddate text NOT NULL,
    eventendtime text NOT NULL,
    eventdetails text NOT NULL
);
