let pathImagesTopScorer = ["../assets/first-top-scorer.png", "../assets/second-top-scorer.png", "../assets/third-top-scorer.png"]

let showLoader = () => {
    let html =
        `<div class="preloader-wrapper medium active">
        <div class="spinner-layer spinner-green-only">
            <div class="circle-clipper left">
            <div class="circle"></div>
            </div><div class="gap-patch">
            <div class="circle"></div>
            </div><div class="circle-clipper right">
            <div class="circle"></div>
            </div>
        </div>
    </div>`
    document.getElementById("loader").innerHTML = html;
}

let hideLoader = () => {
    document.getElementById("loader").innerHTML = '';
}

let renderStandings = () => {
    showLoader();

    let standings = getStandings();
    standings.then(data => {
        let standingHTML = "";
        data.standings[0].table.forEach(function (club) {
            standingHTML += `
          <tr class="team-info" data-aos="fade-down" data-aos-delay ="300">
            <td style="padding:.5rem">
              <img src="${club.team.crestUrl}" width=32 height=32 class="team-logo"/>
              <span style="font-weight:bold;padding-bottom:.25rem"> ${club.team.name} </span>
            </td>
            <td>${club.playedGames}</td>
            <td>${club.won}</td>
            <td>${club.draw}</td>
            <td>${club.lost}</td>
            <td>${club.goalsFor}</td>
            <td>${club.goalsAgainst}</td>
            <td>${club.goalDifference}</td>
            <td>${club.points}</td>
          </tr>
          `
        });
        // Sisipkan komponen card ke dalam elemen dengan id #standings
        document.getElementById("standings").innerHTML = standingHTML;
    });

    hideLoader();
}

let renderTopScorers = () => {
    showLoader();
    let scorersHTML = "";
    let duration = 200;
    let rank = 0;

    let scorers = getTopScorers();

    scorers.then(raw => {
        raw.scorers.forEach(function (data) {
            rank++;
            duration += 500;

            scorersHTML += `
             <div class = "col s12 m4 l4" data-aos="fade-left" data-aos-duration= ${duration}>
              <div class="card">
                <div class="row">
                  <div class="col s6 m12 l12 card-image" >
                    <img src="${pathImagesTopScorer[rank - 1]}" width=50% class="center" style="height:auto">
                  </div>                  
                  <div class="col s6 m12 l12">
                    <div class="card-content">
                      <b> <p class="center" style="font-size:12px"> ${data.player.name} </p> </b>
                      <hr>
                      ${data.numberOfGoals} Goals Scored
                      <hr>
                      <!-- Default shirt number --> 
                      Shirt Number : ${data.player.shirtNumber !== null ? data.player.shirtNumber : 0} <br>
                      Nationality :  ${data.player.nationality}   <br>
                      ${data.player.position} in <b> ${data.team.name} </b><br>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            `;
        });
        // Sisipkan komponen card ke dalam elemen dengan id #top-scorers
        document.getElementById("top-scorers").innerHTML = scorersHTML;
    })

    hideLoader();
}

let renderTeams = () => {
    showLoader();

    let teams = getStandings();
    teams.then(data => {
        let teamHTML = "";
        let delayAnimation = 200;
        data.standings[0].table.forEach(function (club) {
            teamHTML += `
            <div class="col s12 m6 l4" data-aos="fade-left">
              <div class="card ">
                <div class = "row">
                  <div class="col s4 m4 l4 top-space">
                    <img src="${club.team.crestUrl}" alt="${club.team.name} logo" width=100 height=100 style="padding-left:5px"/>
                  </div>
                  <div class="col s8 m8 l8 top-space">
                    <a href="./team.html?id=${club.team.id}">
                      <span class="center top-space" style="font-size:1.2em;">${club.team.name}</span>
                    </a>
                  </div>
                </div>
                <div class="card-content stats">
                  <table class="centered">
                    <thead>
                      <tr>
                        <th> Win  </th>
                        <th> Draw </th>
                        <th> Lost </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td> ${club.won} </td>
                        <td> ${club.draw} </td>
                        <td> ${club.lost} </td>
                      <tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
                `;
        });
        // Sisipkan komponen card ke dalam elemen dengan id #content
        document.getElementById("team-list").innerHTML = teamHTML;

    })

    hideLoader();
}

let renderTeamById = () => {
    showLoader();
    let team = getTeamById();
    team.then(data => {
        console.log(data)
        // Menyusun komponen card artikel secara dinamis
        var teamHTML = `
        <div class="card">
          <div class="row card-content">
            <div class="col s12 m4 l4 center-align">
              <img src="${data.crestUrl}" alt="${data.shortName}" width=128px height=128px/>
            </div>
            <div class="col s12 m8 l8">
            <div class="center-align" style="padding:8px"> <b> ${data.name} </b> </div>
                <i class="material-icons" style="font-size:.8rem"> sports_soccer </i>  ${data.venue} <br><br>
                <i class="material-icons" style="font-size:.8rem"> location_on </i>  ${data.address}  <br><br>
                <i class="material-icons" style="font-size:.8rem"> phone </i> ${data.phone}  <br><br>
                <b> Official Website : </b> <a href="${data.website}"> ${data.website}  </a> 
                </div>
                </div>
                <hr>
            <h4> Players </h4>
            <div class="row" id="player-list"></div>
        </div>
        `;
        // Sisipkan komponen card ke dalam elemen dengan id #content
        document.getElementById("body-content").innerHTML = teamHTML;
    })
    hideLoader();
}

let renderPlayers = () => {
    showLoader();

    let players = getTeamById();
    players.then(data => {
        // Menyusun komponen card artikel secara dinamis
        var playerHTML = "";
        console.log(data)
        let delayAnimation = 200;
        data.squad.forEach(function (player) {
            playerHTML += player.position !== null && player.nationality.length < 8 ?
                `<div class="col s12 m3 l3">               
                    <div class="card text-black">
                        <div class="card-content blue lighten-5 details">
                            ${player.name.substr(0, 20)}<br>
                            ${player.position}<br> 
                        </div>
                        <div class="card-content details">
                            Nationality ${player.nationality}
                        </div>
                    </div>
                </div>
            ` : '';
        });
        // Sisipkan komponen card ke dalam elemen dengan id #content
        document.getElementById("player-list").innerHTML = playerHTML;
    })

    hideLoader();

}