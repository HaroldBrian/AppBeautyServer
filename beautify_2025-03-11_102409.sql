-- MySQL dump 10.13  Distrib 8.0.41, for Linux (x86_64)
--
-- Host: localhost    Database: beautify
-- ------------------------------------------------------
-- Server version	8.0.41-0ubuntu0.22.04.1

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
-- Table structure for table `Country`
--

DROP TABLE IF EXISTS `Country`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Country` (
  `id` int NOT NULL AUTO_INCREMENT,
  `label` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `Country_label_key` (`label`),
  UNIQUE KEY `Country_code_key` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Country`
--

/*!40000 ALTER TABLE `Country` DISABLE KEYS */;
INSERT INTO `Country` VALUES (1,'Cameroun','CM','Pays d\'Afrique centrale','2024-01-01 00:00:00.000','2024-01-01 00:00:00.000'),(2,'France','FR','Pays européen','2024-01-01 00:00:00.000','2024-01-01 00:00:00.000'),(3,'Allemagne','DE','Pays d\'Europe centrale','2024-01-01 00:00:00.000','2024-01-01 00:00:00.000'),(4,'États-Unis','US','Pays d\'Amérique du Nord','2024-01-01 00:00:00.000','2024-01-01 00:00:00.000'),(5,'Royaume-Uni','GB','Pays européen','2024-01-01 00:00:00.000','2024-01-01 00:00:00.000'),(6,'Canada','CA','Pays d\'Amérique du Nord','2024-01-01 00:00:00.000','2024-01-01 00:00:00.000'),(7,'Nigeria','NG','Pays d\'Afrique de l\'Ouest','2024-01-01 00:00:00.000','2024-01-01 00:00:00.000'),(8,'Brésil','BR','Pays d\'Amérique du Sud','2024-01-01 00:00:00.000','2024-01-01 00:00:00.000'),(9,'Inde','IN','Pays d\'Asie du Sud','2024-01-01 00:00:00.000','2024-01-01 00:00:00.000'),(10,'Chine','CN','Pays d\'Asie de l\'Est','2024-01-01 00:00:00.000','2024-01-01 00:00:00.000');
/*!40000 ALTER TABLE `Country` ENABLE KEYS */;

--
-- Table structure for table `Meet`
--

DROP TABLE IF EXISTS `Meet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Meet` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `date` datetime(3) NOT NULL,
  `place` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Meet`
--

/*!40000 ALTER TABLE `Meet` DISABLE KEYS */;
/*!40000 ALTER TABLE `Meet` ENABLE KEYS */;

--
-- Table structure for table `Order`
--

DROP TABLE IF EXISTS `Order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Order` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` int NOT NULL,
  `productId` int NOT NULL,
  `quantity` int NOT NULL,
  `totalAmount` double NOT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Order_userId_fkey` (`userId`),
  KEY `Order_productId_fkey` (`productId`),
  CONSTRAINT `Order_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Order_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Order`
--

/*!40000 ALTER TABLE `Order` DISABLE KEYS */;
/*!40000 ALTER TABLE `Order` ENABLE KEYS */;

--
-- Table structure for table `Payment`
--

DROP TABLE IF EXISTS `Payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Payment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `subscriptionId` int NOT NULL,
  `amount` double NOT NULL,
  `paymentDate` datetime(3) DEFAULT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Payment_subscriptionId_fkey` (`subscriptionId`),
  CONSTRAINT `Payment_subscriptionId_fkey` FOREIGN KEY (`subscriptionId`) REFERENCES `Subscription` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Payment`
--

/*!40000 ALTER TABLE `Payment` DISABLE KEYS */;
/*!40000 ALTER TABLE `Payment` ENABLE KEYS */;

--
-- Table structure for table `Product`
--

DROP TABLE IF EXISTS `Product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `quantity` int NOT NULL,
  `price` double NOT NULL,
  `discount` double DEFAULT NULL,
  `images` json NOT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `shopId` int NOT NULL,
  `productCategoryId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Product_shopId_fkey` (`shopId`),
  KEY `Product_productCategoryId_fkey` (`productCategoryId`),
  CONSTRAINT `Product_productCategoryId_fkey` FOREIGN KEY (`productCategoryId`) REFERENCES `ProductCategory` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Product_shopId_fkey` FOREIGN KEY (`shopId`) REFERENCES `Shop` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Product`
--

/*!40000 ALTER TABLE `Product` DISABLE KEYS */;
/*!40000 ALTER TABLE `Product` ENABLE KEYS */;

--
-- Table structure for table `ProductCategory`
--

DROP TABLE IF EXISTS `ProductCategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ProductCategory` (
  `id` int NOT NULL AUTO_INCREMENT,
  `label` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `ProductCategory_label_key` (`label`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ProductCategory`
