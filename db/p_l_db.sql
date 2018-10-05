-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 04, 2018 at 10:43 AM
-- Server version: 10.1.36-MariaDB
-- PHP Version: 5.6.38

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
  `companyId` varchar(42) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(300) COLLATE utf8_unicode_ci NOT NULL,
  `number` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `blurb` varchar(1048) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `address` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `geoCoor` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `logo` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `status` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `isActivated` tinyint(4) NOT NULL,
  `tempActivationToken` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `tokenSent` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `isActivationTokenExpired` tinyint(4) NOT NULL,
  `tempResetToken` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `resetTokenSent` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `isResetTokenExpired` tinyint(4) NOT NULL,
  `version` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `company`
--

INSERT INTO `company` (`id`, `companyId`, `name`, `email`, `number`, `blurb`, `password`, `address`, `geoCoor`, `logo`, `status`, `isActivated`, `tempActivationToken`, `tokenSent`, `isActivationTokenExpired`, `tempResetToken`, `resetTokenSent`, `isResetTokenExpired`, `version`) VALUES
(5, 'f7ca11ede651ff94b5227e2571149ef3', 'iancom', 'ikelleher@deloitte.ie', 'vx353232123', 'React component will get a XML from backend and store it in state and passed to textarea through value prop. Programatically alter the xml and sometimes user also modify it. Now on passing through text area value property, user cannot able to modify the xml.', '$2y$12$lIK4fDH8LA5tUtmzORG2b.vi0AsjpLD33egYwH.TEazvHSkS2blrm', 'Arklow, Co. Wicklow, Ireland', '53.30058946315128,-6.315190451804824', 'https://res.cloudinary.com/dxdhcnwlz/image/upload/v1536916769/f7ca11ede651ff94b5227e2571149ef3/2016%252F02%252F22%252F04%252F24%252F31%252Fb7bd820a-ecc0-4170-8f4e-3db2e73b0f4a%252F550250_artsigma.png.', '', 1, '1bbdb3475c39a43602130cdc9d22259c9232c98203be4d63edbe8709a829b41a', '2018-07-23 12:51:18', 1, '68c219b1873c4633fe1fa91f4a5799486cc164e479ea7194db787218ac5b2cec', '2018-10-02 18:10:51', 0, 2),
(10, '6b81c9aaceef02d4d17d3c72c6b0a4a4', 'sample sample', 'thomaslmorandd@gmail.com', '', '', '$2y$12$RB71LwM2MD55BwPQT6GQn.GXQdSrdOoW9L2M0JR8dD4.eBsMV0E8q', 'asddsadasd', '', '', '', 0, 'ce006ec72178b592b088d937b4c1bc66fdaa91e930ac8a150ef8055f8cc3c288', '2018-08-06 17:42:49', 0, '', '2018-08-06 17:42:49', 0, 0),
(11, 'ca95807293f55d94e97d1f9e5704be82', 'SB Ltd', 'sbermingham@deloitte.ie', '', '', '$2y$12$Mus4o/HQPEJs9h.mEkwVtO7pv28u1qj/x/x/Cz9Q9dpgGKmAK4nTC', 'Whitaker C', '', '', '', 1, 'c8e150334d741707a18fed63f949622ee8be6cd2e856ce4d6d49fbcd2882b3aa', '2018-08-10 07:30:34', 1, '', '2018-08-10 07:30:34', 0, 0),
(12, '8cfe61c85ad1d8850924418654226ccb', 'sd', 'fds@fsd.com', '', '', '$2y$12$sGBF6uqZMooW3JTp.KIBCufUYwLhhpKvC96XsJFg10XENFZUBhtG2', 'gfd', '', '', '', 0, 'a4edae9422c22dae32a0bfde9a407c66d8d1a8a44f2588d416c888d09e7a71eb', '2018-08-16 10:35:36', 0, '', '2018-08-16 10:35:36', 0, 0),
(13, '87893663b321faf744359b038d69aacb', 'Salesforce', 'admin@sf.com', '', '', '$2y$12$vUiox2XHx47OdIpUw/PO8uyZGpZcT/WGPlIjFRftPJL0mq2RDsVJ6', 'Dublin', '', '', '', 0, 'ece245714ef53e4059d6c8628f3fe65191256fdbccf14b985e67a8d4b042885f', '2018-08-16 16:36:11', 0, '', '2018-08-16 16:36:11', 0, 0),
(14, '04d7a19c77379a33502c0164770f7966', 'Deloitte', 'jiedding@deloitte.ie', '', '', '$2y$12$cCqWBfkx64od7qJSUhBH6.ynpS.DtFbLcorZa2cewtBywMBWNzNRK', 'jiedding@deloitte.ie', '', '', '', 1, '869f9ea159037e2ca3b5120452e489c71111b3584cb51e3c923be26b3e088cea', '2018-08-20 10:03:22', 1, '', '2018-08-20 10:03:22', 0, 0),
(15, '1ef9e3f86699dcbb4ee04fd6fe37c7a7', 'asfd', 'a@gmail.com', '', '', '$2y$12$v6x.66rZCsYbRBB10deraem7Pv/xjXPvXhs/bggyU896cX8/ndExi', 'test', '', '', '', 0, '2478b02974de9942d933685c9be4cefc4255a6001b035ed535a4f0966577d04d', '2018-09-12 09:57:30', 0, '', '2018-09-12 09:57:30', 0, 0),
(19, 'dca79b844d1a70a5efcefaeb90c45463', 'MMPR Company', 'phoebestaab1@gmail.com', '', '', '$2y$12$nmOsnAE9VU3JjyYY3no4veTCLeDBYVosHMeyuBVkNysJ9S1xNjKgS', 'Av. Corrientes 6109, C1414ALA CABA, Argentina', '-34.5923809,-58.446618', 'https://res.cloudinary.com/dxdhcnwlz/image/upload/v1538584200/dca79b844d1a70a5efcefaeb90c45463/monkeylogo.jpg.jpg', '', 1, '4be16c9688598a5c2e640109aa34c42d3eef918296bc2e827d91b215433f2c7c', '2018-10-03 16:02:18', 1, '', '2018-10-03 16:02:18', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `offer`
--

CREATE TABLE `offer` (
  `id` int(11) NOT NULL,
  `companyId` varchar(42) COLLATE utf8_unicode_ci NOT NULL,
  `offerName` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `requirements` varchar(1048) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(1048) COLLATE utf8_unicode_ci NOT NULL,
  `expiryDate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `offer`
--

INSERT INTO `offer` (`id`, `companyId`, `offerName`, `requirements`, `description`, `expiryDate`) VALUES
(1, 'f7ca11ede651ff94b5227e2571149ef3', '5 haircuts', 'car, barber skills, license', 'desc', '2018-08-10'),
(2, 'ca95807293f55d94e97d1f9e5704be82', '5 haircuts', '', 'desc', '2018-08-10'),
(3, 'f7ca11ede651ff94b5227e2571149ef3', 'First one', '', 'desc', '2018-08-30'),
(4, 'f7ca11ede651ff94b5227e2571149ef3', 'second offer', '', 'desc', '2018-10-11'),
(5, 'f7ca11ede651ff94b5227e2571149ef3', 'fdsf', '', 'desc', '2018-08-17'),
(6, 'f7ca11ede651ff94b5227e2571149ef3', 'ghvbbc', '', 'desc', '2018-08-16'),
(7, 'f7ca11ede651ff94b5227e2571149ef3', 'test offer', '', 'desc', '2018-08-31'),
(9, 'f7ca11ede651ff94b5227e2571149ef3', 'fghfgh', '', 'desc', '2018-09-01'),
(10, 'f7ca11ede651ff94b5227e2571149ef3', 'ttttt', '', 'desc', '2018-09-07'),
(11, 'f7ca11ede651ff94b5227e2571149ef3', 'Van, license', 'Van, license', 'desc', '2018-11-30');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `userId` varchar(42) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(300) COLLATE utf8_unicode_ci NOT NULL,
  `number` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `blurb` varchar(1048) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `address` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `geoCoor` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `logo` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `status` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `isActivated` tinyint(4) NOT NULL,
  `tempActivationToken` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `tokenSent` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `isActivationTokenExpired` tinyint(4) NOT NULL,
  `tempResetToken` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `resetTokenSent` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `isResetTokenExpired` tinyint(4) NOT NULL,
  `version` bigint(20) NOT NULL,
  `skills` varchar(300) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `userId`, `name`, `email`, `number`, `blurb`, `password`, `address`, `geoCoor`, `logo`, `status`, `isActivated`, `tempActivationToken`, `tokenSent`, `isActivationTokenExpired`, `tempResetToken`, `resetTokenSent`, `isResetTokenExpired`, `version`, `skills`) VALUES
(5, 'f7ca11ede651ff94b5227e2571149ef3', 'iancom', 'ikelleher@deloitte.ie', 'vx353232123', 'React component will get a XML from backend and store it in state and passed to textarea through value prop. Programatically alter the xml and sometimes user also modify it. Now on passing through text area value property, user cannot able to modify the xml.', '$2y$12$lIK4fDH8LA5tUtmzORG2b.vi0AsjpLD33egYwH.TEazvHSkS2blrm', 'Arklow, Co. Wicklow, Ireland', '53.30058946315128,-6.315190451804824', 'https://res.cloudinary.com/dxdhcnwlz/image/upload/v1536916769/f7ca11ede651ff94b5227e2571149ef3/2016%252F02%252F22%252F04%252F24%252F31%252Fb7bd820a-ecc0-4170-8f4e-3db2e73b0f4a%252F550250_artsigma.png.', '', 1, '1bbdb3475c39a43602130cdc9d22259c9232c98203be4d63edbe8709a829b41a', '2018-07-23 12:51:18', 1, '789defef75b008a364dc541e5c68b4e179d8e5604e722cf5b61ee88098c53ff1', '2018-07-31 10:04:26', 0, 2,'skills1'),
(10, '6b81c9aaceef02d4d17d3c72c6b0a4a4', 'sample sample', 'thomaslmorandd@gmail.com', '', '', '$2y$12$RB71LwM2MD55BwPQT6GQn.GXQdSrdOoW9L2M0JR8dD4.eBsMV0E8q', 'asddsadasd', '', '', '', 0, 'ce006ec72178b592b088d937b4c1bc66fdaa91e930ac8a150ef8055f8cc3c288', '2018-08-06 17:42:49', 0, '', '2018-08-06 17:42:49', 0, 0, 'skills2'),
(11, 'ca95807293f55d94e97d1f9e5704be82', 'SB Ltd', 'sbermingham@deloitte.ie', '', '', '$2y$12$Mus4o/HQPEJs9h.mEkwVtO7pv28u1qj/x/x/Cz9Q9dpgGKmAK4nTC', 'Whitaker C', '', '', '', 1, 'c8e150334d741707a18fed63f949622ee8be6cd2e856ce4d6d49fbcd2882b3aa', '2018-08-10 07:30:34', 1, '', '2018-08-10 07:30:34', 0, 0, 'skills3'),
(12, '8cfe61c85ad1d8850924418654226ccb', 'sd', 'fds@fsd.com', '', '', '$2y$12$sGBF6uqZMooW3JTp.KIBCufUYwLhhpKvC96XsJFg10XENFZUBhtG2', 'gfd', '', '', '', 0, 'a4edae9422c22dae32a0bfde9a407c66d8d1a8a44f2588d416c888d09e7a71eb', '2018-08-16 10:35:36', 0, '', '2018-08-16 10:35:36', 0, 0, 'skills4'),
(13, '87893663b321faf744359b038d69aacb', 'Salesforce', 'admin@sf.com', '', '', '$2y$12$vUiox2XHx47OdIpUw/PO8uyZGpZcT/WGPlIjFRftPJL0mq2RDsVJ6', 'Dublin', '', '', '', 0, 'ece245714ef53e4059d6c8628f3fe65191256fdbccf14b985e67a8d4b042885f', '2018-08-16 16:36:11', 0, '', '2018-08-16 16:36:11', 0, 0, 'skills5'),
(14, '04d7a19c77379a33502c0164770f7966', 'Deloitte', 'jiedding@deloitte.ie', '', '', '$2y$12$cCqWBfkx64od7qJSUhBH6.ynpS.DtFbLcorZa2cewtBywMBWNzNRK', 'jiedding@deloitte.ie', '', '', '', 1, '869f9ea159037e2ca3b5120452e489c71111b3584cb51e3c923be26b3e088cea', '2018-08-20 10:03:22', 1, '', '2018-08-20 10:03:22', 0, 0, 'skills6'),
(15, '1ef9e3f86699dcbb4ee04fd6fe37c7a7', 'asfd', 'a@gmail.com', '', '', '$2y$12$v6x.66rZCsYbRBB10deraem7Pv/xjXPvXhs/bggyU896cX8/ndExi', 'test', '', '', '', 0, '2478b02974de9942d933685c9be4cefc4255a6001b035ed535a4f0966577d04d', '2018-09-12 09:57:30', 0, '', '2018-09-12 09:57:30', 0, 0, 'skills7'),
(31, 'd950d9835887ab1278b66a7da1df98d6', 'mohan', 'mohansairs22@gmail.com', '', '', '$2y$12$Rr30Dg/9Q0W8K3vW7t6PI.jckdUWLnUh8BrrQaUa1bAXyLYjzzEXa', '', '52.7942,-6.1469', '', '', 0, '459dd13742246afa7e3c17857a5d336d6fb8e4f485479775971cd1145a7b1de9', '2018-10-03 13:02:09', 0, '', '2018-10-03 13:02:09', 0, 0, 'skills8'),
(33, '627cd1d47cf37ce2fcc3d6885df4e7a0', 'phoebe', 'phoebestaab@gmail.com', '', '', '$2y$12$o7dqmyOo5ATbQFCuZrdhcO2xTAtvv3Khv9CRBGXm1NVFYhDIAAx4.', '', '52.7942,-6.1469', '', '', 1, 'bbcb77efa169770a7eaac68f3a608e94be2c2d141f80eb0af83eab14a21f49a0', '2018-10-03 15:17:04', 1, '', '2018-10-03 15:17:04', 0, 0, 'skills9');

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
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `userId` (`userId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `company`
--
ALTER TABLE `company`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `offer`
--
ALTER TABLE `offer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;


