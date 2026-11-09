export function login(username, password) { //resolves with user details on success or rejects with an Error object on invalid credentials.
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === 'demo@student.com' && password === 'demo123456') {
        resolve({ username });
      } else {
        reject(new Error('Invalid credentials'));
      }
    }, 500);
  });
}