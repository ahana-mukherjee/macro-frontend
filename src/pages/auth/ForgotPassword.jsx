import { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../components/common/Logo';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess(false);

    try {
      // This will be replaced with actual API call
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      if (!response.ok) {
        throw new Error('Failed to send password reset email');
      }

      setSuccess(true);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-6">
      <div className="w-full max-w-md">
        <div className="mb-10 flex justify-center">
          <Logo width={180} />
        </div>
        
        <div className="bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-700">
          <h1 className="text-3xl font-bold text-white mb-3 text-center">Forgot Password</h1>
          <p className="text-gray-400 mb-6 text-center">
            Enter your email and we'll send you a link to reset your password
          </p>
          
          {error && (
            <div className="bg-red-900/30 border border-red-500 text-red-300 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}
          
          {success ? (
            <div className="text-center">
              <div className="bg-green-900/30 border border-green-500 text-green-300 px-4 py-3 rounded-lg mb-6">
                Password reset link has been sent to your email.
              </div>
              <p className="text-gray-300 mb-4">
                Check your inbox for instructions to reset your password.
              </p>
              <Link 
                to="/login" 
                className="inline-block text-indigo-400 hover:text-indigo-300 font-medium"
              >
                Return to Sign In
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="email" className="block text-gray-300 mb-2 font-medium">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="you@example.com"
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 disabled:opacity-70"
              >
                {isLoading ? 'Sending...' : 'Send Reset Link'}
              </button>
              
              <div className="mt-6 text-center">
                <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-medium">
                  Back to Sign In
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;