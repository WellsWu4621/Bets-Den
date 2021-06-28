
const renderbets = () => {
  axios.get('/api/bets', {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  })
    .then(({ data: bets }) => {
      document.getElementById('content').innerHTML = ''
      bets.forEach(bet => {
        if (bet.isResolved === 0) {
          let post = document.createElement('div')
          post.className = "col-sm-6 col-md-4 col-xl-3"
          post.innerHTML = `
                <div class="card border-dark mb-3 shadow bg-body rounded">
                  <div class="card-body">
                    <h5 class="card-title">${bet.name}</h5>
                    <h7>Current Betting Values</h7>
                    <p class="card-text">For: ${bet.for_value} <i class="bi bi-emoji-smile-upside-down"></i>; Against: ${bet.against_value} <i class="bi bi-emoji-smile-upside-down"></i></p>
                    <p class="card-text">${bet.description}</p>
                  </div>
                  <div class="card-footer">
                    <a data-bs-toggle="modal" data-betid="${bet.id}" href="#betModal" class="modalbtn btn btn-primary" style="width: 100%">View this Bet</a>
                  </div>
                </div>

            `
          document.getElementById('content').append(post)
        }
      })
    })
    .catch((err) => {
      console.log(err)
      // window.location = '/login'
    })
}
const renderModal = (betid) => {
  document.getElementById('modalContent').innerHTML = ""
  axios.get(`/api/bets/${betid}`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  })
    .then(({ data: bet }) => {
      axios.get(`/api/users/${bet.creator_id}`)
        .then((creator) => {
          let post = document.createElement('div')
          post.innerHTML = `
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title">${bet.name}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    <h6>Current Betting Values</h6>
                    <p class="card-text">For: ${bet.for_value} <i class="bi bi-emoji-smile-upside-down"></i>; Against: ${bet.against_value} <i class="bi bi-emoji-smile-upside-down"></i></p>
                    <p>${bet.description}</p>
                    <br>
                    <h6>Witnesses:</h6>
                    <p id="witnesslist"></p>
                    <br>
                    <h6>Participants:</h6>
                    <p>For: ${bet.for_count}, Against: ${bet.against_count}</p>
                    <p id="participantlist"></p>
                    <br>
                    <h7 class="card-subtitle mb-2 text-muted">Created by ${creator.data.username} at ${bet.createdAt}</h7>
                  </div>
                  <hr>
                  <div class="text-center row mx-auto" id="modalfooter">
                    <form class="col-6">
                      <input class="form-control form-control-sm" type="text" id='aligntrue' placeholder="Whole number of Tokens" aria-label=".form-control-sm example">
                      <button type="button" class="joinbtn btn btn-primary my-1" data-count="${bet.for_count}" data-betid="${bet.id}" data-align="true" data-value="${bet.for_value}" style="width: 10rem">Bet With</button>
                    </form>
                    <form class="col-6">
                      <input class="form-control form-control-sm" type="text" id='alignfalse' placeholder="Whole number of Tokens" aria-label=".form-control-sm example">
                      <button type="button" class="joinbtn btn btn-primary my-1" data-count="${bet.against_count}" data-betid="${bet.id}" data-align="false" data-value="${bet.against_value}" style="width: 10rem">Bet Against</button>
                    </form>
                  </div>
                </div>
                `
          document.getElementById('modalContent').append(post)
          axios.get('/api/user', {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          })
            .then(({ data: userid }) => {
              let witnessid = isWitness(bet, userid)
              let participantid = isParticipant(bet, userid)
              renderWitness(bet, participantid, userid)
              renderParticipant(bet)

              if (witnessid > 0) {
                let footer = document.createElement('div')
                document.getElementById('modalfooter').innerHTML = ''
                footer.innerHTML = '<p>You appear to have already signed onto this bet as a Witness. If you would like to update the result of the bet, please go to your <a href="/dashboard">Dashboard</a></p><button class="hidden joinbtn"></button>'
                document.getElementById('modalfooter').append(footer)
              }
              else if (participantid > 0) {
                let footer = document.createElement('div')
                document.getElementById('modalfooter').innerHTML = ''
                axios.get(`/api/participants/${participantid}`, {
                  headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                  }
                })
                  .then(({ data: participant }) => {
                    if (participant.alignCreator) {
                      footer.innerHTML = `<p>You are currently betting FOR: ${participant.betamount} <i class="bi bi-emoji-smile-upside-down"></i>.</p><button class="hidden joinbtn"></button>`
                      document.getElementById('modalfooter').append(footer)
                    }
                    else {
                      footer.innerHTML = `<p>You are currently betting AGAINST: ${participant.betamount} <i class="bi bi-emoji-smile-upside-down"></i>.</p><button class="hidden joinbtn"></button>`
                      document.getElementById('modalfooter').append(footer)
                    }
                  })
              }
              else if (bet.creator_id === userid) {
                let footer = document.createElement('div')
                document.getElementById('modalfooter').innerHTML = ''
                footer.innerHTML = `<p>You are the creator of the bet and a default participant listed as FOR: ${bet.creator_value} <i class="bi bi-emoji-smile-upside-down"></i>.</p><button class="hidden joinbtn"></button>`
                document.getElementById('modalfooter').append(footer)
              }
            })
        })
    })
    .catch(err => console.log(err))
}
const renderWitness = (bet, participantid, userid) => {
  document.getElementById('witnesslist').innerHTML = ''
  if (bet.witnesses.length > 0) {
    console.log(bet.witnesses[0].user_id)
    axios.get(`/api/users/${bet.witnesses[0].user_id}`)
      .then(witness => {
        document.getElementById('witnesslist').innerText += `${witness.data.username}`
      })
      .catch(err => console.log(err))
  }
  else if (participantid === 0 && userid !== bet.creator_id) {
    document.getElementById('witnesslist').innerHTML = ''
    document.getElementById('witnesslist').innerHTML = `This betsdf does not have a witness yet.<button type="button" class="witnessbtn btn btn-primary" data-betid="${bet.id}">Join as Witness</button>`
  }
  else {
    document.getElementById('witnesslist').innerText = `This bet does not have a witness yet.`
  }
}
const renderParticipant = (bet) => {
  if (bet.participants.length > 0) {
    for (let p = 0; p < bet.participants.length; p++) {
      axios.get(`/api/users/${bet.participants[p].user_id}`)
        .then(participant => {
          document.getElementById('participantlist').innerText += `${participant.data.username}`
          if (p + 1 !== bet.participants.length) {
            document.getElementById('participantlist').innerText += ', '
          }
          else {
          }
        })
        .catch(err => console.log(err))
    }

  }
  else {
    document.getElementById('participantlist').innerText = 'This bet does not have any participants besides the creator yet.'
  }
}
const isParticipant = (bet, id) => {
  let occupied_id = 0
  for (let p = 0; p < bet.participants.length; p++) {
    if (bet.participants[p].user_id === id) {
      occupied_id = bet.participants[p].id
    }
  }
  return occupied_id
}
const isWitness = (bet, id) => {
  let occupied_id = 0
  for (let w = 0; w < bet.witnesses.length; w++) {
    if (bet.witnesses[w].user_id === id) {
      occupied_id = bet.witnesses[w].id
    }
  }
  return occupied_id
}

