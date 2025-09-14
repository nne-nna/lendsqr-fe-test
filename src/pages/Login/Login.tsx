import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.scss'
import { loginIllustration, logo } from '../../assets'

interface PasswordValidation {
  minLength: boolean
  hasUppercase: boolean
  hasLowercase: boolean
  hasNumber: boolean
  hasSpecialChar: boolean
}

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [error, setError] = useState('')
  const [passwordTouched, setPasswordTouched] = useState(false)
  
  const navigate = useNavigate()

  const validatePassword = (password: string): PasswordValidation => {
    return {
      minLength: password.length >= 8,
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
    }
  }

  const isPasswordValid = (validation: PasswordValidation): boolean => {
    return Object.values(validation).every(Boolean)
  }

  const validation = validatePassword(password)
  const passwordIsValid = isPasswordValid(validation)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email || !password) { 
      setError('Email and password are required')
      return 
    }

    if (!passwordIsValid) {
      setError('Password does not meet security requirements')
      setPasswordTouched(true)
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address')
      return
    }

    localStorage.setItem('lendsqr:auth', JSON.stringify({ email }))
    navigate('/users')
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
    if (error) setError('')
  }

  const handlePasswordBlur = () => {
    setPasswordTouched(true)
  }

  return (
    <div className="login">
      <div className="login__brand">
        <img src={logo} alt="Lendsqr Logo" className="login__logo" />
        <span className="custom-font login__brand-text">lendsqr</span>
      </div>
      
      <div className="login__left">
        <div className="login__illustration">
          <img src={loginIllustration} alt="Login Illustration" className="login__illustration-image" />
        </div>
      </div>
      
      <div className="login__panel">
        <h1 className="custom-font login__title">Welcome!</h1>
        <p className="custom-font login__subtitle">Enter details to login.</p>

        <form onSubmit={submit} className="login__form" aria-label="login-form">
          <input
            type="email"
            placeholder="Email"
            className="input"
            value={email}
            onChange={e => setEmail(e.target.value)} />

          <div className="password-field">
            <input
              type={show ? 'text' : 'password'}
              placeholder="Password"
              className={`input ${passwordTouched && !passwordIsValid ? 'input--invalid' : ''}`}
              value={password}
              onChange={handlePasswordChange}
              onBlur={handlePasswordBlur} />
            <button type="button" className="password-field__toggle" onClick={() => setShow(s => !s)}>
              {show ? 'HIDE' : 'SHOW'}
            </button>
          </div>

          {passwordTouched && password && (
            <div className="password-validation">
              <p className="password-validation__title">Password must contain:</p>
              <ul className="password-validation__list">
                <li className={`password-validation__item ${validation.minLength ? 'valid' : 'invalid'}`}>
                  At least 8 characters
                </li>
                <li className={`password-validation__item ${validation.hasUppercase ? 'valid' : 'invalid'}`}>
                  One uppercase letter (A-Z)
                </li>
                <li className={`password-validation__item ${validation.hasLowercase ? 'valid' : 'invalid'}`}>
                  One lowercase letter (a-z)
                </li>
                <li className={`password-validation__item ${validation.hasNumber ? 'valid' : 'invalid'}`}>
                  One number (0-9)
                </li>
                <li className={`password-validation__item ${validation.hasSpecialChar ? 'valid' : 'invalid'}`}>
                  One special character (!@#$%^&*)
                </li>
              </ul>
            </div>
          )}

          <a className="login__forgot" href="#">FORGOT PASSWORD?</a>
          {error && <div className="login__error" role="alert">{error}</div>}
          <button className="btn" type="submit">LOG IN</button>
        </form>
      </div>
    </div>
  )
}

export default Login