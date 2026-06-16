export class ContactController {
  constructor(contactData) {
    this.data = contactData;
    
    this.detailsContainer = document.getElementById("contact-details-container");
    this.socialsContainer = document.getElementById("social-links-container");
    this.form = document.getElementById("query-form");

    this.populateDetails();
    this.initFormSubmit();
  }

  populateDetails() {
    if (this.detailsContainer) {
      this.detailsContainer.innerHTML = "";

      // Populate Query Desk info
      if (this.data.queryDesk && this.data.queryDesk.length > 0) {
        this.data.queryDesk.forEach(desk => {
          const item = document.createElement("div");
          item.className = "contact-detail-item";
          item.innerHTML = `
            <span class="contact-detail-label">${desk.name}</span>
            <a href="tel:${desk.phone}" class="contact-detail-value">${desk.phone}</a>
          `;
          this.detailsContainer.appendChild(item);
        });
      }

      // Add General email/phone
      if (this.data.email) {
        const item = document.createElement("div");
        item.className = "contact-detail-item";
        item.innerHTML = `
          <span class="contact-detail-label">Official Email</span>
          <a href="mailto:${this.data.email}" class="contact-detail-value">${this.data.email}</a>
        `;
        this.detailsContainer.appendChild(item);
      }
      
      if (this.data.phone) {
        const item = document.createElement("div");
        item.className = "contact-detail-item";
        item.innerHTML = `
          <span class="contact-detail-label">Reception Phone</span>
          <a href="tel:${this.data.phone}" class="contact-detail-value">${this.data.phone}</a>
        `;
        this.detailsContainer.appendChild(item);
      }
    }

    // Populate Socials links in footer
    if (this.socialsContainer && this.data.socialLinks) {
      this.socialsContainer.innerHTML = "";
      this.data.socialLinks.forEach(link => {
        const a = document.createElement("a");
        a.className = "social-link";
        a.href = link.url;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        a.textContent = link.platform;
        this.socialsContainer.appendChild(a);
      });
    }
  }

  initFormSubmit() {
    if (!this.form) return;

    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      
      const submitBtn = this.form.querySelector(".btn-submit");
      const prevText = submitBtn.textContent;
      
      submitBtn.textContent = "Transmitting...";
      submitBtn.disabled = true;

      // Simulate network transmission delay
      setTimeout(() => {
        alert("Transmission Complete. The Avinyā query desk has received your coordinates.");
        this.form.reset();
        submitBtn.textContent = prevText;
        submitBtn.disabled = false;
      }, 1500);
    });
  }
}
