function loadFooter() {
  const footer = document.createElement("footer");
  footer.classList.add("bg-dark", "py-4", "mt-auto");

  footer.innerHTML = `
    <div class="container">
      <div class="row align-items-center justify-content-between flex-column flex-sm-row">
        <div class="col-auto text-center text-lg-start">
          <div class="small m-0 text-white mb-2">
            Copyright &copy; Barrier Breakers 2024
          </div>
        </div>
        <div class="col-auto">
          <!-- Email Developer -->
          <a class="btn btn-outline-light m-1" href="mailto:noah.alsamawi@gmail.com" role="button" aria-label="Email the developer">
            <i class="fa fa-envelope"></i>
          </a>
          <!-- Link to FB business page -->
          <a class="btn btn-outline-light m-1" href="https://www.facebook.com" role="button" target="_blank" aria-label="Link to our Facebook" rel="noopener noreferrer">
            <i class="fab fa-facebook-f"></i>
          </a>
          <!-- Link to GitHub -->
          <a class="btn btn-outline-light m-1" href="https://github.com" role="button" target="_blank" aria-label="Link to our Github">
            <i class="fab fa-github"></i>
          </a>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(footer);
}

// Load the footer when the page loads
loadFooter();
