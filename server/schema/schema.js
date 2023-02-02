const {projects, clients}=require('../mockData');
const {GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema}=require('graphql');

//Client type:
const ClientType=new GraphQLObjectType({
   name:'Client',
   fields:()=>({
      id:{
         type:GraphQLID,
      },
      name:{
         type:GraphQLString,
      },
      email:{
         type:GraphQLString,
      },
      phone:{
         type:GraphQLString,
      },
   })
})

const RootQuery=new GraphQLObjectType({
   name:'RootQueryType',
   fields:{
      clients:{
         type:ClientType,
         args:{
            //Getting a single user with id:
            id:{
               type:GraphQLID,
            }
         },
         //Returning the clients with that id:
         resolve(parent,args){
            return clients.find(client=>client.id===args.id)
         }
      }
   }
})

module.exports=new GraphQLSchema({
   query:RootQuery
})