const express = require("express")
const app = express()
const port = 3000

app.use(express.static("."))

app.listen(port, () => {
  console.log(`Demo site running http://localhost:${port}`)
})