// function call
renderbets()
//Listeners
document.addEventListener('click', event => {
  if (event.target.classList.contains('modalbtn')) {
    let betid = event.target.getAttribute('data-betid')
    renderModal(betid)
  }
})

document.addEventListener('click', event => {
  if (event.target.classList.contains('witnessbtn')) {
    let betid = event.target.getAttribute('data-betid')
    axios.post('/api/witness', {
      bet_id: betid
    }, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(() => renderModal(betid))
      .catch(err => console.log(err))
  }
})
// join event action
document.addEventListener('click', event => {
  if (event.target.classList.contains('joinbtn')) {
    let betid = event.target.getAttribute('data-betid')
    let alignment = false
    let searchside = ""
    let amount = 0
    let currentamt = parseInt(event.target.getAttribute('data-value'))
    let currentcnt = parseInt(event.target.getAttribute('data-count')) + 1
    if (event.target.getAttribute('data-align') === 'true') {
      alignment = true
      searchside = "for"
      amount = parseInt(document.getElementById('aligntrue').value)
      currentamt += amount
    }
    else {
      alignment = false
      searchside = "against"
      amount = parseInt(document.getElementById('alignfalse').value)
      currentamt += amount
    }
    axios.get('/api/user/profile', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(({ data: user }) => {
        if (user.Tokens >= amount) {
          axios.put(`/api/users/tokens`, {
            tokens: (user.Tokens - amount)
          }, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          })
            .then(() => {
              axios.post('/api/participants', {
                alignCreator: alignment,
                betamount: amount,
                bet_id: betid
              }, {
                headers: {
                  'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
              })
                .then(() => {
                  axios.put(`/api/bets/${betid}/${searchside}`, {
                    value: currentamt,
                    count: currentcnt
                  }, {
                    headers: {
                      'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                  })
                    .then(() => {
                      renderbets()
                      renderModal(betid)
                    })
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
  }
})