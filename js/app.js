
// alert('hello world');
let images1 = [];
let images2 = [];
let keywords = [];

let Image = function(url, title, description, keyword, horns){
  this.url = url;
  this.title = title;
  this.description = description;
  this.keyword = keyword;
  this.horns = horns;
};

let getData = (dataUrl) =>{
  console.log('here');
  $.get(dataUrl, data => {
    console.log(data);
    $('#photo-template').empty();
    data.forEach(img => {
      let image = new Image();
      image.url = img.image_url;
      image.title = img.title;
      image.description = img.description;
      image.keyword = img.keyword;
      image.horns = img.horns;
      if(dataUrl === 'data/page-1.json'){
        images1.push(image);
      }else{
        images2.push(image);
      }

      $('#photo-template').append(`<img src=${image.url} alt=${image.description} title=${image.title} class=${image.keyword}>`);
  
      if (!keywords.includes(image.keyword)){
        $('select').append(`<option value=${image.keyword}> ${image.keyword} </option>`);
        keywords.push(image.keyword);
      }
    });
  });
  
};

$('#button1').on('click', event =>{
  event.preventDefault();
  getData('data/page-1.json');
});

$('#button2').on('click', event =>{
  event.preventDefault();
  getData('data/page-2.json');
});



$('select').on('change', (event) => {
  event.preventDefault();
  let options = event.target;
  Object.keys(options).forEach( (index) => {
    if(options[index].selected){
      let keyword = options[index].value;
      getImagesByKeyword(keyword);
    }
  });

});


const getImagesByKeyword = keyword => {
  let images = $('img');
  console.log();
  Object.keys(images).forEach(index => {
    let className = images[index].className;
    if (className !== keyword){
      $(`.${className}`).hide();
    }
  });
  $(`.${keyword}`).show();
  $('h2').text(keyword.toUpperCase());
};

getData('data/page-1.json');
