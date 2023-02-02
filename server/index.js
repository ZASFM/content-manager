require('dotenv').config();
const express=require('express');
const {graphqlHTTP}=require('express-graphql');
const schema=require('./schema/schema');

const app=express();
const PORT=process.env.PORT||8000;

app.use('/graphql',graphqlHTTP({
   schema,
   graphiql:process.env.NODE_ENV==='development',

}))

app.listen(PORT,()=>{
   console.log(`App listening on port ${PORT}`);
})