--

/*!40000 ALTER TABLE `ProductCategory` DISABLE KEYS */;
INSERT INTO `ProductCategory` VALUES (1,'Produits Capillaires','path/to/image1.jpg','Shampooing, après-shampooing, traitements capillaires, huiles et sérums pour cheveux.','2025-02-21 16:30:18.148','2025-02-21 16:30:18.148'),(2,'Maquillage','path/to/image2.jpg','Fond de teint, rouges à lèvres, mascara, ombres à paupières, etc.','2025-02-21 16:30:18.148','2025-02-21 16:30:18.148'),(3,'Soins du Visage','path/to/image3.jpg','Crèmes hydratantes, sérums, gommages, masques pour le visage.','2025-02-21 16:30:18.148','2025-02-21 16:30:18.148'),(4,'Soins du Corps','path/to/image4.jpg','Crèmes corporelles, huiles, lotions pour le corps, produits anti-cellulite.','2025-02-21 16:30:18.148','2025-02-21 16:30:18.148'),(5,'Vente de Perruques','path/to/image5.jpg','Perruques, extensions et accessoires pour cheveux.','2025-02-21 16:30:18.148','2025-02-21 16:30:18.148'),(6,'Soins des Ongles','path/to/image6.jpg','Vernis, huiles pour cuticules, limes à ongles, produits pour manucure et pédicure.','2025-02-21 16:30:18.148','2025-02-21 16:30:18.148'),(7,'Épilation','path/to/image7.jpg','Cires, crèmes d\'épilation, appareils d\'épilation.','2025-02-21 16:30:18.148','2025-02-21 16:30:18.148'),(8,'Produits Anti-âge','path/to/image8.jpg','Crèmes anti-rides, sérums pour une peau jeune et radieuse.','2025-02-21 16:30:18.148','2025-02-21 16:30:18.148'),(9,'Accessoires de Beauté','path/to/image9.jpg','Brosses, peignes, outils de maquillage, miroirs, etc.','2025-02-21 16:30:18.148','2025-02-21 16:30:18.148'),(10,'Parfums','path/to/image10.jpg','Parfums pour hommes et femmes, eaux de toilette et eaux de parfum.','2025-02-21 16:30:18.148','2025-02-21 16:30:18.148'),(11,'Soins Solaires','path/to/image11.jpg','Crèmes et huiles solaires, après-soleil pour protéger et hydrater la peau.','2025-02-21 16:30:18.148','2025-02-21 16:30:18.148'),(12,'Huiles Essentielles','path/to/image12.jpg','Huiles essentielles pour soins corporels et aromathérapie.','2025-02-21 16:30:18.148','2025-02-21 16:30:18.148'),(13,'Bain & Douche','path/to/image13.jpg','Gels douche, savons, sels de bain et produits pour le bain et la douche.','2025-02-21 16:30:18.148','2025-02-21 16:30:18.148'),(14,'Vente de Bijoux','path/to/image14.jpg','Bijoux, accessoires de mode pour compléter votre look.','2025-02-21 16:30:18.148','2025-02-21 16:30:18.148'),(15,'Soins des Cils & Sourcils','path/to/image15.jpg','Extensions de cils, serums pour cils et sourcils, produits de soin.','2025-02-21 16:30:18.148','2025-02-21 16:30:18.148');
/*!40000 ALTER TABLE `ProductCategory` ENABLE KEYS */;

--
-- Table structure for table `Rating`
--

DROP TABLE IF EXISTS `Rating`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Rating` (
  `id` int NOT NULL AUTO_INCREMENT,
  `notation` int NOT NULL,
  `comment` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Rating`
--

/*!40000 ALTER TABLE `Rating` DISABLE KEYS */;
/*!40000 ALTER TABLE `Rating` ENABLE KEYS */;

--
-- Table structure for table `Schedule`
--

