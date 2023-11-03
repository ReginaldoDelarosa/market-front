import React from 'react';

function LoginForm({ login, setUsername, setPassword, setRegister }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
      <form className="p-6 bg-white rounded shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">Username</label>
          <input
            id="username"
            className="p-2 mb-4 bg-white rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            onChange={e => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
          <input
            id="password"
            className="p-2 mb-4 bg-white rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            onChange={e => setPassword(e.target.value)}
            type="password"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="p-2 bg-blue-500 text-white rounded shadow hover:bg-blue-400 focus:outline-none focus:shadow-outline"
            onClick={login}
          >
            Login
          </button>
          <button
            className="p-2 bg-blue-500 text-white rounded shadow hover:bg-blue-400 focus:outline-none focus:shadow-outline"
            onClick={() => setRegister(true)}
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}



export default LoginForm;