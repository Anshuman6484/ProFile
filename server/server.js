import app from './app.js'

const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`Server is listening to requests on port ${port}...`)
})
