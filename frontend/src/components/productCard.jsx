

export function ProductCard(props) {
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const totalStars = 5;

    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={`full-${i}`} className="star">★</span>);
    }

    if (halfStar) {
      stars.push(<span key="half" className="star">☆</span>); // Optional: Use a half-star icon if available
    }

    while (stars.length < totalStars) {
      stars.push(<span key={`empty-${stars.length}`} className="star">☆</span>);
    }

    return stars;
  };

  return (
    <div>
      <h1>{props.name}</h1>
      <img src={props.image} alt={props.name} />
      <p>Price: ${props.price}</p>
      <div className="rating">
        {renderStars(props.rating)} <span className="rating-number">({props.rating})</span>
      </div>
      <button>Buy Now</button>
      <button>Add to Cart</button>
    </div>
  );
}
