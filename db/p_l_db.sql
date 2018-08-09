-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 09, 2018 at 08:33 PM
-- Server version: 10.1.25-MariaDB
-- PHP Version: 7.1.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `p_l_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `company`
--

CREATE TABLE `company` (
  `id` int(11) NOT NULL,
  `companyId` varchar(42) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(300) NOT NULL,
  `password` varchar(64) NOT NULL,
  `address` varchar(200) NOT NULL,
  `geoCoor` varchar(100) NOT NULL,
  `status` varchar(100) NOT NULL,
  `isActivated` tinyint(4) NOT NULL,
  `tempActivationToken` varchar(64) NOT NULL,
  `tokenSent` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `isActivationTokenExpired` tinyint(4) NOT NULL,
  `tempResetToken` varchar(64) NOT NULL,
  `resetTokenSent` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `isResetTokenExpired` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `company`
--

INSERT INTO `company` (`id`, `companyId`, `name`, `email`, `password`, `address`, `geoCoor`, `status`, `isActivated`, `tempActivationToken`, `tokenSent`, `isActivationTokenExpired`, `tempResetToken`, `resetTokenSent`, `isResetTokenExpired`) VALUES
(5, 'f7ca11ede651ff94b5227e2571149ef3', 'ianco', 'ian@goyeti.ie', '$2y$12$lIK4fDH8LA5tUtmzORG2b.vi0AsjpLD33egYwH.TEazvHSkS2blrm', 'thomastown', '', '', 1, '1bbdb3475c39a43602130cdc9d22259c9232c98203be4d63edbe8709a829b41a', '2018-07-23 12:51:18', 1, '789defef75b008a364dc541e5c68b4e179d8e5604e722cf5b61ee88098c53ff1', '2018-07-31 10:04:26', 0),
(10, '6b81c9aaceef02d4d17d3c72c6b0a4a4', 'sample sample', 'thomaslmorandd@gmail.com', '$2y$12$RB71LwM2MD55BwPQT6GQn.GXQdSrdOoW9L2M0JR8dD4.eBsMV0E8q', 'asddsadasd', '', '', 0, 'ce006ec72178b592b088d937b4c1bc66fdaa91e930ac8a150ef8055f8cc3c288', '2018-08-06 17:42:49', 0, '', '2018-08-06 17:42:49', 0);

-- --------------------------------------------------------

--
-- Table structure for table `offer`
--

CREATE TABLE `offer` (
  `id` int(11) NOT NULL,
  `companyId` varchar(42) COLLATE utf8_unicode_ci NOT NULL,
  `offerName` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `expiryDate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `company`
--
ALTER TABLE `company`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `companyId` (`companyId`);

--
-- Indexes for table `offer`
--
ALTER TABLE `offer`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `company`
--
ALTER TABLE `company`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT for table `offer`
--
ALTER TABLE `offer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
