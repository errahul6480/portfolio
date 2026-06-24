const typedText = [
  "Java Full Stack Developer",
  "Backend Developer",
  "Software Engineer",
  "REST API Developer"
];

let ti = 0;
let ci = 0;
let del = false;

const typed = document.getElementById("typed");

function type() {
  if (!typed) return;

  const word = typedText[ti];

  typed.textContent = del
    ? word.slice(0, --ci)
    : word.slice(0, ++ci);

  if (!del && ci === word.length) {
    del = true;
    setTimeout(type, 900);
    return;
  }

  if (del && ci === 0) {
    del = false;
    ti = (ti + 1) % typedText.length;
  }

  setTimeout(type, del ? 55 : 95);
}

type();

/* Loader */
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");

  setTimeout(() => {
    if (loader) loader.classList.add("hide");
  }, 700);
});

/* Theme Toggle */
const theme = document.getElementById("themeToggle");

if (theme) {
  if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light");
    theme.textContent = "☀️";
  } else {
    theme.textContent = "🌙";
  }

  theme.onclick = () => {
    document.body.classList.toggle("light");

    const isLight = document.body.classList.contains("light");

    theme.textContent = isLight ? "☀️" : "🌙";
    localStorage.setItem("theme", isLight ? "light" : "dark");
  };
}

/* Mobile Menu */
const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

if (menuBtn && navMenu) {
  menuBtn.onclick = () => {
    navMenu.classList.toggle("show");
    navMenu.classList.toggle("active");
  };

  document.querySelectorAll("#navMenu a").forEach((link) => {
    link.onclick = () => {
      navMenu.classList.remove("show", "active");
    };
  });
}

/* Scroll Reveal */
const reveals = document.querySelectorAll(".reveal");

if (reveals.length > 0) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    },
    { threshold: 0.14 }
  );

  reveals.forEach((reveal) => observer.observe(reveal));
}

/* Project Filters */
document.querySelectorAll(".filters button").forEach((btn) => {
  btn.onclick = () => {
    document.querySelectorAll(".filters button").forEach((b) => {
      b.classList.remove("active");
    });

    btn.classList.add("active");

    const filter = btn.dataset.filter;

    document.querySelectorAll(".project-card").forEach((card) => {
      card.style.display =
        filter === "all" || card.dataset.category === filter
          ? "block"
          : "none";
    });
  };
});

/* Custom Cursor */
const cursor = document.querySelector(".cursor");

if (cursor) {
  document.addEventListener("mousemove", (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
  });
}

/* Contact Form */
function sendMessage(e) {
  e.preventDefault();

  alert("Thanks! Your message form is ready. Connect backend or email service to receive messages.");

  e.target.reset();
}

/* Chatbot */
const chat = document.getElementById("chatbot");
const chatBody = document.getElementById("chatBody");
const chatInput = document.getElementById("chatInput");
const chatBtn = document.getElementById("chatBtn");
const closeChat = document.getElementById("closeChat");

if (chat && chatBtn) {
  chatBtn.onclick = () => {
    chat.classList.add("active");
    chat.style.display = "block";
  };
}

if (chat && closeChat) {
  closeChat.onclick = () => {
    chat.classList.remove("active");
    chat.style.display = "none";
  };
}

if (chatInput && chatBody) {
  chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && chatInput.value.trim() !== "") {
      const userQuestion = chatInput.value.trim();
      const question = userQuestion.toLowerCase();

      let answer =
        "Rahul is a Java Full Stack Developer skilled in Java, Spring Boot, React.js, SQL, MySQL, PostgreSQL, REST APIs and full stack projects.";

      if (question.includes("project")) {
        answer =
          "Projects: Library Management System, Student Management System, Weather Application and To-Do List Application.";
      } else if (question.includes("skill")) {
        answer =
          "Skills include Java, C, C++, JavaScript, SQL, React.js, Spring Boot, Node.js, MySQL, PostgreSQL, Git, GitHub and Postman.";
      } else if (question.includes("contact")) {
        answer =
          "Email: rahulkumarsingh6480@gmail.com, Phone: +91-9798010143, Location: Bihar, India.";
      } else if (question.includes("education")) {
        answer =
          "B.Tech CSE at Amritsar Group of Colleges, IKG PTU, 2023-2027, CGPA 6.4.";
      } else if (question.includes("resume")) {
        answer =
          "You can download Rahul's resume using the Download Resume button in the hero section or resume section.";
      }

      chatBody.innerHTML += `
        <p><b>You:</b> ${userQuestion}</p>
        <p><b>Bot:</b> ${answer}</p>
      `;

      chatInput.value = "";
      chatBody.scrollTop = chatBody.scrollHeight;
    }
  });
}