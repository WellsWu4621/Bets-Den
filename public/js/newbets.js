document.getElementById('placeBet').addEventListener('click', event => {
  event.preventDefault()
  axios.get('/api/user/profile', {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  })
    .then(({ data: user }) => {
      let amount = parseInt(document.getElementById('value').value)
      if (user.Tokens >= amount) {
        axios.put(`/api/users/tokens`, {
          tokens: (user.Tokens - amount)
        }, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then(() => {
          axios.post('/api/bets', {
            name: document.getElementById('name').value,
            description: document.getElementById('description').value,
            creator_value: amount,
            for_value: amount,
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
        })
      
      }
      else {
        document.getElementById('alert').innerHTML += `
          <div class="alert alert-warning d-flex align-items-center mx-auto" role="alert" style="width: 80%">
            <div>
            <i class="bi bi-exclamation-triangle-fill"></i>
            You Cannot Wager more Tokens than you own. 
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
          </div>
          `
      }
    })

    .catch(err => console.log(err))
})