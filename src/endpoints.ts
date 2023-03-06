const baseUrl = process.env.REACT_APP_API_URL;
console.log(baseUrl);
export const urlGenres = `${baseUrl}/genres`;
export const urlActors = `${baseUrl}/actors`;
export const urlMovieTheaters = `${baseUrl}/movietheaters`;
export const urlMovies = `${baseUrl}/movies`;
export const urlAccounts = `${baseUrl}/accounts`;
export const urlRatings = `${baseUrl}/ratings`;