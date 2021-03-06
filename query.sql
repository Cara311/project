
CREATE TABLE users
(
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL 
);

CREATE TABLE admin_user
(
    id SERIAL PRIMARY KEY NOT NULL,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL 
);

INSERT INTO admin_user(username, password) VALUES ('test', 'password');

ALTER TABLE users 
RENAME COLUMN name TO user_name;

CREATE TABLE book
(
    id SERIAL PRIMARY KEY NOT NULL,
    title VARCHAR(255) NOT NULL,
    blurb VARCHAR(255) 
);


CREATE TABLE status
(
    id SERIAL PRIMARY KEY NOT NULL,
    out BOOLEAN NOT NULL,
    book_id INT REFERENCES book(id),
    user_id INT REFERENCES users(id)
);

CREATE TABLE read
(
    id SERIAL PRIMARY KEY NOT NULL,
    read BOOLEAN NOT NULL,
    book_id INT REFERENCES book(id),
    user_id INT REFERENCES users(id)
);

CREATE TABLE authors
(
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL UNIQUE
);

ALTER TABLE authors
ADD CONSTRAINT name_unique UNIQUE (name);

DELETE FROM authors
WHERE id = 9;

DELETE FROM book_author WHERE book_id = 38;
DELETE FROM book_genre WHERE book_id = 38;
DELETE FROM status WHERE book_id = 38;
DELETE FROM read WHERE book_id = 38;
DELETE FROM book WHERE id = 38;



WITH first_delete AS (
   DELETE FROM book_author WHERE book_id = 43
), 
second_delete AS (
    DELETE FROM book_genre WHERE book_id = 43
),
third_delete AS (
    DELETE FROM status WHERE book_id = 43
),
fourth_delete AS (
    DELETE FROM read WHERE book_id = 43
)
DELETE FROM book WHERE id = 43;




CREATE TABLE book_author
(
    author_id INT REFERENCES authors(id),
    book_id INT REFERENCES book(id)
);

CREATE TABLE genres
(
    id SERIAL PRIMARY KEY NOT NULL,
    genre VARCHAR(255) NOT NULL
);

CREATE TABLE book_genre
(
    genre_id INT REFERENCES genres(id),
    book_id INT REFERENCES book(id)
);

INSERT INTO users(name) VALUES ('Guest');
INSERT INTO users(name) VALUES ('Roger');
INSERT INTO users(name) VALUES ('Cara');
INSERT INTO users(name) VALUES ('No User');

INSERT INTO book(title, blurb) VALUES ('Eternal Marriage', 'Eternal marriage cannot work without commitment.');
INSERT INTO book(title, blurb) VALUES ('Beezus and Ramona', 'Beezus tries to be patient with her sister, Ramona, but it is not easy.');
INSERT INTO book(title, blurb) VALUES ('The Cat in the Hat', 'The Cat in the Hat comes to entertain the kids on a rainy day.');
INSERT INTO book(title, blurb) VALUES ('The Caldera', 'The seventh book in the Brotherband series.');
INSERT INTO book(title, blurb) VALUES ('Twenty-One Days', 'Daniel Pitt must prevent an innocent man from hanging.');
INSERT INTO book(title, blurb) VALUES ('Words of Radiance', 'Book two of the Stormlight Archive.');
INSERT INTO book(title, blurb) VALUES ('Off Armageddon Reef', 'Merlin must save Safehold from the Gbaba.');

UPDATE book_author SET author_id = 8 WHERE author_id = 9;

INSERT INTO authors(name) VALUES ('F. Burton Howard');
INSERT INTO authors(name) VALUES ('Beverly Cleary');
INSERT INTO authors(name) VALUES ('Dr. Seuss');
INSERT INTO authors(name) VALUES ('John Flanagan');
INSERT INTO authors(name) VALUES ('Anne Perry');
INSERT INTO authors(name) VALUES ('Brandon Sanderson');
INSERT INTO authors(name) VALUES ('David Weber');

