import express from 'express'
import routes from './routes'

const app = express()
app.use(express.json())
app.use('/auth', routes)

app.get('/health', (_req, res) => res.json({ status: 'ok' }))

const port = process.env.PORT || 4000
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Auth service listening on ${port}`)
})
