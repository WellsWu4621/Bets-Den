const renderUserBets = () => {
  axios.get('/api/bets/user', {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  })
    .then(({ data: bets }) => {
      document.getElementById('content').innerHTML = ''
      if (bets.length > 0) {
        document.getElementById('bettitle').innerText = 'Bets you Created:'
        bets.forEach(bet => {
          let post = document.createElement('div')
          post.innerHTML = `
                <div class="col-sm-3">
                  <div class="card border-dark mb-3" style="width: 18rem;">
                    <div class="card-body">
                      <h5 class="card-title">${bet.name}</h5>
                      <h7>Current Betting Values</h7>
                      <p class="card-text">For: ${bet.for_value} <i class="bi bi-emoji-smile-upside-down"></i>; Against: ${bet.against_value} <i class="bi bi-emoji-smile-upside-down"></i></p>
                      <p class="card-text">${bet.description}</p>
                    </div>
                    <div class="card-footer">
                      <a data-bs-toggle="modal" data-betid="${bet.id}" href="#betModal" class="modalbtn btn btn-primary">View this Bet</a>
                    </div>
                  </div>
                </div>
              `
          document.getElementById('content').append(post)
        })
      }
    })
    .catch((err) => {
      console.log(err)
      //window.location = '/login'
    })
}
const renderWitnessBets = () => {
  axios.get('/api/witness/user', {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  })
    .then(({ data: witnesses }) => {
      console.log(witnesses)
      if (witnesses.length > 0) {
        document.getElementById('wittitle').innerText = 'Bets you are a Witness of:'
        witnesses.forEach(witness => {
          axios.get(`/api/bets/${witness.bet_id}`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          })
            .then(({ data: bet }) => {
              let post = document.createElement('div')
              post.innerHTML = `
                <div class="col-sm-3">
                  <div class="card border-dark mb-3" style="width: 18rem;">
                    <div class="card-body">
                      <h5 class="card-title">${bet.name}</h5>
                      <h7>Current Betting Values</h7>
                      <p class="card-text">For: ${bet.for_value} <i class="bi bi-emoji-smile-upside-down"></i>; Against: ${bet.against_value} <i class="bi bi-emoji-smile-upside-down"></i></p>
                      <p class="card-text">${bet.description}</p>
                    </div>
                    <div class="card-footer">
                      <a data-bs-toggle="modal" data-betid="${bet.id}" href="#betModal" class="modalbtn btn btn-primary">View this Bet</a>
                    </div>
                  </div>
                </div>
              `
              document.getElementById('witnesscontent').append(post)
            })
        })
      }
    })
    .catch(err => console.log(err))
}
const renderParticipantBets = () => {
  axios.get('/api/participants/user', {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  })
    .then(({ data: participants }) => {
      console.log(participants)
      if (participants.length > 0) {
        document.getElementById('parttitle').innerText = 'Bets you are a Participant of:'
        participants.forEach(participant => {
          axios.get(`/api/bets/${participant.bet_id}`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          })
            .then(({ data: bet }) => {
              let post = document.createElement('div')
              post.innerHTML = `
                <div class="col-sm-3">
                  <div class="card border-dark mb-3" style="width: 18rem;">
                    <div class="card-body">
                      <h5 class="card-title">${bet.name}</h5>
                      <h7>Current Betting Values</h7>
                      <p class="card-text">For: ${bet.for_value} <i class="bi bi-emoji-smile-upside-down"></i>; Against: ${bet.against_value} <i class="bi bi-emoji-smile-upside-down"></i></p>
                      <p class="card-text">${bet.description}</p>
                    </div>
                    <div class="card-footer">
                      <a data-bs-toggle="modal" data-betid="${bet.id}" href="#betModal" class="modalbtn btn btn-primary">View this Bet</a>
                    </div>
                  </div>
                </div>
              `
              document.getElementById('participantcontent').append(post)
            })
        })
      }
    })
    .catch(err => console.log(err))
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
                    <p id="counter"></p>
                    <p id="participantlist"></p>
                    <br>
                    <h7 class="card-subtitle mb-2 text-muted">Created by ${creator.data.username} at ${bet.createdAt}</h7>
                  </div>
                  <hr>
                  <div class="text-center" id="modalfooter">
                    <form>
                      <input class="form-control form-control-sm" type="text" id='aligntrue' placeholder="Whole number of Tokens" aria-label=".form-control-sm example"><i class="bi bi-emoji-smile-upside-down"></i>
                      <button type="button" class="joinbtn btn btn-primary" data-betid="${bet.id}" data-align="true" data-value="${bet.for_value}">Bet With</button>
                    </form>
                    <form>
                      <input class="form-control form-control-sm" type="text" id='alignfalse' placeholder="Whole number of Tokens" aria-label=".form-control-sm example">
                      <button type="button" class="joinbtn btn btn-primary" data-betid="${bet.id}" data-align="false" data-value="${bet.against_value}">Bet Against</button>
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
                footer.innerHTML = `
                <p>
                You are a Witness. Please update the result of the bet below.
                </p>
                <br>
                <button class="resultbtn" data-result="1" data-betid="${bet.id}">FOR</button>
                <button class="resultbtn" data-result="2" data-betid="${bet.id}">AGAINST</button>`
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
  let creator = 1
  let against = 0
  if (bet.participants.length > 0) {
    for (let p = 0; p < bet.participants.length; p++) {
      axios.get(`/api/users/${bet.participants[p].user_id}`)
        .then(participant => {
          if (!bet.participants[p].alignCreator) against++
          else creator++
          document.getElementById('participantlist').innerText += `${participant.data.username}`
          if (p + 1 !== bet.participants.length) {
            document.getElementById('participantlist').innerText += ', '
          }
          else {
            document.getElementById('counter').innerText = `For: ${creator}, Against: ${against}`
          }
        })
        .catch(err => console.log(err))
    }

  }
  else {
    document.getElementById('counter').innerText = `For: ${creator}, Against: ${against}`
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
renderUserBets()
renderWitnessBets()
renderParticipantBets()

document.addEventListener('click', event => {
  if (event.target.classList.contains('modalbtn')) {
    let betid = event.target.getAttribute('data-betid')
    renderModal(betid)
  }
})
document.addEventListener('click', event => {
  if (event.target.classList.contains('delete')) {
    let betid = event.target.getAttribute('data-betid')
    axios.delete(`/api/bets/${betid}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(() => {
        window.location = '/dashboard'
      })
      .catch(err => console.log(err))
  }
})