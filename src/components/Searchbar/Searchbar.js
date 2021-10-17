import { Component } from 'react';

export class Searchbar extends Component {
  state = {
    inputValue: '',
  };

  handleSearchValue = e => {
    this.setState({ inputValue: e.target.value });
  };
  handleFormSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.inputValue);
  };

  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleFormSubmit}>
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleSearchValue}
          />
        </form>
      </header>
    );
  }
}
