CREATE TABLE `user`(
  `id` int PRIMARY KEY AUTO_INCREMENT NOT NULL, 
  `pseudo` varchar(50) NOT NULL, 
  `email` varchar(50) NOT NULL, 
  `pwd` varchar(50) NOT NULL, 
  `theme` varchar(50), 
  UNIQUE KEY `pseudo` (`pseudo`),
  UNIQUE KEY `email`(`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `wishlist`(
  `id` int PRIMARY KEY AUTO_INCREMENT NOT NULL, 
  `creation_date` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `user_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `item`(
  `id` int PRIMARY KEY AUTO_INCREMENT NOT NULL,
  `name` VARCHAR(50) NOT NULL, 
  `website` VARCHAR(50) NOT NULL,
  `url` VARCHAR(350) NOT NULL,
  `image` VARCHAR(250),
  `price` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE wishlistItem (
    wishlist_id INT,
    item_id INT,
    PRIMARY KEY (wishlist_id, item_id),
    FOREIGN KEY (wishlist_id) REFERENCES `wishlist` (`id`),
    FOREIGN KEY (item_id) REFERENCES `item`(`id`)
);

ALTER TABLE `wishlist`
  ADD KEY `fk_wishlist_user` (`user_id`),
  ADD CONSTRAINT `fk_wishlist_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);