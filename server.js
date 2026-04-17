const express = require("express")
const fs = require("fs")

const app = express()

app.use(express.json())
app.use(express.static("public"))

app.post("/check-password", (req, res) => {
  const data = JSON.parse(fs.readFileSync("passwords.json", "utf8"))
  const entry = data[req.body.password]

  if (!entry) {
    return res.json({ valid: false })
  }

  if (entry.redirect) {
    return res.json({
      valid: true,
      redirect: entry.redirect
    })
  }

  return res.json({
    valid: true,
    corner: entry.corner,
    clue: entry.clue,
    text: entry.text
  })
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`)
})