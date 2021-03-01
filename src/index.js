let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});
const divCollector = document.querySelector('div#toy-collection')
function createToys(toy){
  let h2 = document.createElement('h2')
  h2.innerText = toy.name
  let img = document.createElement('img')
  img.src = toy.image
  let p = document.createElement('p')
  p.innerText = `${toy.likes} Likes`
  let button = document.createElement('button')
  button.innerText = "Like"
  button.addEventListener('click', function (event){
  const pTag = event.target.closest('p')
  console.log(pTag)
  const current = parseInt(pTag.textContent)
  const newLikes = {
    likes: current + 1
  }
  fetch(`http://localhost:3000/toys/:id`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"},
  
    body: JSON.stringify(newLikes)
    })
    .then (response => response.json())
    .then (data => {
      pTag.textContent = `${data.likes} likes`
    })   
  })
  let div = document.createElement('div')
  div.append(h2, img, p, button)
  divCollector.append(div)
}
const form = document.querySelector('form')
form.addEventListener('submit', function (event) {
  event.preventDefault()

  const name = event.target[0].value
  const img = event.target[1].value
  const likes = 0

  const newToy = {
    name: name,
    image: img,
    likes: likes
  }
  fetch("http://localhost:3000/toys", {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"},
    
    body: JSON.stringify(newToy),
  })
    .then(response => response.json())
    .then(newToy => {
      createToys(newToy)
    })

  event.target.reset()
  
})


fetch("http://localhost:3000/toys")
  .then(response => response.json())
  .then(toys => toys.forEach(toy => {createToys(toy)}))





  


 