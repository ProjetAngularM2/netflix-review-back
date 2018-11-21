/**
 * You can use it with mongo-shell or a tool like Robo3T
 */
db.getCollection('users').createIndex({ login: 1}, { unique: true });
db.getCollection('movies').createIndex({ Title: 1}, { unique: true });