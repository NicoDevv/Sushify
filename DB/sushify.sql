-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Apr 29, 2025 alle 08:42
-- Versione del server: 10.4.28-MariaDB
-- Versione PHP: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sushify`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `assegnazione_tablet`
--

CREATE TABLE `assegnazione_tablet` (
  `id_at` int(11) NOT NULL,
  `cod_tavolo` int(11) DEFAULT NULL,
  `cod_tablet` int(11) DEFAULT NULL,
  `data` date DEFAULT NULL,
  `ora_in` time DEFAULT NULL,
  `ora_fin` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `componenti`
--

CREATE TABLE `componenti` (
  `id_componente` int(11) NOT NULL,
  `nome_componente` varchar(50) NOT NULL,
  `intolleranza` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `componenti`
--

INSERT INTO `componenti` (`id_componente`, `nome_componente`, `intolleranza`) VALUES
(300, 'Riso', NULL),
(301, 'Salmone crudo', 'Pesce'),
(302, 'Tonno crudo', 'Pesce'),
(303, 'Gambero cotto', 'Crostacei'),
(304, 'Anguilla grigliata', 'Pesce'),
(305, 'Wasabi', NULL),
(306, 'Frittata giapponese (Tamago)', 'Uovo'),
(307, 'Alga nori', NULL),
(308, 'Polpo cotto', 'Pesce'),
(309, 'Uova di salmone (Ikura)', 'Pesce'),
(310, 'Uova di pesce volante (Tobiko)', 'Pesce'),
(311, 'Tonno tritato', 'Pesce'),
(312, 'Maionese piccante', 'Uovo'),
(313, 'Surimi', 'Crostacei'),
(314, 'Avocado', NULL),
(315, 'Cetriolo', NULL),
(316, 'Formaggio spalmabile', 'Lattosio'),
(317, 'Salsa unagi (teriyaki)', 'Soia'),
(318, 'Pesce misto', 'Pesce'),
(319, 'Daikon sottaceto (Oshinko)', NULL),
(320, 'Cipollotto', NULL),
(321, 'Frutti di mare misti', 'Crostacei'),
(322, 'Spinaci', NULL),
(323, 'Carota', NULL),
(324, 'Zucca marinata (Kampyo)', NULL),
(325, 'Pasta gyoza', 'Glutine'),
(326, 'Carne di maiale', NULL),
(327, 'Cavolo', NULL),
(328, 'Aglio', NULL),
(329, 'Zenzero', NULL),
(330, 'Salsa di soia', 'Soia'),
(331, 'Amido di mais', NULL),
(332, 'Fagioli di soia (Edamame)', 'Soia'),
(333, 'Alghe wakame', NULL),
(334, 'Semi di sesamo', 'Sesamo'),
(335, 'Tofu', 'Soia'),
(336, 'Miso', 'Soia'),
(337, 'Ventresca di tonno (Toro)', 'Pesce'),
(338, 'Onigiri grigliato', NULL),
(339, 'Capesante', 'Molluschi'),
(340, 'Ricciola cruda', 'Pesce'),
(341, 'Sashimi misto', 'Pesce'),
(342, 'Tentsuyu (salsa per tempura)', 'Soia'),
(343, 'Tempura pastella', 'Glutine'),
(344, 'Insalata mista', NULL),
(345, 'Olio di sesamo', 'Sesamo'),
(346, 'Aceto di riso', NULL),
(347, 'Zucchero', NULL),
(348, 'Mirin', 'Alcol'),
(349, 'Sake (per cottura)', 'Alcol');

-- --------------------------------------------------------

--
-- Struttura della tabella `menu`
--

CREATE TABLE `menu` (
  `id_menu` int(11) NOT NULL,
  `nome_menu` varchar(50) DEFAULT NULL,
  `data_aggiornamento` datetime DEFAULT NULL,
  `prezzo` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `menu`
--

INSERT INTO `menu` (`id_menu`, `nome_menu`, `data_aggiornamento`, `prezzo`) VALUES
(10, 'Menu All You Can Eat Pranzo Feriale', '2025-04-23 11:24:59', 15.9),
(20, 'Menu All You Can Eat Pranzo Festivo', '2025-04-23 11:24:59', 17.9),
(30, 'Menu All You Can Eat Cena Feriale', '2025-04-23 11:24:59', 25.9),
(40, 'Menu All You Can Eat Cena Festivo', '2025-04-23 11:24:59', 27.9),
(50, 'Menu Carta Pranzo', '2025-04-23 11:24:59', 0),
(60, 'Menu Carta Cena', '2025-04-23 11:24:59', 0);

-- --------------------------------------------------------

--
-- Struttura della tabella `ordine`
--

CREATE TABLE `ordine` (
  `id_ordine` int(11) NOT NULL,
  `data_ordine` datetime DEFAULT NULL,
  `stato_ordine` varchar(20) DEFAULT NULL,
  `cod_tavolata` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `ordine_personalizzato`
--

CREATE TABLE `ordine_personalizzato` (
  `id_op` int(11) NOT NULL,
  `cod_ordine` int(11) DEFAULT NULL,
  `cod_pp` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `pagamento`
--

CREATE TABLE `pagamento` (
  `id_pagamento` int(11) NOT NULL,
  `metodo` varchar(50) DEFAULT NULL,
  `importo` float DEFAULT NULL,
  `stato_pagamento` varchar(50) DEFAULT NULL,
  `data_pagamento` datetime DEFAULT NULL,
  `cod_tavolata` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `personalizzazioni`
--

CREATE TABLE `personalizzazioni` (
  `id_personalizzazione` int(11) NOT NULL,
  `tipo_personalizzazione` varchar(50) NOT NULL,
  `descrizione` varchar(50) DEFAULT NULL,
  `cod_comp` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `piatto`
--

CREATE TABLE `piatto` (
  `id_piatto` int(11) NOT NULL,
  `nome_piatto` varchar(50) DEFAULT NULL,
  `descrizione` varchar(50) DEFAULT NULL,
  `prezzo` float DEFAULT NULL,
  `categoria` varchar(50) DEFAULT NULL,
  `immagine_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `piatto`
