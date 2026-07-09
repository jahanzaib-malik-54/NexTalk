import type { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import prisma from './db.ts'
import { registerSchema, loginSchema } from './validation.ts'

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret'

// Prisma client will manage connections; migrations will create tables

function validationError(res: Response, err: any) {
  return res.status(400).json({ error: 'validation', details: err.errors || err.message })
}

export async function register(req: Request, res: Response) {
  const parse = registerSchema.safeParse(req.body)
  if (!parse.success) return validationError(res, parse.error)
  const { email, password } = parse.data
  const hash = await bcrypt.hash(password, 10)
  try {
    const user = await prisma.user.create({ data: { email, passwordHash: hash } })
    return res.status(201).json({ id: user.id, email: user.email, created_at: user.createdAt })
  } catch (err: any) {
    // Prisma unique constraint
    if (err.code === 'P2002' || err?.meta?.target?.includes('email')) {
      return res.status(409).json({ error: 'user_exists' })
    }
    // eslint-disable-next-line no-console
    console.error(err)
    return res.status(500).json({ error: 'internal' })
  }
}

export async function login(req: Request, res: Response) {
  const parse = loginSchema.safeParse(req.body)
  if (!parse.success) return validationError(res, parse.error)
  const { email, password } = parse.data
  try {
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) return res.status(401).json({ error: 'invalid_credentials' })
    const match = await bcrypt.compare(password, user.passwordHash)
    if (!match) return res.status(401).json({ error: 'invalid_credentials' })
    const token = jwt.sign({ sub: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' })
    return res.json({ token })
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err)
    return res.status(500).json({ error: 'internal' })
  }
}
