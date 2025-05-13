import { SignIn } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import Link from 'next/link'

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-dark-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="text-3xl font-bold text-primary-300 hover:text-primary-400 transition-colors">
            Write It Down
          </Link>
          <p className="text-gray-300 mt-2">Sign in to your account</p>
        </div>
        <div className="bg-dark-200 rounded-xl shadow-xl p-8">
          <SignIn
            appearance={{
              baseTheme: dark,
              elements: {
                formButtonPrimary: 'bg-primary-600 hover:bg-primary-700',
                footerActionLink: 'text-primary-400 hover:text-primary-300',
              },
            }}
            routing="path"
            path="/sign-in"
            signUpUrl="/sign-up"
            redirectUrl="/journal"
          />
        </div>
      </div>
    </div>
  )
} 