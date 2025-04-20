-- 1. First create users table
CREATE TABLE IF NOT EXISTS users (
    email VARCHAR(100) PRIMARY KEY,
    auth0_id VARCHAR(200) UNIQUE,
    fname VARCHAR(55),
    lname VARCHAR(55),
    phone_number VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 2. Create facilities table FIRST (without trailing comma)
CREATE TABLE IF NOT EXISTS facilities (
    id INT PRIMARY KEY AUTO_INCREMENT,
    bedrooms INT,
    bathrooms INT,
    parking INT
);

-- 3. Now create residencies table with foreign key to facilities
CREATE TABLE IF NOT EXISTS residencies (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    facilities_id INT NOT NULL,
    title VARCHAR(55) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    subcity VARCHAR(55) NOT NULL,
    city VARCHAR(55) NOT NULL,
    country VARCHAR(55) NOT NULL,
    image_url TEXT NOT NULL,
    user_email VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_email) REFERENCES users(email),
    FOREIGN KEY (facilities_id) REFERENCES facilities(id)
);

-- 4. Create other tables
CREATE TABLE IF NOT EXISTS bookings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    property_id VARCHAR(36) NOT NULL,
    user_email VARCHAR(100) NOT NULL,
    visit_date TIMESTAMP NOT NULL,
    booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('confirmed', 'cancelled', 'completed') DEFAULT 'confirmed',
    FOREIGN KEY (property_id) REFERENCES residencies(id),
    FOREIGN KEY (user_email) REFERENCES users(email)
);

