import { Component } from 'react';

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';
import { PixabayAPI } from '../../service/pixabayAPI';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { Button } from '../Button/Button';
import { Modal } from '../Modal/Modal';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '23189092-912e167e41c5e7d499821c37e';
const newPixabayAPI = new PixabayAPI(BASE_URL, API_KEY);

export class ImagesList extends Component {
  state = {
    searchResults: [],
    status: 'idle',
    largeImageId: null,
    isModalOpen: false,
  };

  componentDidUpdate(prevProps, prevState) {
    let { searchValue } = this.props;
    if (prevProps.searchValue !== searchValue) {
      this.setState({ status: 'pending' });
      newPixabayAPI.resetPage();
      newPixabayAPI.searchQuery = searchValue;
      newPixabayAPI
        .searchPhotos()
        .then(result => {
          console.log(result);
          this.setState({ searchResults: result, status: 'resolved' });
        })
        .catch(error => {
          console.log(error);
          this.setState({ status: 'rejected' });
        });
    }
  }

  handleClick = () => {
    newPixabayAPI.page = 1;
    newPixabayAPI
      .searchPhotos()
      .then(result => {
        this.setState(prev => ({
          searchResults: [...prev.searchResults, ...result],
          status: 'resolved',
        }));
      })
      .then(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({ status: 'rejected' });
      });
  };

  findImg = () => {
    const largeImg = this.state.searchResults.find(result => {
      return result.id === this.state.largeImageId;
    });
    return largeImg;
  };

  openModal = e => {
    this.setState({
      isModalOpen: true,
      largeImageId: Number(e.currentTarget.id),
    });
  };
  closeModal = () => this.setState({ isModalOpen: false });

  render() {
    const { searchResults, largeImageId, isModalOpen, status } = this.state;

    const paramLoadMore =
      searchResults.length > 0 && searchResults.length >= 12;

    if (status === 'idle') {
      return (
        <div className="container-title">
          <p>You can find any pictures, photos and images here</p>
        </div>
      );
    }

    if (status === 'pending') {
      return (
        <div className="loader">
          <Loader
            type="Circles"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={3000}
          />
        </div>
      );
    }

    if (status === 'rejected') {
      return (
        <div className="container-title">
          <p>Uppps, error</p>
        </div>
      );
    }

    if (status === 'resolved') {
      return (
        <>
          <ImageGallery>
            {searchResults.length > 0 && (
              <ImageGalleryItem
                openModal={this.openModal}
                searchResults={searchResults}
              />
            )}
          </ImageGallery>
          {paramLoadMore > 0 && <Button onClick={this.handleClick} />}
          {searchResults.length === 0 && (
            <div className="container-title">
              <p>Sorry, we did not find this</p>
            </div>
          )}
          {isModalOpen && (
            <Modal largeImageId={largeImageId} onClose={this.closeModal}>
              <img
                src={this.findImg().largeImageURL}
                alt={this.findImg().tags}
              />
            </Modal>
          )}
        </>
      );
    }
  }
}
