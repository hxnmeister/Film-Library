const searchResultSection = document.getElementById("searchresult");
const searchSectionTitle = document.getElementById("searchresulttitle");

const searchForm = document.forms.search;
const filmTitle = searchForm.filmtitle;
const filmType = searchForm.filmtype;

const filmDataUrl = "http://www.omdbapi.com/?apikey=f63dee89";

const requestToAPI = async (event) =>
{
    event.preventDefault();
    searchResultSection.innerHTML = "";
    if(searchSectionTitle.hidden) searchSectionTitle.hidden = false;

    try
    {
        const searchResult = await fetch(filmDataUrl + `&s=${filmTitle.value}&type=${filmType.value}`).then(data => data.json());
        
        searchResult.Search.map(film => 
            {
                searchResultSection.innerHTML += 
                `
                    <div class="displayfilm">
                        <div class="resultposter">
                            <img src="${film.Poster}" alt="Poster">
                        </div>
                        <div class="resultdetails">
                            <p>${film.Type}</p>
                            <p>${film.Title}</p>
                            <p>${film.Year}</p>
                            <button id=${film.imdbID}>Details</button>
                        </div>
                    </div>
                `
            });
            
            searchResultSection.querySelectorAll("button").forEach(button => button.addEventListener("click", async (event) => 
            {
                const filmDetails = await fetch(filmDataUrl + `&i=${event.currentTarget.id}`).then(film => film.json());
    
                document.getElementById("searchsection").hidden = true;
                searchResultSection.hidden = true;
                
                document.getElementById("filmdetails").innerHTML = 
                `
                    <div class="displayfilmdetails">
                        <div class="detailedposter">
                            <img src="${filmDetails.Poster}" alt="Poster">
                        </div>
                        <div class="details">
                            <p>Title: ${filmDetails.Title}</p>
                            <p>Released: ${filmDetails.Released}</p>
                            <p>Genre: ${filmDetails.Genre}</p>
                            <p>Country: ${filmDetails.Country}</p>
                            <p>Writer: ${filmDetails.Writer}</p>
                            <p>Actors: ${filmDetails.Actors}</p>
                            <p>Awards: ${filmDetails.Awards}</p>
                        </div>
                    </div>
                `;
            }));
    }
    catch
    {
        alert("Movie not found!");
    }
}

searchForm.addEventListener("submit", requestToAPI);