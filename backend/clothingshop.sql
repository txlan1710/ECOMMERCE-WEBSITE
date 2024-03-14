create database clothingshop;
use clothingshop;

CREATE TABLE `admin` (
    `admin_id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    `admin_name` VARCHAR(255) NOT NULL,
    `admin_password` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`admin_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `admin` (`admin_id`, `admin_name`, `admin_password`) VALUES
(1, 'B2015012', 'admin123'),
(2, 'B2014929', 'admin123'),
(3, 'admin', 'admin123');

CREATE TABLE `customer` (
    `customer_id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    `customer_name` VARCHAR(255) NOT NULL,
    `customer_password` VARCHAR(255) NOT NULL,
    `customer_email` VARCHAR(255) NOT NULL UNIQUE,
    `customer_phone` VARCHAR(20) NOT NULL,
    `customer_address` VARCHAR(255),
    PRIMARY KEY (`customer_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `customer` (`customer_id`, `customer_name` , `customer_password`, `customer_email` , `customer_phone`, `customer_address`) VALUES
(1, 'Truong Kha Thi', 'password', 'tkthi@gmail.com', '0123456789', 'Can Tho'),
(2, 'Ta Xuan Lan', 'password', 'txlan@gmail.com', '0123456789', 'Ca Mau'),
(3, 'Nguyen Thi Thuy', 'password', 'ntthuy@gmail.com', '0123456789', 'An Giang');

CREATE TABLE `product_categories` (
    `category_id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    `category_name` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`category_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `product_categories` (`category_id`, `category_name`) VALUES 
(1,'Áo'),
(2,'Áo khoác'),
(3,'Quần'),
(4,'Phụ kiện');

CREATE TABLE `products` (
    `product_id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    `product_name` VARCHAR(255) NOT NULL,
    `product_description` TEXT,
    `product_price` DECIMAL(10,2) NOT NULL,
	`category_id` INT(10) UNSIGNED,
    `product_image` VARCHAR(255),
    PRIMARY KEY (`product_id`) USING BTREE,
    FOREIGN KEY (`category_id`) REFERENCES `product_categories`(`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `products` (`product_id`, `product_name` , `product_description` , `product_price`, `category_id`, `product_image`) VALUES
(1,'Áo KEYBOAR TEE','Áo màu xanh rẻ', 180000, 1, '/product/product1.jpg'),
(2,'Áo BANANA 03 TEE','Áo trái chuối', 120000, 1, '/product/product2.jpg'),
(3,'Áo BLUE BAT','Con dơi đen', 59000, 1, '/product/product3.jpg'),
(4,'Áo BUTTERFLY BLUE TEE','Con bướm xanh', 150000, 1, '/product/product4.jpg'),
(5,'Quần short - brown','Quần màu nâu cute', 290000, 2, '/product/product5.jpg'),
(6,'Quần short - purple','Quần màu tím đẹp', 79000, 2, '/product/product6.jpg'),
(7,'Quần short - dark green','Quần đen xanh okii', 250000, 2, '/product/product7.jpg'),
(8,'Áo khoác hoodie - neon yellow','Áo khoác vàng lovely', 160000, 3, '/product/product8.jpg'),
(9,'Áo khoác sweater - smoke purple','Áo khoác màu tím khói xinh', 180000, 3, '/product/product9.jpg'),
(10,'Áo khoác sweater - beige','Áo khoác màu ghi hehe', 180000, 3, '/product/product10.jpg'),
(11,'Túi TOTE','Túi phụ kiện xinh', 29000, 4, '/product/product11.jpg'),
(12,'Cặp shoulder SS2','Balo màu đen và xanh', 320000, 4, '/product/product12.jpg');


