INSERT INTO users (name, email, password)
VALUES ('Harvey Specter', 'harvey@specter.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Rachel Zane', 'rachel@zane.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Mike Ross', 'mike@ross.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, country, street, city, province, post_code)
VALUES (3, 'The Hobbit Hole', 'description', 'https://a0.muscache.com/im/pictures/924798e4-2fe1-47de-9636-947332829bcc.jpg?im_w=960', 'https://a0.muscache.com/im/pictures/924798e4-2fe1-47de-9636-947332829bcc.jpg?im_w=960', '100', 'Canada', 'Main St', 'Vancouver', 'BC', 'V5U 8M9'),
(1, 'The Cozy Cottage', 'description', 'https://a0.muscache.com/im/pictures/712a31dd-fad0-4882-ba33-783e5e8620e4.jpg?im_w=960', 'https://a0.muscache.com/im/pictures/712a31dd-fad0-4882-ba33-783e5e8620e4.jpg?im_w=960', '100', 'Canada', 'Cottage St', 'Vancouver', 'BC', 'V5U 8M9'),
(2, 'The Mermaids Cove', 'description', 'https://a0.muscache.com/im/pictures/d326e402-0a38-4dfd-b42c-0ace66c0921f.jpg?im_w=960', 'https://a0.muscache.com/im/pictures/d326e402-0a38-4dfd-b42c-0ace66c0921f.jpg?im_w=960', '100', 'Canada', 'Water St', 'Vancouver', 'BC', 'V5U 8M9');

INSERT INTO reservations (start_date, end_date, property_id, guest_id)
VALUES ('2020-01-04', '2020-01-10', 2, 3),
('2020-02-16', '2020-02-20', 1, 1),
('2020-03-20', '2020-03-25', 3, 2);

INSERT INTO property_reviews (guest_id, property_id, reservatiion_id, message)
VALUES (3, 2, 1, 'message'),
(1, 1, 2, 'message'),
(2, 3, 3, 'message');
