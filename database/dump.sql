-- MySQL dump 10.13  Distrib 5.7.27, for Linux (x86_64)
--
-- Host: localhost    Database: bookKeeper
-- ------------------------------------------------------
-- Server version	5.7.27-0ubuntu0.18.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `entries`
--

DROP TABLE IF EXISTS `entries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `entries` (
  `entryID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `entryName` varchar(300) COLLATE utf8_unicode_ci NOT NULL,
  `entryPrice` int(11) NOT NULL,
  `entryUnits` int(11) NOT NULL,
  `entryTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`entryID`)
) ENGINE=InnoDB AUTO_INCREMENT=137 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `entries`
--

LOCK TABLES `entries` WRITE;
/*!40000 ALTER TABLE `entries` DISABLE KEYS */;
INSERT INTO `entries` VALUES (90,'Flax Seeds',299,3,'2019-10-04 05:12:08'),(91,'Table Salt',199,4,'2019-10-04 05:12:25'),(93,'Fig Newton',1489,1,'2019-10-04 05:13:48'),(94,'Green Beans',429,1,'2019-10-04 05:14:05'),(95,'Oscarmier Weiner',499,3,'2019-10-04 05:30:41'),(96,'Hot Dog Buns',399,3,'2019-10-04 05:30:56'),(97,'Fennel Seeds',430,4,'2019-10-08 03:11:26'),(98,'Geranium Root',324,4,'2019-10-08 03:53:14'),(99,'Kool-aid',99,15,'2019-10-08 06:52:42'),(100,'Granola Butter',999,1,'2019-10-09 08:12:52'),(101,'Tiddlywink',233,4,'2019-10-10 05:03:59'),(103,'Mineral Water',239,5,'2019-10-14 03:23:11'),(104,'German Chocolate Cake',234,4,'2019-10-15 01:40:19'),(105,'German Chocolate Cake',234,4,'2019-10-15 02:40:26'),(106,'German Chocolate Cake',234,4,'2019-10-15 03:40:33'),(107,'German Chocolate Cake',234,4,'2019-10-15 04:40:43'),(108,'German Chocolate Cake',234,4,'2019-10-15 06:40:56'),(109,'German Chocolate Cake',234,4,'2019-10-15 06:40:56'),(110,'German Chocolate Cake',234,4,'2019-10-15 07:40:56'),(111,'German Chocolate Cake',234,4,'2019-10-15 08:41:03'),(112,'German Chocolate Cake',234,4,'2019-10-15 09:41:03'),(113,'German Chocolate Cake',234,4,'2019-10-15 10:41:03'),(114,'German Chocolate Cake',234,4,'2019-10-15 11:41:03'),(115,'German Chocolate Cake',234,4,'2019-10-15 12:41:03'),(116,'German Chocolate Cake',234,4,'2019-10-15 00:41:03'),(117,'Flour',499,3,'2019-10-15 13:18:15'),(118,'Flour',499,3,'2019-10-15 14:18:51'),(119,'Flour',499,3,'2019-10-15 15:19:01'),(120,'Flour',499,3,'2019-10-15 16:19:01'),(121,'Flour',499,3,'2019-10-15 17:19:01'),(122,'Flour',499,3,'2019-10-15 18:19:01'),(123,'Flour',499,3,'2019-10-15 19:19:01'),(124,'Flour',499,3,'2019-10-15 20:19:01'),(125,'Flour',499,3,'2019-10-15 21:19:01'),(126,'Flour',499,3,'2019-10-15 22:19:01'),(127,'Flour',499,3,'2019-10-15 23:19:01'),(128,'Flour',499,3,'2019-10-15 23:19:01'),(130,'Flour',499,3,'2019-10-15 22:19:28'),(131,'Tapioca',299,3,'2019-10-17 04:50:30'),(132,'Baby Formula',299,4,'2019-10-17 23:00:38'),(133,'Celsius Heat',399,1,'2019-10-18 00:07:01'),(135,'Hello',299,3,'2019-10-21 03:42:04'),(136,'Hello',299,4,'2019-10-23 00:07:31');
/*!40000 ALTER TABLE `entries` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-10-23  0:33:13
