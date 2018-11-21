
db.getCollection('movies').insertMany([
    /* 1 */
    {
        "_id" : ObjectId("5bf546401029fb45defe1541"),
        "Title" : "Interstellar",
        "Year" : "2014",
        "Plot" : "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
        "Poster" : "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
        "Genre" : "Adventure, Drama, Sci-Fi",
        "Metascore" : "80",
        "Ratings" : [
            {
                "Source" : "admin",
                "Value" : "Best movie"
            }
        ]
    },
    /* 2 */
    {
        "_id" : ObjectId("5bf5469a1029fb45defe1542"),
        "Title" : "Robin Hood",
        "Genre" : "Action , Adventure , Thriller",
        "Plot" : "A war-hardened Crusader and his Moorish commander mount an audacious revolt against the corrupt English crown in a thrilling action-adventure packed with gritty battlefield exploits, mind-blowing fight choreography, and a timeless romance.",
        "Metascore" : "35",
        "Year" : "2018",
        "Poster" : "https://m.media-amazon.com/images/M/MV5BOGQzZDM0NGUtZGE1NS00ZjQwLTk0N2EtMWI0NTgxYTkwYWQ4XkEyXkFqcGdeQXVyNDMzMzI5MjM@._V1_SY1000_CR0,0,648,1000_AL_.jpg"
    }
]);

db.getCollection('users').insertMany([
    /* 1 */
    {
        "_id" : ObjectId("5bf53a7f9e1d0d43d50a4645"),
        "login" : "admin",
        "password" : "admin"
    }
]);


// display the final initial data
db.getCollection('movies').find({});