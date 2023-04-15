// utils/auth.js
import cookies from 'next-cookies'

export const requireAuthentication = (WrappedComponent) => {
  const Wrapper = (props) => {
    const { token } = cookies(props)

    if (!token) {
      // Redirect to sign in page if user is not authenticated
      if (typeof window !== 'undefined') {
        window.location.href = '/signin'
      }
      return null
    }

    // Render the wrapped component if user is authenticated
    return <WrappedComponent {...props} />
  }

  return Wrapper
}
