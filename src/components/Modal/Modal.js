import { Component } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modalRoot');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleClickBackdrop = event => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <div className="Overlay" onClick={this.handleClickBackdrop}>
        <div className="Modal">{this.props.children}</div>
      </div>,
      modalRoot,
    );
  }
}
