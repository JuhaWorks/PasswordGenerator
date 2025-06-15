import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSpecialChars, setIncludeSpecialChars] = useState(true);
  const [passwordHistory, setPasswordHistory] = useState([]);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // Function to generate password
  const generatePassword = () => {
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const specialChars = '!@#$%^&*()_+[]{}|;:,.<>?';

    let charSet = '';
    if (includeLowercase) charSet += lowercase;
    if (includeUppercase) charSet += uppercase;
    if (includeNumbers) charSet += numbers;
    if (includeSpecialChars) charSet += specialChars;

    let newPassword = '';
    for (let i = 0; i < length; i++) {
      newPassword += charSet.charAt(Math.floor(Math.random() * charSet.length));
    }

    setPassword(newPassword);
    setPasswordHistory((prevHistory) => [newPassword, ...prevHistory.slice(0, 4)]); // Store last 5 passwords
  };

  // Function to copy password to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    alert('Password copied to clipboard!');
  };

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  // Function to calculate password strength
  const calculateStrength = () => {
    let strength = 0;
    if (password.length >= 12) strength++;
    if (includeUppercase) strength++;
    if (includeLowercase) strength++;
    if (includeNumbers) strength++;
    if (includeSpecialChars) strength++;

    return (strength / 5) * 100;
  };

  // Disable generation if no options are selected
  const isGenerationDisabled =
    !includeUppercase && !includeLowercase && !includeNumbers && !includeSpecialChars;

  return (
    <div className="App">
      <h1>Password Generator</h1>
      <div>
        <label>Length: </label>
        <input
          type="number"
          min="6"
          max="20"
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
        />
        <div className="progress-bar-container">
          <label>Password Length: {length}</label>
          <progress
            value={length}
            max="20"
            className="progress-bar"
            style={{ width: '100%' }}
          />
        </div>
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            checked={includeUppercase}
            onChange={() => setIncludeUppercase(!includeUppercase)}
          />
          Include Uppercase
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={includeLowercase}
            onChange={() => setIncludeLowercase(!includeLowercase)}
          />
          Include Lowercase
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={includeNumbers}
            onChange={() => setIncludeNumbers(!includeNumbers)}
          />
          Include Numbers
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={includeSpecialChars}
            onChange={() => setIncludeSpecialChars(!includeSpecialChars)}
          />
          Include Special Characters
        </label>
      </div>

      <button onClick={generatePassword} disabled={isGenerationDisabled}>Generate Password</button>

      <div>
        <h2>Generated Password:</h2>
        <p>{isPasswordVisible ? password : '••••••••••'}</p>
        <button onClick={togglePasswordVisibility}>
          {isPasswordVisible ? 'Hide Password' : 'Show Password'}
        </button>
      </div>

      <div>
        <h3>Password Strength: {calculateStrength()}%</h3>
        <div className="progress-bar-container">
          <progress
            value={calculateStrength()}
            max="100"
            className="progress-bar"
            style={{ width: '100%' }}
          />
        </div>
      </div>

      <button onClick={copyToClipboard} disabled={!password}>Copy to Clipboard</button>

      <div>
        <h2>Password History:</h2>
        <ul>
          {passwordHistory.map((pw, index) => (
            <li key={index}>{pw}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
