-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: order_service
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `t_order_line_items`
--

DROP TABLE IF EXISTS `t_order_line_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_order_line_items` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `price` decimal(38,2) DEFAULT NULL,
  `product_id` bigint DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_order_line_items`
--

LOCK TABLES `t_order_line_items` WRITE;
/*!40000 ALTER TABLE `t_order_line_items` DISABLE KEYS */;
INSERT INTO `t_order_line_items` VALUES (1,3764.00,41,1),(2,384.00,8,1),(3,839.00,11,1),(4,9044.00,4,3),(5,111.00,8,1),(6,7611.00,14,2),(7,7438.00,34,1);
/*!40000 ALTER TABLE `t_order_line_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_orders`
--

DROP TABLE IF EXISTS `t_orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_orders` (
  `order_id` bigint NOT NULL AUTO_INCREMENT,
  `address_id` bigint DEFAULT NULL,
  `order_placed_date_time` datetime(6) DEFAULT NULL,
  `profile_id` bigint DEFAULT NULL,
  PRIMARY KEY (`order_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_orders`
--

LOCK TABLES `t_orders` WRITE;
/*!40000 ALTER TABLE `t_orders` DISABLE KEYS */;
INSERT INTO `t_orders` VALUES (1,2,'2023-05-18 12:07:08.592000',1),(2,4,'2023-05-18 12:08:29.915000',2),(3,9,'2023-05-18 12:09:18.563000',3),(4,22,'2023-05-18 12:44:35.795000',4);
/*!40000 ALTER TABLE `t_orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_orders_order_line_items_list`
--

DROP TABLE IF EXISTS `t_orders_order_line_items_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_orders_order_line_items_list` (
  `order_order_id` bigint NOT NULL,
  `order_line_items_list_id` bigint NOT NULL,
  UNIQUE KEY `UK_nqpoocsk2utvq7va8bgth1mj9` (`order_line_items_list_id`),
  KEY `FKjpqsch8mjuoo00rhbjc003uwv` (`order_order_id`),
  CONSTRAINT `FK1qq155yd0omg8y9in6526bhaj` FOREIGN KEY (`order_line_items_list_id`) REFERENCES `t_order_line_items` (`id`),
  CONSTRAINT `FKjpqsch8mjuoo00rhbjc003uwv` FOREIGN KEY (`order_order_id`) REFERENCES `t_orders` (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_orders_order_line_items_list`
--

LOCK TABLES `t_orders_order_line_items_list` WRITE;
/*!40000 ALTER TABLE `t_orders_order_line_items_list` DISABLE KEYS */;
INSERT INTO `t_orders_order_line_items_list` VALUES (1,1),(1,2),(1,3),(2,4),(3,5),(3,6),(4,7);
/*!40000 ALTER TABLE `t_orders_order_line_items_list` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-18 12:57:03
