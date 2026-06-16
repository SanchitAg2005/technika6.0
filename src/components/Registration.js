export class RegistrationController {
  constructor(config) {
    this.config = config;
    this.status = config.registrationStatus || "upcoming";
    this.link = config.registrationLink || "#";

    this.registerButtons = document.querySelectorAll(".btn-register");
    this.updateButtonStates();
  }

  updateButtonStates() {
    this.registerButtons.forEach(button => {
      // Clear previous classes
      button.classList.remove("upcoming", "open", "closed");
      
      switch (this.status) {
        case "open":
          button.classList.add("open");
          button.textContent = "Register Now";
          button.disabled = false;
          button.onclick = () => {
            window.open(this.link, "_blank", "noopener,noreferrer");
          };
          break;
          
        case "closed":
          button.classList.add("closed");
          button.textContent = "Registration Closed";
          button.disabled = true;
          button.removeAttribute("onclick");
          break;
          
        case "upcoming":
        default:
          button.classList.add("upcoming");
          button.textContent = "Register Soon";
          button.disabled = true;
          button.removeAttribute("onclick");
          break;
      }
    });
  }
}
