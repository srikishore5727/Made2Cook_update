const randomMeal=document.getElementById("random-box");
const popup=document.getElementById("popup");
const searchOpt=document.getElementById("search-opt");
const result=document.getElementById("result");
const searchedRecipe = document.getElementById("searched-recipe");


fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then((res)=>res.json())
    .then((res)=>{displayRandomMeal(res.meals[0])});

function displayRandomMeal(data){
    console.log(data)
    let image=document.createElement("img");
    image.src=data.strMealThumb;
    image.style.height='300px';
    image.style.borderRadius='10px'
    image.style.border='1px solid black'

    let h2 = document.createElement("h2");
    h2.innerText=data.strMeal;

    randomMeal.append(image,h2)
    let div=document.createElement('div');
    let h1=document.createElement("h1")
    h1.innerHTML=`&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp  INGREDIENTS &nbsp &nbsp &nbsp &nbsp <i class="fa fa-close" style="font-size:65px;color:green;cursor:pointer;" onclick="popup.style.display='none'"></i> <br>`;
    
    div.append(h1);

    for(let i=1;i<=20;i++){
    let p=document.createElement("p");
    let item=`strIngredient${i}`
    p.innerText=data[item]
    div.append(p)
    }

    div.className='ingredients-div';
    popup.append(div)

    randomMeal.onclick=function(){
        popup.style.display='inherit';
    }
} 
    
searchOpt.addEventListener('keypress',(e)=>{
    if(e.key==='Enter'){
        e.preventDefault();
        food=searchOpt.value;
        // searchedRecipe.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
            searchedRecipe.scrollIntoView({ behavior: 'smooth' });
          }, 600);
        
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${food}`)
    .then((res)=>res.json())
    .then((res)=>{
        result.innerHTML = '';
        displaySearchRecipe(res.meals);
        console.log(res.meals)})
    }
})
    
function displaySearchRecipe(data){
data.forEach((element) => {
    let div=document.createElement("div");

    let image=document.createElement("img");
    image.src=element.strMealThumb;
    image.style.height='300px';
    image.style.margin="20px";


    let p=document.createElement("p");
    p.innerHTML=element.strMeal;

    div.append(image,p)
    result.append(div);
});
}