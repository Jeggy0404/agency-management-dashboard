import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { store } from '@/app/store'
import { router } from '@/app/router'

describe('app smoke', () => {
  localStorage.removeItem('ap_token')
  localStorage.removeItem('ap_user')

  it('renders login screen when not authed', async () => {
    render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    )

    // Start at root => redirects => /auth/login
    expect(await screen.findByText('Sign in')).toBeInTheDocument()
  })
})
