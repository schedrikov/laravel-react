/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50505
Source Host           : localhost:3306
Source Database       : laravel-api

Target Server Type    : MYSQL
Target Server Version : 50505
File Encoding         : 65001

Date: 2023-04-13 22:56:53
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `failed_jobs`
-- ----------------------------
DROP TABLE IF EXISTS `failed_jobs`;
CREATE TABLE `failed_jobs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of failed_jobs
-- ----------------------------

-- ----------------------------
-- Table structure for `migrations`
-- ----------------------------
DROP TABLE IF EXISTS `migrations`;
CREATE TABLE `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of migrations
-- ----------------------------
INSERT INTO `migrations` VALUES ('1', '2014_10_12_000000_create_users_table', '1');
INSERT INTO `migrations` VALUES ('2', '2014_10_12_100000_create_password_resets_table', '1');
INSERT INTO `migrations` VALUES ('3', '2019_08_19_000000_create_failed_jobs_table', '1');
INSERT INTO `migrations` VALUES ('4', '2023_04_01_113629_create_works_table', '2');
INSERT INTO `migrations` VALUES ('5', '2023_04_01_114711_create_roles_table', '2');
INSERT INTO `migrations` VALUES ('6', '2023_04_01_114749_create_permissions_table', '2');
INSERT INTO `migrations` VALUES ('7', '2023_04_01_125843_create_users_permissions_table', '3');
INSERT INTO `migrations` VALUES ('8', '2023_04_01_130846_create_users_roles_table', '3');
INSERT INTO `migrations` VALUES ('9', '2023_04_01_132831_create_roles_permissions_table', '4');
INSERT INTO `migrations` VALUES ('10', '2019_12_14_000001_create_personal_access_tokens_table', '5');
INSERT INTO `migrations` VALUES ('11', '2023_04_02_193442_add_api_token_to_users_table', '6');

-- ----------------------------
-- Table structure for `password_resets`
-- ----------------------------
DROP TABLE IF EXISTS `password_resets`;
CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  KEY `password_resets_email_index` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of password_resets
-- ----------------------------

-- ----------------------------
-- Table structure for `permissions`
-- ----------------------------
DROP TABLE IF EXISTS `permissions`;
CREATE TABLE `permissions` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of permissions
-- ----------------------------
INSERT INTO `permissions` VALUES ('1', '2023-04-01 16:52:57', '2023-04-01 16:53:00', 'Показ вкладки 1', 'frontend-section-id-1/view');
INSERT INTO `permissions` VALUES ('2', '2023-04-01 16:53:03', '2023-04-01 16:53:05', 'Редактирование вкладки 1', 'frontend-section-id-1/change');

-- ----------------------------
-- Table structure for `personal_access_tokens`
-- ----------------------------
DROP TABLE IF EXISTS `personal_access_tokens`;
CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint(20) unsigned NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of personal_access_tokens
-- ----------------------------

-- ----------------------------
-- Table structure for `roles`
-- ----------------------------
DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of roles
-- ----------------------------
INSERT INTO `roles` VALUES ('1', '2023-04-01 16:50:32', '2023-04-01 16:50:28', 'Директор', 'director');
INSERT INTO `roles` VALUES ('2', '2023-04-01 16:50:36', '2023-04-01 16:50:47', 'Менеджер', 'manager');
INSERT INTO `roles` VALUES ('3', '2023-04-01 16:50:39', '2023-04-01 16:50:50', 'Программист', 'programmer');
INSERT INTO `roles` VALUES ('4', '2023-04-01 16:50:44', '2023-04-01 16:50:54', 'Бухгалтер', 'accountant');

-- ----------------------------
-- Table structure for `roles_permissions`
-- ----------------------------
DROP TABLE IF EXISTS `roles_permissions`;
CREATE TABLE `roles_permissions` (
  `role_id` bigint(20) unsigned NOT NULL,
  `permission_id` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`role_id`,`permission_id`),
  KEY `roles_permissions_permission_id_foreign` (`permission_id`),
  CONSTRAINT `roles_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE,
  CONSTRAINT `roles_permissions_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of roles_permissions
-- ----------------------------
INSERT INTO `roles_permissions` VALUES ('1', '1');
INSERT INTO `roles_permissions` VALUES ('1', '2');
INSERT INTO `roles_permissions` VALUES ('4', '1');

