CREATE DATABASE  IF NOT EXISTS `ecommerce` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `ecommerce`;
-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: localhost    Database: ecommerce
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cart_item_product_details_list`
--

DROP TABLE IF EXISTS `cart_item_product_details_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart_item_product_details_list` (
  `cart_item_cart_id` varchar(255) NOT NULL,
  `product_id` varchar(255) DEFAULT NULL,
  `quantity` int NOT NULL,
  KEY `FKa98qnivb34tqvp1v0sahe3qwu` (`cart_item_cart_id`),
  CONSTRAINT `FKa98qnivb34tqvp1v0sahe3qwu` FOREIGN KEY (`cart_item_cart_id`) REFERENCES `cart_item` (`cart_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_item_product_details_list`
--

LOCK TABLES `cart_item_product_details_list` WRITE;
/*!40000 ALTER TABLE `cart_item_product_details_list` DISABLE KEYS */;
INSERT INTO `cart_item_product_details_list` VALUES ('a7129986-4e24-4d4e-8cdf-4579033bd8fa','0a421a09-88d2-105a-8188-d21135c30000',1),('a7129986-4e24-4d4e-8cdf-4579033bd8fa','0a421a09-88d2-105a-8188-d21135e20001',1),('a7129986-4e24-4d4e-8cdf-4579033bd8fa','0a421a09-88d2-105a-8188-d21135e30002',1),('a7129986-4e24-4d4e-8cdf-4579033bd8fa','0a421a09-88d2-105a-8188-d21135e30005',1),('a7129986-4e24-4d4e-8cdf-4579033bd8fa','0a421a09-88d2-105a-8188-d21135e20001',1),('a07d8f14-01c8-4821-bf77-95e41a9593bd','c0a80070-892a-194a-8189-2a1dab340000',1),('ae045ca2-8b52-4a19-9513-6cbc958caf6e','0a421a09-88d2-105a-8188-d21135c30000',2),('ae045ca2-8b52-4a19-9513-6cbc958caf6e','0a421a09-88d2-105a-8188-d21135e20001',1),('ae045ca2-8b52-4a19-9513-6cbc958caf6e','c0a80070-892a-194a-8189-2a1dab340000',1),('01f503ee-bb3d-416f-8a42-81a75d9ec5aa','c0a80070-892a-194a-8189-2a1dab340000',2),('bc302eb8-1c48-4030-af26-1523bea205db','c0a80070-892a-194a-8189-2a1dab340000',1),('bc302eb8-1c48-4030-af26-1523bea205db','c0a80070-892a-194a-8189-2a1dab5a0001',2),('9a070a67-e675-4ddb-addb-b023a33d7352','c0a80962-892e-1ddc-8189-2ebf5f180000',1),('8720c5d6-7dfb-485b-ab6e-2b41eb6aae18','c0a80962-892e-1ddc-8189-2ebf5f180000',1),('8720c5d6-7dfb-485b-ab6e-2b41eb6aae18','c0a80962-892e-1ddc-8189-2ebf5f320001',1),('8720c5d6-7dfb-485b-ab6e-2b41eb6aae18','c0a80962-892e-1ddc-8189-2ebf5f330005',1);
/*!40000 ALTER TABLE `cart_item_product_details_list` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-07-11 17:04:41
