/* -- SQLBook: Code
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
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `website` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `url` text COLLATE utf8mb4_unicode_ci,
  `image` varchar(250) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `price` float NOT NULL,
  `user_id` int NOT NULL,
  `wishlist_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_item_wishlist` (`wishlist_id`),
  KEY `fk_item_user` (`user_id`),
  CONSTRAINT `fk_item_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_item_wishlist` FOREIGN KEY (`wishlist_id`) REFERENCES `wishlist` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=106 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

ALTER TABLE `item`
MODIFY COLUMN `price` FLOAT NOT NULL;

ALTER TABLE `wishlist`
DROP FOREIGN KEY `fk_wishlist_user`;

ALTER TABLE `wishlist`
ADD CONSTRAINT `fk_wishlist_user`
FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE;


ALTER TABLE `item`
DROP FOREIGN KEY `fk_item_user`;

ALTER TABLE `item`
ADD CONSTRAINT `fk_item_user`
FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE; */