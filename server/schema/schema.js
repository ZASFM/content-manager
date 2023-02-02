const {projects, clients}=require('../mockData');
const {GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList}=require('graphql');

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

//Project type:
const ProjectType=new GraphQLObjectType({
   name:'Project',
   fields:()=>({
      id:{
         type: GraphQLID,
      },
      name:{
         type:GraphQLString,
      },
      description:{
         type:GraphQLString,
      },
      status:{
         type:GraphQLString,
      },
      //Getting the client correspondent project
      client:{
         type:ClientType,
         resolve(parent,args){
            return clients.find(client=>client.id===parent.clientId)
         }
      }
   })
})

const RootQuery=new GraphQLObjectType({
   name:'RootQueryType',
   fields:{
      //All clients:
      clients:{
         type: new GraphQLList(ClientType),
         resolve(parent,args){
            return clients;
         }
      },
      //Single client:
      client:{
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
      },
      //All projects:
      projects:{
         type:new GraphQLList(ProjectType),
         resolve(parent,args){
            return projects
         }
      },
      //Single project:
      project:{
         type:ProjectType,
         args:{
            id:{
               type:GraphQLID,
            }
         },
         resolve(parent,args){
            return projects.find(project=>project.id===args.id)
         }
      }
   }
})

module.exports=new GraphQLSchema({
   query:RootQuery
})