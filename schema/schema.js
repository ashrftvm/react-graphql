const graphql = require('graphql');

//ES6 destructuring
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList
} = graphql;

//Dummy Data
var books = [{
        name: 'The Lost Sun',
        genre: 'Animation',
        id: 1,
        authorId: 3
    },
    {
        name: 'Long Last',
        genre: 'Fantasy',
        id: 2,
        authorId: 1
    },
    {
        name: 'Fire in the Stars',
        genre: 'Sci-Fi',
        id: 3,
        authorId: 3
    },
    {
        name: 'Hell Fire',
        genre: 'Sci-Fi',
        id: 4,
        authorId: 2
    },
    {
        name: 'Die Hard',
        genre: 'Sci-Fi',
        id: 5,
        authorId: 1
    },
    {
        name: 'Batman',
        genre: 'Comics',
        id: 6,
        authorId: 1
    }
];

var authors = [{
    name: 'Ashrf',
    age: 43,
    id: 1
},
{
    name: 'Asif',
    age: 40,
    id: 2
},{
    name: 'JK',
    age: 53,
    id: 3
},
];


const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        genre: {
            type: GraphQLString
        },
        author: {
            type: AuthorType,
            resolve(parent, args){
                //code to get data from DB
                let value = findAuthor(parent.authorId)
                return value;
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        age: {
            type: GraphQLInt
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                let value = books.filter(book => book.authorId === parent.id);
                return value;
            }
        }
    })
});

//Entry point of the graph
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                //code to get data from DB
                let value = null;
                books.forEach((book) => {
                    id = book.id.toString();
                    if (id === args.id) {
                        value = book;
                    }
                });
                return value;
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                //code to get author
                let value = findAuthor(args.id);
                return value;
            }
        }
    }
});


function findAuthor(argId){
    let value = null;
    authors.forEach((author) => {
        let id = author.id.toString();
        let argsId = argId.toString();
        if (id === argsId) {
            value = author;
        }
    });
    return value;
}

module.exports = new GraphQLSchema({
    query: RootQuery
});