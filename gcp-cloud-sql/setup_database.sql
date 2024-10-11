DROP TABLE events;

CREATE TABLE events (
    eventId VARCHAR(255) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50),
    startTimestamp TIMESTAMP NOT NULL,
    endTimestamp TIMESTAMP
);

INSERT INTO events (eventId, title, description, status, startTimestamp, endTimestamp)
VALUES ('event.id.1', 'Meeting with Eric', 'Discussing Q3 feature planning.', 'scheduled', '2024-10-13 10:00', '2024-10-13 11:00');

INSERT INTO events (eventId, title, description, status, startTimestamp, endTimestamp)
VALUES ('event.id.2', 'Sync with Emma', 'Weekly sync discussing the team projects', 'scheduled', '2024-10-13 12:00', '2024-10-13 13:00');

SELECT * FROM events;