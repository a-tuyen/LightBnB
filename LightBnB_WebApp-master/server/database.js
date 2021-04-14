const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});

const properties = require('./json/properties.json');
const users = require('./json/users.json');

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  return pool.query(`
  SELECT *
  FROM users
  WHERE email = $1;`, [email])
  .then(res => {
    if (res.rows.length === 0) {
      return null;
    }
    console.log('userwithemail:', res.rows[0])
    return Promise.resolve(res.rows[0]);
  })
}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  return pool.query(`
  SELECT *
  FROM users
  WHERE id =$1;`, [id])
  .then(res => {
    if (res.rows.length === 0) {
      return null;
    }
    console.log('getuserwithID:', res.rows[0]);
    return Promise.resolve(res.rows[0]);
  })

}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  pool.query(`
  INSERT INTO users (name, email, password)
  VALUES ($1, $2, $3)
  RETURNING *;
  `, [user.name, user.email, user.password])
  .then(res => {
    console.log('addUser:', res.rows[0]);
    return Promise.resolve(res.rows[0]);
  })
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  return pool.query(`
  SELECT reservations.*, properties.*, avg(property_reviews.rating) as average_rating
  FROM reservations
  JOIN properties ON reservations.property_id = properties.id
  JOIN property_reviews ON properties.id = property_reviews.property_id 
  WHERE reservations.guest_id = $1
  GROUP BY properties.id, reservations.id
  HAVING end_date < now()::date
  ORDER BY start_date
  LIMIT $2;
  `, [guest_id, limit])
  .then(res => {
    console.log('reservations:', res.rows);
    return Promise.resolve(res.rows);
  });
  
}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */

const getAllProperties = function(options, limit = 10) {
const queryString =`
SELECT *
FROM properties
LIMIT $1;
`;
const values = [limit];
return pool.query(queryString, values)
.then(res => res.rows);

}


exports.getAllProperties = getAllProperties;

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  return pool.query(`
  INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, street, city, province, post_code, country, parking_spaces, number_of_bathrooms, number_of_bedrooms)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
  RETURNING *;
  `, [property.owner_id, property.title, property.description, property.thumbnail_photo_url, property.cover_photo_url, (property.cost_per_night * 100), property.street, property.city, property.province, property.post_code, property.country, property.parking_spaces, property.number_of_bathrooms, property.number_of_bedrooms])
  .then(res => {
    console.log('property:', res.rows[0]);
   return Promise.resolve(res.rows[0]); 
  })
}
exports.addProperty = addProperty;

// INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, country, street, city, province, post_code)
// VALUES (3, 'The Hobbit Hole', 'description', 'https://a0.muscache.com/im/pictures/924798e4-2fe1-47de-9636-947332829bcc.jpg?im_w=960', 'https://a0.muscache.com/im/pictures/924798e4-2fe1-47de-9636-947332829bcc.jpg?im_w=960', '100', 'Canada', 'Main St', 'Vancouver', 'BC', 'V5U 8M9'),
// (1, 'The Cozy Cottage', 'description', 'https://a0.muscache.com/im/pictures/712a31dd-fad0-4882-ba33-783e5e8620e4.jpg?im_w=960', 'https://a0.muscache.com/im/pictures/712a31dd-fad0-4882-ba33-783e5e8620e4.jpg?im_w=960', '100', 'Canada', 'Cottage St', 'Vancouver', 'BC', 'V5U 8M9'),
// (2, 'The Mermaids Cove', 'description', 'https://a0.muscache.com/im/pictures/d326e402-0a38-4dfd-b42c-0ace66c0921f.jpg?im_w=960', 'https://a0.muscache.com/im/pictures/d326e402-0a38-4dfd-b42c-0ace66c0921f.jpg?im_w=960', '100', 'Canada', 'Water St', 'Vancouver', 'BC', 'V5U 8M9');


// const addUser =  function(user) {
//   pool.query(`
//   INSERT INTO users (name, email, password)
//   VALUES ($1, $2, $3)
//   RETURNING *;
//   `, [user.name, user.email, user.password])
//   .then(res => {
//     console.log('addUser:', res.rows[0]);
//     return Promise.resolve(res.rows[0]);
//   })
// }