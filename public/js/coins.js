/**
 * jQuery Slot Machine by Stefan Petre.
 * http://www.eyecon.ro/slotmachine/
 *
 * Modified.
 */

(function ($) {

    var slotMachine = function () {

        var credits = 15,
            spinning = 3,
            spin = [0, 0, 0],
            slotsTypes = {
                'cherry': [2, 5, 10],
                'orange': [0, 15, 30],
                'prune': [0, 40, 50],
                'bell': [0, 50, 80],
                'bar1': [0, 0, 100],
                'bar2': [0, 0, 150],
                'bar3': [0, 0, 250],
                'seven': [0, 0, 500],
                'anybar': [0, 0, 80]
            },
            slots = [
                ['orange', 'bell', 'orange', 'bar2', 'prune', 'orange',
                    'bar3', 'prune', 'orange', 'bar1', 'bell', 'cherry', 'orange',
                    'prune', 'bell', 'bar1', 'cherry', 'seven', 'orange', 'prune',
                    'orange', 'bell', 'orange'],
                ['cherry', 'prune', 'orange', 'bell', 'bar1', 'cherry', 'prune',
                    'bar3', 'cherry', 'bell', 'orange', 'bar1', 'seven', 'cherry',
                    'bar2', 'cherry', 'bell', 'prune', 'cherry', 'orange', 'cherry',
                    'prune', 'orange'],
                ['cherry', 'orange', 'bell', 'prune', 'bar2', 'cherry', 'prune',
                    'orange', 'bar3', 'cherry', 'bell', 'orange', 'cherry', 'orange',
                    'cherry', 'prune', 'bar1', 'seven', 'bell', 'cherry', 'cherry',
                    'orange', 'bell'],
            ],
            startSlot = function () {

                spinning = false;

                $('#slot-trigger').removeClass('slot-triggerDisabled');

                this.blur();

                return false;

            },
            endSlot = function () {

                $('#slot-block').show();
                $('#slot-credits').text('VERLOREN!!!');

                setInterval(blink($('#slot-credits')), 1000);

            },
            addCredit = function (incrementCredits) {

                var currentCredits = credits;
                credits += incrementCredits;
                const addCoins = () => {
                    axios.put('/api/users/tokens', { tokens: credits }, {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                    })
                        .then((response) => {
                            console.log(response);
                        }, (error) => {
                            console.log(error);
                        });
                }
                addCoins()
                blink($('#slot-credits'));

                $('#slot-credits')
                    .css('credit', 0)
                    .animate({
                        credit: incrementCredits
                    }, {
                        duration: 400 + incrementCredits,
                        easing: 'easeOut',
                        step: function (now) {

                            $(this).html(parseInt(currentCredits + now, 10));

                        },
                        complete: function () {

                            $(this).html(credits);
                            blink($('#slot-credits'));

                        }
                    });

            },
            spin = function () {

                this.blur();

                if (spinning == false) {

                    $('#slot-machine .arm').animate({ top: '45px', height: '2%' });
                    $('#slot-machine .arm .knob').animate({ top: '-20px', height: '20px' });
                    $('#slot-machine .arm-shadow').animate({ top: '40px' }, 380);
                    $('#slot-machine .ring1 .shadow, #slot-machine .ring2 .shadow').animate({ top: '50%', opacity: 1 });

                    spinning = 3;
                    credits--;

                    $('#slot-credits').html(credits);

                    spin[0] = parseInt(Math.random() * 23);
                    spin[1] = parseInt(Math.random() * 23);
                    spin[2] = parseInt(Math.random() * 23);

                    $('#slot-trigger').addClass('slot-triggerDisabled');

                    $('img.slotSpinAnimation').show();

                    $('#wheel1 img:first').css('top', - (spin[0] * 44 + 16) + 'px');
                    $('#wheel2 img:first').css('top', - (spin[1] * 44 + 16) + 'px');
                    $('#wheel3 img:first').css('top', - (spin[2] * 44 + 16) + 'px');

                    setTimeout(function () {
                        $('#slot-machine .arm').animate({ top: '-25px', height: '50%', overflow: 'visible' });
                        $('#slot-machine .arm .knob').animate({ top: '-15px', height: '16px' });
                        $('#slot-machine .arm-shadow').animate({ top: '13px' });
                        $('#slot-machine .ring1 .shadow, #slot-machine .ring2 .shadow').animate({ top: '0', opacity: 0 });
                    }, 500);

                    setTimeout(function () {
                        stopSpin(1);
                    }, 1500 + parseInt(1500 * Math.random()));

                    setTimeout(function () {
                        stopSpin(2);
                    }, 1500 + parseInt(1500 * Math.random()));

                    setTimeout(function () {
                        stopSpin(3);
                    }, 1500 + parseInt(1500 * Math.random()));

                }

                return false;

            },
            stopSpin = function (slot) {

                $('#wheel' + slot)
                    .find('img:last')
                    .hide()
                    .end()
                    .find('img:first')
                    .animate({
                        top: - spin[slot - 1] * 44
                    }, {
                        duration: 500,
                        easing: 'elasticOut',
                        complete: function () {

                            spinning--;

                            if (spinning <= 0) {
                                endSpin();
                            }

                        }
                    });
            },
            endSpin = function () {

                var slotType = slots[0][spin[0]],
                    matches = 1,
                    barMatch = /bar/.test(slotType) ? 1 : 0,
                    winnedCredits = 0,
                    waitToSpin = 10;

                if (slotType == slots[1][spin[1]]) {

                    matches++;

                    if (slotType == slots[2][spin[2]]) {
                        matches++;
                    } else if (barMatch != 0 && /bar/.test(slots[2][spin[2]])) {
                        barMatch++;
                    }

                } else if (barMatch != 0 && /bar/.test(slots[1][spin[1]])) {

                    barMatch++;

                    if (/bar/.test(slots[2][spin[2]])) {
                        barMatch++;
                    }

                }

                if (matches != 3 && barMatch == 3) {
                    slotType = 'anybar';
                    matches = 3;
                }

                var winnedCredits = slotsTypes[slotType][matches - 1];

                if (winnedCredits > 0) {
                    addCredit(winnedCredits);
                    waitToSpin = 410 + winnedCredits;
                }

                setTimeout(function () {

                    if (credits == 0) {
                        endSlot();
                    } else {
                        $('#slot-trigger').removeClass('slot-triggerDisabled');
                        spinning = false;
                    }

                }, waitToSpin);
            };
        return {

            init: function () {

                startSlot();

                $('#slot-trigger')
                    .bind('mousedown', function () {
                        $(this).addClass('slot-triggerDown');
                    })
                    .bind('click', spin);

                $(document).bind('mouseup', function () {
                    $('#slot-trigger').removeClass('slot-triggerDown');
                });

                $('#wheel1 img:first').css('top', - (parseInt(Math.random() * 23) * 44) + 'px');
                $('#wheel2 img:first').css('top', - (parseInt(Math.random() * 23) * 44) + 'px');
                $('#wheel3 img:first').css('top', - (parseInt(Math.random() * 23) * 44) + 'px');

            }

        };
    }();

    $.extend($.easing, {
        bounceOut: function (x, t, b, c, d) {
            if ((t /= d) < (1 / 2.75)) {
                return c * (7.5625 * t * t) + b;
            } else if (t < (2 / 2.75)) {
                return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
            } else if (t < (2.5 / 2.75)) {
                return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
            } else {
                return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
            }
        },
        easeOut: function (x, t, b, c, d) {
            return -c * (t /= d) * (t - 2) + b;
        },
        elasticOut: function (x, t, b, c, d) {
            var s = 1.70158; var p = 0; var a = c;
            if (t == 0) return b; if ((t /= d) == 1) return b + c; if (!p) p = d * .3;
            if (a < Math.abs(c)) { a = c; var s = p / 4; }
            else var s = p / (2 * Math.PI) * Math.asin(c / a);
            return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
        }
    });

    $(document).ready(slotMachine.init);

})(jQuery);

