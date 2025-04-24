-- MySQL dump 10.13  Distrib 8.0.41, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: beautify
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Country`
--

/*!40000 ALTER TABLE `Country` DISABLE KEYS */;
INSERT INTO `Country` VALUES (1,'Cameroun','CM','Pays d’Afrique centrale','2025-04-19 02:12:36.469','2025-04-19 02:12:36.469'),(2,'France','FR','Pays d’Europe de l’Ouest','2025-04-19 02:12:36.469','2025-04-19 02:12:36.469');
/*!40000 ALTER TABLE `Country` ENABLE KEYS */;

--
-- Table structure for table `Meet`
--

DROP TABLE IF EXISTS `Meet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Meet` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `serviceId` int NOT NULL,
  `date` datetime(3) NOT NULL,
  `hour` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `place` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `Meet_userId_fkey` (`userId`),
  KEY `Meet_serviceId_fkey` (`serviceId`),
  CONSTRAINT `Meet_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `Service` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Meet_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Meet`
--

/*!40000 ALTER TABLE `Meet` DISABLE KEYS */;
INSERT INTO `Meet` VALUES (1,3,1,'2025-04-25 00:00:00.000','14:00','Salon Beauty Pro Yaoundé','pending','2025-04-19 02:12:55.821','2025-04-19 02:12:55.821');
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
  `updatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
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
INSERT INTO `Order` VALUES ('d3fd969e-1cc3-11f0-af44-00163c827135',3,1,2,7000,'paid','2025-04-19 02:13:04.928','2025-04-19 02:13:04.928');
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
  `updatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `Payment_subscriptionId_fkey` (`subscriptionId`),
  CONSTRAINT `Payment_subscriptionId_fkey` FOREIGN KEY (`subscriptionId`) REFERENCES `Subscription` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Payment`
--

/*!40000 ALTER TABLE `Payment` DISABLE KEYS */;
INSERT INTO `Payment` VALUES (1,1,5000,'2025-04-18 00:00:00.000','completed','2025-04-19 02:13:18.777','2025-04-19 02:13:18.777');
/*!40000 ALTER TABLE `Payment` ENABLE KEYS */;

--
-- Table structure for table `Product`
--

