CREATE TABLE IF NOT EXISTS user (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name text, 
    email text UNIQUE, 
    password text, 
    CONSTRAINT email_unique UNIQUE (email)
);

CREATE TABLE IF NOT EXISTS team (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name text UNIQUE, 
    organizer INTEGER, 
    options text not null,
    start_time date,
    CONSTRAINT unique_team_name UNIQUE (name),
    CONSTRAINT fk_team_organizer FOREIGN KEY (organizer) references user(id)
);

CREATE TABLE IF NOT EXISTS player (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user INTEGER,
    team INTEGER, 
    CONSTRAINT uniq_participant UNIQUE (user, team),
    CONSTRAINT fk_team_player FOREIGN KEY (user) references user(id) ON DELETE CASCADE,
    CONSTRAINT fk_active_team FOREIGN KEY (team) references team(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS events (
    participant INTEGER, 
    status text default 'invited', /* joined, bailed */
    payload text,
    CONSTRAINT fk_participant FOREIGN KEY (participant) references player(id) ON DELETE CASCADE
);