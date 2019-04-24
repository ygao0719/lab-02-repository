let dataUrl;

if (window.location.href === 'https://ygao0719.github.io'){
  dataUrl = window.location.href + '/data/page-1.json';
} else {
  dataUrl = '/data/page-1.json';
}

// alert('hello world');
let images = [];
let keywords = [];

let Image = function(url, title, description, keyword, horns){
  this.url = url;
  this.title = title;
  this.description = description;
  this.keyword = keyword;
  this.horns = horns;
  images.push(this);
};


$.get(dataUrl, data => {
  console.log(data);
  data.forEach(img => {
    let image = new Image();
    image.url = img.image_url;
    image.title = img.title;
    image.description = img.description;
    image.keyword = img.keyword;
    image.horns = img.horns;
    $('#photo-template').append(`<img src=${image.url} alt=${image.description} title=${image.title} class=${image.keyword}>`);

    if (!keywords.includes(image.keyword)){
      $('select').append(`<option value=${image.keyword}> ${image.keyword} </option>`);
      keywords.push(image.keyword);
    }
  });
});

$('select').on('change', (event) => {
  event.preventDefault();
  let options = event.target;
  // traverse keys;
  // if options[key].selected === true
  Object.keys(options).forEach( (index) => {
    if(options[index].selected){
      let keyword = options[index].value;
      getImagesByKeyword(keyword);
    }
  });

});


const getImagesByKeyword = keyword => {
  images.forEach(image => {
    if(image.keyword !== keyword) {
      $(`.${image.keyword}`).hide();
    } else {
      $(`.${keyword}`).show();
      $('h2').text(keyword.toUpperCase());
    }
  });
};

