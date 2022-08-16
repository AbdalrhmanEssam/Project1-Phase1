const link = "http://localhost:3000/courses";
const C_container = document.querySelector(".all-courses");

function fetch_courses() {
  return new Promise((resolve, reject) => {
    fetch(link)
      .then((response) => response.json())
      .then((data) => data.forEach((course) => Generator(course)));
  });
}
fetch_courses();
function Generator(C_data) {
  const C_img = C_data.image;
  const C_title = C_data.title;
  const C_aurthor = C_data.author;
  const C_price = C_data.price;

  const html = `
    <div >
    <img class="course-img img" src=${C_img}>
    <h3 class="course-title">${C_title}</h3>
    <h5 class="course-author">${C_aurthor}</h5>
    </div>`;
  C_container.insertAdjacentHTML("beforeend", html);
}
document.querySelector(".search-button").addEventListener("click", function () {
  search();
});

function search() {
  const search_item = document.querySelector(".search").value;
  C_container.innerHTML = "";

  function F_courses() {
    return new Promise((resolve, reject) => {
      fetch(link)
        .then((response) => response.json())
        //.then((jsonData) => resolve(jsonData))
        .then((data) => {
          const filtered_data = filtering(data, search_item);
          console.log(filtered_data);
          filtered_data.forEach((course) => Generator(course));
        });
    });
  }
  F_courses();
}

function filtering(data, item) {
  return data.filter((course) => {
    return course.title.toLowerCase().includes(item.toLowerCase());
  });
}
