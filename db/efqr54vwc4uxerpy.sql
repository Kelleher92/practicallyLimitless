-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 14, 2018 at 12:30 PM
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
-- Database: `efqr54vwc4uxerpy`
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
  `number` varchar(64) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `blurb` varchar(1048) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(64) NOT NULL,
  `address` varchar(200) NOT NULL,
  `geoCoor` varchar(100) NOT NULL,
  `logo` varchar(200) NOT NULL,
  `status` varchar(100) NOT NULL,
  `isActivated` tinyint(4) NOT NULL,
  `tempActivationToken` varchar(64) NOT NULL,
  `tokenSent` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `isActivationTokenExpired` tinyint(4) NOT NULL,
  `tempResetToken` varchar(64) NOT NULL,
  `resetTokenSent` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `isResetTokenExpired` tinyint(4) NOT NULL,
  `version` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `company`
--

INSERT INTO `company` (`id`, `companyId`, `name`, `email`, `number`, `blurb`, `password`, `address`, `geoCoor`, `logo`, `status`, `isActivated`, `tempActivationToken`, `tokenSent`, `isActivationTokenExpired`, `tempResetToken`, `resetTokenSent`, `isResetTokenExpired`, `version`) VALUES
(5, 'f7ca11ede651ff94b5227e2571149ef3', 'iancom', 'ikelleher@deloitte.ie', 'vx353232123', 'React component will get a XML from backend and store it in state and passed to textarea through value prop. Programatically alter the xml and sometimes user also modify it. Now on passing through text area value property, user cannot able to modify the xml.', '$2y$12$lIK4fDH8LA5tUtmzORG2b.vi0AsjpLD33egYwH.TEazvHSkS2blrm', 'Arklow, Co. Wicklow, Ireland', '53.30058946315128,-6.315190451804824', 'https://res.cloudinary.com/dxdhcnwlz/image/upload/v1536916769/f7ca11ede651ff94b5227e2571149ef3/2016%252F02%252F22%252F04%252F24%252F31%252Fb7bd820a-ecc0-4170-8f4e-3db2e73b0f4a%252F550250_artsigma.png.', '', 1, '1bbdb3475c39a43602130cdc9d22259c9232c98203be4d63edbe8709a829b41a', '2018-07-23 12:51:18', 1, '789defef75b008a364dc541e5c68b4e179d8e5604e722cf5b61ee88098c53ff1', '2018-07-31 10:04:26', 0, 2),
(10, '6b81c9aaceef02d4d17d3c72c6b0a4a4', 'sample sample', 'thomaslmorandd@gmail.com', '', '', '$2y$12$RB71LwM2MD55BwPQT6GQn.GXQdSrdOoW9L2M0JR8dD4.eBsMV0E8q', 'asddsadasd', '', '', '', 0, 'ce006ec72178b592b088d937b4c1bc66fdaa91e930ac8a150ef8055f8cc3c288', '2018-08-06 17:42:49', 0, '', '2018-08-06 17:42:49', 0, 0),
(11, 'ca95807293f55d94e97d1f9e5704be82', 'SB Ltd', 'sbermingham@deloitte.ie', '', '', '$2y$12$Mus4o/HQPEJs9h.mEkwVtO7pv28u1qj/x/x/Cz9Q9dpgGKmAK4nTC', 'Whitaker C', '', '', '', 1, 'c8e150334d741707a18fed63f949622ee8be6cd2e856ce4d6d49fbcd2882b3aa', '2018-08-10 07:30:34', 1, '', '2018-08-10 07:30:34', 0, 0),
(12, '8cfe61c85ad1d8850924418654226ccb', 'sd', 'fds@fsd.com', '', '', '$2y$12$sGBF6uqZMooW3JTp.KIBCufUYwLhhpKvC96XsJFg10XENFZUBhtG2', 'gfd', '', '', '', 0, 'a4edae9422c22dae32a0bfde9a407c66d8d1a8a44f2588d416c888d09e7a71eb', '2018-08-16 10:35:36', 0, '', '2018-08-16 10:35:36', 0, 0),
(13, '87893663b321faf744359b038d69aacb', 'Salesforce', 'admin@sf.com', '', '', '$2y$12$vUiox2XHx47OdIpUw/PO8uyZGpZcT/WGPlIjFRftPJL0mq2RDsVJ6', 'Dublin', '', '', '', 0, 'ece245714ef53e4059d6c8628f3fe65191256fdbccf14b985e67a8d4b042885f', '2018-08-16 16:36:11', 0, '', '2018-08-16 16:36:11', 0, 0),
(14, '04d7a19c77379a33502c0164770f7966', 'Deloitte', 'jiedding@deloitte.ie', '', '', '$2y$12$cCqWBfkx64od7qJSUhBH6.ynpS.DtFbLcorZa2cewtBywMBWNzNRK', 'jiedding@deloitte.ie', '', '', '', 1, '869f9ea159037e2ca3b5120452e489c71111b3584cb51e3c923be26b3e088cea', '2018-08-20 10:03:22', 1, '', '2018-08-20 10:03:22', 0, 0),
(15, '1ef9e3f86699dcbb4ee04fd6fe37c7a7', 'asfd', 'a@gmail.com', '', '', '$2y$12$v6x.66rZCsYbRBB10deraem7Pv/xjXPvXhs/bggyU896cX8/ndExi', 'test', '', '', '', 0, '2478b02974de9942d933685c9be4cefc4255a6001b035ed535a4f0966577d04d', '2018-09-12 09:57:30', 0, '', '2018-09-12 09:57:30', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `offer`
--

CREATE TABLE `offer` (
  `id` int(11) NOT NULL,
  `companyId` varchar(42) COLLATE utf8_unicode_ci NOT NULL,
  `offerName` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `requirements` varchar(1048) COLLATE utf8_unicode_ci NOT NULL,
  `expiryDate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `offer`
--

INSERT INTO `offer` (`id`, `companyId`, `offerName`, `requirements`, `expiryDate`) VALUES
(1, 'f7ca11ede651ff94b5227e2571149ef3', '5 haircuts', 'car, barber skills, license', '2018-08-10'),
(2, 'ca95807293f55d94e97d1f9e5704be82', '5 haircuts', '', '2018-08-10'),
(3, 'f7ca11ede651ff94b5227e2571149ef3', 'First one', '', '2018-08-30'),
(4, 'f7ca11ede651ff94b5227e2571149ef3', 'second offer', '', '2018-10-11'),
(5, 'f7ca11ede651ff94b5227e2571149ef3', 'fdsf', '', '2018-08-17'),
(6, 'f7ca11ede651ff94b5227e2571149ef3', 'ghvbbc', '', '2018-08-16'),
(7, 'f7ca11ede651ff94b5227e2571149ef3', 'test offer', '', '2018-08-31'),
(9, 'f7ca11ede651ff94b5227e2571149ef3', 'fghfgh', '', '2018-09-01'),
(10, 'f7ca11ede651ff94b5227e2571149ef3', 'ttttt', '', '2018-09-07'),
(11, 'f7ca11ede651ff94b5227e2571149ef3', 'Van, license', 'Van, license', '2018-11-30');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
--
-- AUTO_INCREMENT for table `offer`
--
ALTER TABLE `offer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
