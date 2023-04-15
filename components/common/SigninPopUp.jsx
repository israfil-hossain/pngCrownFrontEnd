import { useState } from 'react';

const SignInPopup = ({ onClose, onSignIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const handleSubmit = (event) => {
    event.preventDefault();
    onSignIn(email, password);
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Please sign in to continue downloading</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email address</label>
            <input type="email" id="email" name="email" className="border border-gray-400 p-2 w-full rounded-md" value={email} onChange={handleEmailChange} required />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">Password</label>
            <input type="password" id="password" name="password" className="border border-gray-400 p-2 w-full rounded-md" value={password} onChange={handlePasswordChange} required />
          </div>
          <div className="flex justify-between items-center">
            <button type="submit" className="bg-green-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-600">Sign in</button>
            <button type="button" className="text-gray-600 font-semibold" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignInPopup;
