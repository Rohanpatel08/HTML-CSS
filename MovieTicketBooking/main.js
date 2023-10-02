const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
// const Oseats = document.querySelectorAll('.row .seat.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const bookingBtn = document.getElementById('booking');

const movieSelect = document.getElementById('movie');

let ticketPrice = +movieSelect.value
getMovieData();

//save selected movie and price
function setMovieData(movieIndex, moviePrice){
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

//Update Total and Count
function updateSelectedSeatsCount(){
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    const seatsIndex = [...selectedSeats].map((seat)=>{
        return [...seats].indexOf(seat)
    });
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex)); 

    const TotalSelectedSeats = selectedSeats.length;

    count.innerText = TotalSelectedSeats;
    const totalPrice = ticketPrice*TotalSelectedSeats;
    total.innerText = totalPrice
}

//Get data from localstorage and populate UI
function getMovieData(){
    let selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    console.log(selectedSeats);
    let occupiedSeats = JSON.parse(localStorage.getItem('occupiedSeats'));
    if (selectedSeats != null && selectedSeats.length > 0) {
        seats.forEach((seat, index)=>{
            if(selectedSeats.indexOf(index)>-1){
                seat.classList.add('selected');
            }
        });
    }
    console.log(occupiedSeats);
    if (occupiedSeats != null && occupiedSeats.length > 0) {
        seats.forEach((seat, index)=>{
            if(occupiedSeats.indexOf(index)>-1){
                console.log(seat);
                seat.classList.add('occupied');
            }
        });
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    if(selectedMovieIndex != null){
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

//Movie Seldction Event
movieSelect.addEventListener('change', (e)=>{
    ticketPrice = +e.target.value
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedSeatsCount();
})

//Seat Selection Event
container.addEventListener('click', (e)=>{
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');
        
        updateSelectedSeatsCount(); 
    }
})

//Seat Booking Event
bookingBtn.addEventListener('click', (e)=>{
    let selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    console.log(selectedSeats);
    
    if (selectedSeats != null && selectedSeats.length > 0) {
        seats.forEach((seat, index)=>{
            if(selectedSeats.indexOf(index)>-1){
                seat.classList.remove('selected');
                seat.classList.add('occupied');
            }
        });
    }
    let soldSeats = [...selectedSeats]
    localStorage.setItem('occupiedSeats', JSON.stringify(soldSeats));
    localStorage.setItem('selectedSeats', JSON.stringify([]))
})

updateSelectedSeatsCount();