import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

vi.mock('@nextalk/sdk', () => ({
  login: vi.fn(async () => ({ token: 'fake-token' })),
  register: vi.fn(async () => ({ success: true })),
}))

describe('App', () => {
  it('renders login form and buttons', () => {
    render(<App />)

    expect(screen.getByText(/NexTalk/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument()
  })

  it('shows token after login', async () => {
    render(<App />)
    const user = userEvent.setup()
    await user.type(screen.getByPlaceholderText(/you@example.com/i), 'user@example.com')
    await user.type(screen.getByPlaceholderText(/Enter a secure password/i), 'password123')
    await user.click(screen.getByRole('button', { name: /login/i }))

    expect(await screen.findByText(/fake-token/i)).toBeInTheDocument()
  })
})
