import { Prisma, PrismaClient } from '@prisma/client'
import express from 'express'

const jwt = require("jsonwebtoken");

const prisma = new PrismaClient()
var cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json({limit: '50mb'}));
app.use(express.static('dist/product-browser'))


// JWT Handler
//Passed
app.post("/api/login", async (req, res, next) => {
  let { username, password } = req.body;
  
  if (username != "test" || password != "test") {
	const error = new Error("Error! Something went wrong.")
    return next(error)
  } else {
	let token;
  try {
    //Creating jwt token
    token = jwt.sign(
      { userId: "test"},
      "secretkeyappearshere",
      { expiresIn: "1h" }
    );
  } catch (err) {
    console.log(err);
    const error = new Error("Error! Something went wrong.");
    return next(error);
  }
 
  res.status(200).json({
      success: true,
      data: {
        userId: "test",
        token: token,
      },
    });
  }
});

app.post(`/api/product`, (req, res, next)=> {
	let token = req.headers["x-access-token"];
    //Authorization: 'Bearer TOKEN'
    if(!token)
    {
        res.status(403).json({success:false, message: "Error! Token was not provided."});
    }
    //Decoding the token
	try{
		const decodedToken = jwt.verify(token,"secretkeyappearshere" );
	} catch (err) {
		return res.status(401).send("Invalid Token");
	}
	next();
})


// RESTfull API for CRUD operations
app.post(`/api/product`, async (req, res) => {
  const { name, description, image } = req.body
  
  const result = await prisma.product.create({
    data: {
      name,
      description,
      image,
	},
  })
  res.json(result)
})

//Passed
app.put('/api/product/:id', async (req, res) => {
  const { id } = req.params
  const { name, description, image } = req.body

  try {
    const updatedProduct = await prisma.product.update({
      where: { id: Number(id) },
      data: {
        name: String(name),
		description: String(description),
		image: image,
      },
    })

    res.json(updatedProduct)
  } catch (error) {
    res.json({ error: `Product with ID ${id} does not exist in the database` })
  }
})

//Passed
app.delete(`/api/product/:id`, async (req, res) => {
  const { id } = req.params
  const product = await prisma.product.delete({
    where: {
      id: Number(id),
    },
  })
  res.json(product)
})

//Passed
app.get('/api/products', async (req, res) => {
  const products = await prisma.product.findMany()
  res.json(products)
})

//Passed
app.get('/api/product/:id', async (req, res) => {
  const { id } = req.params

  const product = await prisma.product.findUnique({
    where: { id: Number(id) },
  })
  res.json(product)
})


const server = app.listen(3000, () =>
  console.log(`
🚀 Server ready at: http://localhost:3000
⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api`),
)