-- ----------------------------
-- Table structure for `users`
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `api_token` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('12', 'Директор Николай', 'test@test.ru', null, '$2y$10$dETHqAUAe.NuYQXRBdP9kOa12AmYNjuLgdQr1rqoSB7L3hCd.H8z6', '', '2023-04-02 19:46:03', '2023-04-02 19:46:03', 'ST3iuw0orxQarCdg5vrg1i9xtMASFPE76LSA7VejagJfhkcv3RF5q3X8TXjpWpnUn8osEP7m7nrJQNSv');
INSERT INTO `users` VALUES ('13', 'Программист Артём', 'programmer@test.ru', null, '$2y$10$S8SUB3kj30DeRsSUd7SLU.lypNS4sUKhySRZkK6r03NdS7BGwYoZO', null, '2023-04-07 20:43:23', '2023-04-07 20:43:23', 'wuBhGHxcjcr6hLbFKyG720pzZZ3DsGjmlf7jsEni5QZl2HWeg2HJxXJcH56vSzRBSZa3Vqg0l9hbtdRP');
INSERT INTO `users` VALUES ('14', 'Бухгалтер Вася', 'buh1@test.ru', null, '$2y$10$qUBZvM/m95a3MJtcHF9mKeBU3KjKL.VDYT7Q/nNnGD6ka6BTTD90m', null, '2023-04-07 21:44:29', '2023-04-07 21:44:29', 'oddj7v1ESlOn9dryWs8Sc0NyVkGaSn0Rdv4QtNyJqOmVO96pTPSPGeISvSof89j8uIfD0S9umRy8j8ck');
INSERT INTO `users` VALUES ('15', 'Бухгалтер Петя', 'buh2@test.ru', null, '$2y$10$v9WwvGG/SNtXKgdnbd96muPFAmYzcR1oW5ukuweeNXH0/LUvEXb32', null, '2023-04-07 21:44:42', '2023-04-07 21:44:42', '1RyWYJV7oLbqxvCK3wO8oDd7oglUxEKvYbATXFdWk2nAK0bHnBQrWTya2de0h1mFKlWPkv403Gj24mqD');
INSERT INTO `users` VALUES ('16', 'Бухгалтер Коля', 'buh3@test.ru', null, '$2y$10$eqmH8fAP1xI7GdDosbbgBuKmbySpQmZKpXQR4u.RREsdRVnB.MkUC', null, '2023-04-07 21:44:51', '2023-04-07 21:44:51', 'Rt5NRcKJ19ZdlPkRfCX2pVq0UnoC9dTz9ReW4cr1F4LoC9hds3jCUUTTi9rxAowf7NmQOheVgX0GiRgH');

-- ----------------------------
-- Table structure for `users_permissions`
-- ----------------------------
DROP TABLE IF EXISTS `users_permissions`;
CREATE TABLE `users_permissions` (
  `user_id` bigint(20) unsigned NOT NULL,
  `permission_id` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`user_id`,`permission_id`),
  KEY `users_permissions_permission_id_foreign` (`permission_id`),
  CONSTRAINT `users_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE,
  CONSTRAINT `users_permissions_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of users_permissions
-- ----------------------------
INSERT INTO `users_permissions` VALUES ('12', '1');

-- ----------------------------
-- Table structure for `users_roles`
-- ----------------------------
DROP TABLE IF EXISTS `users_roles`;
CREATE TABLE `users_roles` (
  `user_id` bigint(20) unsigned NOT NULL,
  `role_id` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`user_id`,`role_id`),
  KEY `users_roles_role_id_foreign` (`role_id`),
  CONSTRAINT `users_roles_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE,
  CONSTRAINT `users_roles_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of users_roles
-- ----------------------------
INSERT INTO `users_roles` VALUES ('12', '1');
INSERT INTO `users_roles` VALUES ('13', '3');
INSERT INTO `users_roles` VALUES ('14', '4');
INSERT INTO `users_roles` VALUES ('15', '4');
INSERT INTO `users_roles` VALUES ('16', '4');

