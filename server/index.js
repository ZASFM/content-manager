require('dotenv').config();
const express=require('express');
const {graphqlHTTP}=require('express-graphql');
const schema=require('./schema/schema');
const connectDB=require('./config/db');
const mongoose=require('mongoose');

const app=express();
const PORT=process.env.PORT||8000;

mongoose.set('strictQuery',false);
connectDB();

app.use('/graphql',graphqlHTTP({
   schema,
   graphiql:process.env.NODE_ENV==='development',

}))

app.listen(PORT,()=>{
   console.log(`App listening on port ${PORT}`);
})