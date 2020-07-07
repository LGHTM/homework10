import React from "react";
import { FilmsList } from "./FilmList";
import { FilmAddForm } from "./FilmAddForm";
import { BrowserRouter, Switch, Route, Link, Redirect } from "react-router-dom";
import { FilmEdit } from "./FilmEdit";

export class FilmsPages extends React.Component {
  state = {
    isLoading: true,
    films: null,
    error: null,
  };

  async componentDidMount() {
    try {
      const response = await fetch("http://localhost:3000/films");
      const films = await response.json();
      console.log(films);
      this.setState(() => ({ films }));
    } catch (error) {
      this.setState(() => ({ error }));
    }

    this.setState(() => ({ isLoading: false }));
  }

  render() {
    if (this.state.isLoading) {
      return "Загрузка";
    }

    if (this.state.error) {
      return "Ошибка";
    }

    return (
      <>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact>
              <Redirect to="films" />
            </Route>
            <Route path="/films" exact>
              <FilmsList
                films={this.state.films}
                onDelete={async (filmId) => {
                  this.setState({ isLoading: true });

                  const response = await fetch(
                    `http://localhost:3000/films/${filmId}`,
                    {
                      method: "DELETE",
                    }
                  );

                  if (response.ok) {
                    this.setState((state) => ({
                      films: state.films.filter((film) => film.id !== filmId),
                      isLoading: false,
                    }));
                  }
                }}
              />
            </Route>
            <Route path="/films/add">
              {({ history }) => (
                <FilmAddForm
                  onFilmAdd={async (filmToAdd) => {
                    this.setState({ isLoading: true });

                    const response = await fetch(
                      "http://localhost:3000/films",
                      {
                        method: "POST",
                        body: JSON.stringify(filmToAdd),
                        headers: {
                          "content-type": "application/json",
                        },
                      }
                    );

                    history.push("/films");

                    const addedFilm = await response.json();

                    this.setState((state) => ({
                      authos: [...state.films, addedFilm],
                      isLoading: false,
                    }));
                  }}
                />
              )}
            </Route>
            <Route path="/films/:id">
              {({ match, history }) => (
                <FilmEdit
                  film={this.state.films.find(
                    (film) => film.id === parseInt(match.params.id)
                  )}
                  onFilmEdit={async (filmToUpdate) => {
                    this.setState({ isLoading: true });

                    const response = await fetch(
                      `http://localhost:3000/films/${match.params.id}`,
                      {
                        method: "PUT",
                        body: JSON.stringify(filmToUpdate),
                        headers: {
                          "content-type": "application/json",
                        },
                      }
                    );

                    history.push("/films");

                    const updateFilm = await response.json();

                    this.setState((state) => ({
                      films: state.films.map((film) =>
                        film.id === updateFilm.id
                          ? { ...film, ...updateFilm }
                          : film
                      ),
                      isLoading: false,
                    }));
                  }}
                />
              )}
            </Route>
            <Route>Cтраница не найдена</Route>
          </Switch>
        </BrowserRouter>
      </>
    );
  }
}