-- ----------------------------
-- Table structure for `works`
-- ----------------------------
DROP TABLE IF EXISTS `works`;
CREATE TABLE `works` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `date_from` date NOT NULL,
  `date_to` date NOT NULL,
  `user_id` bigint(20) unsigned NOT NULL,
  `status` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `manager_user_id` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_works_users` (`user_id`),
  KEY `FK_works_manager_user_id` (`manager_user_id`),
  CONSTRAINT `FK_works_manager_user_id` FOREIGN KEY (`manager_user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `FK_works_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of works
-- ----------------------------
INSERT INTO `works` VALUES ('1', '2023-04-09 11:00:00', '2023-04-09 11:00:00', 'Сделать отчет', '2023-04-09', '2023-04-15', '14', 'Новая', '12');
INSERT INTO `works` VALUES ('2', '2023-04-09 18:59:28', '2023-04-09 18:59:28', 'Задача для бухгалтера', '2023-04-19', '2023-04-12', '15', 'Выполнена', '12');
INSERT INTO `works` VALUES ('3', '2023-04-09 19:05:23', '2023-04-09 19:05:23', 'Тестовая задача', '2023-04-25', '2023-04-28', '16', 'Закрыта', '12');
INSERT INTO `works` VALUES ('4', '2023-04-09 21:48:24', '2023-04-09 21:48:24', 'Задача 4', '2023-04-25', '2023-04-26', '15', 'Новая', '12');
INSERT INTO `works` VALUES ('5', '2023-04-10 21:40:18', '2023-04-10 21:40:18', 'Задача 3', '2023-04-19', '2023-04-20', '15', 'Выполнена', '12');
INSERT INTO `works` VALUES ('6', '2023-04-10 21:45:05', '2023-04-10 21:45:05', 'Задача для бухгалтера', '2023-04-24', '2023-04-27', '14', 'Новая', '12');
INSERT INTO `works` VALUES ('7', '2023-04-11 13:54:19', '2023-04-11 13:54:19', 'Задача для Пети', '2023-04-26', '2023-04-30', '15', 'В работе', '12');
INSERT INTO `works` VALUES ('8', '2023-04-12 16:37:14', '2023-04-12 16:37:14', 'Тест', '2023-04-19', '2023-04-27', '16', 'Выполнена', '12');
INSERT INTO `works` VALUES ('9', '2023-04-12 16:38:28', '2023-04-12 16:38:28', 'Тест 2', '2023-04-21', '2023-04-30', '14', 'Выполнена', '12');
INSERT INTO `works` VALUES ('10', '2023-04-12 16:38:45', '2023-04-12 16:38:45', 'Тест 4', '2023-03-31', '2023-04-02', '15', 'Новая', '12');
INSERT INTO `works` VALUES ('11', '2023-04-12 16:39:00', '2023-04-12 16:39:00', 'Тест 6', '2023-04-06', '2023-04-07', '16', 'Новая', '12');
INSERT INTO `works` VALUES ('12', '2023-04-13 13:20:05', '2023-04-13 13:20:05', 'Тестовая задача Пете от Николая', '2023-04-18', '2023-04-21', '15', 'Выполнена', '12');
INSERT INTO `works` VALUES ('13', '2023-04-13 17:11:03', '2023-04-13 17:11:03', 'Новая задача', '2023-04-12', '2023-04-27', '15', 'Закрыта', '12');
INSERT INTO `works` VALUES ('14', '2023-04-13 17:12:52', '2023-04-13 17:12:52', 'Новая задача 2', '2023-04-04', '2023-04-14', '16', 'В работе', '12');
INSERT INTO `works` VALUES ('15', '2023-04-13 17:15:21', '2023-04-13 17:15:21', 'Тест', '2023-04-05', '2023-04-21', '16', 'В работе', '12');
INSERT INTO `works` VALUES ('16', '2023-04-13 17:16:19', '2023-04-13 17:16:19', 'Тест', '2023-04-05', '2023-04-21', '16', 'Новая', '12');
INSERT INTO `works` VALUES ('17', '2023-04-13 17:17:02', '2023-04-13 17:17:02', 'Тест', '2023-04-05', '2023-04-21', '16', 'Новая', '12');
INSERT INTO `works` VALUES ('18', '2023-04-13 17:19:05', '2023-04-13 17:19:05', 'Тест', '2023-04-05', '2023-04-21', '16', 'Выполнена', '12');
INSERT INTO `works` VALUES ('19', '2023-04-13 17:19:52', '2023-04-13 17:19:52', 'Тест', '2023-04-20', '2023-04-13', '16', 'Выполнена', '12');
INSERT INTO `works` VALUES ('20', '2023-04-13 17:20:39', '2023-04-13 17:20:39', 'Тест', '2023-04-20', '2023-04-13', '16', 'Выполнена', '12');
INSERT INTO `works` VALUES ('21', '2023-04-13 17:20:42', '2023-04-13 17:20:42', 'Тест', '2023-04-20', '2023-04-13', '16', 'В работе', '12');
INSERT INTO `works` VALUES ('22', '2023-04-13 17:20:56', '2023-04-13 17:20:56', 'Тест', '2023-04-20', '2023-04-13', '15', 'В работе', '12');
INSERT INTO `works` VALUES ('23', '2023-04-13 17:21:04', '2023-04-13 17:21:04', 'Тест', '2023-04-20', '2023-04-13', '15', 'Закрыта', '12');
INSERT INTO `works` VALUES ('24', '2023-04-13 17:23:51', '2023-04-13 17:23:51', 'Задача для Васи', '2023-04-04', '2023-04-27', '14', 'Выполнена', '12');
INSERT INTO `works` VALUES ('25', '2023-04-13 17:26:42', '2023-04-13 17:26:42', 'Задача для Пети', '2023-04-20', '2023-04-21', '15', 'В работе', '12');
