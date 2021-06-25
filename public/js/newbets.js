document.getElementById('placeBet').addEventListener('click', event => {
  event.preventDefault()

  axios.post('/api/bets', {
    name: document.getElementById('name').value,
    description: document.getElementById('description').value,
    creator_value: document.getElementById('value').value,
    for_value: document.getElementById('value').value,
    against_value: 0
  }, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  })
    .then((post) => {
      console.log('ping')
      window.location = `/dashboard`
    })
    .catch(err => console.log(err))
})