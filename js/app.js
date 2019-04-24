// alert('hello world');
let images = [];

let Image = function(url, title, description, keyword, horns){
  this.url = url;
  this.title = title;
  this.description = description;
  this.keyword = keyword;
  this.horns = horns;
  images.push(this);
};


$.get('/data/page-1.json', data => {
  console.log(data);
  data.forEach(img => {
    let image = new Image();
    image.url = img.image_url;
    image.title = img.title;
    image.description = img.description;
    image.keyword = img.keyword;
    image.horns = img.horns;
    $('#photo-template').append(`<img src=${image.url} alt=${image.description} title=${image.title}>`);
  });
});


