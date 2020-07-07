import React from "react";
import { Link } from "react-router-dom";

export const FilmsList = ({ films, onDelete}) => (
  <>
    <Link to="./films/add">Добавить автора</Link>
    {films.map((film) => (
      <>
        <h2>{film.name}</h2>
        <Link to={`/films/${film.id}`}>Редактировать</Link>
        <button onClick={() => onDelete(film.id)}>Удалить</button>
      </>
    ))}
  </>
);
