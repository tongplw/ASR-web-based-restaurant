
-- CREATE DATABASE IF NOT EXISTS minichat;
-- USE minichat;


-- DROP TABLE IF EXISTS `users`;
-- CREATE TABLE `users` (
--   `username` VARCHAR(255) PRIMARY KEY,
--   `password` VARCHAR(255),
--   `is_online` boolean NOT NULL,
--   `last_login` TIMESTAMP
-- );

-- DROP TABLE IF EXISTS `groups`;
-- CREATE TABLE `groups` (
--   `name` VARCHAR(255) PRIMARY KEY
-- );

-- DROP TABLE IF EXISTS `messages`;
-- CREATE TABLE `messages` (
--   `id` int(11) unsigned PRIMARY KEY AUTO_INCREMENT,
--   `message` VARCHAR(255),
--   `user_id` VARCHAR(255),
--   `group_id` VARCHAR(255),
--   `sent_on` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--   FOREIGN KEY(`user_id`) REFERENCES `users`(`username`),
--   FOREIGN KEY(`group_id`) REFERENCES `groups`(`name`)
-- );	

-- DROP TABLE IF EXISTS `group_user`;
-- CREATE TABLE `group_user` (
--   `group` VARCHAR(255) NOT NULL,
--   `user` VARCHAR(255) NOT NULL,
--   PRIMARY KEY (`group`, `user`),
--   FOREIGN KEY(`group`) REFERENCES `groups`(`name`),
--   FOREIGN KEY(`user`) REFERENCES `users`(`username`)
-- );