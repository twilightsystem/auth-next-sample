import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import jwt from 'express-jwt'
import jsonwebtoken from 'jsonwebtoken'

// Create app
const app = express()

// Install middleware
app.use(cookieParser())
app.use(express.json())

app.use(helmet())
app.use(cors())

// JWT middleware
app.use(
  jwt({
    secret: 'dummy',
    algorithms: ['sha1', 'RS256', 'HS256']
  }).unless({
    path: ['/api/auth/login', '/api/auth/refresh']
  })
)

// Refresh tokens
const refreshTokens = {}

// -- Routes --

// [POST] /login
app.post('/login', (req, res) => {

  const { username, password } = req.body
  const valid = username.length && password === '123'
  const expiresIn = 30 * 60
  const refreshToken =
    Math.floor(Math.random() * (1000000000000000 - 1 + 1)) + 1
    
  if (!valid) {
    throw new Error('Invalid username or password')
  }

  let scape = ['test', 'user']
  if (username === 'admin') {
    scape.push('admin')
  }

  const accessToken = jsonwebtoken.sign(
    {
      username,
      picture: 'https://github.com/nuxt.png',
      name: 'User ' + username,
      scope: scape
    },
    'dummy',
    {
      expiresIn
    }
  )

  refreshTokens[refreshToken] = {
    accessToken,
    user: {
      username,
      picture: 'https://github.com/nuxt.png',
      name: 'User ' + username
    }
  }

  res.json({
    status: 'Authenticated',
    token: {
      accessToken,
      refreshToken
    }
  })
})

app.post('/refresh', (req, res) => {
  const { refreshToken } = req.body

  if (refreshToken in refreshTokens) {
    const user = refreshTokens[refreshToken].user
    const expiresIn = 30 * 60
    const newRefreshToken =
      Math.floor(Math.random() * (1000000000000000 - 1 + 1)) + 1
    delete refreshTokens[refreshToken]
    const accessToken = jsonwebtoken.sign(
      {
        user: user.username,
        picture: 'https://github.com/nuxt.png',
        name: 'User ' + user.username,
        scope: ['test', 'user']
      },
      'dummy',
      {
        expiresIn
      }
    )

    refreshTokens[newRefreshToken] = {
      accessToken,
      user
    }

    res.json({
      token: {
        status: 'Refreshed',
        accessToken,
        refreshToken: newRefreshToken
      }
    })
  } else {
    res.sendStatus(401)
  }
})

// [GET] /user
app.get('/user', (req, res) => {
  console.log(req.user)
  res.json({ user: req.user })
})

// [POST] /logout
app.post('/logout', (_req, res) => {
  res.json({
    status: 'Logout'
  })
})

// Error handler
app.use((err, _req, res) => {
  console.error(err) // eslint-disable-line no-console
  res.status(401).send(err + '')
})

// -- export app --
export default {
  path: '/api/auth',
  handler: app
}
