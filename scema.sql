CREATE TABLE IF NOT EXISTS UserList (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    categoryName VARCHAR(255) NOT NULL
);


CREATE TABLE services (
    id INT AUTO_INCREMENT PRIMARY KEY,
    categoryId INT NOT NULL,
    serviceName VARCHAR(255) NOT NULL,
    type ENUM('Normal', 'VIP') NOT NULL,
    priceOptions JSON NOT NULL,
    FOREIGN KEY (categoryId) REFERENCES categories(id) ON DELETE CASCADE
);


CREATE TABLE service_price_options (
    id INT AUTO_INCREMENT PRIMARY KEY,
    serviceId INT NOT NULL,
    duration VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    type ENUM('Hourly', 'Weekly', 'Monthly') NOT NULL,
    FOREIGN KEY (serviceId) REFERENCES services(id) ON DELETE CASCADE
);
