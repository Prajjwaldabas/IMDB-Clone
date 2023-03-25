
//selectors 
let left_btn = document.getElementsByClassName('fa-chevron-left')[0];
let right_btn = document.getElementsByClassName('fa-chevron-right')[0];
let cards=document.getElementsByClassName('cards')[0];
let search=document.getElementsByClassName('search')[0];
let search_input=document.getElementById('search_input');


// function to left scroll movie card 

left_btn.addEventListener('click',()=>{
  
    cards.scrollLeft -=140;
})

// function to right scroll movie card 
right_btn.addEventListener('click',()=>{

    cards.scrollLeft +=140;
})

// fetching data from api and displaying it in the cards 
let json_url ="movie.json"

fetch(json_url).then(Response=>Response.json())
.then((data)=>{
  
    data.forEach((ele,i) => {
        let {name,imdb,date,sposter,bposter,genre,url,id} = ele;
        let card = document.createElement('a');
        card.classList.add('movieCard');
        
        // card.setAttribute("data-movie-id",`${id}`)
        // card.href=url;
        card.innerHTML=` <img src="${sposter}" alt="${name}" class="poster"  />

        <div class="rest_card">
          <img class="movie-poster" data-movie-id= "${id}" src="${bposter}" alt="" />

          <button class="heart"> <i class="fa-solid fa-heart"></i> </button>
          
          <div class="cont" >
            <h4 class="movie-title">${name}</h4>
            <div class="subtitles">
              <p class="movie-genre">${genre},${date}</p>
              <h3>
                <span>IMDB</span
                ><i class="fa-sharp fa-regular fa-star"></i> ${imdb}
              </h3>
            </div>
          </div>
        </div>`
        cards.appendChild(card);
    });


//function to add movie item to the wish list page
    const addToWishlistButtons = document.querySelectorAll('.heart');
   
    addToWishlistButtons.forEach(button => {
    
      button.addEventListener('click', () => {
        console.log("heart button clicked");
        const movieTitle = button.parentNode.querySelector('.movie-title').textContent;
        const moviePoster = button.parentNode.querySelector('.movie-poster').src;
        const movieGenre = button.parentNode.querySelector('.movie-genre').textContent;
        const movieId= button.parentNode.querySelector('.movie-poster').getAttribute("data-movie-id");

        console.log(movieTitle)
        console.log(moviePoster)
        console.log(movieGenre)
        console.log(movieId)
        // console.log(movieRating)
        console.log(addToWishlistButtons)
      
        button.style.color='red'
    
        const movieData = {
          title: movieTitle,
          poster: moviePoster,
          genre: movieGenre,
          id:movieId
         
        };
      
        // saving movie items into the local storage
        let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        wishlist.push(movieData);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    
    
      });
    });

    
//function to displaying details for specific movie when user click on the card
let movieCards = document.getElementsByClassName('movieCard');



for (let i = 0; i < movieCards.length; i++) {
  movieCards[i].addEventListener('click', function(e) {

    const header = document.querySelector('header');
    header.style.background = `url('${data[i].bposter}')no-repeat center center/cover`;
    
const show=document.getElementById('showinfo')
show.innerHTML=`
<h1 id="title">${data[i].name}</h1>
            <p>
                A criminal mastermind who goes by "The Professor" has a plan to pull
                off the biggest heist in recorded history -- to print billions of
                euros in the Royal Mint of Spain.
            </p>

            <div class="details">
                <h6>A Netflix Orignal Series</h6>
                <h5 id="gen">${data[i].genre}</h5>
                <h4 id="date">${data[i].date}</h4>
                <h3 id="rate">
                    <span>IMDB</span><i class="fa-sharp fa-regular fa-star"></i>${data[i].imdb}
                </h3>
            </div>

            <div class="btns">
               
            <a href="#"  download="${data[i].name} 480p"    id="low_q">480p</a>
            <a href="#"  download="${data[i].name} 720p"   id="medium_q">720p</a>
            <a href="#"  download="${data[i].name} 1080p"   id="high_q">1080p</a>
 
            </div>


`
document.getElementById('movieInfo').appendChild(show);
  

  });
}






// displaying search items on the page 

data.forEach((ele,i) => {
    let {name,imdb,date,sposter,genre,url} = ele;

    let card = document.createElement('a');
    card.classList.add('card');
    
    card.innerHTML=`  <img src="${sposter}" alt="" />
    <div class="cont">
        <h3>${name}</h3>
        <p>
            ${genre},${date}, <span>IMDB </span><i class="fa-sharp fa-regular fa-star"></i>${imdb}
        </p>
    </div>

    `
    search.appendChild(card);

})


//// show details of specific movie by search 
let searchCards =document.querySelectorAll('.card')

for (let i = 0; i < searchCards.length; i++) {
  searchCards[i].addEventListener('click', function(e) {
    
    const header = document.querySelector('header');
    header.style.background = `url('${data[i].bposter}')no-repeat center center/cover`;
    
const show=document.getElementById('showinfo')
show.innerHTML=`
<h1 id="title">${data[i].name}</h1>
            <p>
                A criminal mastermind who goes by "The Professor" has a plan to pull
                off the biggest heist in recorded history -- to print billions of
                euros in the Royal Mint of Spain.
            </p>

            <div class="details">
                <h6>A Netflix Orignal Series</h6>
                <h5 id="gen">${data[i].genre}</h5>
                <h4 id="date">${data[i].date}</h4>
                <h3 id="rate">
                    <span>IMDB</span><i class="fa-sharp fa-regular fa-star"></i>${data[i].imdb}
                </h3>
            </div>

            <div class="btns">
               
            <a href="#"  download="${data[i].name} 480p"    id="low_q">480p</a>
            <a href="#"  download="${data[i].name} 720p"   id="medium_q">720p</a>
            <a href="#"  download="${data[i].name} 1080p"   id="high_q">1080p</a>
 
            </div>

`
document.getElementById('movieInfo').appendChild(show);

  });
}





// search filter items 
search_input.addEventListener('keyup',()=>{
let filter=search_input.value.toUpperCase();
let a= search.getElementsByTagName('a');

for (let index = 0; index < a.length; index++) {
    let b= a[index].getElementsByClassName('cont')[0];

    let TextValue= b.textContent || b.innerText;
    if(TextValue.toUpperCase().indexOf(filter)>-1){
        a[index].style.display="flex";
        search.style.visibility="visible";
        search.style.opacity=1;
    }
    else{
        a[index].style.display="none";
    }
    if(search_input.value==0){
        search.style.visibility="hidden";
        search.style.opacity=0;
    }
    
}
})

// let video = document.getElementsByTagName('video')[0];
// let play = document.getElementById('play');
// play.addEventListener('click',()=>{

//     if(video.paused){
//         video.play();
//         play.innerHTML='Pause <i class="fa-solid fa-pause"></i>'
//     }

//     else{
//         video.pause();
//         play.innerHTML='Play <i class="fa-solid fa-play"></i>'
//     }
// });


let series=document.getElementById('series');
let movies = document.getElementById('movies');


// filter movies by series 
series.addEventListener('click',()=>{

  console.log("series clicked")
    cards.innerHTML=''

    let series_array=data.filter(ele=>{
        return ele.type==="series";
    });
    
    series_array.forEach((ele,i)=>{
        let {name,imdb,date,sposter,bposter,genre,url} = ele;
        let card = document.createElement('a');
      
      
        card.classList.add('movieCard');
        
        card.innerHTML=` <img src="${sposter}" alt="${name}" class="poster" />
       
        <div class="rest_card">
          <img src="${bposter}" alt=""  />
          <button class="heart"> <i class="fa-solid fa-heart"></i> </button>
         
          <div class="cont">
            <h4>${name}</h4>
           
            <div class="subtitles">
              <p>${genre},${date}</p>
              <h3>
                <span>IMDB</span
                ><i class="fa-sharp fa-regular fa-star"></i>${imdb}
              </h3>
            </div>
          </div>
        </div>`
        cards.appendChild(card);
    })
})

// filter by  movies 
movies.addEventListener('click',()=>{
  console.log("movies clicked")
    cards.innerHTML=''

    let movie_array=data.filter(ele=>{
        return ele.type==="movie";
    });
    
    movie_array.forEach((ele,i)=>{
        let {name,imdb,date,sposter,bposter,genre,url} = ele;
        let card = document.createElement('a');
        card.classList.add('movieCard');
       
        card.innerHTML=` <img src="${sposter}" alt="${name}" class="poster" />
    
        <div class="rest_card">
          <img src="${bposter}" alt="" />
          <button class="heart"> <i class="fa-solid fa-heart"></i> </button>
    
          <div class="cont">
            <h4>${name}</h4>
            <div class="subtitles">
              <p>${genre},${date}</p>
              <h3>
                <span>IMDB</span
                ><i class="fa-sharp fa-regular fa-star"></i>${imdb}
              </h3>
            </div>
          </div>
        </div>`
        cards.appendChild(card);
    })
})

});




