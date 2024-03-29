const {
   GraphQLObjectType,
   GraphQLID,
   GraphQLString,
   GraphQLSchema,
   GraphQLList,
   GraphQLNonNull,
   GraphQLEnumType
} = require('graphql');
const Project = require('../models/Project');
const Client = require('../models/Client');

//Client type:
const ClientType = new GraphQLObjectType({
   name: 'Client',
   fields: () => ({
      id: {
         type: GraphQLID,
      },
      name: {
         type: GraphQLString,
      },
      email: {
         type: GraphQLString,
      },
      phone: {
         type: GraphQLString,
      },
   })
})

//Project type:
const ProjectType = new GraphQLObjectType({
   name: 'Project',
   fields: () => ({
      id: {
         type: GraphQLID,
      },
      name: {
         type: GraphQLString,
      },
      description: {
         type: GraphQLString,
      },
      status: {
         type: GraphQLString,
      },
      //Getting the client correspondent project
      client: {
         type: ClientType,
         resolve(parent, args) {
            return Client.findById(parent.clientId)
         }
      }
   })
})

const RootQuery = new GraphQLObjectType({
   name: 'RootQueryType',
   fields: {
      //All clients:
      clients: {
         type: new GraphQLList(ClientType),
         resolve(parent, args) {
            return Client.find();
         }
      },
      //Single client:
      client: {
         type: ClientType,
         args: {
            //Getting a single user with id:
            id: {
               type: GraphQLID,
            }
         },
         //Returning the clients with that id:
         resolve(parent, args) {
            return Client.findById(args.id);
         }
      },
      //All projects:
      projects: {
         type: new GraphQLList(ProjectType),
         resolve(parent, args) {
            return Project.find();
         }
      },
      //Single project:
      project: {
         type: ProjectType,
         args: {
            id: {
               type: GraphQLID,
            }
         },
         resolve(parent, args) {
            return Project.findById(args.id);
         }
      }
   }
})

//Mutations:
const mutation = new GraphQLObjectType({
   name: 'Mutation',
   fields: {
      addClient: {
         type: ClientType,
         //Fields that i want ot add:
         args: {
            name: {
               type: GraphQLNonNull(GraphQLString)
            },
            email: {
               type: GraphQLNonNull(GraphQLString)
            },
            phone: {
               type: GraphQLNonNull(GraphQLString)
            }
         },
         resolve(parent, args) {
            const client = new Client({
               name: args.name,
               email: args.email,
               phone: args.phone
            });
            return client.save();
         }
      },

      //Deleting a client and deleting all the projects along with him:
      deleteClient: {
         type: ClientType,
         args: {
            id: {
               type: GraphQLNonNull(GraphQLString)
            }
         },
         resolve(parent, args) {
            Project.find({ clientId: args.id }).then(projects => {
               projects.forEach(project => {
                  project.remove();
               })
            })
         }
      },

      addProject: {
         type: ProjectType,
         args: {
            name: {
               type: GraphQLNonNull(GraphQLString)
            },
            description: {
               type: GraphQLNonNull(GraphQLString)
            },
            status: {
               type: new GraphQLEnumType({
                  name: 'ProjectStatus',
                  values: {
                     'new': { value: 'Not started' },
                     'progress': { value: 'In progress' },
                     'completed': { value: 'Completed' }
                  }
               }),
               defaultValue: 'Not started'
            },
            clientId: {
               type: GraphQLNonNull(GraphQLID)
            }
         },
         resolve(parent, args) {
            const newProject = new Project({
               name: args.name,
               description: args.description,
               status: args.status,
               clientId: args.clientId
            });
            return newProject.save();
         }
      },

      deleteProject: {
         type: ProjectType,
         args: {
            id: {
               type: GraphQLNonNull(GraphQLString)
            }
         },
         resolve(parent, args) {
            return Project.findByIdAndDelete(args.id)
         }
      },

      updateProject: {
         type: ProjectType,
         args: {
            id: {
               type: GraphQLNonNull(GraphQLString)
            },
            name: {
               type: GraphQLString
            },
            description: {
               type: GraphQLString
            },
            status: {
               type: new GraphQLEnumType({
                  name: 'ProjectStatusUpdated',
                  values: {
                     'new': { value: 'Not started' },
                     'progress': { value: 'In progress' },
                     'completed': { value: 'Completed' }
                  }
               })
            }
         },
         resolve(parent, args) {
            return Project.findByIdAndUpdate(args.id, {
               $set: {
                  name: args.name,
                  description: args.description,
                  status: args.status
               }
            }, { new: true })
         }
      }
   }
})

module.exports = new GraphQLSchema({
   query: RootQuery,
   mutation,
})