DROP TABLE IF EXISTS `Schedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Schedule` (
  `id` int NOT NULL AUTO_INCREMENT,
  `event` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `start_date` datetime(3) NOT NULL,
  `end_date` datetime(3) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Schedule`
--

/*!40000 ALTER TABLE `Schedule` DISABLE KEYS */;
/*!40000 ALTER TABLE `Schedule` ENABLE KEYS */;

--
-- Table structure for table `Service`
--

DROP TABLE IF EXISTS `Service`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Service` (
  `id` int NOT NULL AUTO_INCREMENT,
  `label` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `time` int NOT NULL,
  `amount` int NOT NULL,
  `discount` int DEFAULT NULL,
  `images` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `categoryId` int NOT NULL,
  `userId` int NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `shopId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `Service_categoryId_fkey` (`categoryId`),
  KEY `Service_userId_fkey` (`userId`),
  KEY `Service_shopId_fkey` (`shopId`),
  CONSTRAINT `Service_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `ServiceCategory` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Service_shopId_fkey` FOREIGN KEY (`shopId`) REFERENCES `Shop` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Service_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=74 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Service`
--

/*!40000 ALTER TABLE `Service` DISABLE KEYS */;
INSERT INTO `Service` VALUES (1,'Coiffure afro','Toute une gamme de soin pour votre beauté',90,7000,500,'coiffures-trans.png',1,1,'2024-11-05 00:00:00.000','2024-11-06 00:00:00.000',8),(2,'makeUp soft','Toute une gamme de soin pour votre beauté',60,3000,NULL,'makeUp.png',1,1,'2024-11-05 00:00:00.000','2024-11-06 00:00:00.000',8),(3,'makeUp soft','Toute une gamme de soin pour votre beauté',60,3000,NULL,'makeUp.png',2,1,'2024-11-05 00:00:00.000','2024-11-06 00:00:00.000',8),(4,'manicure anglaise','Toute une gamme de soin pour votre beauté',60,5000,NULL,'manicure.png',3,1,'2024-11-05 00:00:00.000','2024-11-06 00:00:00.000',8),(5,'label','description',10,100,8,'[]',2,1,'2024-11-10 19:05:43.629','2024-11-10 19:05:43.629',NULL),(6,'label','description',10,1000,50,'[]',2,1,'2024-11-10 20:04:13.541','2024-11-10 20:04:13.541',NULL),(7,'label','description',10,1000,50,'[]',2,1,'2024-11-10 20:04:47.238','2024-11-10 20:04:47.238',NULL),(8,'label','description',10,1000,50,'[]',2,1,'2024-11-10 20:08:45.061','2024-11-10 20:08:45.061',NULL),(9,'label','description',10,1000,50,'[]',5,1,'2024-11-10 20:09:17.411','2024-11-10 20:09:17.411',NULL),(10,'service 1','description 1',5,1000,10,'[]',2,1,'2024-11-10 20:15:17.190','2024-11-10 20:15:17.190',NULL),(11,'service 1','description 1',5,1000,10,'[]',2,1,'2024-11-10 20:36:26.817','2024-11-10 20:36:26.817',NULL),(12,'service 1','description 1',5,1000,10,'[]',2,1,'2024-11-10 20:38:42.601','2024-11-10 20:38:42.601',NULL),(13,'service 1','description 1',5,1000,10,'[]',2,1,'2024-11-10 20:38:54.625','2024-11-10 20:38:54.625',NULL);
/*!40000 ALTER TABLE `Service` ENABLE KEYS */;

--
-- Table structure for table `ServiceCategory`
--

DROP TABLE IF EXISTS `ServiceCategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ServiceCategory` (
  `id` int NOT NULL AUTO_INCREMENT,
  `label` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `ServiceCategory_label_key` (`label`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ServiceCategory`
--

/*!40000 ALTER TABLE `ServiceCategory` DISABLE KEYS */;
INSERT INTO `ServiceCategory` VALUES (1,'Coiffure','coiffure.png','2024-11-02 12:07:07.404','2024-11-02 12:07:07.404'),(2,'Onglerie','manicure.png','2024-11-04 07:54:59.303','2024-11-04 07:54:59.303'),(3,'Maquillage','makeUp.png','2024-11-04 07:55:36.053','2024-11-04 07:55:36.053'),(4,'Manicure-pédicure','pedicure.png','2024-11-04 07:56:12.446','2024-11-04 07:56:12.446'),(5,'Soins de beauté','soinFace.png','2024-11-04 07:56:46.891','2024-11-04 07:56:46.891'),(6,'Massage','massage.png','2024-11-04 07:57:12.116','2024-11-04 07:57:12.116'),(9,'Coiffure Homme','Services de coupe et coiffure pour hommes, coupe classique, moderne, etc.','2025-02-21 16:28:39.445','2025-02-21 16:28:39.445'),(10,'Coiffure Femme','Services de coupe, coiffure, tissage, perruques et extensions pour femmes.','2025-02-21 16:28:39.445','2025-02-21 16:28:39.445'),(11,'Brushing','Services de brushing pour un look soigné et élégant, adapté à tout type de cheveux.','2025-02-21 16:28:39.445','2025-02-21 16:28:39.445'),(12,'Coloration Capillaire','Coloration des cheveux, mèches, balayage, colorations permanentes ou semi-permanentes.','2025-02-21 16:28:39.445','2025-02-21 16:28:39.445'),(13,'Lissage','Traitements lissants pour des cheveux lisses et soyeux, y compris le lissage brésilien.','2025-02-21 16:28:39.445','2025-02-21 16:28:39.445'),(14,'Soins du Visage','Soins du visage incluant nettoyage, gommage, hydratation, traitements anti-âge.','2025-02-21 16:28:39.445','2025-02-21 16:28:39.445'),(15,'Soins Anti-âge','Traitements ciblés pour prévenir et traiter les signes du vieillissement cutané.','2025-02-21 16:28:39.445','2025-02-21 16:28:39.445'),(16,'Maquillage Professionnel','Maquillage professionnel pour divers événements, mariages, séances photos.','2025-02-21 16:28:39.445','2025-02-21 16:28:39.445'),(17,'Manucure','Soins des ongles des mains, coupe, limage, pose de vernis classique ou semi-permanent.','2025-02-21 16:28:39.445','2025-02-21 16:28:39.445'),(18,'Pédicure','Soins des pieds, coupe d\'ongles, soins des callosités et pose de vernis.','2025-02-21 16:28:39.445','2025-02-21 16:28:39.445'),(19,'Épilation à la cire','Épilation à la cire des jambes, bras, aisselles, bikini, etc.','2025-02-21 16:28:39.445','2025-02-21 16:28:39.445'),(20,'Épilation au Laser','Épilation définitive avec technologie au laser pour une peau douce et sans poils.','2025-02-21 16:28:39.445','2025-02-21 16:28:39.445'),(21,'Massage Relaxant','Massages pour soulager le stress et détendre les muscles.','2025-02-21 16:28:39.445','2025-02-21 16:28:39.445'),(22,'Massage Therapeutique','Massages spécialisés pour traiter les douleurs musculaires, tensions et blessures.','2025-02-21 16:28:39.445','2025-02-21 16:28:39.445'),(23,'Soins Capillaires','Traitements réparateurs pour cheveux secs, abîmés, pellicules, etc.','2025-02-21 16:28:39.445','2025-02-21 16:28:39.445'),(24,'Perruques et Extensions','Pose de perruques, extensions et tissages pour changer de look rapidement.','2025-02-21 16:28:39.445','2025-02-21 16:28:39.445'),(25,'Tatouage','Services de tatouage, création de dessins personnalisés sur toutes parties du corps.','2025-02-21 16:28:39.445','2025-02-21 16:28:39.445'),(26,'Piercing','Piercing pour le nez, les oreilles, le nombril, etc.','2025-02-21 16:28:39.445','2025-02-21 16:28:39.445'),(27,'Vente de Produits de Beauté','Produits de beauté tels que des soins de la peau, des crèmes, des maquillage, etc.','2025-02-21 16:28:39.445','2025-02-21 16:28:39.445'),(28,'Soins des Cils','Extension de cils, curling, lifting des cils, et pose de faux cils.','2025-02-21 16:28:39.445','2025-02-21 16:28:39.445'),(29,'Détente et Bien-être','Services de bien-être comme les bains de vapeur, soins du corps, etc.','2025-02-21 16:28:39.445','2025-02-21 16:28:39.445');
/*!40000 ALTER TABLE `ServiceCategory` ENABLE KEYS */;

--
-- Table structure for table `Shop`
--

DROP TABLE IF EXISTS `Shop`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Shop` (
  `id` int NOT NULL AUTO_INCREMENT,
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `location` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phoneNumber` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logo` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `website` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `socialNetworks` json DEFAULT NULL,
  `images` json DEFAULT NULL,
  `userId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Shop_userId_fkey` (`userId`),
  CONSTRAINT `Shop_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Shop`
--

/*!40000 ALTER TABLE `Shop` DISABLE KEYS */;
INSERT INTO `Shop` VALUES (5,'SHOP-00005','shjshjjj','','','5454554584','logoURL',NULL,'ACTIVE','[{\"url\": \"facebook\"}]','[{\"url\": \"image\"}]',1),(6,'SHOP-00006','shop','desc ','Rue 7.771, Yaounde 6e, Yaounde, Cameroun','697438841','logoURL',NULL,'ACTIVE','[{\"url\": \"facebook\"}]','[{\"url\": \"image\"}]',1),(7,'SHOP-00007','shopName','description','currentLocation','phone','logoURL',NULL,'ACTIVE','[{\"url\": \"facebook\"}]','[{\"url\": \"image\"}]',1),(8,'SHOP-00008','shop Harold','description','Rue 7.147, Yaounde 6e, Yaounde, Cameroun','65887848848','logoURL',NULL,'ACTIVE','[{\"url\": \"facebook\"}]','[{\"url\": \"image\"}]',1),(29,'SHOP001','TopNyanga Beauty','Boutique spécialisée dans la vente de produits de beauté et services de coiffure.','Douala, Cameroun','237 650123456','path/to/logo1.jpg','https://topnyangabeauty.cm','active','{\"facebook\": \"https://facebook.com/topnyangabeauty\", \"instagram\": \"https://instagram.com/topnyangabeauty\"}','[\"path/to/image1.jpg\", \"path/to/image2.jpg\"]',1),(30,'SHOP002','BeautyCare Hub','Espace de soins capillaires et de beauté, proposant des services de maquillage et soins du visage.','Yaoundé, Cameroun','237 699987654','path/to/logo2.jpg','https://beautycarehub.cm','active','{\"facebook\": \"https://facebook.com/beautycarehub\"}','[\"path/to/image3.jpg\", \"path/to/image4.jpg\"]',2),(31,'SHOP003','Glow Salon','Salon de beauté avec des services de manucure, pédicure et soins anti-âge.','Bafoussam, Cameroun','237 694562348','path/to/logo3.jpg','https://glowsalon.cm','inactive','{\"twitter\": \"https://twitter.com/glowsalon\"}','[\"path/to/image5.jpg\", \"path/to/image6.jpg\"]',3),(32,'SHOP004','Elegance Coiffure','Coiffure et produits capillaires, spécialisé dans les perruques et extensions.','Douala, Cameroun','237 678123987','path/to/logo4.jpg','https://elegancecoiffure.cm','active','{\"instagram\": \"https://instagram.com/elegancecoiffure\"}','[\"path/to/image7.jpg\", \"path/to/image8.jpg\"]',4),(33,'SHOP005','Chic Beauty Studio','Salon de beauté pour hommes et femmes, avec des services de coiffure, manucure et épilation.','Yaoundé, Cameroun','237 678234567','path/to/logo5.jpg','https://chicbeautystudio.cm','active','{\"facebook\": \"https://facebook.com/chicbeautystudio\"}','[\"path/to/image9.jpg\", \"path/to/image10.jpg\"]',5),(34,'SHOP006','Glamour Hair Salon','Salon de coiffure haut de gamme avec des services de coupe, coiffage, et colorations.','Douala, Cameroun','237 695876123','path/to/logo6.jpg','https://glamourhairsalon.cm','active','{\"instagram\": \"https://instagram.com/glamourhairsalon\"}','[\"path/to/image11.jpg\", \"path/to/image12.jpg\"]',6),(35,'SHOP007','Luxury Touch Beauty','Espace de beauté offrant des soins du visage, manucure, pédicure, et coiffure.','Yaoundé, Cameroun','237 675432123','path/to/logo7.jpg','https://luxurytouchbeauty.cm','inactive','{\"facebook\": \"https://facebook.com/luxurytouchbeauty\"}','[\"path/to/image13.jpg\", \"path/to/image14.jpg\"]',7),(36,'SHOP008','Salon de Coiffure Nouvelle','Spécialiste en coiffure afro et européenne, avec des services de lissage et coiffures sophistiquées.','Douala, Cameroun','237 693487654','path/to/logo8.jpg','https://salondecoiffurenouvelle.cm','active','{\"twitter\": \"https://twitter.com/salondecoiffurenouvelle\"}','[\"path/to/image15.jpg\", \"path/to/image16.jpg\"]',8),(37,'SHOP009','Top Chic Salon','Salon de coiffure moderne offrant des services personnalisés pour hommes et femmes.','Douala, Cameroun','237 678345678','path/to/logo9.jpg','https://topchicsalon.cm','active','{\"instagram\": \"https://instagram.com/topchicsalon\"}','[\"path/to/image17.jpg\", \"path/to/image18.jpg\"]',9),(38,'SHOP010','Beauty Lux','Salon de beauté spécialisé dans les extensions capillaires et les soins du corps.','Yaoundé, Cameroun','237 691234567','path/to/logo10.jpg','https://beautylux.cm','active','{\"facebook\": \"https://facebook.com/beautylux\"}','[\"path/to/image19.jpg\", \"path/to/image20.jpg\"]',10),(39,'SHOP011','Coiffure Élégance','Coiffure haut de gamme pour hommes et femmes, avec des services de soins capillaires complets.','Douala, Cameroun','237 695210987','path/to/logo11.jpg','https://coiffureelegance.cm','inactive','{\"instagram\": \"https://instagram.com/coiffureelegance\"}','[\"path/to/image21.jpg\", \"path/to/image22.jpg\"]',11),(40,'SHOP012','BeautyWave Salon','Salon de beauté avec des services complets de soins de la peau et coiffure.','Yaoundé, Cameroun','237 696543210','path/to/logo12.jpg','https://beautywavesalon.cm','active','{\"twitter\": \"https://twitter.com/beautywavesalon\"}','[\"path/to/image23.jpg\", \"path/to/image24.jpg\"]',12),(41,'SHOP013','Classy Beauty Lounge','Espace de beauté moderne proposant des services de soins capillaires et du visage.','Bamenda, Cameroun','237 676543876','path/to/logo13.jpg','https://classybeautylounge.cm','active','{\"facebook\": \"https://facebook.com/classybeautylounge\"}','[\"path/to/image25.jpg\", \"path/to/image26.jpg\"]',13),(42,'SHOP014','Coco Beauty','Salon de beauté offrant des services de coiffure, manucure et soins de la peau.','Douala, Cameroun','237 698765432','path/to/logo14.jpg','https://cocobeauty.cm','inactive','{\"instagram\": \"https://instagram.com/cocobeauty\"}','[\"path/to/image27.jpg\", \"path/to/image28.jpg\"]',1),(43,'SHOP015','Vogue Beauty Studio','Salon de beauté haut de gamme, proposant des soins du visage et coiffure pour un look parfait.','Yaoundé, Cameroun','237 690876543','path/to/logo15.jpg','https://voguebeautystudio.cm','active','{\"facebook\": \"https://facebook.com/voguebeautystudio\"}','[\"path/to/image29.jpg\", \"path/to/image30.jpg\"]',2),(44,'SHOP016','Fabulous Hair Studio','Studio de coiffure spécialisé dans les coupes modernes et les extensions de cheveux.','Bafoussam, Cameroun','237 692345678','path/to/logo16.jpg','https://fabuloushairstudio.cm','active','{\"instagram\": \"https://instagram.com/fabuloushairstudio\"}','[\"path/to/image31.jpg\", \"path/to/image32.jpg\"]',3),(45,'SHOP017','Glam Beauty Spot','Espace de beauté offrant des services de coiffure, manucure, et soins du visage.','Douala, Cameroun','237 694321987','path/to/logo17.jpg','https://glambeautyspot.cm','active','{\"facebook\": \"https://facebook.com/glambeautyspot\"}','[\"path/to/image33.jpg\", \"path/to/image34.jpg\"]',4),(46,'SHOP018','Radiance Hair Salon','Salon spécialisé dans les soins capillaires et la coiffure de qualité supérieure.','Yaoundé, Cameroun','237 696678234','path/to/logo18.jpg','https://radiancehairsalon.cm','active','{\"twitter\": \"https://twitter.com/radiancehairsalon\"}','[\"path/to/image35.jpg\", \"path/to/image36.jpg\"]',5),(47,'SHOP019','Urban Chic Beauty','Salon de beauté chic offrant une gamme complète de services de soins du corps et du visage.','Douala, Cameroun','237 679876123','path/to/logo19.jpg','https://urbanchicbeauty.cm','inactive','{\"instagram\": \"https://instagram.com/urbanchicbeauty\"}','[\"path/to/image37.jpg\", \"path/to/image38.jpg\"]',6),(48,'SHOP020','GlowUp Beauty','Salon de beauté avec des services de coiffure, soins du visage, et soins de la peau.','Bamenda, Cameroun','237 670987654','path/to/logo20.jpg','https://glowupbeauty.cm','active','{\"facebook\": \"https://facebook.com/glowupbeauty\"}','[\"path/to/image39.jpg\", \"path/to/image40.jpg\"]',7);
/*!40000 ALTER TABLE `Shop` ENABLE KEYS */;

--
-- Table structure for table `Subscription`
--

DROP TABLE IF EXISTS `Subscription`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Subscription` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `subscriptionPlanId` int NOT NULL,
  `startDate` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `endDate` datetime(3) NOT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Subscription_userId_fkey` (`userId`),
  KEY `Subscription_subscriptionPlanId_fkey` (`subscriptionPlanId`),
  CONSTRAINT `Subscription_subscriptionPlanId_fkey` FOREIGN KEY (`subscriptionPlanId`) REFERENCES `SubscriptionPlan` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Subscription_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Subscription`
--

/*!40000 ALTER TABLE `Subscription` DISABLE KEYS */;
INSERT INTO `Subscription` VALUES (1,1,1,'2024-10-20 00:00:00.000','2024-11-20 00:00:00.000','ACTIVE','2024-10-27 00:00:00.000','2024-10-27 00:00:00.000'),(2,1,1,'2024-11-02 00:00:00.000','2024-12-13 00:00:00.000','ACTIVE','2024-11-29 00:00:00.000','2024-11-09 00:00:00.000');
/*!40000 ALTER TABLE `Subscription` ENABLE KEYS */;

--
-- Table structure for table `SubscriptionPlan`
--

DROP TABLE IF EXISTS `SubscriptionPlan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SubscriptionPlan` (
  `id` int NOT NULL AUTO_INCREMENT,
  `label` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` double NOT NULL,
  `duration` int NOT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `SubscriptionPlan_label_key` (`label`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SubscriptionPlan`
--

/*!40000 ALTER TABLE `SubscriptionPlan` DISABLE KEYS */;
INSERT INTO `SubscriptionPlan` VALUES (1,'Basique',100,1,NULL,'2024-10-26 10:19:22.086','2024-10-26 10:19:22.086'),(2,'Standard',250,1,NULL,'2024-10-26 10:19:22.099','2024-10-26 10:19:22.099'),(3,'Plan de Base',5000,30,'Plan d\'abonnement de base pour 30 jours, avec accès limité aux services.','2025-02-21 16:26:21.722','2025-02-21 16:26:21.722'),(4,'Plan Standard',10000,30,'Plan d\'abonnement standard pour 30 jours, avec accès étendu aux services.','2025-02-21 16:26:21.722','2025-02-21 16:26:21.722'),(5,'Plan Premium',20000,30,'Plan d\'abonnement premium pour 30 jours, avec accès complet à tous les services.','2025-02-21 16:26:21.722','2025-02-21 16:26:21.722');
/*!40000 ALTER TABLE `SubscriptionPlan` ENABLE KEYS */;

--
-- Table structure for table `Town`
--

DROP TABLE IF EXISTS `Town`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Town` (
  `id` int NOT NULL AUTO_INCREMENT,
  `label` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `countryId` int NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `Town_label_key` (`label`),
  KEY `Town_countryId_fkey` (`countryId`),
  CONSTRAINT `Town_countryId_fkey` FOREIGN KEY (`countryId`) REFERENCES `Country` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Town`
--

/*!40000 ALTER TABLE `Town` DISABLE KEYS */;
/*!40000 ALTER TABLE `Town` ENABLE KEYS */;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `User` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `surname` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `telephone` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `logo` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `otp` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `resetPasswordOtp` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `resetPasswordExpires` datetime(3) DEFAULT NULL,
  `role` enum('ADMIN','PROVIDER','CLIENT') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'CLIENT',
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `User_email_key` (`email`),
  UNIQUE KEY `User_telephone_key` (`telephone`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES (1,'hrldbrian@gmail.com','harold Brian','brian','$2b$10$jsvKD6GfAfB3TKjFp96lq.GDHkipTQXCLkxijXmy5dU.Ylj7.1v3i','697438841','Rue 7.374, Yaounde 3e, Yaounde, Cameroun',NULL,NULL,NULL,NULL,NULL,'PROVIDER',1,'2024-10-26 09:55:50.419','2025-02-21 19:53:51.131'),(2,'ngatchiewilsone@gmail.com','wilsone',NULL,'$2b$10$QMLZRJDxxURZuvgbgL4tv.umGQDwVZUepjMho7vXQpn5B9Muy9/qy',NULL,'Rue 7.374, Yaounde 3e, Yaounde, Cameroun',NULL,NULL,NULL,NULL,NULL,'CLIENT',1,'2024-11-05 13:45:47.576','2024-11-05 13:57:31.323'),(3,'durandjosephadji25@gmail.com','Kushiki',NULL,'$2b$10$m4K4TA1UdnB2kLKomm.X3.gLRKlTxlH3gEFtj/lSCTjseQGpiSqu.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'CLIENT',1,'2024-11-05 13:46:38.970','2024-11-05 13:47:14.134'),(4,'cfongang01@gmail.com','christian ',NULL,'$2b$10$n8V/zwXTVkUapnh/ctVQe.8cD9QUTbZyt3OUknLv/bTsDMW0/wVlO',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'CLIENT',1,'2024-12-10 15:03:30.383','2024-12-10 15:03:47.768'),(5,'thierryanderson@yahoo.com','Thierry ',NULL,'$2b$10$Ie.lqzAouehshKa9r72OU.vFrWMVFmvlpQnDhUA06sLpv7LaodB8O',NULL,'',NULL,NULL,NULL,NULL,NULL,'CLIENT',1,'2025-01-22 15:03:10.985','2025-01-22 15:21:27.416'),(6,'jean.ngounou@example.cm','Jean','Ngounou','password123','237699876543','Yaoundé, Cameroon','logo1.png','Description de Jean',NULL,NULL,NULL,'CLIENT',0,'2025-02-21 16:24:04.492','2025-02-21 16:24:04.492'),(7,'marie.tchakounte@example.cm','Marie','Tchakounté','password123','237677654321','Douala, Cameroon','logo2.png','Description de Marie',NULL,NULL,NULL,'CLIENT',0,'2025-02-21 16:24:04.492','2025-02-21 16:24:04.492'),(8,'paul.mokode@example.cm','Paul','Mokodé','password123','237688765432','Bafoussam, Cameroon','logo3.png','Description de Paul',NULL,NULL,NULL,'PROVIDER',0,'2025-02-21 16:24:04.492','2025-02-21 16:24:04.492'),(9,'sophie.banga@example.cm','Sophie','Banga','password123','237699988776','Garoua, Cameroon','logo4.png','Description de Sophie',NULL,NULL,NULL,'CLIENT',0,'2025-02-21 16:24:04.492','2025-02-21 16:24:04.492'),(10,'luc.atangana@example.cm','Luc','Atangana','password123','237655443322','Bamenda, Cameroon','logo5.png','Description de Luc',NULL,NULL,NULL,'PROVIDER',0,'2025-02-21 16:24:04.492','2025-02-21 16:24:04.492'),(11,'chantal.ngueme@example.cm','Chantal','Ngueme','password123','237677889900','Yaoundé, Cameroon','logo6.png','Description de Chantal',NULL,NULL,NULL,'CLIENT',0,'2025-02-21 16:24:04.492','2025-02-21 16:24:04.492'),(12,'pierre.ndongo@example.cm','Pierre','Ndongo','password123','237688900112','Douala, Cameroon','logo7.png','Description de Pierre',NULL,NULL,NULL,'CLIENT',0,'2025-02-21 16:24:04.492','2025-02-21 16:24:04.492'),(13,'amina.boudjema@example.cm','Amina','Boudjema','password123','237677112233','Bertoua, Cameroon','logo8.png','Description de Amina',NULL,NULL,NULL,'PROVIDER',0,'2025-02-21 16:24:04.492','2025-02-21 16:24:04.492'),(14,'emmanuel.fouda@example.cm','Emmanuel','Fouda','password123','237699223344','Kribi, Cameroon','logo9.png','Description de Emmanuel',NULL,NULL,NULL,'CLIENT',0,'2025-02-21 16:24:04.492','2025-02-21 16:24:04.492'),(15,'beatrice.ngoa@example.cm','Beatrice','Ngoa','password123','237677445566','Ebolowa, Cameroon','logo10.png','Description de Beatrice',NULL,NULL,NULL,'CLIENT',0,'2025-02-21 16:24:04.492','2025-02-21 16:24:04.492');
/*!40000 ALTER TABLE `User` ENABLE KEYS */;

--
-- Table structure for table `_prisma_migrations`
--

DROP TABLE IF EXISTS `_prisma_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_prisma_migrations`
--

/*!40000 ALTER TABLE `_prisma_migrations` DISABLE KEYS */;
INSERT INTO `_prisma_migrations` VALUES ('48cec268-6301-44d9-bfae-bbb256448a3d','850dfc31c349c08711123d52b3cb3c459f03b6d472b5c4930505725f7210fcd0','2025-02-15 11:09:51.990','20250203201009_add_order_model',NULL,NULL,'2025-02-15 11:09:51.343',1),('55c276a8-6004-4f7e-87db-f6fb830d0d65','e5da05bfe448214ada0a3b358603554d0271fb33efcd0537945e4d5d716703d0','2024-10-25 12:54:11.066','20241025125407_migrations',NULL,NULL,'2024-10-25 12:54:07.553',1),('714a6d42-4899-462f-8ae1-47cf94024a0f','122d743a0403e77ad7e0ed9447f5b8826f2fbdbc55612d936eff004dd13c2eec','2025-02-15 11:20:36.291','20250215111012_new_add',NULL,NULL,'2025-02-15 11:20:36.256',1),('7defcb64-09e9-4f50-8c9e-8a3be013e763','122d743a0403e77ad7e0ed9447f5b8826f2fbdbc55612d936eff004dd13c2eec','2025-02-15 11:34:16.054','20250215112048_',NULL,NULL,'2025-02-15 11:34:16.011',1),('b6e95b6b-38f7-4584-8a1a-79b06910aacd','33b4f9ffcbe72d8429dd8efbfa1215e3eacf2d35920bd3466124fc275f33eef7','2025-02-15 11:09:51.329','20250203195424_add_meet_model',NULL,NULL,'2025-02-15 11:09:50.977',1);
/*!40000 ALTER TABLE `_prisma_migrations` ENABLE KEYS */;

--
-- Dumping routines for database 'beautify'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-11 10:24:16