function blink(element) {

    element.animate({ opacity: 0 }, 200, 'linear', function () {
        $(this).animate({ opacity: 1 }, 200);
    });

}

particlesJS("particles-js", {
    "particles": {
        "number": {
            "value": 355,
            "density": {
                "enable": true,
                "value_area": 789.1476416322727
            }
        },
        "color": {
            "value": "#ffffff"
        },
        "shape": {
            "type": "circle",
            "stroke": {
                "width": 0,
                "color": "#000000"
            },
            "polygon": {
                "nb_sides": 5
            },
            "image": {
                "src": "img/github.svg",
                "width": 100,
                "height": 100
            }
        },
        "opacity": {
            "value": 0.48927153781200905,
            "random": false,
            "anim": {
                "enable": true,
                "speed": 0.2,
                "opacity_min": 0,
                "sync": false
            }
        },
        "size": {
            "value": 2,
            "random": true,
            "anim": {
                "enable": true,
                "speed": 2,
                "size_min": 0,
                "sync": false
            }
        },
        "line_linked": {
            "enable": false,
            "distance": 150,
            "color": "#ffffff",
            "opacity": 0.4,
            "width": 1
        },
        "move": {
            "enable": true,
            "speed": 0.2,
            "direction": "none",
            "random": true,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {
                "enable": false,
                "rotateX": 600,
                "rotateY": 1200
            }
        }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": {
            "onhover": {
                "enable": true,
                "mode": "bubble"
            },
            "onclick": {
                "enable": true,
                "mode": "push"
            },
            "resize": true
        },
        "modes": {
            "grab": {
                "distance": 400,
                "line_linked": {
                    "opacity": 1
                }
            },
            "bubble": {
                "distance": 83.91608391608392,
                "size": 1,
                "duration": 3,
                "opacity": 1,
                "speed": 3
            },
            "repulse": {
                "distance": 200,
                "duration": 0.4
            },
            "push": {
                "particles_nb": 4
            },
            "remove": {
                "particles_nb": 2
            }
        }
    },
    "retina_detect": true
});

