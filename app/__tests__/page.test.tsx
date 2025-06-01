import { render, screen } from '@testing-library/react'
import LandingPage from '../page'
import { useUser } from '@clerk/nextjs'

// Mock the Clerk hooks
jest.mock('@clerk/nextjs', () => ({
  useUser: jest.fn(),
}))

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}))

describe('LandingPage', () => {
  beforeEach(() => {
    // Mock the useUser hook to return a non-authenticated user
    ;(useUser as jest.Mock).mockReturnValue({
      isLoaded: true,
      user: null,
    })
  })

  it('renders the main heading', () => {
    render(<LandingPage />)
    expect(screen.getByText('Write It Down')).toBeInTheDocument()
  })

  it('renders the main description', () => {
    render(<LandingPage />)
    expect(
      screen.getByText(
        'Capture your thoughts, track your mood, and preserve your memories in a beautiful, private journal.'
      )
    ).toBeInTheDocument()
  })

  it('renders the feature cards', () => {
    render(<LandingPage />)
    expect(screen.getByText('Private & Secure')).toBeInTheDocument()
    expect(screen.getByText('Track Your Mood')).toBeInTheDocument()
    expect(screen.getByText('Add Images')).toBeInTheDocument()
  })

  it('renders the call-to-action buttons', () => {
    render(<LandingPage />)
    expect(screen.getByText('Get Started')).toBeInTheDocument()
    expect(screen.getByText('Create Account')).toBeInTheDocument()
  })
}) 