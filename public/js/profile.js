const renderDiscord = () => {
  axios.get('/api/user/profile', {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  })
    .then(({ data: User }) => {
      console.log(User)
      // document.getElementById('discordAcc').innerHTML = ''
      document.getElementById('discordAcc').innerHTML += `${User.DiscordName}`
      document.getElementById('discordAcc1').innerHTML += `${User.DiscordName}`
      document.getElementById('userName').innerHTML += `${User.username}`
      document.getElementById('userName1').innerHTML += `${User.username}`
      document.getElementById('userEmail').innerHTML += `${User.email}`
      document.getElementById('userTokens').innerHTML += `${User.Tokens}`

    })
}
renderDiscord()