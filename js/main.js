"use strict";

/* /INICIALIZADORES */

const $navBottom = document.querySelector(".navBottom");
const $wrapper = document.querySelector(".sliderWrapper");
const currentProductImg = document.querySelector(".productImg");
const currentProductTitle = document.querySelector(".productTitle");
const currentProductPrice = document.querySelector(".productPrice");
const currentProductColors = document.querySelectorAll(".color");
const currentProductSizes = document.querySelectorAll(".size");
let productDesc = document.querySelector(".product");
const right = document.querySelector(".itemSelectorRight")
const left = document.querySelector(".itemSelectorLeft")



let htmlBusqueda = "";
let product = [];
let html = "";
let choosenProduct = "";

function generarNumero(numero){
return (Math.random()*numero).toFixed(0);
}

function colorRGB(){
var coolor = "("+generarNumero(255)+"," + generarNumero(255) + "," + generarNumero(255) +")";
return "rgb" + coolor;
}
let cont = 0;
/*  MENU */
const ButonsItem = ()=>{

      left.addEventListener("click",()=>{
      if(cont >0){
            console.log('entre izq');
            $wrapper.style.transform += `translateX(${+ 100 }vw)`
            cont -= 1;
            choiseProduct(cont );
            

        }
      });
        
        right.addEventListener("click",()=>{
          if(cont < product.length -1){
            console.log('entre derecha');
            $wrapper.style.transform += `translateX(${-100}vw)`;
            cont += 1
            choiseProduct(cont);
            console.log(cont);
            console.log(product.length);
          }  
      });
    }


  const choiseProduct = (index) =>{
            choosenProduct = product[index];

            //change texts 0f currentProduct
            currentProductTitle.textContent = choosenProduct.name;
            currentProductPrice.textContent = "$" + choosenProduct.price;
            currentProductImg.src = choosenProduct.colors[0].img;

            currentProductSizes.forEach((sizes, index) => {
                choosenProduct.size.forEach(size => sizes[index] == size[index] ? sizes.textContent = size : sizes.textContent = "-")
            });
            
            //assing new colors
            currentProductColors.forEach((color, index) => {
            color.style.backgroundColor = choosenProduct.colors[index].code;
            });
    } 
  
/* CARGA DE DATOS EN EL BODY */
const cargaProd = ()=>{
    product.forEach(prod =>{ 
        html += `
        <div class="sliderItem">
        <img src="${prod.img}" alt="" class="sliderImg">
        <div class="sliderCont">
            <div class="sliderBg${prod.id}"></div>
        </div>
        <h1 class="sliderTitle">${prod.name}</br> NEW</br> SEASON</h1>
        <h2 class="sliderPrice">$${prod.price}</h2>
        <a href="#product">
            <button class="buyButton">BUY NOW!</button>
        </a>
        </div>
 
        `;
        $wrapper.style.width = 100 * product.length + `vw`;
        document.getElementById("$wrapper").innerHTML = html;
        
    })
    
    ButonsItem(); 
    cargaClrs();
    cargaStock();
}


// PETICION AXIOS

const petAxios = async ()=>{
  let getData = await axios(`info.json`);
  product = getData.data;
  cargaProd();

}

petAxios();


const cargaStock = ()=>{
  product.forEach(prod =>{ 
  htmlBusqueda += `
  
  <div class="card">
    <section>
        <div class="titleCard">${prod.name}</div>
        <button class="butonSearch">Info</button>
        <img src="${prod.img}" alt="" class="imgBusc">                
    </section>
  </div>

      `;

      document.querySelector(".container").innerHTML = htmlBusqueda;
  })
}




// COLORES
currentProductColors.forEach((color, index) => {
color.addEventListener("click", () => {
currentProductImg.src = choosenProduct.colors[index].img;
  }); 
});

// SIZES
currentProductSizes.forEach((size, index) => {
    size.addEventListener("click", () => {
      currentProductSizes.forEach((size) => {
        size.style.backgroundColor = "white";
        size.style.color = "black";
      });
      size.style.backgroundColor = "black";
      size.style.color = "white";
    });
  });

// PAYMENT
const productButton = document.querySelector(".productButton");
const payment = document.querySelector(".payment");
const close = document.querySelector(".close");

productButton.addEventListener("click", () => {
  payment.style.display = "flex";
});

close.addEventListener("click", () => {
  payment.style.display = "none";
});

// COLORES FONDO
const cargaClrs = ()=>{
 product.forEach((prd) => {

     document.querySelector(`.sliderBg${prd.id}`).style = `background-color:` + `${colorRGB()}` +`    
     ;width: 750px;
     height: 750px;
     border-radius: 50%;
     position: absolute;`
    });
}

