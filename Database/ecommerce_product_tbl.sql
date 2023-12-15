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
-- Table structure for table `product_tbl`
--

DROP TABLE IF EXISTS `product_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_tbl` (
  `product_id` varchar(255) NOT NULL,
  `product_description` varchar(255) DEFAULT NULL,
  `product_name` varchar(255) DEFAULT NULL,
  `product_price` double NOT NULL,
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_tbl`
--

LOCK TABLES `product_tbl` WRITE;
/*!40000 ALTER TABLE `product_tbl` DISABLE KEYS */;
INSERT INTO `product_tbl` VALUES ('c0a80962-892e-1ddc-8189-2ebf5f180000','Fire-Boltt Dagger 1.43 AMOLED Display Smartwatch, 96% Screen to Body Ratio with Single BT Bluetooth Calling, IP68, Dual Button Technology, Rugged Build, AI Voice Assistant, Multiple Sports (Grey','Fire-Boltt Dagger',4500),('c0a80962-892e-1ddc-8189-2ebf5f320001','iQOO Z7s 5G by vivo (Norway Blue, 6GB RAM, 128GB Storage) | Ultra Bright AMOLED Display | Snapdragon 695 5G 6nm Processor | 64 MP OIS Ultra Stable Camera | 44WFlashCharge','iQOO Z7s',27000),('c0a80962-892e-1ddc-8189-2ebf5f320002','Easy and super fast filling of the watertank,Easy and super fast emptying of the watertank,A fine spray evenly moistens the fabric; Continuous steam output up to 13 g/min,Aluminium soleplate for easy gliding on all fabrics','Philips IronBox',1500),('c0a80962-892e-1ddc-8189-2ebf5f320003','Japanese Art of staying Young.. While growing Old','Ikigai',265),('c0a80962-892e-1ddc-8189-2ebf5f330004','Amazon Brand - Solimo Stainless Steel Insulated 24 Hours Hot or Cold Bottle Flask, 1000 ml, Silver','Solimo Stainless Bottle',450),('c0a80962-892e-1ddc-8189-2ebf5f330005','Amazon Brand - Presto! Total Wash Detergent Powder, Twin (4 Kg + 4Kg) Pack','Presto! Total Wash Detergent Powder',780),('c0a80962-892e-1ddc-8189-2ebf5f330006','Powerful disinfectant toilet cleaner which cleans 99.9% germs*','Presto! Disinfectant Toilet Cleaner',520),('c0a80962-892e-1ddc-8189-2ebf5f330007','Philips Viva Collection HD4928/01 2100-Watt Induction Cooktop (Black)','Philips Viva Induction Cooktop',8670),('c0a80962-892e-1ddc-8189-2ebf5f330008','Philips HL7756/00 Mixer Grinder 750 Watt , 3 Stainless Steel Multipurpose Jars with 3 Speed Control and Pulse function (Black)','Philips Mixer Grinder 750 Watt',13250);
/*!40000 ALTER TABLE `product_tbl` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-07-11 17:04:39
