INSERT INTO user (name, email, password) VALUES ('admin', 'admin@example.com', 'admin123456'); 
INSERT INTO user (name, email, password) VALUES ('user', 'user@example.com', 'user123456');
INSERT INTO user (name, email, password) VALUES ('jamie', 'jamie@example.com', 'jamie123');
INSERT INTO user (name, email, password) VALUES ('maxie', 'maxie@example.com', 'maxie123');
INSERT INTO user (name, email, password) VALUES ('casie', 'casie@example.com', 'casie123');
INSERT INTO user (name, email, password) VALUES ('bowie', 'bowie@example.com', 'bowie123');

INSERT INTO team (name, organizer) VALUES ('scrumming bubbles', 2);
INSERT INTO team (name, organizer) VALUES ('blazing glory', 2);

INSERT INTO team (name, organizer) VALUES ('mountain fresh', 1);
INSERT INTO team (name, organizer) VALUES ('sky blue', 1);

INSERT INTO player (user, team) VALUES (2, 7);
INSERT INTO player (user, team) VALUES (3, 7);
INSERT INTO player (user, team) VALUES (4, 7);
INSERT INTO player (user, team) VALUES (5, 7);

INSERT INTO player (user, team) VALUES (1, 8);
INSERT INTO player (user, team) VALUES (3, 8);
INSERT INTO player (user, team) VALUES (5, 8);
INSERT INTO player (user, team) VALUES (6, 8);