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
-- Table structure for table `product_product_image_url`
--

DROP TABLE IF EXISTS `product_product_image_url`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_product_image_url` (
  `product_product_id` varchar(255) NOT NULL,
  `product_image_url` varchar(255) DEFAULT NULL,
  KEY `FK2iiqsme7kykvjtwi6tp56xvwx` (`product_product_id`),
  CONSTRAINT `FK2iiqsme7kykvjtwi6tp56xvwx` FOREIGN KEY (`product_product_id`) REFERENCES `product_tbl` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_product_image_url`
--

LOCK TABLES `product_product_image_url` WRITE;
/*!40000 ALTER TABLE `product_product_image_url` DISABLE KEYS */;
INSERT INTO `product_product_image_url` VALUES ('c0a80962-892e-1ddc-8189-2ebf5f180000','http://localhost:8089/api/images/zfd9g5xewNCIYhFG.jpg'),('c0a80962-892e-1ddc-8189-2ebf5f180000','http://localhost:8089/api/images/jS8U0YV2PGRBF118.jpg'),('c0a80962-892e-1ddc-8189-2ebf5f180000','http://localhost:8089/api/images/CE8IFqsUbpIlPnaQ.jpg'),('c0a80962-892e-1ddc-8189-2ebf5f320001','http://localhost:8089/api/images/XjB5QIcRfttF3ann.jpg'),('c0a80962-892e-1ddc-8189-2ebf5f320001','http://localhost:8089/api/images/XjB5QIcRfttF3ann.jpg'),('c0a80962-892e-1ddc-8189-2ebf5f320001','http://localhost:8089/api/images/7qXePMedHA4fRcMB.jpg'),('c0a80962-892e-1ddc-8189-2ebf5f320002','http://localhost:8089/api/images/wj9LhPehMhtz8JNS.jpg'),('c0a80962-892e-1ddc-8189-2ebf5f320002','http://localhost:8089/api/images/wfdi7bhXfohaMFdJ.jpg'),('c0a80962-892e-1ddc-8189-2ebf5f320002','http://localhost:8089/api/images/3OIrrE0SFU3VDXG9.jpg'),('c0a80962-892e-1ddc-8189-2ebf5f320003','http://localhost:8089/api/images/PRJ7fGv3irqFEK4c.jpg'),('c0a80962-892e-1ddc-8189-2ebf5f320003','http://localhost:8089/api/images/nclgMZWf05dPIuwT.jpg'),('c0a80962-892e-1ddc-8189-2ebf5f320003','http://localhost:8089/api/images/TrMWrLkbBhefSHqZ.jpg'),('c0a80962-892e-1ddc-8189-2ebf5f330004','http://localhost:8089/api/images/2utVam7gaDC3a2oF.jpg'),('c0a80962-892e-1ddc-8189-2ebf5f330004','http://localhost:8089/api/images/S5ZI9vFhYWxaqJTt.jpg'),('c0a80962-892e-1ddc-8189-2ebf5f330004','http://localhost:8089/api/images/5bKHT8He0VgU0eVb.jpg'),('c0a80962-892e-1ddc-8189-2ebf5f330005','http://localhost:8089/api/images/2fJBNlPKoP1JwIKn.jpg'),('c0a80962-892e-1ddc-8189-2ebf5f330005','http://localhost:8089/api/images/jHhXlv2OeGpUn7DW.jpg'),('c0a80962-892e-1ddc-8189-2ebf5f330005','http://localhost:8089/api/images/hT6fftBsJ6czi1ER.jpg'),('c0a80962-892e-1ddc-8189-2ebf5f330006','http://localhost:8089/api/images/1oVXqzUnuXcyIwhL.jpg'),('c0a80962-892e-1ddc-8189-2ebf5f330006','http://localhost:8089/api/images/2BE2Ys1xtb4RnC4e.jpg'),('c0a80962-892e-1ddc-8189-2ebf5f330006','http://localhost:8089/api/images/H60ADLwlhjY3ggx5.jpg'),('c0a80962-892e-1ddc-8189-2ebf5f330007','http://localhost:8089/api/images/86bEHkz4Dk8z7RZ5.jpg'),('c0a80962-892e-1ddc-8189-2ebf5f330007','http://localhost:8089/api/images/ghiS6LbC1y2u0mBN.jpg'),('c0a80962-892e-1ddc-8189-2ebf5f330007','http://localhost:8089/api/images/uRRAogabaIzEigaj.jpg'),('c0a80962-892e-1ddc-8189-2ebf5f330008','http://localhost:8089/api/images/uELGr7uRVooI43X8.jpg'),('c0a80962-892e-1ddc-8189-2ebf5f330008','http://localhost:8089/api/images/EGriWosYhgetphdz.jpg'),('c0a80962-892e-1ddc-8189-2ebf5f330008','http://localhost:8089/api/images/k3N6N6n7JOVK1IZj.jpg');
/*!40000 ALTER TABLE `product_product_image_url` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-07-11 17:04:42
