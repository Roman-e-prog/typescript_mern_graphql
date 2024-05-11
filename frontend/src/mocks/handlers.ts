import { log } from 'console';
import { graphql, rest} from 'msw'
 const mockAuthCollection = [
    {
        vorname:"Test",
        nachname:"Tester",
        username:"TestUser",
        email:"teestUser@test.de",
        password:"123456"
    },
 ]
 const mockMyPersonCollection = [
    {
        id:1,
        myPerson:"Lorem Ipsum",
    },
 ]
 const mockUploadImages = [

 ]
export const handlers = [
    graphql.query('graphql', async (req, res, ctx)=>{
        const data = await req.json();
        log(data, 'I get data')
        log(mockAuthCollection, 'here database')
        mockAuthCollection.push(data);
        return res(
            ctx.status(200),
            ctx.data(data)
        )
    }),
    graphql.mutation('addUebermich', async (req, res, ctx)=>{
        const {data} = req.variables;
        mockMyPersonCollection.push(data);
        log(data, 'here data')
        return res(
            ctx.status(200),
            ctx.data(data)
        )
    }),
    graphql.query('getUebermichs', async (req, res, ctx)=>{
        log(mockMyPersonCollection, 'this is what I send')
        return res(
            ctx.status(200),
            ctx.data({ uebermichs: mockMyPersonCollection })
        )
    }),
    graphql.query('getUebermich', async (req, res, ctx)=>{
        const id = req.id
        log(id)
        log(mockMyPersonCollection, 'this is what I send')
        return res(
            ctx.status(200),
            ctx.data({ uebermichs: mockMyPersonCollection })
        )
    }),
    rest.post('http://localhost:5000/api/upload/', async (req, res, ctx)=>{
        const data = await req.json();
        log(data)
        const uploadData = {
            images: "www.cloudinary.com/hallo.jpg",
            cloudinary_id:"1234567"
        }
        return res(
            ctx.status(200),
            ctx.json(uploadData)
        )
    })
    //   graphql.mutation('CreatePost', ({ query, variables }) => {
    //     console.log(
    //       'Intercepted a "CreatePost" GraphQL mutation:',
    //       query,
    //       variables
    //     )
    //   }),
    //   graphql.mutation('DeletePost', ({ query, variables }) => {
    //     console.log('Intercepted a "DeletePost" GraphQL mutation', query, variables)
    //   }),
]