INSERT INTO book_author(author_id, book_id) VALUES (1, 1);
INSERT INTO book_author(author_id, book_id) VALUES (2, 2);
INSERT INTO book_author(author_id, book_id) VALUES (3, 3);
INSERT INTO book_author(author_id, book_id) VALUES (4, 4);
INSERT INTO book_author(author_id, book_id) VALUES (5, 5);
INSERT INTO book_author(author_id, book_id) VALUES (6, 6);
INSERT INTO book_author(author_id, book_id) VALUES (7, 7);

INSERT INTO genres(genre) VALUES ('Sci-Fi');
INSERT INTO genres(genre) VALUES ('Military');
INSERT INTO genres(genre) VALUES ('Fantasy');
INSERT INTO genres(genre) VALUES ('Children');
INSERT INTO genres(genre) VALUES ('Historical');
INSERT INTO genres(genre) VALUES ('Murder Mystery');
INSERT INTO genres(genre) VALUES ('Detective Fiction');
INSERT INTO genres(genre) VALUES ('Fiction');
INSERT INTO genres(genre) VALUES ('Nonfiction');
INSERT INTO genres(genre) VALUES ('Young Adult');

INSERT INTO book_genre(genre_id, book_id) VALUES (9, 1);
INSERT INTO book_genre(genre_id, book_id) VALUES (4, 2);
INSERT INTO book_genre(genre_id, book_id) VALUES (4, 3);
INSERT INTO book_genre(genre_id, book_id) VALUES (10, 4);
INSERT INTO book_genre(genre_id, book_id) VALUES (3, 4);
INSERT INTO book_genre(genre_id, book_id) VALUES (6, 5);
INSERT INTO book_genre(genre_id, book_id) VALUES (7, 5);
INSERT INTO book_genre(genre_id, book_id) VALUES (5, 5);
INSERT INTO book_genre(genre_id, book_id) VALUES (3, 6);
INSERT INTO book_genre(genre_id, book_id) VALUES (1, 7);
INSERT INTO book_genre(genre_id, book_id) VALUES (2, 7);
INSERT INTO book_genre(genre_id, book_id) VALUES (3, 8);

DELETE FROM status
WHERE out = false;

INSERT INTO status(out, book_id, user_id) VALUES (false, 1, 4);
INSERT INTO status(out, book_id, user_id) VALUES (false, 2, 4);
INSERT INTO status(out, book_id, user_id) VALUES (false, 3, 4);
INSERT INTO status(out, book_id, user_id) VALUES (false, 4, 2);
INSERT INTO status(out, book_id, user_id) VALUES (true, 5, 3);
INSERT INTO status(out, book_id, user_id) VALUES (false, 6, 4);
INSERT INTO status(out, book_id, user_id) VALUES (false, 7, 4);
INSERT INTO status(out, book_id, user_id) VALUES (false, 8, 4);

UPDATE status SET out = true WHERE book_id = 39;

INSERT INTO read(read, book_id, user_id) VALUES (false, 1, null);
INSERT INTO read(read, book_id, user_id) VALUES (true, 2, 3);
INSERT INTO read(read, book_id, user_id) VALUES (true, 3, 3);
INSERT INTO read(read, book_id, user_id) VALUES (true, 4, 3);
INSERT INTO read(read, book_id, user_id) VALUES (true, 5, 3);
INSERT INTO read(read, book_id, user_id) VALUES (true, 6, 3);
INSERT INTO read(read, book_id, user_id) VALUES (true, 7, 3);
INSERT INTO read(read, book_id, user_id) VALUES (true, 7, 3);


BEGIN;
INSERT INTO book(title, blurb ) VALUES ();
INSERT INTO author(name) VALUES ();
INSERT INTO 
COMMIT;

--Book and Author Insert
WITH first_insert AS (
   INSERT INTO book(title, blurb) 
   VALUES('The Hobbit','A hobbit goes on an adventure with dwarves.') 
   RETURNING id
), 
second_insert AS (
  INSERT INTO authors(name) 
  VALUES('J.R.R Tolkien')
  RETURNING id
),
third_insert AS (
    INSERT INTO book_genre(genre_id, book_id)
    VALUES ( 1 , (SELECT id FROM first_insert));
)--TODO: test third insert 
INSERT INTO book_author ( author_id ,book_id) 
VALUES
( (SELECT id FROM first_insert), (SELECT id FROM second_insert));


