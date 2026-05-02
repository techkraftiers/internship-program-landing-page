const menu = document.getElementById("menu-toggle");
// const icon = menu.querySelector("i"); // target icon properly
const navbar = document.getElementById("navList");

// menu.onclick = () => {
//     navbar.classList.toggle("active");

//     // Toggle icon on <i>, not div
//     if (icon.classList.contains('fa-bars')) {
//         icon.classList.remove('fa-bars');
//         icon.classList.add('fa-xmark');
//     } else {
//         icon.classList.remove('fa-xmark');
//         icon.classList.add('fa-bars');
//     }
// };
if (menu) {
    const icon = menu.querySelector("i");
    menu.onclick = () => {
        navbar.classList.toggle("active");

        if (icon.classList.contains('fa-bars')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        } else {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    };
}

// Close menu on link click
document.querySelectorAll(".navLinks").forEach(link => {
    link.addEventListener("click", () => {
        navbar.classList.remove("active");
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
    });
});


//smooth scroll
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".navLinks");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        // Adjust the offset (150px) to trigger the highlight slightly earlier
        if (pageYOffset >= sectionTop - 150) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove("active");
        
        // Check if the link's href matches the current section ID
        if (link.getAttribute("href").includes(current) && current !== "") {
            link.classList.add("active");
        }
    });
});


// // Import the functions you need from the SDKs you need
// import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.0/firebase-app.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.12.0/firebase-analytics.js";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//     apiKey: "AIzaSyAp0Z5WqKAU9oLmi9t46FCeo1g36rTtp6A",
//     authDomain: "job-ready-internship.firebaseapp.com",
//     databaseURL: "https://job-ready-internship-default-rtdb.asia-southeast1.firebasedatabase.app",
//     projectId: "job-ready-internship",
//     storageBucket: "job-ready-internship.firebasestorage.app",
//     messagingSenderId: "18082247920",
//     appId: "1:18082247920:web:28bdfb9c327c759b247e35",
//     measurementId: "G-WZDTB35JPR"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// // 🔥 Wait for DOM
// document.addEventListener("DOMContentLoaded", () => {

//     const form = document.getElementById("contactForm");

//     form.addEventListener("submit", function(e){
//         e.preventDefault();

//         const name = document.getElementById("name").value;
//         const email = document.getElementById("email").value;
//         const phone = document.getElementById("phone").value;

//         // 🔥 Store data
//         push(ref(db, "leads/"), {
//             name,
//             email,
//             phone,
//             createdAt: new Date().toISOString()
//         });

//         alert("✅ Data Saved Successfully!");
//         form.reset();
//     });
// });

const form = document.getElementById("contactForm");
form.addEventListener("submit", function(e){
    e.preventDefault();

    const data = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        source: "contact Form" // 👈 HERE
    };

    fetch("https://script.google.com/macros/s/AKfycbyvdKkQExGG7IKv4qqanErMvSzO5N4bWGBvbhESeBV4Jhqx9-hy2-38flWkMXqSg6wF/exec", {
        method: "POST",
        body: JSON.stringify(data)
    })
    .then(() => {
        alert("✅ We will contact you soon!");
        form.reset();
    });
});

const heroForm = document.getElementById("heroForm");
heroForm.addEventListener("submit", function(e){
    e.preventDefault();

    const data = {
        name: document.getElementById("heroName").value,
        email: document.getElementById("heroEmail").value,
        phone: document.getElementById("heroPhone").value,
        source: "Hero Form"
    };

    fetch("https://script.google.com/macros/s/AKfycbyvdKkQExGG7IKv4qqanErMvSzO5N4bWGBvbhESeBV4Jhqx9-hy2-38flWkMXqSg6wF/exec", {
        method: "POST",
        body: JSON.stringify(data)
    })
    .then(() => {
        alert("✅ We will share the details with you soon!");
        heroForm.reset();   // 👈 ADD THIS
    });
});

//animation 
// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1 // Trigger when 10% of the card is visible
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Optional: stop observing once animated to keep it visible
            observer.unobserve(entry.target); 
        }
    });
}, observerOptions);

// Select all cards you want to animate
document.querySelectorAll('.what-card, .pricing-card, .test-card, .choose-container li').forEach(card => {
    card.classList.add('reveal'); // Apply the base animation class
    observer.observe(card);       // Start watching the card
});

//scroll to top button
const scrollBtn = document.getElementById("scrollToTop");

window.addEventListener("scroll", () => {
  // Show button after scrolling down 400px
  if (window.pageYOffset > 400) {
    scrollBtn.classList.add("show");
  } else {
    scrollBtn.classList.remove("show");
  }
});

scrollBtn.addEventListener("click", () => {
  // Smooth scroll to the hero section (id="home")
  document.getElementById("home").scrollIntoView({
    behavior: "smooth"
  });
});

// form validation
document.getElementById('contactForm').addEventListener('submit', function(event) {
    let isValid = true;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;

    // 1. Check Phone Format (Simple 10-digit check)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
        alert("Please enter a valid 10-digit phone number.");
        isValid = false;
    }

    // If any check fails, stop the form from submitting/storing
    if (!isValid) {
        event.preventDefault();
    }
});
document.getElementById('heroForm').addEventListener('submit', function(event) {
    let isValid = true;
    const heroPhone = document.getElementById('heroPhone').value;
    const heroEmail = document.getElementById('heroEmail').value;

    // 1. Check Phone Format (Simple 10-digit check)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(heroPhone)) {
        alert("Please enter a valid 10-digit phone number.");
        isValid = false;
    }

    // If any check fails, stop the form from submitting/storing
    if (!isValid) {
        event.preventDefault();
    }

