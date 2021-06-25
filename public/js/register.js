document.getElementById('register').addEventListener('click', event => {
  event.preventDefault()
  axios.post('/api/users/register', {
    username: document.getElementById('username').value,
    email: document.getElementById('email').value,
    DiscordName: document.getElementById('DiscordName').value,
    password: document.getElementById('password').value
  })
    .then(() => {
      axios.post('/api/users/login', {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value
      })
        .then(({ data: token }) => {
          if (token) {
            localStorage.setItem('token', token)
            window.location = '/home'
          } else {
            alert('Invalid username or password')
          }
        })
        .catch(err => console.error(err))
    })
    .catch(err => console.error(err))
})