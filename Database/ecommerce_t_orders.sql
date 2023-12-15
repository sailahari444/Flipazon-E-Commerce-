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
-- Table structure for table `t_orders`
--

DROP TABLE IF EXISTS `t_orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_orders` (
  `order_id` varchar(255) NOT NULL,
  `address_id` varchar(255) DEFAULT NULL,
  `order_placed_date_time` datetime(6) DEFAULT NULL,
  `profile_id` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_orders`
--

LOCK TABLES `t_orders` WRITE;
/*!40000 ALTER TABLE `t_orders` DISABLE KEYS */;
INSERT INTO `t_orders` VALUES ('0a421b25-893f-191e-8189-3f79bc6e0000','1','2023-07-10 16:34:50.019000','c0a80962-892e-1b8c-8189-301620ea0009','Opened'),('c0a80962-892e-1060-8189-2ed28d3c0000','c0a80962-892e-1b8c-8189-2e7ad3430000','2023-07-07 10:58:17.966000','c0a80070-8929-1a2c-8189-2c4d3922000b','Opened'),('c0a80962-892e-1060-8189-2f28febb0004','c0a80962-892e-1b8c-8189-2e7ad3430000','2023-07-07 12:32:43.131000','c0a80070-8929-1a2c-8189-2c4d3922000b','Opened'),('c0a80962-892e-1060-8189-2f6e5b4a0008','c0a80962-892e-1b8c-8189-2f6e2d340003','2023-07-07 13:48:28.810000','c0a80962-892e-1b8c-8189-2ececcf50001','Opened'),('c0a80962-892e-1060-8189-2fddd8b4000a','c0a80962-892e-1b8c-8189-2f28d3640002','2023-07-07 15:50:15.411000','c0a80070-8929-1a2c-8189-2c4d3922000b','Opened'),('c0a80962-892e-1060-8189-3011a65f000e','c0a80962-892e-1b8c-8189-30112beb0007','2023-07-07 16:46:50.398000','c0a80962-892e-1b8c-8189-2fef5d320006','Opened'),('c0a80962-892e-1060-8189-3013589b0012','c0a80962-892e-1b8c-8189-30112beb0007','2023-07-07 16:48:41.563000','c0a80962-892e-1b8c-8189-2fef5d320006','Opened'),('c0a80962-893e-1843-8189-3f7820260000','c0a80962-893e-18f3-8189-3f7803ee0000','2023-07-10 16:33:04.475000','c0a80962-892e-1b8c-8189-301620ea0009','Opened'),('c0a80962-893e-1843-8189-3f78a7050002','1','2023-07-10 16:33:39.013000','c0a80962-892e-1b8c-8189-301620ea0009','Opened'),('c0a80962-8943-188b-8189-43951e310000','c0a80962-893e-18f3-8189-3f7803ee0000','2023-07-11 11:43:13.378000','c0a80962-892e-1b8c-8189-301620ea0009','Opened'),('c0a80962-8943-188b-8189-43961c850002','c0a80962-893e-18f3-8189-3f7803ee0000','2023-07-11 11:44:18.500000','c0a80962-892e-1b8c-8189-301620ea0009','Opened'),('c0a80962-8943-188b-8189-43a2199f0004','1','2023-07-11 11:57:24.191000','c0a80962-892e-1b8c-8189-301620ea0009','Opened'),('c0a80962-8943-188b-8189-43a5c00d0006','c0a80962-893e-18f3-8189-3f7803ee0000','2023-07-11 12:01:23.404000','c0a80962-892e-1b8c-8189-301620ea0009','Opened'),('c0a80962-8943-188b-8189-43a65de60008','c0a80962-893e-18f3-8189-3f7803ee0000','2023-07-11 12:02:03.814000','c0a80962-892e-1b8c-8189-301620ea0009','Opened'),('c0a80962-8943-188b-8189-43a6f730000a','c0a80962-893e-18f3-8189-3f7803ee0000','2023-07-11 12:02:43.056000','c0a80962-892e-1b8c-8189-301620ea0009','Opened'),('c0a80962-8943-188b-8189-43a8517a000c','c0a80962-893e-18f3-8189-3f7803ee0000','2023-07-11 12:04:11.706000','c0a80962-892e-1b8c-8189-301620ea0009','Opened'),('c0a80962-8943-188b-8189-43af577b000e','1','2023-07-11 12:11:51.994000','c0a80962-892e-1b8c-8189-301620ea0009','Opened');
/*!40000 ALTER TABLE `t_orders` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-07-11 17:04:40
