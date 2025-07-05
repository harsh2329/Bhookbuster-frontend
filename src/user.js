// ...existing code...
try {
  const response = await axios.get('http://localhost:3000/api/v1/user');
  // ...existing code...
} catch (error) {
  console.error('Error fetching user data:', error);
  // Handle the error appropriately
}
// ...existing code...
try {
  const response = await axios.get('http://localhost:3000/api/v1/me');
  // ...existing code...
} catch (error) {
  console.error('Error fetching user data:', error);
  // Handle the error appropriately
}
// ...existing code...