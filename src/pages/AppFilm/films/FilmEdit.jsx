import React from 'react'

export class FilmEdit extends React.Component {
  state = {
    name: this.props.film.name,
  };

  render() {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();

          if (this.state.name.trim()) {
            this.props.onFilmEdit({ name: this.state.name });
          }
        }}
      >
        <label htmlFor="name">Name</label>
        <input
          type="text"
          value={this.state.name} 
          onChange={(e) => this.setState({ name: e.target.value })}
        />
        <button type="submit">ADD</button>
        <button>Exit</button>
      </form>
    );
  }
}