// const renderSlot = () => { 
// let post = document.createElement('div')
// post.innerHTML = `
//                 <div class="modal-content">
//                   <div class="modal-header">
//                     <h5 class="modal-title">${bet.name}</h5>
//                     <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//                   </div>
//                   <div class="modal-body">
//                     <h6>Current Betting Values</h6>
//                     <p class="card-text">For: ${bet.for_value} <i class="bi bi-emoji-smile-upside-down"></i>; Against: ${bet.against_value} <i class="bi bi-emoji-smile-upside-down"></i></p>
//                     <p>${bet.description}</p>
//                     <br>
//                     <h6>Witnesses:</h6>
//                     <p id="witnesslist"></p>
//                     <br>
//                     <h6>Participants:</h6>
//                     <p id="counter"></p>
//                     <p id="participantlist"></p>
//                     <br>
//                     <h7 class="card-subtitle mb-2 text-muted">Created by ${creator.data.username} at ${bet.createdAt}</h7>
//                   </div>
//                   <hr>
//                   <div class="text-center" id="modalfooter">
//                     <form>
//                       <input class="form-control form-control-sm" type="text" id='aligntrue' placeholder="Whole number of Tokens" aria-label=".form-control-sm example"><i class="bi bi-emoji-smile-upside-down"></i>
//                       <button type="button" class="joinbtn btn btn-primary" data-betid="${bet.id}" data-align="true" data-value="${bet.for_value}">Bet With</button>
//                     </form>
//                     <form>
//                       <input class="form-control form-control-sm" type="text" id='alignfalse' placeholder="Whole number of Tokens" aria-label=".form-control-sm example">
//                       <button type="button" class="joinbtn btn btn-primary" data-betid="${bet.id}" data-align="false" data-value="${bet.against_value}">Bet Against</button>
//                     </form>
//                   </div>
//                 </div>
//                 `
// document.getElementById('modalContent').append(post)
// }
// renderSlot()
// const renderSlot = () => {
// let post = document.createElement('div')
// post.className = "col-sm-6 col-md-4 col-xl-3"
// post.innerHTML = `
//                   <div class="card border-dark mb-3">
//                     <div class="card-body">
//                       <h5 class="card-title">${bet.name}</h5>
//                       <h7>Current Betting Values</h7>
//                       <p class="card-text">For: ${bet.for_value} <i class="bi bi-emoji-smile-upside-down"></i>; Against: ${bet.against_value} <i class="bi bi-emoji-smile-upside-down"></i></p>
//                       <p class="card-text">${bet.description}</p>
//                     </div>
//                     <div class="card-footer">
//                       <a data-bs-toggle="modal" data-betid="${bet.id}" href="#betModal" class="modalbtn btn btn-primary" style="width: 100%">View this Bet</a>
//                     </div>
//                   </div>
//               `
//     document.getElementById('content').append(post)
// }
// renderSlot()

// document.addEventListener('click', event => {
//     if (event.target.classList.contains('modalbtn')) {
//         let slot = event.target.getAttribute('data-betid')
//         renderSlot()
//     }
// })