--

INSERT INTO `piatto` (`id_piatto`, `nome_piatto`, `descrizione`, `prezzo`, `categoria`, `immagine_url`) VALUES
(100, 'Sake Nigiri', 'Riso pressato con una fetta di salmone crudo sopra', 5.9, 'Nigiri', ''),
(101, 'Maguro Nigiri', 'Riso pressato con tonno crudo', 6.5, 'Nigiri', ''),
(102, 'Ebi Nigiri', 'Riso pressato con gambero cotto', 7, 'Nigiri', ''),
(103, 'Unagi Nigiri', 'Riso con anguilla grigliata e salsa teriyaki', 7.5, 'Nigiri', ''),
(104, 'Tamago Nigiri', 'Riso con frittata giapponese dolce', 4.8, 'Nigiri', ''),
(105, 'Tako Nigiri', 'Riso con polpo cotto', 6, 'Nigiri', ''),
(106, 'Ikura Gunkan', 'Riso avvolto in alga con uova di salmone', 8, 'Gunkan', ''),
(107, 'Tobiko Gunkan', 'Riso avvolto in alga con uova di pesce volante', 7.8, 'Gunkan', ''),
(108, 'Spicy Tuna Gunkan', 'Riso con tonno piccante avvolto in alga', 8.5, 'Gunkan', ''),
(109, 'California Roll', 'Maki con surimi, avocado e cetriolo', 7.2, 'Uramaki', ''),
(110, 'Philadelphia Roll', 'Maki con salmone, avocado e formaggio cremoso', 8, 'Uramaki', ''),
(111, 'Dragon Roll', 'Uramaki con anguilla, avocado e salsa unagi', 9.5, 'Uramaki', ''),
(112, 'Rainbow Roll', 'Uramaki con pesce misto sopra (tonno, salmone, avo', 10, 'Uramaki', ''),
(113, 'Spicy Tuna Roll', 'Maki con tonno piccante', 7.5, 'Maki', ''),
(114, 'Tekka Maki', 'Maki con tonno crudo', 6.8, 'Maki', ''),
(115, 'Kappa Maki', 'Maki con cetriolo', 5.5, 'Maki', ''),
(116, 'Sake Maki', 'Maki con salmone crudo', 6.9, 'Maki', ''),
(117, 'Avocado Maki', 'Maki vegetariano con avocado', 5.8, 'Maki', ''),
(118, 'Futomaki', 'Maki grande con verdure e uova', 8.2, 'Futomaki', ''),
(119, 'Tempura Roll', 'Maki con gambero in tempura', 8.9, 'Uramaki', ''),
(120, 'Veggie Roll', 'Maki vegetariano con cetriolo, carota, avocado', 6.5, 'Maki', ''),
(121, 'Gambero in Tempura', 'Gamberi fritti in pastella giapponese', 7.6, 'Antipasto', ''),
(122, 'Edamame', 'Fagioli di soia al vapore con sale', 4, 'Antipasto', ''),
(123, 'Wakame Salad', 'Insalata di alghe giapponesi', 5.2, 'Antipasto', ''),
(124, 'Sake Sashimi', 'Fettine di salmone crudo', 8.5, 'Sashimi', ''),
(125, 'Maguro Sashimi', 'Fettine di tonno crudo', 9, 'Sashimi', ''),
(126, 'Hamachi Sashimi', 'Fettine di ricciola cruda', 9.2, 'Sashimi', ''),
(127, 'Tako Sashimi', 'Fettine di polpo cotto', 7.8, 'Sashimi', ''),
(128, 'Hotategai Sashimi', 'Capesante crude', 10, 'Sashimi', ''),
(129, 'Gyoza', 'Ravioli giapponesi ripieni di carne o verdure', 6.4, 'Antipasto', ''),
(130, 'Karaage', 'Pollo fritto giapponese croccante', 7.5, 'Antipasto', ''),
(131, 'Zensai Misto', 'Antipasto misto giapponese', 8, 'Antipasto', ''),
(132, 'Tofu Dengaku', 'Tofu grigliato con salsa miso', 5.5, 'Antipasto', ''),
(133, 'Sushi Set Deluxe', 'Assortimento di nigiri e maki', 18, 'Set Menu', ''),
(134, 'Chirashi Sushi', 'Ciotola di riso con pesce crudo assortito sopra', 12, 'Ciotola', ''),
(135, 'Donburi al Salmone', 'Riso con salmone crudo a fette', 11.5, 'Ciotola', ''),
(136, 'Unadon', 'Ciotola di riso con anguilla grigliata', 13, 'Ciotola', ''),
(137, 'Ten Don', 'Ciotola con riso e tempura mista', 12.5, 'Ciotola', ''),
(138, 'Tamago Maki', 'Maki con frittata dolce giapponese', 5, 'Maki', ''),
(139, 'Oshinko Maki', 'Maki con sottaceti giapponesi', 5.4, 'Maki', ''),
(140, 'Inari Sushi', 'Tasca di tofu fritto ripiena di riso', 4.8, 'Altro', ''),
(141, 'Umi no Sachi Roll', 'Maki con frutti di mare misti', 9.2, 'Maki', ''),
(142, 'Yaki Sake Roll', 'Maki con salmone grigliato', 8.8, 'Maki', ''),
(143, 'Toro Nigiri', 'Riso con tonno grasso (pregiato)', 10.5, 'Nigiri', ''),
(144, 'Negitoro Maki', 'Maki con tonno grasso e cipollotto', 7.8, 'Maki', ''),
(145, 'Ebi Tempura Roll', 'Maki con gambero fritto e avocado', 9, 'Uramaki', ''),
(146, 'Spicy Salmon Roll', 'Maki con salmone piccante', 7.9, 'Maki', ''),
(147, 'Hoso Maki Misto', 'Piccoli maki misti (tonno, cetriolo, salmone)', 6.8, 'Maki', ''),
(148, 'Yaki Onigiri', 'Polpette di riso grigliate con salsa soia', 5.2, 'Altro', ''),
(149, 'Miso Soup', 'Zuppa di miso con tofu, alghe e cipollotto', 2.8, 'Zuppa', ''),
(150, 'Tuna Tartare', 'Tartare di tonno con avocado e salsa soia', 9.5, 'Antipasto', '');

