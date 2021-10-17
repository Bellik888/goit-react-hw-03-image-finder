export const ImageGalleryItem = ({ searchResults, openModal }) => {
  return (
    <>
      {searchResults.map(({ id, webformatURL, tags }) => (
        <li key={id} id={id} onClick={openModal} className="ImageGalleryItem">
          <img
            src={webformatURL}
            alt={tags}
            className="ImageGalleryItem-image"
          />
        </li>
      ))}
    </>
  );
};
