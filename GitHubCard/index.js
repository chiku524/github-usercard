/*
  STEP 1: using axios, send a GET request to the following URL
    (replacing the placeholder with your Github name):
    https://api.github.com/users/<your name>
*/

axios.get('https://cors-anywhere.herokuapp.com/https://api.github.com/users/chiku524')
  .then(function(response){
    console.log(response);
    let info = infoOrganizer(response.data);
    return info;
  })
  .then(function(info){
    cards.appendChild(info);
  })
  .catch(function(error){
    console.log(error);
  })

/*
  STEP 2: Inspect and study the data coming back, this is YOUR
    github info! You will need to understand the structure of this
    data in order to use it to build your component function

    Skip to STEP 3.
*/

/*
  STEP 4: Pass the data received from Github into your function,
    and append the returned markup to the DOM as a child of .cards
*/

/*
  STEP 5: Now that you have your own card getting added to the DOM, either
    follow this link in your browser https://api.github.com/users/<Your github name>/followers,
    manually find some other users' github handles, or use the list found at the
    bottom of the page. Get at least 5 different Github usernames and add them as
    Individual strings to the friendsArray below.

    Using that array, iterate over it, requesting data for each user, creating a new card for each
    user, and adding that card to the DOM.
*/

const followersArray = ['tetondan', 'dustinmyers', 'justsml', 'luishrd', 'bigknell'];

followersArray.forEach(element => {
  axios.get(`https://cors-anywhere.herokuapp.com/https://api.github.com/users/${element}`)
    .then(function(response){
      let info = infoOrganizer(response.data);
      return info;
    })
    .then(function(info){
      cards.appendChild(info);
    })
    .catch(function(error){
      console.log(error);
    })
})

  axios.get('https://cors-anywhere.herokuapp.com/https://api.github.com/users/chiku524/followers')
    .then(function(response){
      let followers = response.data;
      return followers;
    })
    .then(function(followers){
      followers.forEach(element => {
        axios.get(`https://cors-anywhere.herokuapp.com/https://api.github.com/users/${element.login}`)
          .then(function(response){
            let followersInfo = infoOrganizer(response.data);
            return followersInfo;
          })
          .then(function(followersInfo){
            cards.appendChild(followersInfo);
          })
          .catch(function(error){
            console.log(error);
          })
      })
    })
    .catch(function(error){
      console.log(error);
    })
/*
  STEP 3: Create a function that accepts a single object as its only argument.
    Using DOM methods and properties, create and return the following markup:

    <div class="card">
      <img src={image url of user} />
      <div class="card-info">
        <h3 class="name">{users name}</h3>
        <p class="username">{users user name}</p>
        <p>Location: {users location}</p>
        <p>Profile:
          <a href={address to users github page}>{address to users github page}</a>
        </p>
        <p>Followers: {users followers count}</p>
        <p>Following: {users following count}</p>
        <p>Bio: {users bio}</p>
      </div>
    </div>
*/

const cards = document.querySelector('.cards');

function infoOrganizer(object){
  //create elements
  let card = document.createElement('div');
  let image = document.createElement('img');
  let cardInfo = document.createElement('div');
  let name = document.createElement('h3');
  let username = document.createElement('p');
  let location = document.createElement('p');
  let profile = document.createElement('p');
  let anchorTag = document.createElement('a');
  let followers = document.createElement('p');
  let following = document.createElement('p');
  let bio = document.createElement('p');
  let expand = document.createElement('span');
  let hireable = document.createElement('p');
  let reposNum = document.createElement('p');

  //add classes
  card.classList.add('card');
  cardInfo.classList.add('card-info');
  name.classList.add('name');
  username.classList.add('username');

  //giving textContent and whatnot
  image.src = object.avatar_url;
  name.textContent = object.name;
  username.textContent = object.login;
  location.textContent = `Location: ${object.location}`;
  profile.textContent = 'Profile: ';
  anchorTag.href = object.html_url;
  anchorTag.textContent = object.html_url;
  followers.textContent = `Followers: ${object.followers}`;
  following.textContent = `Following: ${object.following}`;
  bio.textContent = `Bio: ${object.bio}`; 
  expand.textContent = 'Expand';
  hireable.textContent = `Hireable: ${object.hireable}`;
  reposNum.textContent = `Number of repositories: ${object.public_repos}`;
  
  //structuring the html with appendChild
  card.appendChild(image);
  card.appendChild(cardInfo);
  cardInfo.appendChild(name);
  cardInfo.appendChild(username);
  cardInfo.appendChild(location);
  profile.appendChild(anchorTag);
  cardInfo.appendChild(profile);
  cardInfo.appendChild(followers);
  cardInfo.appendChild(following);
  cardInfo.appendChild(bio);
  cardInfo.appendChild(expand);
  cardInfo.appendChild(hireable);
  cardInfo.appendChild(reposNum);

  // stretch
  // let graph = document.createElement('img');
  // graph.classList.add('graph');
  // cardInfo.appendChild(graph);
  // axios.get(`https://cors-anywhere.herokuapp.com/https://github.com/users/chiku524/contributions`)
  //   .then(function(response){
  //     console.log(response)
  //   })
  //   .catch(function(error){
  //     console.log(error);
  //   })

  // graph.data = `https://github.com/users/${object.login}/contributions?to=2020-05-11`;

  expand.addEventListener('click', expandDiv);
  function expandDiv(event){
    card.classList.toggle('span-click');
    if(card.classList[1] === 'span-click'){
      expand.textContent = 'Collapse';
      //graph.style.display = 'block';
      hireable.style.display = 'block';
      reposNum.style.display = 'block';
    } else {
      expand.textContent = 'Expand';
      //graph.style.display = 'none';
      hireable.style.display = 'none';
      reposNum.style.display = 'none';
    }
  }

  //graph.style.display = 'none';
  hireable.style.display = 'none';
  reposNum.style.display = 'none';

  return card;
}



/*
  List of LS Instructors Github username's:
    tetondan
    dustinmyers
    justsml
    luishrd
    bigknell
*/