--Book and Author Insert (Not Working)
WITH first_insert AS (
   INSERT INTO book(title, blurb) 
   VALUES('Test','The story of the famous Martin the warrior.') 
   RETURNING id
), 
second_insert AS (
  INSERT INTO authors(name) 
  VALUES('Bob Sam')
  ON CONFLICT (name) DO NOTHING
  RETURNING id
),
third_insert AS (
    INSERT INTO book_genre(genre_id, book_id)
    VALUES ( 3 , (SELECT id FROM first_insert))
),
fourth_insert AS (
    INSERT INTO status(out, book_id, user_id) 
    VALUES(false, (SELECT id FROM first_insert), 1) 
),
fifth_insert AS (
    INSERT INTO read(read, book_id, user_id) 
    VALUES(false, (SELECT id FROM first_insert), 1) 
)
INSERT INTO book_author(author_id ,book_id) 
VALUES
( (SELECT author_id FROM book_author JOIN authors ON authors.id = book_author.author_id WHERE authors.name = 'Bob Sam'), (SELECT id FROM first_insert));

--Book and Author Insert (With Ids)
WITH first_insert AS (
   INSERT INTO book(title, blurb) 
   VALUES('Test','The story of the famous Martin the warrior.') 
   RETURNING id
), 
third_insert AS (
    INSERT INTO book_genre(genre_id, book_id)
    VALUES ( 3 , (SELECT id FROM first_insert))
),
fourth_insert AS (
    INSERT INTO status(out, book_id, user_id) 
    VALUES(false, (SELECT id FROM first_insert), 1) 
),
fifth_insert AS (
    INSERT INTO read(read, book_id, user_id) 
    VALUES(false, (SELECT id FROM first_insert), 1) 
)
INSERT INTO book_author(author_id ,book_id) 
VALUES
( (1), (SELECT id FROM first_insert));

--Book and Genre Insert
WITH first_insert AS (
   INSERT INTO book(title, blurb) 
   VALUES('Test','The story of the famous Martin the warrior.') 
   RETURNING id
), 
third_insert AS (
    INSERT INTO book_genre(genre_id, book_id)
    VALUES ( 3 , (SELECT id FROM first_insert))
),
fourth_insert AS (
    INSERT INTO status(out, book_id, user_id) 
    VALUES(false, (SELECT id FROM first_insert), 1) 
)
    INSERT INTO read(read, book_id, user_id) 
    VALUES(false, (SELECT id FROM first_insert), 1);

--Author Insert

INSERT INTO authors(name) 
  VALUES('Bob Sam')
  ON CONFLICT (name) DO NOTHING
  RETURNING id






--Get Book Info & Author
SELECT * FROM book AS b
JOIN book_author AS a
ON a.book_id = b.id
WHERE a.author_id = 5;

SELECT * FROM book AS b
JOIN book_author AS a
ON a.book_id = b.id
JOIN authors 
ON authors.id = a.author_id;

--Get Book Authors
SELECT 

--Get Book Info, Author, Genre
SELECT title, blurb, genre FROM book AS b
JOIN book_author AS a
ON a.book_id = b.id
JOIN authors 
ON authors.id = a.author_id
JOIN book_genre AS bg
ON bg.book_id = b.id
JOIN genres AS g
ON g.id = bg.genre_id
AND g.genre = 'Fantasy';

--Get Book Details with read
SELECT * FROM book AS b
JOIN book_author AS a
ON a.book_id = b.id
JOIN authors 
ON authors.id = a.author_id
JOIN read as r
ON r.book_id = b.id
JOIN users as u
ON u.id = r.user_id
JOIN book_genre AS bg
ON bg.book_id = b.id
JOIN genres AS g
ON g.id = bg.genre_id
AND b.id = 6;

