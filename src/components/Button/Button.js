export const Button = ({ onClick }) => {
  return (
    <>
      <button className="btn-load" type="button" onClick={onClick}>
        Load more
      </button>
    </>
  );
};
