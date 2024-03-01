-- SQLBook: Code
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
  `price` int NOT NULL,
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


ALTER TABLE `wishlist`
  ADD KEY `fk_wishlist_user` (`user_id`),
  ADD CONSTRAINT `fk_wishlist_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);



ALTER TABLE `wishlist`
  MODIFY COLUMN `name` VARCHAR(25);

ALTER TABLE `wishlist`
  MODIFY COLUMN `name` VARCHAR(25) NOT NULL;

ALTER TABLE `item`
ADD COLUMN `user_id` INT,
ADD COLUMN `wishlist_id` INT,
ADD CONSTRAINT `fk_item_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
ADD CONSTRAINT `fk_item_wishlist` FOREIGN KEY (`wishlist_id`) REFERENCES `wishlist` (`id`);

ALTER TABLE `item`
  MODIFY COLUMN `user_id` int NOT NULL,
  MODIFY COLUMN `wishlist_id` int NOT NULL;
ALTER TABLE `item`
MODIFY COLUMN `url` TEXT;

ALTER TABLE `item`
DROP FOREIGN KEY `fk_item_wishlist`;

ALTER TABLE `item`
ADD CONSTRAINT `fk_item_wishlist` FOREIGN KEY (`wishlist_id`) REFERENCES `wishlist` (`id`) ON DELETE CASCADE;

ALTER TABLE `user`
MODIFY COLUMN `theme`INT ;