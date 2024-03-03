-- SQLBook: Code
CREATE TABLE `user`(
  `id` int PRIMARY KEY AUTO_INCREMENT NOT NULL, 
  `pseudo` varchar(50) NOT NULL, 
  `email` varchar(50) NOT NULL, 
  `pwd` varchar(255) NOT NULL, 
  `theme` INT(1) DEFAULT 1, 
  UNIQUE KEY `pseudo` (`pseudo`),
  UNIQUE KEY `email`(`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
CREATE TABLE `wishlist` (
  `id` int PRIMARY KEY AUTO_INCREMENT NOT NULL, 
  `creation_date` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `name` VARCHAR(25) NOT NULL,
  `user_id` int NOT NULL,
  FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `item` (
  `id` int PRIMARY KEY AUTO_INCREMENT NOT NULL,
  `name` VARCHAR(50) NOT NULL, 
  `website` VARCHAR(50) NOT NULL,
  `url` TEXT NOT NULL,
  `image` VARCHAR(250),
  `price` int NOT NULL,
  `user_id` INT,
  `wishlist_id` INT,
  FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  FOREIGN KEY (`wishlist_id`) REFERENCES `wishlist` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

