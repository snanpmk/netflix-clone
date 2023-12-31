const key = 'cfb4fbb2bf95b3fc8262f69ece4c71b0'

const requests = {
    requestPoplular:`https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en`,
    requestToprated:`https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=en`,
    requestTrending:`https://api.themoviedb.org/3/trending/all/day?api_key=${key}&language=en`,
    requestHorror:`https://api.themoviedb.org/3/discover/movie?api_key=${key}&with_genres=27&language=en`,
    requestUpcoming:`https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&language=en`,
}

export default requests