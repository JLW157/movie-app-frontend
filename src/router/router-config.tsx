import { RouterProvider, createBrowserRouter, createRoutesFromElements, Navigate, Route } from "react-router-dom";
import CreateActor from "../actors/CreateActor";
import EditActor from "../actors/EditActor";
import IndexActors from "../actors/IndexActors";
import IndexUsers from "../auth/IndexUsers";
import Login from "../auth/Login";
import ProtectedRoutes from "../auth/ProtectedRoute";
import Register from "../auth/Register";
import CreateGenre from "../genres/CreateGenre";
import EditGenre from "../genres/EditGenre";
import IndexGenres from "../genres/IndexGenres";
import CreateMovie from "../movies/CreateMovie";
import EditMovie from "../movies/EditMovie";
import FilterMovies from "../movies/FilterMovie";
import LandingPage from "../movies/LandingPageComponent";
import MovieDetails from "../movies/MovieDetails";
import MoviesLayout from "../movies/MoviesLayout";
import CreateMovieTheather from "../movieTheathers/CreateMovieTheater";
import EditMovieTheather from "../movieTheathers/EditMovieTheater";
import IndexMovieTheaters from "../movieTheathers/IndexMovieTheathers";
import Profile from "../profile/Profile";
import ErrorPage from "../UI/ErrorPage";
import LayoutRoute from "../UI/LayoutForRoute";
import RootLayout from "../UI/RootLayout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout />} errorElement={<ErrorPage />}>
      <Route index element={<Navigate to='movies' />} />
      <Route path='movies' element={<MoviesLayout />}>
        <Route index element={<LandingPage />} />
        <Route path=":id" element={<MovieDetails />} />
        <Route path='filter' element={<FilterMovies />} />
        <Route element={<ProtectedRoutes isAdmin={true} isAnyAuthUser={false} />}>
          <Route path='edit/:id' element={<EditMovie />} />
          <Route path='create' element={<CreateMovie />} />
        </Route>
      </Route>
      <Route element={<ProtectedRoutes isAdmin={true} isAnyAuthUser={false} />}>
        <Route path='genres' element={<LayoutRoute />}>
          <Route index element={<IndexGenres />} />
          <Route path='edit/:id' element={<EditGenre />} />
          <Route path='create' element={<CreateGenre />} />
        </Route>
        <Route path='actors' element={<LayoutRoute />}>
          <Route index element={<IndexActors />} />
          <Route path='edit/:id' element={<EditActor />} />
          <Route path='create' element={<CreateActor />} />
        </Route>
        <Route path='movie-theathers'>
          <Route index element={<IndexMovieTheaters />} />
          <Route path='edit/:id' element={<EditMovieTheather />} />
          <Route path='create' element={<CreateMovieTheather />} />
        </Route>
        <Route path="users" element={<IndexUsers />} />
      </Route>
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
      <Route path="profile" element={<Profile />} />
    </Route>
  ));

const MyRouter = () => {
  return <RouterProvider router={router}></RouterProvider>
};

export default MyRouter;