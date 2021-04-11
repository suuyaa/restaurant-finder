CREATE TABLE reviews (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    restaurant_id BIGINT NOT NULL REFERENCES restaurants(id),
    name VARCHAR(50) NOT NULL,
    review TEXT NOT NULL,
    rating INT NOT NULL check(
        rating >= 1
        and rating <= 5
    )
);

CREATE TABLE restaurants (
	id BIGSERIAL NOT NULL UNIQUE,
	name VARCHAR(50) NOT NULL,
	location VARCHAR(50) NOT NULL,
	price_range INT	 NOT NULL,
);
	

INSERT INTO restaurants (name, location, price_range) values ('mcdonalds', 'toronto', 3);

SELECT * FROM restaurants;