-- --------------------------------------------------------

--
-- Struttura della tabella `piatto_componenti`
--

CREATE TABLE `piatto_componenti` (
  `id_pc` int(11) NOT NULL,
  `cod_p` int(11) DEFAULT NULL,
  `id_c` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `piatto_componenti`
--

INSERT INTO `piatto_componenti` (`id_pc`, `cod_p`, `id_c`) VALUES
(1, 100, 300),
(2, 100, 301),
(3, 100, 305),
(4, 101, 300),
(5, 101, 302),
(6, 101, 305),
(7, 102, 300),
(8, 102, 303),
(9, 102, 305),
(10, 103, 300),
(11, 103, 304),
(12, 103, 317),
(13, 103, 305),
(14, 104, 300),
(15, 104, 306),
(16, 104, 307),
(17, 104, 347),
(18, 104, 330),
(19, 105, 300),
(20, 105, 308),
(21, 105, 305),
(22, 106, 300),
(23, 106, 337),
(24, 106, 305),
(25, 107, 300),
(26, 107, 307),
(27, 107, 309),
(28, 108, 300),
(29, 108, 307),
(30, 108, 310),
(31, 109, 300),
(32, 109, 311),
(33, 109, 312),
(34, 109, 307),
(35, 110, 300),
(36, 110, 313),
(37, 110, 314),
(38, 110, 315),
(39, 110, 312),
(40, 110, 307),
(41, 111, 300),
(42, 111, 301),
(43, 111, 314),
(44, 111, 316),
(45, 111, 307),
(46, 112, 300),
(47, 112, 304),
(48, 112, 314),
(49, 112, 315),
(50, 112, 317),
(51, 112, 307),
(52, 113, 300),
(53, 113, 314),
(54, 113, 315),
(55, 113, 318),
(56, 113, 307),
(57, 114, 300),
(58, 114, 303),
(59, 114, 343),
(60, 114, 314),
(61, 114, 312),
(62, 114, 307),
(63, 115, 300),
(64, 115, 311),
(65, 115, 312),
(66, 115, 307),
(67, 116, 300),
(68, 116, 302),
(69, 116, 307),
(70, 117, 300),
(71, 117, 315),
(72, 117, 307),
(73, 118, 300),
(74, 118, 301),
(75, 118, 307),
(76, 119, 300),
(77, 119, 314),
(78, 119, 307),
(79, 120, 300),
(80, 120, 306),
(81, 120, 307),
(82, 121, 300),
(83, 121, 319),
(84, 121, 307),
(85, 122, 300),
(86, 122, 337),
(87, 122, 320),
(88, 122, 307),
(89, 123, 300),
(90, 123, 301),
(91, 123, 304),
(92, 123, 314),
(93, 123, 307),
(94, 124, 300),
(95, 124, 311),
(96, 124, 312),
(97, 124, 307),
(98, 125, 300),
(99, 125, 303),
(100, 125, 343),
(101, 125, 314),
(102, 125, 307),
(103, 126, 300),
(104, 126, 321),
(105, 126, 307),
(106, 127, 300),
(107, 127, 302),
(108, 127, 315),
(109, 127, 301),
(110, 127, 307),
(111, 128, 300),
(112, 128, 306),
(113, 128, 322),
(114, 128, 323),
(115, 128, 315),
(116, 128, 324),
(117, 128, 307),
(118, 129, 300),
(119, 129, 314),
(120, 129, 315),
(121, 129, 323),
(122, 129, 344),
(123, 129, 307),
(124, 130, 303),
(125, 130, 343),
(126, 131, 332),
(127, 132, 333),
(128, 132, 334),
(129, 132, 346),
(130, 132, 330),
(131, 133, 325),
(132, 133, 326),
(133, 133, 327),
(134, 133, 328),
(135, 133, 329),
(136, 133, 330),
(137, 134, 326),
(138, 134, 330),
(139, 134, 331),
(140, 134, 328),
(141, 134, 329),
(142, 135, 332),
(143, 135, 333),
(144, 135, 335),
(145, 135, 325),
(146, 136, 335),
(147, 136, 336),
(148, 136, 347),
(149, 136, 348),
(150, 136, 330),
(151, 137, 302),
(152, 137, 314),
(153, 137, 320),
(154, 137, 330),
(155, 137, 345),
(156, 138, 336),
(157, 138, 335),
(158, 138, 307),
(159, 138, 320),
(160, 139, 336),
(161, 139, 335),
(162, 139, 307),
(163, 140, 300),
(164, 140, 307),
(165, 141, 300),
(166, 141, 318),
(167, 141, 305),
(168, 142, 300),
(169, 142, 301),
(170, 142, 320),
(171, 142, 334),
(172, 142, 330),
(173, 143, 300),
(174, 143, 304),
(175, 143, 317),
(176, 143, 307),
(177, 144, 300),
(178, 144, 343),
(179, 144, 303),
(180, 144, 323),
(181, 144, 342),
(182, 145, 301),
(183, 146, 302),
(184, 147, 340),
(185, 148, 308),
(186, 149, 339),
(187, 149, 304),
(188, 149, 330),
(189, 149, 316),
(190, 149, 305),
(191, 135, 304),
(192, 135, 305),
(193, 135, 306),
(194, 135, 337),
(195, 136, 303),
(196, 136, 301),
(197, 136, 304),
(198, 138, 340),
(199, 138, 301),
(200, 138, 304),
(201, 138, 305),
(202, 138, 303),
(203, 132, 304),
(204, 132, 307),
(205, 132, 312),
(206, 133, 307),
(207, 133, 314),
(208, 133, 315),
(209, 133, 304),
(210, 133, 312),
(211, 125, 308),
(212, 125, 309),
(213, 125, 303),
(214, 126, 307),
(215, 126, 314),
(216, 127, 307),
(217, 127, 315);

-- --------------------------------------------------------

--
-- Struttura della tabella `piatto_menu`
--

CREATE TABLE `piatto_menu` (
  `id_pm` int(11) NOT NULL,
  `cod_menu` int(11) DEFAULT NULL,
  `cod_p` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `piatto_menu`
--

INSERT INTO `piatto_menu` (`id_pm`, `cod_menu`, `cod_p`) VALUES
(1, 10, 100),
(2, 20, 100),
(3, 30, 100),
(4, 40, 100),
(5, 50, 100),
(6, 60, 100),
(7, 10, 101),
(8, 20, 101),
(9, 30, 101),
(10, 40, 101),
(11, 50, 101),
(12, 60, 101),
(13, 10, 102),
(14, 20, 102),
(15, 30, 102),
(16, 40, 102),
(17, 50, 102),
(18, 60, 102),
(19, 10, 103),
(20, 20, 103),
(21, 30, 103),
(22, 40, 103),
(23, 50, 103),
(24, 60, 103),
(25, 10, 104),
(26, 20, 104),
(27, 30, 104),
(28, 40, 104),
(29, 50, 104),
(30, 60, 104),
(31, 10, 105),
(32, 20, 105),
(33, 30, 105),
(34, 40, 105),
(35, 50, 105),
(36, 60, 105),
(37, 10, 106),
(38, 20, 106),
(39, 30, 106),
(40, 40, 106),
(41, 50, 106),
(42, 60, 106),
(43, 10, 107),
(44, 20, 107),
(45, 30, 107),
(46, 40, 107),
(47, 50, 107),
(48, 60, 107),
(49, 10, 108),
(50, 20, 108),
(51, 30, 108),
(52, 40, 108),
(53, 50, 108),
(54, 60, 108),
(55, 10, 109),
(56, 20, 109),
(57, 30, 109),
(58, 40, 109),
(59, 50, 109),
(60, 60, 109),
(61, 10, 110),
(62, 20, 110),
(63, 30, 110),
(64, 40, 110),
(65, 50, 110),
(66, 60, 110),
(67, 10, 111),
(68, 20, 111),
(69, 30, 111),
(70, 40, 111),
(71, 50, 111),
(72, 60, 111),
(73, 10, 112),
(74, 20, 112),
(75, 30, 112),
(76, 40, 112),
(77, 50, 112),
(78, 60, 112),
(79, 10, 113),
(80, 20, 113),
(81, 30, 113),
(82, 40, 113),
(83, 50, 113),
(84, 60, 113),
(85, 10, 114),
(86, 20, 114),
(87, 30, 114),
(88, 40, 114),
(89, 50, 114),
(90, 60, 114),
(91, 10, 115),
(92, 20, 115),
(93, 30, 115),
(94, 40, 115),
(95, 50, 115),
(96, 60, 115),
(97, 10, 116),
(98, 20, 116),
(99, 30, 116),
(100, 40, 116),
(101, 50, 116),
(102, 60, 116),
(103, 10, 117),
(104, 20, 117),
(105, 30, 117),
(106, 40, 117),
(107, 50, 117),
(108, 60, 117),
(109, 10, 118),
(110, 20, 118),
(111, 30, 118),
(112, 40, 118),
(113, 50, 118),
(114, 60, 118),
(115, 10, 119),
(116, 20, 119),
(117, 30, 119),
(118, 40, 119),
(119, 50, 119),
(120, 60, 119),
(121, 10, 120),
(122, 20, 120),
(123, 30, 120),
(124, 40, 120),
(125, 50, 120),
(126, 60, 120);

-- --------------------------------------------------------

--
-- Struttura della tabella `piatto_personalizzato`
--

CREATE TABLE `piatto_personalizzato` (
  `id_pp` int(11) NOT NULL,
  `cod_piatto` int(11) DEFAULT NULL,
  `cod_pers` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `prenotazione`
--

CREATE TABLE `prenotazione` (
  `id_prenotazione` int(11) NOT NULL,
  `data` date DEFAULT NULL,
  `orario` time DEFAULT NULL,
  `numero` int(11) DEFAULT NULL,
  `nome` varchar(100) DEFAULT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `cod_tavolo` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `tablet`
--

CREATE TABLE `tablet` (
  `id_tablet` int(11) NOT NULL,
  `stato` varchar(50) DEFAULT NULL,
  `codice_identificativo` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `tablet`
--

INSERT INTO `tablet` (`id_tablet`, `stato`, `codice_identificativo`) VALUES
(1, 'disponibile', 'T001'),
(2, 'disponibile', 'T002'),
(3, 'disponibile', 'T003'),
(4, 'disponibile', 'T004'),
(5, 'disponibile', 'T005'),
(6, 'disponibile', 'T006'),
(7, 'disponibile', 'T007'),
(8, 'disponibile', 'T008'),
(9, 'disponibile', 'T009'),
(10, 'disponibile', 'T010'),
(11, 'disponibile', 'T011'),
(12, 'disponibile', 'T012'),
(13, 'disponibile', 'T013'),
(14, 'disponibile', 'T014'),
(15, 'disponibile', 'T015'),
(16, 'disponibile', 'T016'),
(17, 'disponibile', 'T017'),
(18, 'disponibile', 'T018'),
(19, 'disponibile', 'T019'),
(20, 'disponibile', 'T020');

-- --------------------------------------------------------

--
-- Struttura della tabella `tavolata`
--

CREATE TABLE `tavolata` (
  `id_tavolata` int(11) NOT NULL,
  `numero_posti` int(11) DEFAULT NULL,
  `cod_tavolo` int(11) DEFAULT NULL,
  `cod_menu` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `tavolo`
--

CREATE TABLE `tavolo` (
  `id_tavolo` int(11) NOT NULL,
  `numero_tavolo` int(11) DEFAULT NULL,
  `posti` int(11) DEFAULT NULL,
  `stato` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `tavolo`
--

INSERT INTO `tavolo` (`id_tavolo`, `numero_tavolo`, `posti`, `stato`) VALUES
(1, 50, 2, NULL),
(2, 55, 2, NULL),
(3, 60, 2, NULL),
(4, 65, 2, NULL),
(5, 70, 2, NULL),
(6, 75, 5, NULL),
(7, 80, 5, NULL),
(8, 85, 5, NULL),
(9, 90, 5, NULL),
(10, 95, 5, NULL),
(11, 100, 10, NULL),
(12, 105, 10, NULL),
(13, 110, 10, NULL),
(14, 115, 10, NULL),
(15, 120, 10, NULL);

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `assegnazione_tablet`
--
ALTER TABLE `assegnazione_tablet`
  ADD PRIMARY KEY (`id_at`),
  ADD KEY `cod_tavolo` (`cod_tavolo`),
  ADD KEY `cod_tablet` (`cod_tablet`);

--
-- Indici per le tabelle `componenti`
--
ALTER TABLE `componenti`
  ADD PRIMARY KEY (`id_componente`);

--
-- Indici per le tabelle `menu`
--
ALTER TABLE `menu`
  ADD PRIMARY KEY (`id_menu`);

--
-- Indici per le tabelle `ordine`
--
ALTER TABLE `ordine`
  ADD PRIMARY KEY (`id_ordine`),
  ADD KEY `fk_cod_tavolata` (`cod_tavolata`);

--
-- Indici per le tabelle `ordine_personalizzato`
--
ALTER TABLE `ordine_personalizzato`
  ADD PRIMARY KEY (`id_op`),
  ADD KEY `cod_ordine` (`cod_ordine`),
  ADD KEY `cod_pp` (`cod_pp`);

--
-- Indici per le tabelle `pagamento`
--
ALTER TABLE `pagamento`
  ADD PRIMARY KEY (`id_pagamento`);

--
-- Indici per le tabelle `personalizzazioni`
--
ALTER TABLE `personalizzazioni`
  ADD PRIMARY KEY (`id_personalizzazione`),
  ADD KEY `fk_cod_comp` (`cod_comp`);

--
-- Indici per le tabelle `piatto`
--
ALTER TABLE `piatto`
  ADD PRIMARY KEY (`id_piatto`);

--
-- Indici per le tabelle `piatto_componenti`
--
ALTER TABLE `piatto_componenti`
  ADD PRIMARY KEY (`id_pc`),
  ADD KEY `cod_p` (`cod_p`),
  ADD KEY `id_c` (`id_c`);

--
-- Indici per le tabelle `piatto_menu`
--
ALTER TABLE `piatto_menu`
  ADD PRIMARY KEY (`id_pm`),
  ADD KEY `cod_menu` (`cod_menu`),
  ADD KEY `cod_p` (`cod_p`);

--
-- Indici per le tabelle `piatto_personalizzato`
--
ALTER TABLE `piatto_personalizzato`
  ADD PRIMARY KEY (`id_pp`),
  ADD KEY `cod_piatto` (`cod_piatto`),
  ADD KEY `cod_pers` (`cod_pers`);

--
-- Indici per le tabelle `prenotazione`
--
ALTER TABLE `prenotazione`
  ADD PRIMARY KEY (`id_prenotazione`),
  ADD KEY `fk_cod_tavolo` (`cod_tavolo`);

--
-- Indici per le tabelle `tablet`
--
ALTER TABLE `tablet`
  ADD PRIMARY KEY (`id_tablet`);

--
-- Indici per le tabelle `tavolata`
--
ALTER TABLE `tavolata`
  ADD PRIMARY KEY (`id_tavolata`),
  ADD UNIQUE KEY `id_tavolata` (`id_tavolata`),
  ADD KEY `cod_tavolo` (`cod_tavolo`),
  ADD KEY `cod_menu` (`cod_menu`);

--
-- Indici per le tabelle `tavolo`
--
ALTER TABLE `tavolo`
  ADD PRIMARY KEY (`id_tavolo`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `assegnazione_tablet`
--
ALTER TABLE `assegnazione_tablet`
  MODIFY `id_at` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `ordine_personalizzato`
--
ALTER TABLE `ordine_personalizzato`
  MODIFY `id_op` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `piatto_componenti`
--
ALTER TABLE `piatto_componenti`
  MODIFY `id_pc` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=218;

--
-- AUTO_INCREMENT per la tabella `piatto_menu`
--
ALTER TABLE `piatto_menu`
  MODIFY `id_pm` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=127;

--
-- AUTO_INCREMENT per la tabella `piatto_personalizzato`
--
ALTER TABLE `piatto_personalizzato`
  MODIFY `id_pp` int(11) NOT NULL AUTO_INCREMENT;

--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `assegnazione_tablet`
--
ALTER TABLE `assegnazione_tablet`
  ADD CONSTRAINT `assegnazione_tablet_ibfk_1` FOREIGN KEY (`cod_tavolo`) REFERENCES `tavolo` (`id_tavolo`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `assegnazione_tablet_ibfk_2` FOREIGN KEY (`cod_tablet`) REFERENCES `tablet` (`id_tablet`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limiti per la tabella `ordine`
--
ALTER TABLE `ordine`
  ADD CONSTRAINT `fk_cod_tavolata` FOREIGN KEY (`cod_tavolata`) REFERENCES `tavolata` (`id_tavolata`);

--
-- Limiti per la tabella `ordine_personalizzato`
--
ALTER TABLE `ordine_personalizzato`
  ADD CONSTRAINT `ordine_personalizzato_ibfk_1` FOREIGN KEY (`cod_ordine`) REFERENCES `ordine` (`id_ordine`),
  ADD CONSTRAINT `ordine_personalizzato_ibfk_2` FOREIGN KEY (`cod_pp`) REFERENCES `piatto_personalizzato` (`id_pp`);

--
-- Limiti per la tabella `personalizzazioni`
--
ALTER TABLE `personalizzazioni`
  ADD CONSTRAINT `fk_cod_comp` FOREIGN KEY (`cod_comp`) REFERENCES `componenti` (`id_componente`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limiti per la tabella `piatto_componenti`
--
ALTER TABLE `piatto_componenti`
  ADD CONSTRAINT `piatto_componenti_ibfk_1` FOREIGN KEY (`cod_p`) REFERENCES `piatto` (`id_piatto`),
  ADD CONSTRAINT `piatto_componenti_ibfk_2` FOREIGN KEY (`id_c`) REFERENCES `componenti` (`id_componente`);

--
-- Limiti per la tabella `piatto_menu`
--
ALTER TABLE `piatto_menu`
  ADD CONSTRAINT `piatto_menu_ibfk_1` FOREIGN KEY (`cod_menu`) REFERENCES `menu` (`id_menu`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `piatto_menu_ibfk_2` FOREIGN KEY (`cod_p`) REFERENCES `piatto` (`id_piatto`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limiti per la tabella `piatto_personalizzato`
--
ALTER TABLE `piatto_personalizzato`
  ADD CONSTRAINT `piatto_personalizzato_ibfk_1` FOREIGN KEY (`cod_piatto`) REFERENCES `piatto` (`id_piatto`),
  ADD CONSTRAINT `piatto_personalizzato_ibfk_2` FOREIGN KEY (`cod_pers`) REFERENCES `personalizzazioni` (`id_personalizzazione`);

--
-- Limiti per la tabella `prenotazione`
--
ALTER TABLE `prenotazione`
  ADD CONSTRAINT `fk_cod_tavolo` FOREIGN KEY (`cod_tavolo`) REFERENCES `tavolo` (`id_tavolo`);

--
-- Limiti per la tabella `tavolata`
--
ALTER TABLE `tavolata`
  ADD CONSTRAINT `tavolata_ibfk_1` FOREIGN KEY (`cod_tavolo`) REFERENCES `tavolo` (`id_tavolo`),
  ADD CONSTRAINT `tavolata_ibfk_2` FOREIGN KEY (`cod_menu`) REFERENCES `menu` (`id_menu`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
