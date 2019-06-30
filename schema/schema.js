const graphql = require('graphql');

//ES6 destructuring
const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

//Dummy Data
var books = [
    {name: 'Book 1', genre: 'Animation', id: 1},
    {name: 'Book 2', genre: 'Fantasy', id: 2},
    {name: 'Book 3', genre: 'Sci-Fi', id: 3},
    {name: 'Book 4', genre: 'Fantasy', id: 4},
    {name: 'Book 5', genre: 'Animation', id: 5}
];


const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        genre: { type: GraphQLString }
    })
});

//Entry point of the graph
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLString} },
            resolve(parent, args){
                //code to get data from DB
                let value = null;
                books.forEach((book)=>{
                    id = book.id.toString();
                    if(id === args.id){
                        value = book;
                    }
                });
                return value;
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});