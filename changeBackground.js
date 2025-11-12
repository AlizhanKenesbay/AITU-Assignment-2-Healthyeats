document.addEventListener("DOMContentLoaded", function () {
  const btn = document.getElementById("changeColorBtn");

  const colors = ["#FFFFFF", "#FFF8E1", "#F2B200", "#699635", "#D7F5D0", "#F9E79F"];
  let index = 0;

  if (btn) {
    btn.addEventListener("click", function () {
      document.body.style.backgroundColor = colors[index];
      index = (index + 1) % colors.length;
    });
  }
});
document.addEventListener("DOMContentLoaded", function() {
    const counters = document.querySelectorAll('.counter');

    function animateCounter(counter) {
        const target = +counter.getAttribute('data-target');
        const speed = 200;
        let count = 0;
        const step = target / speed;

        const interval = setInterval(() => {
            count += step;
            if (count >= target) {
                clearInterval(interval);
                count = target;
            }
            counter.querySelector('p').textContent = Math.ceil(count);
        }, 1);
    }

    counters.forEach(counter => {
        animateCounter(counter);
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const themeToggle = document.getElementById("themeToggle");
    const savedTheme = localStorage.getItem("theme") || "light";
    document.body.dataset.theme = savedTheme;

    themeToggle.textContent = savedTheme === "dark" ? "☀️" : "🌙";

    themeToggle.addEventListener("click", function () {
        const newTheme = document.body.dataset.theme === "light" ? "dark" : "light";
        document.body.dataset.theme = newTheme;
        themeToggle.textContent = newTheme === "dark" ? "☀️" : "🌙";
        localStorage.setItem("theme", newTheme);
    });
});

document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault(); 

    
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Message:", message);

    
    const responseMessage = document.getElementById("responseMessage");
    responseMessage.style.display = "block";
    responseMessage.textContent = "Your message has been sent successfully! We will contact you soon.";

   
    document.getElementById("contactForm").reset();
});




const burger = document.getElementById('burger');
const navbar = document.getElementById('navbar');


burger.addEventListener('click', () => {
  navbar.classList.toggle('active');
});


document.getElementById('showDishButton').addEventListener('click', function() {
   
    const sex = document.getElementById('sex').value;
    const size = document.getElementById('size').value;
    const type = document.getElementById('type').value;

    let dishTitle = "";
    let dishDescription = "";

    if (type === "non-vegetarian" && size === "medium" && sex === "female") {
        dishTitle = "POKE BOWL";
        dishDescription = "Healthy protein infused with Japanese inspired flavors for a delicious gourmet meal.";
    } else if (type === "vegetarian" && size === "large" && sex === "male") {
        dishTitle = "VEGETARIAN BOWL";
        dishDescription = "A hearty vegetarian bowl packed with nutrients and flavors.";
    } else if (type === "non-vegetarian" && size === "large" && sex === "male") {
        dishTitle = "NON-VEGETARIAN DELIGHT";
        dishDescription = "A protein-rich non-vegetarian dish full of flavor.";
    } else if (type === "vegetarian" && size === "medium" && sex === "female") {
        dishTitle = "VEGGIE BOWL";
        dishDescription = "Packed with fresh vegetables and a variety of healthy flavors.";
    } else {
        dishTitle = "Custom Dish";
        dishDescription = "Custom dish based on your preferences!";
    }

    
    document.getElementById('dishTitle').textContent = dishTitle;
    document.getElementById('dishDescription').textContent = dishDescription;

    
    document.getElementById('dishDisplay').style.display = 'block';
});