CREATE TABLE IF NOT EXISTS favorites (
    user_email VARCHAR(100) NOT NULL,
    property_id VARCHAR(36) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_email, property_id),
    FOREIGN KEY (user_email) REFERENCES users(email),
    FOREIGN KEY (property_id) REFERENCES residencies(id) ON DELETE CASCADE
);
INSERT INTO residencies (facilities_id, title,description, price, subcity, city, country, image_url, user_email, created_at, updated_at)
VALUES
(1,'Sunny Meadow Cottage', 'Massive opportunity to build your dream home at the base of Mummy Mountain in the 3 C''s school district. Home is currently updated and very livable if your plans are to build at a later date.* Bonus * to live hillside without hillside restrictions in the town of PV. Run don''t walk to capture this needle in a hay stack.', 6000.00, 'Street 1', 'Chicago', 'US', 'https://images.pexels.com/photos/7031406/pexels-photo-7031406.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 'mukhtarhamza294@gmail.com', '2023-04-14 10:38:48', '2023-04-14 10:38:48'),
(2,'Coastal Breeze Villa','Massive opportunity to build your dream home at the base of Mummy Mountain in the 3 C''s school district. Home is currently updated and very livable if your plans are to build at a later date.* Bonus * to live hillside without hillside restrictions in the town of PV. Run don''t walk to capture this needle in a hay stack.', 8000.00, 'Street 2', 'Multan', 'Pakistan', 'https://3.bp.blogspot.com/-84l-BoUL090/VTDHcQzSTNI/AAAAAAAAuHI/Khftta_CF5E/s1920/wow-home-design.jpg', 'mukhtarhamza294@gmail.com', '2023-04-14 10:42:19', '2023-04-14 10:42:19'),
(3,'Citralan Puri Serang','Massive opportunity to build your dream home at the base of Mummy Mountain in the 3 C''s school district. Home is currently updated and very livable if your plans are to build at a later date.* Bonus * to live hillside without hillside restrictions in the town of PV. Run don''t walk to capture this needle in a hay stack.', 3000.00, 'Street 3', 'California', 'US', 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 'mukhtarhamza294@gmail.com', '2023-04-14 07:26:20', '2023-04-14 07:26:20'),
(4,'Autumn Mist Cottage', 'Massive opportunity to build your dream home at the base of Mummy Mountain in the 3 C''s school district. Home is currently updated and very livable if your plans are to build at a later date.* Bonus * to live hillside without hillside restrictions in the town of PV. Run don''t walk to capture this needle in a hay stack.', 3800.00, 'Street 4', 'Karachi', 'Pakistan', 'https://e0.pxfuel.com/wallpapers/12/377/desktop-wallpaper-beautiful-houses-beautiful-mansion.jpg', 'mukhtarhamza294@gmail.com', '2023-04-14 10:42:37', '2023-04-14 10:42:37'),
(5,'Rustic Pine Lodge', 'Massive opportunity to build your dream home at the base of Mummy Mountain in the 3 C''s school district. Home is currently updated and very livable if your plans are to build at a later date.* Bonus * to live hillside without hillside restrictions in the town of PV. Run don''t walk to capture this needle in a hay stack.', 7050.00, 'Street 5', 'San Diego', 'US', 'https://images.pexels.com/photos/208736/pexels-photo-208736.jpeg', 'mukhtarhamza294@gmail.com', '2023-04-14 10:39:35', '2023-04-14 10:39:35'),
(6,'Rolling Hills Retreat','Massive opportunity to build your dream home at the base of Mummy Mountain inthe 3 C''s school district. Home is currently updated and very livable if your plans are to build at a later date.* Bonus * to live hillside without hillside restrictions in the town of PV. Run don''t walk to capture this needle in a hay stack.', 2000.00, 'Street 6', 'Phoenix', 'US', 'https://www.hollywoodreporter.com/wp-content/uploads/2023/03/image_h_01-H-2023.jpg', 'mukhtarhamza294@gmail.com', '2023-04-14 10:41:54', '2023-04-14 10:41:54'),
(6,'Riverstone Manor','Massive opportunity to build your dream home at the base of Mummy Mountain in the 3 C''s school district. Home is currently updated and very livable if your plans are to build at a later date.* Bonus * to live hillside without hillside restrictions in the town of PV. Run don''t walk to capture this needle in a hay stack.', 2000.00, 'Street 7', 'Tampa', 'US', 'https://st.hzcdn.com/simgs/pictures/exteriors/builders-in-kochi-creo-homes-pvt-ltd-img~a751d25e0d2ef808_4-0254-1-cb5c87b.jpg', 'mukhtarhamza294@gmail.com', '2023-04-14 10:42:58', '2023-04-14 10:42:58'),
(4,'Summerhill Estate', 'Massive opportunity to build your dream home at the base of Mummy Mountain in the 3 C''s school district. Home is currently updated and very livable if your plans are to build at a later date.* Bonus * to live hillside without hillside restrictions in the town of PV. Run don''t walk to capture this needle in a hay stack.', 2000.00, 'Street 8', 'Denver', 'US', 'https://i.pinimg.com/originals/89/56/5c/89565c305737e1da2a1a5b62600fbcd4.jpg', 'mukhtarhamza294@gmail.com', '2023-04-14 10:43:18', '2023-04-14 10:43:18'),
(5,'Crimson Peak Chalet','Massive opportunity to build your dream home at the base of Mummy Mountain in the 3 C''s school district. Home is currently updated and very livable if your plans are to build at a later date.* Bonus * to live hillside without hillside restrictions in the town of PV. Run don''t walk to capture this needle in a hay stack.', 2000.00, 'Street 9', 'Chicago', 'US', 'https://cutewallpaper.org/24/house-images/1819611997.jpg', 'mukhtarhamza294@gmail.com', '2023-04-14 10:43:35', '2023-04-14 10:43:35'),
(4,'Cedar Ridge Ranch', 'Massive opportunity to build your dream home at the base of Mummy Mountain in the 3 C''s school district. Home is currently updated and very livable if your plans are to build at a later date.* Bonus * to live hillside without hillside restrictions in the town of PV. Run don''t walk to capture this needle in a hay stack.', 2000.00, 'Street 10', 'New York', 'US', 'https://media.istockphoto.com/id/1184625380/photo/large-modern-expensive-home.jpg?s=612x612&w=0&k=20&c=TuX7dnAQvrxt02_BMnlgtVMMdvBLmh3gcXL1bPnobP8=', 'mukhtarhamza294@gmail.com', '2023-04-14 10:43:53', '2023-04-14 10:43:53'),

(2,'Modern Marvel Mansion', 'Massive opportunity to build your dream home at the base of Mummy Mountain in the 3 C''s school district. Home is currently updated and very livable if your plans are to build at a later date.* Bonus * to live hillside without hillside restrictions in the town of PV. Run don''t walk to capture this needle in a hay stack.', 2000.00, 'Street 11', 'Multan', 'Pakistan', 'https://www.homedecorbuzz.com/wp-content/uploads/2017/07/Beautiful-pink-kitchen-design-image.jpg', 'mukhtarhamza294@gmail.com', '2023-04-15 05:05:58', '2023-04-15 05:05:58'),
(3,'Whispering Willow Estate','Massive opportunity to build your dream home at the base of Mummy Mountain in the 3 C''s school district. Home is currently updated and very livable if your plans are to build at a later date.* Bonus * to live hillside without hillside restrictions in the town of PV. Run don''t walk to capture this needle in a hay stack.', 4000.00, 'Street 12', 'Tokyo', 'Japan', 'https://images.pexels.com/photos/1127119/pexels-photo-1127119.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 'mukhtarhamza294@gmail.com', '2023-04-14 07:29:58', '2023-04-14 07:29:58'),
(4,'Blue Horizon Manor', 'Massive opportunity to build your dream home at the base of Mummy Mountain in the 3 C''s school district. Home is currently updated and very livable if your plans are to build at a later date.* Bonus * to live hillside without hillside restrictions in the town of PV. Run don''t walk to capture this needle in a hay stack.', 2500.00, 'Street 13', 'Delhi', 'India', 'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 'mukhtarhamza294@gmail.com', '2023-04-14 07:30:36', '2023-04-14 07:30:36'),
(3, 'Golden Fields Ranch', 'Massive opportunity to build your dream home at the base of Mummy Mountain in the 3 C''s school district. Home is currently updated and very livable if your plans are to build at a later date.* Bonus * to live hillside without hillside restrictions in the town of PV. Run don''t walk to capture this needle in a hay stack.', 4000.00, 'Street 14', 'Los Angeles', 'US', 'https://lovehomedesigns.com/wp-content/uploads/2022/01/cute-house-012522.jpg', 'mukhtarhamza294@gmail.com', '2023-04-14 10:41:32', '2023-04-14 10:41:32'),
(2,'Asatti Garden City', 'Massive opportunity to build your dream home at the base of Mummy Mountain in the 3 C''s school district. Home is currently updated and very livable if your plans are to build at a later date.* Bonus * to live hillside without hillside restrictions in the town of PV. Run don''t walk to capture this needle in a hay stack.', 2000.00, 'Street 15', 'New York', 'US', 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1%201x,%20https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2%202x', 'mukhtarhamza294@gmail.com', '2023-04-14 07:25:13', '2023-04-14 07:25:13');

INSERT INTO facilities ( bedrooms, bathrooms, parking)
VALUES
(5, 2, 1),
(4, 5, 1),
(2, 3, 1),
(3, 2, 1),
(4, 5, 1),
(0, 7, 2),
(4, 5, 1),
(2, 2, 1),
(4, 3, 1),
(4, 5, 1),
(4, 5, 1),
(4, 4, 1),
(3, 2, 1),
(4, 5, 1),
(10, 2, 2);
