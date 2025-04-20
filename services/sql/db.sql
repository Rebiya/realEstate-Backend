CREATE TABLE users (
    email VARCHAR(255) PRIMARY KEY,
    auth0_id VARCHAR(255) UNIQUE,  -- For Auth0 integration
    full_name VARCHAR(255),
    phone_number VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Properties table (renamed from residencies to match your API)
CREATE TABLE residencies (
    id VARCHAR(24) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    address VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    country VARCHAR(100) NOT NULL,
    image_url TEXT NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_email) REFERENCES users(email)
);

-- Facilities table (for property amenities)
CREATE TABLE facilities (
    property_id VARCHAR(24) NOT NULL,
    bedrooms INT,
    bathrooms INT,
    parking INT,
    PRIMARY KEY (property_id),
    FOREIGN KEY (property_id) REFERENCES residencies(id) ON DELETE CASCADE
);

-- Bookings table (to support bookVisit and cancelBooking endpoints)
CREATE TABLE bookings (
    id VARCHAR(24) PRIMARY KEY,
    property_id VARCHAR(24) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    visit_date TIMESTAMP NOT NULL,
    booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('confirmed', 'cancelled', 'completed') DEFAULT 'confirmed',
    FOREIGN KEY (property_id) REFERENCES residencies(id),
    FOREIGN KEY (user_email) REFERENCES users(email)
);

-- Favorites table (to support toFav and getAllFavorites endpoints)
CREATE TABLE favorites (
    user_email VARCHAR(255) NOT NULL,
    property_id VARCHAR(24) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_email, property_id),
    FOREIGN KEY (user_email) REFERENCES users(email),
    FOREIGN KEY (property_id) REFERENCES residencies(id) ON DELETE CASCADE
);

-- Insert sample users
INSERT INTO users (email, auth0_id, full_name, created_at, updated_at) 
VALUES ('mukhtarhamza294@gmail.com', 'auth0|sample1', 'Mukhtar Hamza', NOW(), NOW()),
       ('ahmadrao925@gmail.com', 'auth0|sample2', 'Ahmad Rao', NOW(), NOW()),
       ('zain@gaintime.io', 'auth0|sample3', 'Zain Khan', NOW(), NOW());