import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import Login from '@/pages/Login/Login'

describe('Login Component', () => {
  it('shows error when fields are empty', async () => {
    render(<MemoryRouter><Login /></MemoryRouter>)
    await userEvent.click(screen.getByRole('button', { name: /log in/i }))
    expect(screen.getByRole('alert')).toHaveTextContent(/required/i)
  })

  it('accepts an email and password', async () => {
    render(<MemoryRouter><Login /></MemoryRouter>)
    await userEvent.type(screen.getByPlaceholderText(/email/i), 'test@example.com')
    await userEvent.type(screen.getByPlaceholderText(/password/i), 'ValidPass123!')
    expect((screen.getByPlaceholderText(/email/i) as HTMLInputElement).value).toBe('test@example.com')
    expect((screen.getByPlaceholderText(/password/i) as HTMLInputElement).value).toBe('ValidPass123!')
  })

  it('shows password validation when password field is focused and blurred', async () => {
    render(<MemoryRouter><Login /></MemoryRouter>)
    const passwordInput = screen.getByPlaceholderText(/password/i)
    
    await userEvent.type(passwordInput, 'weak')
    await userEvent.tab() 
    
    expect(screen.getByText('Password must contain:')).toBeInTheDocument()
    expect(screen.getByText('At least 8 characters')).toBeInTheDocument()
  })

  it('validates password requirements correctly', async () => {
    render(<MemoryRouter><Login /></MemoryRouter>)
    const passwordInput = screen.getByPlaceholderText(/password/i)

    await userEvent.type(passwordInput, 'weak')
    await userEvent.tab()
    
    expect(screen.getByText('At least 8 characters').closest('li')).toHaveClass('invalid')
    expect(screen.getByText('One uppercase letter (A-Z)').closest('li')).toHaveClass('invalid')
    expect(screen.getByText('One number (0-9)').closest('li')).toHaveClass('invalid')
    expect(screen.getByText('One special character (!@#$%^&*)').closest('li')).toHaveClass('invalid')
  })

  it('shows valid indicators for strong password', async () => {
    render(<MemoryRouter><Login /></MemoryRouter>)
    const passwordInput = screen.getByPlaceholderText(/password/i)
    
    await userEvent.clear(passwordInput)
    await userEvent.type(passwordInput, 'StrongPass123!')
    await userEvent.tab()
    
    expect(screen.getByText('At least 8 characters').closest('li')).toHaveClass('valid')
    expect(screen.getByText('One uppercase letter (A-Z)').closest('li')).toHaveClass('valid')
    expect(screen.getByText('One lowercase letter (a-z)').closest('li')).toHaveClass('valid')
    expect(screen.getByText('One number (0-9)').closest('li')).toHaveClass('valid')
    expect(screen.getByText('One special character (!@#$%^&*)').closest('li')).toHaveClass('valid')
  })

  it('prevents login with invalid password', async () => {
    const mockNavigate = jest.fn()
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useNavigate: () => mockNavigate
    }))

    render(<MemoryRouter><Login /></MemoryRouter>)
    
    await userEvent.type(screen.getByPlaceholderText(/email/i), 'test@example.com')
    await userEvent.type(screen.getByPlaceholderText(/password/i), 'weak')
    await userEvent.click(screen.getByRole('button', { name: /log in/i }))
    
    expect(screen.getByRole('alert')).toHaveTextContent(/security requirements/i)
    expect(mockNavigate).not.toHaveBeenCalled()
  })

  it('shows error for invalid email format', async () => {
    render(<MemoryRouter><Login /></MemoryRouter>)
    
    await userEvent.type(screen.getByPlaceholderText(/email/i), 'invalid-email')
    await userEvent.type(screen.getByPlaceholderText(/password/i), 'StrongPass123!')
    await userEvent.click(screen.getByRole('button', { name: /log in/i }))
    
    expect(screen.getByRole('alert')).toHaveTextContent(/valid email address/i)
  })

  it('allows login with valid credentials', async () => {
    const mockNavigate = jest.fn()
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useNavigate: () => mockNavigate
    }))

    render(<MemoryRouter><Login /></MemoryRouter>)
    
    await userEvent.type(screen.getByPlaceholderText(/email/i), 'test@example.com')
    await userEvent.type(screen.getByPlaceholderText(/password/i), 'StrongPass123!')
    await userEvent.click(screen.getByRole('button', { name: /log in/i }))
    
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  it('toggles password visibility', async () => {
    render(<MemoryRouter><Login /></MemoryRouter>)
    const passwordInput = screen.getByPlaceholderText(/password/i)
    const toggleButton = screen.getByRole('button', { name: /show/i })
    
    expect(passwordInput).toHaveAttribute('type', 'password')
    
    await userEvent.click(toggleButton)
    expect(passwordInput).toHaveAttribute('type', 'text')
    expect(toggleButton).toHaveTextContent('HIDE')
    
    await userEvent.click(toggleButton)
    expect(passwordInput).toHaveAttribute('type', 'password')
    expect(toggleButton).toHaveTextContent('SHOW')
  })

  it('clears error when user starts typing after validation error', async () => {
    render(<MemoryRouter><Login /></MemoryRouter>)
    
    await userEvent.click(screen.getByRole('button', { name: /log in/i }))
    expect(screen.getByRole('alert')).toBeInTheDocument()

    await userEvent.type(screen.getByPlaceholderText(/password/i), 'a')
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })
})