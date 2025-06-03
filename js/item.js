fetch('http://example.com/data.txt')
  .then(response => response.text())
  .then(data => console.log(data))
  .catch(error => console.log(error));
// ...........................