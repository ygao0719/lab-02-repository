
// alert('hello world');
let images1 = [];
let images2 = [];
let keywords;
let section = $('section');


//Handlebars
const optionRenderer = Handlebars.compile($('#option-template').text());
const firstOptionRenderer = Handlebars.compile($('#first-option-template').text());
const h2Renderer = Handlebars.compile($('#h2-template').text());
const imageContainerRenderer = Handlebars.compile($('#image-container-template').text());

let Image = function(url, title, description, keyword, horns){
  this.url = url;
  this.title = title;
  this.description = description;
  this.keyword = keyword;
  this.horns = horns;
};

let getData = (dataUrl) => {
  $.get(dataUrl, data => {
    keywords = [];
    console.log(data);
    let select = $('select');
    section.empty();
    select.empty();
    select.append(firstOptionRenderer());
  
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

      section.append(imageContainerRenderer(image));

      if (!keywords.includes(image.keyword)){
        //use handlebar template to append filter options on DOM
        select.append(optionRenderer(image));
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
  $('h2').empty();
  section.append(h2Renderer({keyword: keyword}));
  Object.keys(images).forEach(index => {
    let className = images[index].className;
    if (className !== keyword){
      $(`.${className}`).hide();
    }
  });
  $(`.${keyword}`).show();
};

getData('data/page-1.json');
