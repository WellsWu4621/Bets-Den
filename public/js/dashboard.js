const renderUserBets = () => {
  axios.get('/api/bets/user', {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  })
    .then(({ data: bets }) => {
      document.getElementById('content').innerHTML = ''
      if (bets.length > 0) {
        bets.forEach(bet => {
          let post = document.createElement('div')
          post.className = "col-sm-6 col-md-4 col-xl-3"
          post.innerHTML = `
          <div class="card border-dark mb-3">
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
          if (bet.isResolved === 0) document.getElementById('content').append(post)
          else document.getElementById('rescontent').append(post)
        })
      }
    })
    .catch((err) => {
      console.log(err)
      window.location = '/login'
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
      if (witnesses.length > 0)
        witnesses.forEach(witness => {
          axios.get(`/api/bets/${witness.bet_id}`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          })
            .then(({ data: bet }) => {
              let post = document.createElement('div')
              post.className = "col-sm-6 col-md-4 col-xl-3"
              post.innerHTML = `
              <div class="card border-dark mb-3">
              <div class="card-body modalbtn" data-bs-toggle="modal" data-betid="${bet.id}" href="#betModal">
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
              if (bet.isResolved === 0) document.getElementById('witnesscontent').append(post)
              else document.getElementById('rescontent').append(post)
            })
        })
    })
    .catch((err) => {
      console.log(err)
      window.location = '/login'
    })
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
        participants.forEach(participant => {
          axios.get(`/api/bets/${participant.bet_id}`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          })
            .then(({ data: bet }) => {
              let post = document.createElement('div')
              post.className = "col-sm-6 col-md-4 col-xl-3"
              post.innerHTML = `
                  <div class="card border-dark mb-3">
                    <div class="card-body modalbtn" data-bs-toggle="modal" data-betid="${bet.id}" href="#betModal">
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
              if (bet.isResolved === 0) document.getElementById('participantcontent').append(post)
              else document.getElementById('rescontent').append(post)
            })
        })
      }
    })
    .catch((err) => {
      console.log(err)
      window.location = '/login'
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
                    <p id="counter"></p>
                    <p id="participantlist"></p>
                    <br>
                    <h7 class="card-subtitle mb-2 text-muted">Created by ${creator.data.username} at ${bet.createdAt}</h7>
                  </div>
                  <hr>
                  <div class="text-center" id="modalfooter">
                    <form>
                      <input class="form-control form-control-sm" type="text" id='aligntrue' placeholder="Whole number of Tokens" aria-label=".form-control-sm example"></i>
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
              // is witness and other checks
              if (witnessid > 0) {
                let footer = document.createElement('div')
                document.getElementById('modalfooter').innerHTML = ''
                if (bet.isResolved === 1) {
                  footer.innerHTML = `
                <p>
                You have ruled this bet as a FOR win. 
                </p>
                `
                }
                else if (bet.isResolved === 2) {
                  footer.innerHTML = `
                <p>
                You have ruled this bet as an AGAINST win. 
                </p>
                `
                }
                else if (bet.against_count === 0) {
                  footer.innerHTML = `
                <p>
                You are a Witness. Please update the result of the bet below when there is at least 1 person betting for each side.
                </p>
                `
                }
                else {
                  footer.innerHTML = `
                <p>
                You are a Witness. Please update the result of the bet below.
                </p>
                <button class="resultbtn btn btn-primary mb-2" data-result="1" data-betid="${bet.id}" style="width: 10rem">FOR</button>
                <button class="resultbtn btn btn-primary mb-2" data-result="2" data-betid="${bet.id}" style="width: 10rem">AGAINST</button>`
                }
                document.getElementById('modalfooter').append(footer)
              }
              // is participant and other checks
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
                    else if (!participant.alignCreator) {
                      footer.innerHTML = `<p>You are currently betting AGAINST: ${participant.betamount} <i class="bi bi-emoji-smile-upside-down"></i>.</p><button class="hidden joinbtn"></button>`
                      document.getElementById('modalfooter').append(footer)
                    }
                    else if (bet.isResolved === 1 && participant.alignCreator) {
                      let earned = parseInt(bet.against_value) / parseInt(bet.for_count)
                      footer.innerHTML = `<p>This bet has been resolved. You WON ${earned} <i class="bi bi-emoji-smile-upside-down"></i>s</p>`
                      document.getElementById('modalfooter').append(footer)
                    }
                    else if (bet.isResolved === 2 && !participant.alignCreator) {
                      let earned = parseInt(bet.for_value) / parseInt(bet.against_count)
                      footer.innerHTML = `<p>This bet has been resolved. You WON ${earned} <i class="bi bi-emoji-smile-upside-down"></i>s</p>`
                      document.getElementById('modalfooter').append(footer)
                    }
                    else if ((bet.isResolved === 2 && participant.alignCreator) || (bet.isResolved === 1 && !participant.alignCreator)) {
                      footer.innerHTML = `<p>This bet has been resolved. You LOST ${participant.betamount} <i class="bi bi-emoji-smile-upside-down"></i>s</p>`
                      document.getElementById('modalfooter').append(footer)
                    }
                  })
              }
              else if (bet.creator_id === userid) {
                let footer = document.createElement('div')
                document.getElementById('modalfooter').innerHTML = ''
                footer.innerHTML = `<p>You are the creator of the bet and a default participant listed as FOR: ${bet.creator_value} <i class="bi bi-emoji-smile-upside-down"></i>.</p>
                <button class="delete btn btn-primary" data-betid="${bet.id}"><i class="bi bi-trash"></i></button>
                <button class="hidden joinbtn"></button>`
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
    document.getElementById('witnesslist').innerHTML = `This bets does not have a witness yet.<button type="button" class="witnessbtn btn btn-primary" data-betid="${bet.id}">Join as Witness</button>`
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

// Listeners
document.addEventListener('click', event => {
  if (event.target.classList.contains('modalbtn')) {
    let betid = event.target.getAttribute('data-betid')
    renderModal(betid)
  }
})
document.addEventListener('click', event => {
  if (event.target.classList.contains('delete')) {
    let betid = event.target.getAttribute('data-betid')
    axios.get(`/api/bets/${betid}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(({ data: bet }) => {
        axios.get(`/api/users/${bet.creator_id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        })
          .then(({ data: creator }) => {
            axios.put(`/api/users/${bet.creator_id}`, {
              Tokens: (creator.Tokens + bet.creator_value)
            }, {
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
              }
            })
              .then(() => {
                if (bet.participants.length > 0) {
                  for (let p = 0; p < bet.participants.length; p++) {
                    axios.get(`/api/users/${bet.participants[p].user_id}`, {
                      headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
                    })
                      .then(({ data: user }) => {
                        axios.put(`/api/users/${bet.participants[p].user_id}`, {
                          Tokens: (user.Tokens + bet.participants[p].betamount)
                        }, {
                          headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                          }
                        })
                          .then(() => {
                            if (p + 1 === bet.participants.length) {
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
                      })
                  }
                } else {
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
          })
      })
  }
})
document.addEventListener('click', event => {
  if (event.target.classList.contains('resultbtn')) {
    let betid = event.target.getAttribute('data-betid')
    let betresult = event.target.getAttribute('data-result')
    let winnings = 0
    let witearn = 0
    axios.get(`/api/bets/${betid}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(({ data: bet }) => {
        if (betresult === 1) { 
          winnings = parseInt(bet.against_value) / parseInt(bet.for_count)
          witearn = Math.ceil(parseInt(bet.against_value) / 10)
        }
        else { 
          winnings = parseInt(bet.for_value) / parseInt(bet.against_count) 
          witearn = Math.ceil(parseInt(bet.for_value)/10)
        }
        axios.get(`/api/users/${bet.witnesses[0].user_id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then(({data: witness}) => {
          axios.put(`/api/users/${bet.participants[p].user_id}`, {
            Tokens: (witness.Tokens + witearn)
          }, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          })
        })
        for (let p = 0; p < bet.participants.length; p++) {
          axios.get(`/api/users/${bet.participants[p].user_id}`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          })
            .then(({ data: user }) => {
              if (bet.participants[p].alignCreator) {
                axios.put(`/api/users/${bet.participants[p].user_id}`, {
                  Tokens: (user.Tokens + winnings)
                }, {
                  headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                  }
                })
                  .then(() => {
                    if (p + 1 === bet.participants.length) {
                      window.location = '/dashboard'
                    }
                  })
              }
              else {
                axios.put(`/api/users/${bet.participants[p].user_id}`, {
                  Tokens: (user.Tokens - bet.participants[p].betamount)
                }, {
                  headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                  }
                })
                  .then(() => {
                    if (p + 1 === bet.participants.length) {
                      window.location = '/dashboard'
                    }
                  })
              }

            })
        }
      })
    axios.put(`/api/bets/${betid}`, {
      isResolved: betresult
    }, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(() => {
        console.log('credits distributed')
      })
      .catch(err => console.log(err))
  }
})