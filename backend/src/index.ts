import express from 'express'
import authRoutes from '../auth/src/routes.ts'

const app = express()
app.use(express.json())

app.use('/auth', authRoutes)

app.get('/health', (_req, res) => res.json({ status: 'ok' }))

app.get('/', (_req, res) => {
  res.send('NexTalk backend — starter')
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Backend listening on ${port}`)
})
