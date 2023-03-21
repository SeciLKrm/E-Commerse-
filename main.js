const categoryList = document.querySelector('.categories');
const productList =document.querySelector(".products")

const openBtn= document.getElementById('open-btn');
const closeBtn = document.getElementById('close-btn');
const modal =document.getElementById('modal-wrapper');
const modalList =document.querySelector('.modal-list');
const modalInfo = document.getElementById('modal-info');

document.addEventListener("DOMContentLoaded",() =>{
     //CALLBACK > İçerisinde başka fonksiyon çalıştıran fonksiyon
fetchCategories();
fetchProducts()

});
function fetchCategories(){
    fetch(' https://api.escuelajs.co/api/v1/categories')
    // GELEN VERİYİ İŞLEME
    .then((response)=> response.json())
     // OLUŞAN DATAYI FOREACH İLE HERR BİR OBJE İÇİN FONKSİYON ÇALIŞTIRMA
    .then((data) =>data.slice(0, 4).forEach((category) =>{
        // GELEN HERBİR OBJE İÇİN dıv oluşturma
        const categoryDiv = document.createElement('div');
        // Dive class ekleme
        categoryDiv.classList.add('category');
          // Divin içeriğini değiştirme
        categoryDiv.innerHTML = `<img src="${category.image}"/>
                                    <span>${category.name}</span>`
     // Oluşan categoryi htmldeki listeye atma
      categoryList.appendChild(categoryDiv);
    }))
    .catch((err)=> console.log(err))
}
console.log(categoryList);

//ÜRÜNLERİ ÇEKME
function fetchProducts(){
      // apı YE İSTEK ATMA
    fetch('https://api.escuelajs.co/api/v1/products')
    // İstek başarılı olursa veriyi işle
    .then((res)=> res.json())
     // işlenen veriyi al ve ekrana bas
    .then((data)=>
    data.slice(0, 25).forEach((product) => {
          // DİV oluştur
      const productDiv = document.createElement('div');
      productDiv.classList.add('product')
        // içeiriği değiştir
      productDiv.innerHTML=`<img src="${product.images[0]}"/>
      <p class="product-title">${product.title} </p>
      <p class="product-category">${product.category.name}</p>
      <div class="product-action">
      <p>${product.price} $</p>
      <button onclick="sepeteEkle({id:'${product.id}',name:'${product.title}',price:'${product.price}',image:'${product.images[0]}',amount:1})">Sepete Ekle</button>
      </div>
    </div>
  `;
// htmle göndericez
    productList.appendChild(productDiv)
    }))
       // hata olursa devreye gir
    .catch(err=> console.log(err))

}console.log(productList)


// BUTONA ÜRÜN GİRMEK İÇİN TIKLAMA
let basket = [];
var toplam = 0;

const addList = () => {
  basket.forEach((product) => {
    const listItem = document.createElement('div');
    listItem.classList.add('list-item');
    listItem.innerHTML= `
    <div>  
    <img src="${product.image}" alt="">
    </div>
    <h2>${product.name}</h2>
    <h2>${product.price}</h2>
    <p> Miktar :${product.amount}</p>
    <button id="del" onclick="deleteFrom({id:'${product.id}', price:'${product.price}', amount:'${product.amount}'})">Del</button>
    `;
    modalList.appendChild(listItem);

    toplam += Number(product.price) * Number(product.amount);
  });
  
};

//SEPETTEN SİL

const deleteFrom =(param) => {
basket = basket.filter((i) => i.id !== param.id);
toplam -= Number(param.price) * Number(param.amount);
modalInfo.innerText = toplam;
};

modalList.addEventListener('click',(e) =>{
  if(e.target.id ==='del'){
    e.target.parentElement.remove();
  }
});

// MODAL 
openBtn.addEventListener('click', () => {
toggleModal();
addList();
modalInfo.innerText=toplam;
})


closeBtn.addEventListener('click', () =>{

  toggleModal();
  toplam = 0;
  modalInfo.innerText = '';

});

// eğer modal dışına tıklanırsa da kapanır
//modal.addEventListener('click' ,(e) =>{
 // if (e.target.id !== 'modal'){
  //  modal.classList.remove('active');
  //}
//})
function toggleModal() {
  modal.classList.toggle('active');
}



//SEPETE EKLE


function sepeteEkle(product){
// sepette eleman ara, eleman ürünlerin id sine eşit olduğunda
  const findItem =basket.find((eleman) => eleman.id === product.id );
  // eğer eşit ürün bulursa miktarını bir artır
  if(findItem){
    findItem.amount += 1;
    // değilse sepete ekle yani pushla
  } else{
  basket.push(product);
}
console.log(basket);
}

