document.addEventListener("DOMContentLoaded", () => {
    // Smooth scrolling for navbar links
    document.querySelectorAll(".nav-link").forEach(anchor => {
        anchor.addEventListener("click", function(event) {
            event.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            document.getElementById(targetId).scrollIntoView({ behavior: "smooth" });
        });
    });
});



function fetchNews() {
    const url = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=c80f5c9311dd4411b7e17b635e184b20';

    fetch(url)
        .then(response => response.json())  
        .then(data => {
            console.log(data); 

            const newsContainer = document.getElementById("news-container");
            newsContainer.innerHTML = "";  
            if (data.articles) {
                data.articles.slice(0, 10).forEach(article => {  
                    const newsCard = document.createElement("div");
                    newsCard.className = "col-md-6 col-lg-4";
                    newsCard.innerHTML = `
                        <div class="card h-100">
                            <img src="${article.urlToImage || 'https://via.placeholder.com/150'}" class="card-img-top" alt="News Image">
                            <div class="card-body">
                                <h5 class="card-title">${article.title}</h5>
                                <p class="card-text">${article.description || "No description available."}</p>
                                <a href="${article.url}" class="btn btn-primary" target="_blank">Read more</a>
                            </div>
                        </div>`;
                    newsContainer.appendChild(newsCard);
                });
            } else {
                newsContainer.innerHTML = "<p class='text-center text-danger'>No news found.</p>";
            }
        })
        .catch(error => console.error("Error fetching news:", error));
}