DROP TABLE IF EXISTS `Product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `shopId` int NOT NULL,
  `productCategoryId` int NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `quantity` int NOT NULL,
  `price` double NOT NULL,
  `discount` double DEFAULT NULL,
  `images` json NOT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `Product_shopId_fkey` (`shopId`),
  KEY `Product_productCategoryId_fkey` (`productCategoryId`),
  CONSTRAINT `Product_productCategoryId_fkey` FOREIGN KEY (`productCategoryId`) REFERENCES `ProductCategory` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Product_shopId_fkey` FOREIGN KEY (`shopId`) REFERENCES `Shop` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Product`
--

/*!40000 ALTER TABLE `Product` DISABLE KEYS */;
INSERT INTO `Product` VALUES (1,1,1,'Après-shampoing réparateur',40,3000,NULL,'[\"conditioner.jpg\"]','Hydrate et démêle les cheveux abîmés','available','2025-04-19 02:12:51.300','2025-04-19 02:12:51.300'),(2,1,1,'Huile de ricin',25,4500,NULL,'[\"castor_oil.jpg\"]','Stimule la pousse des cheveux','available','2025-04-19 02:12:51.300','2025-04-19 02:12:51.300'),(3,1,2,'Mascara volume',35,6000,NULL,'[\"mascara.jpg\"]','Pour des cils épais et recourbés','available','2025-04-19 02:12:51.300','2025-04-19 02:12:51.300'),(4,1,2,'Palette ombres à paupières',20,10000,NULL,'[\"eyeshadow_palette.jpg\"]','Palette de 12 couleurs nude et glamour','available','2025-04-19 02:12:51.300','2025-04-19 02:12:51.300'),(5,1,3,'Crème hydratante jour',40,5500,NULL,'[\"day_cream.jpg\"]','Hydratation légère pour usage quotidien','available','2025-04-19 02:12:51.300','2025-04-19 02:12:51.300'),(6,1,3,'Masque purifiant',30,7000,NULL,'[\"clay_mask.jpg\"]','Masque à l’argile pour peaux mixtes à grasses','available','2025-04-19 02:12:51.300','2025-04-19 02:12:51.300'),(7,1,4,'Lotion hydratante corps',50,5000,NULL,'[\"body_lotion.jpg\"]','Lait corporel nourrissant à l’aloe vera','available','2025-04-19 02:12:51.300','2025-04-19 02:12:51.300'),(8,1,4,'Huile amincissante',15,9500,NULL,'[\"slimming_oil.jpg\"]','Aide à réduire la cellulite avec massages réguliers','available','2025-04-19 02:12:51.300','2025-04-19 02:12:51.300'),(9,1,5,'Perruque naturelle mi-longue',10,30000,NULL,'[\"wig1.jpg\"]','Cheveux humains 100% vierges','available','2025-04-19 02:12:51.300','2025-04-19 02:12:51.300'),(10,1,5,'Extension à clips',25,12000,NULL,'[\"hair_extensions.jpg\"]','Extensions faciles à poser en quelques minutes','available','2025-04-19 02:12:51.300','2025-04-19 02:12:51.300'),(11,1,6,'Vernis semi-permanent',60,3500,NULL,'[\"gel_polish.jpg\"]','Tenue jusqu’à 3 semaines','available','2025-04-19 02:12:51.300','2025-04-19 02:12:51.300'),(12,1,6,'Kit manucure pro',15,12000,NULL,'[\"nail_kit.jpg\"]','Limes, poussoirs, pince à cuticules, etc.','available','2025-04-19 02:12:51.300','2025-04-19 02:12:51.300'),(13,1,7,'Cire chaude naturelle',20,6000,NULL,'[\"wax.jpg\"]','Cire à base de sucre et citron','available','2025-04-19 02:12:51.300','2025-04-19 02:12:51.300'),(14,1,7,'Crème dépilatoire peaux sensibles',35,4500,NULL,'[\"depilatory_cream.jpg\"]','Élimine les poils en douceur','available','2025-04-19 02:12:51.300','2025-04-19 02:12:51.300'),(15,1,8,'Sérum anti-rides',18,15000,NULL,'[\"anti_age_serum.jpg\"]','Sérum concentré à l’acide hyaluronique','available','2025-04-19 02:12:51.300','2025-04-19 02:12:51.300'),(16,1,8,'Crème de nuit régénérante',22,11000,NULL,'[\"night_cream.jpg\"]','Agit pendant le sommeil','available','2025-04-19 02:12:51.300','2025-04-19 02:12:51.300'),(17,1,9,'Pinceaux de maquillage – Set de 12',10,9000,NULL,'[\"brush_set.jpg\"]','En poils synthétiques doux','available','2025-04-19 02:12:51.300','2025-04-19 02:12:51.300'),(18,1,9,'Miroir lumineux LED',8,15000,NULL,'[\"led_mirror.jpg\"]','Miroir grossissant avec lumière intégrée','available','2025-04-19 02:12:51.300','2025-04-19 02:12:51.300'),(19,1,10,'Eau de parfum femme – Florale',12,18000,NULL,'[\"perfume_women.jpg\"]','Fragrance légère et fleurie','available','2025-04-19 02:12:51.300','2025-04-19 02:12:51.300'),(20,1,10,'Parfum homme – Boisé',14,19000,NULL,'[\"perfume_men.jpg\"]','Note boisée et élégante','available','2025-04-19 02:12:51.300','2025-04-19 02:12:51.300');
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
  `description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `ProductCategory_label_key` (`label`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ProductCategory`
--

/*!40000 ALTER TABLE `ProductCategory` DISABLE KEYS */;
INSERT INTO `ProductCategory` VALUES (1,'Produits Capillaires','path/to/image1.jpg','Shampooing, après-shampooing, traitements capillaires, huiles et sérums pour cheveux.','2025-02-21 16:30:18.148','2025-02-21 16:30:18.148'),(2,'Maquillage','path/to/image2.jpg','Fond de teint, rouges à lèvres, mascara, ombres à paupières, etc.','2025-02-21 16:30:18.148','2025-02-21 16:30:18.148'),(3,'Soins du Visage','path/to/image3.jpg','Crèmes hydratantes, sérums, gommages, masques pour le visage.','2025-02-21 16:30:18.148','2025-02-21 16:30:18.148'),(4,'Soins du Corps','path/to/image4.jpg','Crèmes corporelles, huiles, lotions pour le corps, produits anti-cellulite.','2025-02-21 16:30:18.148','2025-02-21 16:30:18.148'),(5,'Vente de Perruques','path/to/image5.jpg','Perruques, extensions et accessoires pour cheveux.','2025-02-21 16:30:18.148','2025-02-21 16:30:18.148'),(6,'Soins des Ongles','path/to/image6.jpg','Vernis, huiles pour cuticules, limes à ongles, produits pour manucure et pédicure.','2025-02-21 16:30:18.148','2025-02-21 16:30:18.148'),(7,'Épilation','path/to/image7.jpg','Cires, crèmes d\'épilation, appareils d\'épilation.','2025-02-21 16:30:18.148','2025-02-21 16:30:18.148'),(8,'Produits Anti-âge','path/to/image8.jpg','Crèmes anti-rides, sérums pour une peau jeune et radieuse.','2025-02-21 16:30:18.148','2025-02-21 16:30:18.148'),(9,'Accessoires de Beauté','path/to/image9.jpg','Brosses, peignes, outils de maquillage, miroirs, etc.','2025-02-21 16:30:18.148','2025-02-21 16:30:18.148'),(10,'Parfums','path/to/image10.jpg','Parfums pour hommes et femmes, eaux de toilette et eaux de parfum.','2025-02-21 16:30:18.148','2025-02-21 16:30:18.148');
/*!40000 ALTER TABLE `ProductCategory` ENABLE KEYS */;

--
-- Table structure for table `Rating`
--

DROP TABLE IF EXISTS `Rating`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Rating` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `meetId` int NOT NULL,
  `notation` int NOT NULL,
  `comment` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `Rating_userId_fkey` (`userId`),
  KEY `Rating_meetId_fkey` (`meetId`),
  CONSTRAINT `Rating_meetId_fkey` FOREIGN KEY (`meetId`) REFERENCES `Meet` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Rating_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Rating`
--

/*!40000 ALTER TABLE `Rating` DISABLE KEYS */;
INSERT INTO `Rating` VALUES (1,3,1,5,'Très satisfaite du service, la coiffeuse était top !','2025-04-19 02:13:00.345','2025-04-19 02:13:00.345');
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
  `updatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Schedule`
--

/*!40000 ALTER TABLE `Schedule` DISABLE KEYS */;
INSERT INTO `Schedule` VALUES (1,'Formation sur les techniques de massage','2025-05-10 09:00:00.000','2025-05-10 17:00:00.000','2025-04-19 02:12:54.031','2025-04-19 02:12:54.031');
/*!40000 ALTER TABLE `Schedule` ENABLE KEYS */;

--
-- Table structure for table `Service`
--

DROP TABLE IF EXISTS `Service`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Service` (
  `id` int NOT NULL AUTO_INCREMENT,
  `serviceCategoryId` int NOT NULL,
  `shopId` int NOT NULL,
  `label` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `time` int NOT NULL,
  `amount` int NOT NULL,
  `discount` int DEFAULT NULL,
  `image` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `isVisible` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `Service_serviceCategoryId_fkey` (`serviceCategoryId`),
  KEY `Service_shopId_fkey` (`shopId`),
  CONSTRAINT `Service_serviceCategoryId_fkey` FOREIGN KEY (`serviceCategoryId`) REFERENCES `ServiceCategory` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Service_shopId_fkey` FOREIGN KEY (`shopId`) REFERENCES `Shop` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Service`
--

/*!40000 ALTER TABLE `Service` DISABLE KEYS */;
INSERT INTO `Service` VALUES (1,1,1,'Tissage simple','Pose de tissage sans rajout',60,10000,NULL,NULL,'true','2025-04-19 02:12:46.413','2025-04-19 02:12:46.413'),(2,1,1,'Tresse africaine','Tressage traditionnel sans rajout',90,8000,NULL,NULL,'true','2025-04-19 02:12:46.413','2025-04-19 02:12:46.413'),(3,1,1,'Défrisage','Application de produit défrisant',75,9000,NULL,NULL,'true','2025-04-19 02:12:46.413','2025-04-19 02:12:46.413'),(4,1,1,'Shampoing + brushing','Lavage et brushing pour cheveux naturels',45,6000,NULL,NULL,'true','2025-04-19 02:12:46.413','2025-04-19 02:12:46.413'),(5,2,1,'Pose de faux ongles','Application de faux ongles avec gel UV',90,12000,NULL,NULL,'true','2025-04-19 02:12:46.413','2025-04-19 02:12:46.413'),(6,2,1,'Nail art','Décoration personnalisée des ongles',60,7000,NULL,NULL,'true','2025-04-19 02:12:46.413','2025-04-19 02:12:46.413'),(7,2,1,'Remplissage ongles','Remplissage gel ou résine',60,9000,NULL,NULL,'true','2025-04-19 02:12:46.413','2025-04-19 02:12:46.413'),(8,2,1,'Dépose complète','Retrait des faux ongles avec soin',30,4000,NULL,NULL,'true','2025-04-19 02:12:46.413','2025-04-19 02:12:46.413'),(9,3,1,'Maquillage jour','Maquillage léger et naturel pour la journée',30,5000,NULL,NULL,'true','2025-04-19 02:12:46.413','2025-04-19 02:12:46.413'),(10,3,1,'Maquillage soirée','Maquillage intense pour les événements',45,8000,NULL,NULL,'true','2025-04-19 02:12:46.413','2025-04-19 02:12:46.413'),(11,3,1,'Maquillage mariée','Prestation maquillage complète pour mariage',90,15000,NULL,NULL,'true','2025-04-19 02:12:46.413','2025-04-19 02:12:46.413'),(12,4,1,'Manicure complète','Soins des mains + vernis classique',45,5000,NULL,NULL,'true','2025-04-19 02:12:46.413','2025-04-19 02:12:46.413'),(13,4,1,'Pédicure spa','Soin complet des pieds avec gommage et hydratation',60,6000,NULL,NULL,'true','2025-04-19 02:12:46.413','2025-04-19 02:12:46.413'),(14,5,1,'Soin visage éclat','Nettoyage de peau + masque hydratant',45,7000,NULL,NULL,'true','2025-04-19 02:12:46.413','2025-04-19 02:12:46.413'),(15,5,1,'Soin anti-âge','Soin raffermissant avec massage du visage',60,10000,NULL,NULL,'true','2025-04-19 02:12:46.413','2025-04-19 02:12:46.413'),(16,5,1,'Gommage visage','Exfoliation douce du visage',30,5000,NULL,NULL,'true','2025-04-19 02:12:46.413','2025-04-19 02:12:46.413'),(17,6,1,'Massage relaxant','Massage du corps aux huiles essentielles',60,12000,NULL,NULL,'true','2025-04-19 02:12:46.413','2025-04-19 02:12:46.413'),(18,6,1,'Massage dos','Massage ciblé sur les tensions dorsales',30,7000,NULL,NULL,'true','2025-04-19 02:12:46.413','2025-04-19 02:12:46.413'),(19,6,1,'Massage aux pierres chaudes','Détente profonde avec pierres chauffées',75,15000,NULL,NULL,'true','2025-04-19 02:12:46.413','2025-04-19 02:12:46.413');
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
  `image` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `ServiceCategory_label_key` (`label`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ServiceCategory`
--

/*!40000 ALTER TABLE `ServiceCategory` DISABLE KEYS */;
INSERT INTO `ServiceCategory` VALUES (1,'Coiffure','Services de coiffure pour tous types de cheveux.','coiffure.png','2024-11-02 12:07:07.404','2024-11-02 12:07:07.404'),(2,'Onglerie','Soins, pose de vernis, faux ongles et nail art.','manicure.png','2024-11-04 07:54:59.303','2024-11-04 07:54:59.303'),(3,'Maquillage','Maquillage pour toutes occasions, jour, nuit, mariage.','makeUp.png','2024-11-04 07:55:36.053','2024-11-04 07:55:36.053'),(4,'Manicure-pédicure','Soins des mains et des pieds, gommage, hydratation, vernis.','pedicure.png','2024-11-04 07:56:12.446','2024-11-04 07:56:12.446'),(5,'Soins de beauté','Soins du visage, gommages, masques, anti-âge.','soinFace.png','2024-11-04 07:56:46.891','2024-11-04 07:56:46.891'),(6,'Massage','Massages relaxants, thérapeutiques, sportifs.','massage.png','2024-11-04 07:57:12.116','2024-11-04 07:57:12.116'),(9,'Coiffure Homme','Services de coupe et coiffure pour hommes, coupe classique, moderne, etc.','coiffureHomme.png','2025-02-21 16:28:39.445','2025-02-21 16:28:39.445'),(10,'Coiffure Femme','Services de coupe, coiffure, tissage, perruques et extensions pour femmes.','coiffureFemme.png','2025-02-21 16:28:39.445','2025-02-21 16:28:39.445'),(11,'Brushing','Brushing pour un look soigné et élégant, adapté à tout type de cheveux.','brushing.png','2025-02-21 16:28:39.445','2025-02-21 16:28:39.445'),(12,'Coloration Capillaire','Coloration des cheveux, mèches, balayage, colorations permanentes ou semi-permanentes.','coloration.png','2025-02-21 16:28:39.445','2025-02-21 16:28:39.445'),(13,'Lissage','Traitements lissants pour des cheveux lisses et soyeux, y compris le lissage brésilien.','lissage.png','2025-02-21 16:28:39.445','2025-02-21 16:28:39.445');
/*!40000 ALTER TABLE `ServiceCategory` ENABLE KEYS */;

--
-- Table structure for table `Shop`
--

DROP TABLE IF EXISTS `Shop`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Shop` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
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
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `Shop_userId_fkey` (`userId`),
  CONSTRAINT `Shop_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Shop`
--

/*!40000 ALTER TABLE `Shop` DISABLE KEYS */;
INSERT INTO `Shop` VALUES (1,2,'SH001','Beauty Pro Yaoundé','Salon haut de gamme spécialisé en soins capillaires','Yaoundé','+237658989898',NULL,NULL,'active',NULL,NULL,'2025-04-19 02:12:42.626','2025-04-19 02:12:42.626');
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
  `status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `startDate` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `endDate` datetime(3) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `Subscription_userId_fkey` (`userId`),
  KEY `Subscription_subscriptionPlanId_fkey` (`subscriptionPlanId`),
  CONSTRAINT `Subscription_subscriptionPlanId_fkey` FOREIGN KEY (`subscriptionPlanId`) REFERENCES `SubscriptionPlan` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Subscription_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Subscription`
--

/*!40000 ALTER TABLE `Subscription` DISABLE KEYS */;
INSERT INTO `Subscription` VALUES (1,2,2,'active','2025-04-19 02:13:12.390','2025-07-20 00:00:00.000','2025-04-19 02:13:12.390','2025-04-19 02:13:12.390');
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SubscriptionPlan`
--

/*!40000 ALTER TABLE `SubscriptionPlan` DISABLE KEYS */;
INSERT INTO `SubscriptionPlan` VALUES (1,'Plan Basique',100,30,'Accès aux fonctionnalités de base','2025-04-19 02:13:09.374','2025-04-19 02:13:09.374'),(2,'Plan Standard',2500,30,'Accès aux fonctionnalités de base et à l\'espace boutique','2025-04-19 02:13:09.374','2025-04-19 02:13:09.374'),(3,'Plan Premium',5000,90,'Accès illimité à toutes les fonctionnalités','2025-04-19 02:13:09.374','2025-04-19 02:13:09.374');
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Town`
--

/*!40000 ALTER TABLE `Town` DISABLE KEYS */;
INSERT INTO `Town` VALUES (1,'Yaoundé',1,'2025-04-19 02:12:38.074','2025-04-19 02:12:38.074'),(2,'Douala',1,'2025-04-19 02:12:38.074','2025-04-19 02:12:38.074'),(3,'Paris',2,'2025-04-19 02:12:38.074','2025-04-19 02:12:38.074');
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES (1,'admin@tn.com','Admin','Root','hashed_password','650000001','Centre, Yaoundé',NULL,NULL,NULL,NULL,NULL,'ADMIN',1,'2025-04-19 02:12:39.156','2025-04-19 02:12:39.156'),(2,'hrldbrian@gmail.com','Brian','B.','$2b$10$RhdULqW6vLXafvUSeyPeDOmJcd4dU0vwDKCF4ahjL42ce2T3nyxay','697438841','Bastos, Yaoundé',NULL,NULL,NULL,NULL,NULL,'PROVIDER',1,'2025-04-19 02:12:39.156','2025-04-19 02:58:23.581'),(3,'harold@tn.com','Harold','Nkodo','hashed_password','650000003','Mokolo, Yaoundé',NULL,NULL,NULL,NULL,NULL,'CLIENT',1,'2025-04-19 02:12:39.156','2025-04-19 02:12:39.156');
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
INSERT INTO `_prisma_migrations` VALUES ('64f69e05-978f-42c6-9f84-329e3ca217be','f2b7ef4647622a05b3cff710f0e3ec08b3c275ffedf88fb02b6e4247e068dcde','2025-04-19 02:12:26.000','20250419021221_init_data',NULL,NULL,'2025-04-19 02:12:21.201',1);
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

-- Dump completed on 2025-04-21 18:12:49