--Get Book Details with status
SELECT * FROM book AS b
JOIN book_author AS a
ON a.book_id = b.id
JOIN authors 
ON authors.id = a.author_id
JOIN status as s
ON s.book_id = b.id
JOIN users as u
ON u.id = s.user_id
JOIN book_genre AS bg
ON bg.book_id = b.id
JOIN genres AS g
ON g.id = bg.genre_id
AND b.id = 19;
-



--Get Book Details
SELECT * FROM book AS b
JOIN book_author AS a
ON a.book_id = b.id
JOIN book_genre as g
ON g.book_id = b.id
JOIN status as s
ON s.book_id = b.id
JOIN read as r
ON r.book_id = b.id
WHERE b.id = 1;

SELECT * FROM book AS b
JOIN book_author AS a
ON a.book_id = b.id
JOIN book_genre as g
ON g.book_id = b.id
WHERE b.id = 1;

--Get Book Title, Blurb, and Author
 




CREATE TABLE test
(
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL
);

INSERT INTO test(name) VALUES ('Bob');


var sql = "SELECT * FROM test";

pool.query(sql, function(err, result) {
    // If an error occurred...
    if (err) {
        console.log("Error in query: ")
        console.log(err);
    }

    // Log this to the console for debugging purposes.
    console.log("Back from DB with result:");
    console.log(result.rows);


}); 


SELECT book_id, title, blurb, name FROM book as b JOIN book_author AS a ON a.book_id = b.id JOIN authors ON authors.id = a.author_id AND b.title='The Cat in the Hat';
SELECT id, title, blurb FROM book WHERE title = 'The Caldera';
SELECT * FROM book AS b JOIN book_author AS a ON a.book_id = b.id JOIN authors ON authors.id = a.author_id JOIN book_genre AS bg ON bg.book_id = b.id JOIN genres AS g ON g.id = bg.genre_id AND g.genre = 'Fantasy';
SELECT * FROM book AS b JOIN book_author AS a ON a.book_id = b.id JOIN authors ON authors.id = a.author_id JOIN status as s ON s.book_id = b.id JOIN users as u ON u.id = s.user_id JOIN book_genre AS bg ON bg.book_id = b.id JOIN genres AS g ON g.id = bg.genre_id AND b.id = 5;
WITH first_insert AS (INSERT INTO book(title, blurb) VALUES('Test','This is a test book.') RETURNING id), second_insert AS (INSERT INTO authors(name)VALUES('Brian Jac') ON CONFLICT (name) DO NOTHING RETURNING id), third_insert AS (INSERT INTO book_genre(genre_id, book_id) VALUES ( 3, (SELECT id FROM first_insert))), fourth_insert AS (INSERT INTO status(out, book_id, user_id) VALUES(false, (SELECT id FROM first_insert), 1)) INSERT INTO read(read, book_id, user_id) VALUES(false, (SELECT id FROM first_insert), 1); INSERT INTO book_author(author_id ,book_id)VALUES((SELECT author_id FROM authors JOIN book_author ON book_author.author_id = authors.id), (SELECT id FROM book WHERE title = 'Test')); 
WITH first_insert AS (INSERT INTO book(title, blurb) VALUES($1::text, $2::text) RETURNING id), second_insert AS (INSERT INTO authors(name)VALUES($3::text) ON CONFLICT (name) DO NOTHING RETURNING id), third_insert AS (INSERT INTO book_genre(genre_id, book_id) VALUES ( $4::INT, (SELECT id FROM first_insert))), fourth_insert AS (INSERT INTO status(out, book_id, user_id) VALUES(false, (SELECT id FROM first_insert), $5::INT)), fifth_insert AS (INSERT INTO read(read, book_id, user_id) VALUES(false, (SELECT id FROM first_insert), $5::INT); INSERT INTO book_author(author_id ,book_id)VALUES((SELECT id from second_insert), (SELECT id FROM first_insert));
WITH first_delete AS (DELETE FROM book_author WHERE book_id = 43), second_delete AS (DELETE FROM book_genre WHERE book_id = 43), third_delete AS (DELETE FROM status WHERE book_id = 43), fourth_delete AS (DELETE FROM read WHERE book_id = 43) DELETE FROM book WHERE id = 43;