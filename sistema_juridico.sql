-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: 11-Out-2019 às 17:28
-- Versão do servidor: 5.7.19
-- PHP Version: 5.6.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sistema_juridico`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `adversos`
--

DROP TABLE IF EXISTS `adversos`;
CREATE TABLE IF NOT EXISTS `adversos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(150) NOT NULL,
  `cpf_cnpj` varchar(25) NOT NULL,
  `rua` varchar(150) NOT NULL,
  `bairro` varchar(150) DEFAULT NULL,
  `numero` varchar(50) NOT NULL,
  `cidade` varchar(50) NOT NULL,
  `estado` varchar(50) NOT NULL,
  `cep` varchar(20) DEFAULT NULL,
  `tel` varchar(20) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `advogado` varchar(150) DEFAULT NULL,
  `contato` varchar(150) DEFAULT NULL,
  `tipo` tinyint(1) NOT NULL DEFAULT '1' COMMENT '1= PF, 2=PJ',
  `deletado` tinyint(1) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `adversos`
--

INSERT INTO `adversos` (`id`, `nome`, `cpf_cnpj`, `rua`, `bairro`, `numero`, `cidade`, `estado`, `cep`, `tel`, `email`, `advogado`, `contato`, `tipo`, `deletado`, `data_cadastro`) VALUES
(1, 'job segurança e vigilância patrimonial ltda', '08938288000151', 'Rua Santos Dumont', 'São Geraldo', '1908', 'Porto Alegre', 'RS', '90230-240', '', '', '', '', 1, 0, '2019-02-13 18:22:13'),
(2, 'estado do rio grande do sul - centro administrativo fernando ferrari/caff', '87934675000196', 'Avenida Borges de Medeiros', 'Praia de Belas', '1501', 'Porto Alegre', 'RS', '90119-900', '', '', '', '', 1, 0, '2019-02-13 18:24:49'),
(3, 'Proservi serviços de vigilância ltda.', '89108054000189', 'Avenida Antunes Ribas', 'Jardim Itu', '291', 'Porto Alegre', 'RS', '91380-320', '', '', '', '', 1, 0, '2019-02-14 16:17:55'),
(12, 'forjas taurus sa ', '9278133500374', 'Rua Amadeo Rossi', 'Morro do Espelho', '143', 'São Leopoldo', 'RS', '93030-220', '', '', '', '', 1, 0, '2019-03-29 19:03:00'),
(13, 'ctte segurança serviços eireli ', '17446744000137', 'Rua Santos Pedroso', 'Navegantes', '163', 'Porto Alegre', 'RS', '90240-180', '', '', '', '', 1, 0, '2019-03-29 19:59:44');

-- --------------------------------------------------------

--
-- Estrutura da tabela `advogados`
--

DROP TABLE IF EXISTS `advogados`;
CREATE TABLE IF NOT EXISTS `advogados` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `oab` varchar(20) NOT NULL,
  `nome` varchar(150) NOT NULL,
  `cpf` varchar(11) NOT NULL,
  `rg` varchar(18) NOT NULL,
  `celular` varchar(50) NOT NULL,
  `deletado` tinyint(1) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `advogados`
--

INSERT INTO `advogados` (`id`, `oab`, `nome`, `cpf`, `rg`, `celular`, `deletado`, `data_cadastro`) VALUES
(1, '45412', 'Jeverton Alex de Oliveira Lima', '98765432101', '987654321012345678', '5199999999', 0, '2018-05-28 18:59:40'),
(2, '029160', 'Paulo Cezar Lauxen', '98765432101', '987654321012345678', '5199999999', 0, '2018-05-28 18:59:40');

-- --------------------------------------------------------

--
-- Estrutura da tabela `andamentos_processo`
--

DROP TABLE IF EXISTS `andamentos_processo`;
CREATE TABLE IF NOT EXISTS `andamentos_processo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_processo` int(11) NOT NULL,
  `id_recurso` int(11) DEFAULT '0',
  `id_apenso` int(11) DEFAULT '0',
  `id_usuario` int(11) NOT NULL,
  `descricao` text NOT NULL,
  `data` date NOT NULL,
  `tipo` smallint(6) NOT NULL DEFAULT '0' COMMENT '0 - Juridico, 1 - Administrativo, 2 - Extra Especial',
  `deletado` tinyint(4) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_processo` (`id_processo`),
  KEY `id_usuario` (`id_usuario`)
) ENGINE=MyISAM AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `andamentos_processo`
--

INSERT INTO `andamentos_processo` (`id`, `id_processo`, `id_recurso`, `id_apenso`, `id_usuario`, `descricao`, `data`, `tipo`, `deletado`, `data_cadastro`) VALUES
(12, 4, 0, 0, 1, 'financeiro', '2019-02-14', 0, 0, '2019-02-14 23:52:57'),
(2, 1, 0, 0, 1, 'Inicial distribuída pelo setor do fabio em 13/02/2019. Verbas rescisórias e demais pedidos.', '2019-02-13', 0, 0, '2019-02-13 18:36:31'),
(4, 1, 0, 0, 1, 'distribuído por dependência ao processo nº 0021245-89.2018.5.04.0005.', '2019-02-13', 0, 0, '2019-02-13 19:04:43'),
(6, 1, 0, 0, 1, 'Aguarda data da audiência.', '2019-02-13', 0, 0, '2019-02-13 19:14:01'),
(11, 4, 0, 0, 1, 'teste andamento', '2019-02-14', 0, 0, '2019-02-14 23:50:04'),
(13, 4, 0, 0, 1, 'teste financeiro', '2019-02-14', 2, 0, '2019-02-15 01:38:37');

-- --------------------------------------------------------

--
-- Estrutura da tabela `apenso`
--

DROP TABLE IF EXISTS `apenso`;
CREATE TABLE IF NOT EXISTS `apenso` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_usuario` int(11) NOT NULL,
  `id_processo` int(11) DEFAULT NULL,
  `id_advogado` int(11) DEFAULT NULL,
  `id_tipo_causa_apenso` int(11) DEFAULT NULL,
  `id_posicao_apenso` int(11) DEFAULT NULL,
  `id_comarca` int(11) DEFAULT NULL,
  `id_vara` int(11) DEFAULT NULL,
  `id_foro` int(11) DEFAULT NULL,
  `id_situacao_apenso` int(11) DEFAULT NULL,
  `numero` varchar(50) NOT NULL,
  `valor_causa` double DEFAULT NULL,
  `distribuicao` date DEFAULT NULL,
  `citacao` date DEFAULT NULL,
  `sentenca` date DEFAULT NULL,
  `deletado` tinyint(4) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `apenso`
--

INSERT INTO `apenso` (`id`, `id_usuario`, `id_processo`, `id_advogado`, `id_tipo_causa_apenso`, `id_posicao_apenso`, `id_comarca`, `id_vara`, `id_foro`, `id_situacao_apenso`, `numero`, `valor_causa`, `distribuicao`, `citacao`, `sentenca`, `deletado`, `data_cadastro`) VALUES
(1, 1, 24, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '21321', NULL, NULL, NULL, NULL, 0, '2019-10-11 16:46:02');

-- --------------------------------------------------------

--
-- Estrutura da tabela `assunto_processo`
--

DROP TABLE IF EXISTS `assunto_processo`;
CREATE TABLE IF NOT EXISTS `assunto_processo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descricao` varchar(150) NOT NULL,
  `deletado` tinyint(4) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `assunto_processo`
--

INSERT INTO `assunto_processo` (`id`, `descricao`, `deletado`, `data_cadastro`) VALUES
(1, '---------------', 0, '2018-05-29 17:07:40'),
(2, 'Normal', 0, '2018-05-29 17:07:40'),
(3, 'Diversos', 0, '2018-05-29 17:07:40'),
(4, 'Abalo de Crédito - SPC e Serasa', 0, '2018-05-29 17:07:40'),
(5, 'Abertura de Sucessão - Inventário', 0, '2018-05-29 17:07:40'),
(6, 'Abono - Férias', 0, '2018-05-29 17:07:40'),
(7, 'Abono de Faltas', 0, '2018-05-29 17:07:40'),
(8, 'Abono Família', 0, '2018-05-29 17:07:40'),
(9, 'Abono Natal', 0, '2018-05-29 17:07:40'),
(10, 'Abono Permanência', 0, '2018-05-29 17:07:40');

-- --------------------------------------------------------

--
-- Estrutura da tabela `busca_area`
--

DROP TABLE IF EXISTS `busca_area`;
CREATE TABLE IF NOT EXISTS `busca_area` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(150) NOT NULL,
  `descricao` text NOT NULL,
  `antes` text NOT NULL,
  `depois` text NOT NULL,
  `icone` varchar(50) NOT NULL,
  `cor` varchar(50) NOT NULL,
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `calculo_processo_financeiro`
--

DROP TABLE IF EXISTS `calculo_processo_financeiro`;
CREATE TABLE IF NOT EXISTS `calculo_processo_financeiro` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_processo` int(11) NOT NULL,
  `data_sentenca_acordo` date NOT NULL,
  `porc_honorario_escritorio` double NOT NULL,
  `porc_honorario_perito` double NOT NULL DEFAULT '0',
  `porc_imposto_renda` double NOT NULL DEFAULT '0',
  `deletado` tinyint(4) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_processo` (`id_processo`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `calculo_processo_financeiro`
--

INSERT INTO `calculo_processo_financeiro` (`id`, `id_processo`, `data_sentenca_acordo`, `porc_honorario_escritorio`, `porc_honorario_perito`, `porc_imposto_renda`, `deletado`, `data_cadastro`) VALUES
(1, 24, '2019-10-01', 7, 7, 7, 0, '2019-10-08 22:13:30');

-- --------------------------------------------------------

--
-- Estrutura da tabela `captacao_processo`
--

DROP TABLE IF EXISTS `captacao_processo`;
CREATE TABLE IF NOT EXISTS `captacao_processo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_processo` int(11) NOT NULL,
  `id_captador` int(11) NOT NULL,
  `id_origem` int(11) NOT NULL,
  `observacoes` text NOT NULL,
  `data` date NOT NULL,
  `deletado` tinyint(4) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `captacao_processo`
--

INSERT INTO `captacao_processo` (`id`, `id_processo`, `id_captador`, `id_origem`, `observacoes`, `data`, `deletado`, `data_cadastro`) VALUES
(1, 1, 2, 1, 'qqqqqq', '1918-10-23', 0, '2018-10-23 18:42:56'),
(2, 2, 1, 2, '', '2018-09-03', 0, '2018-10-23 20:14:33');

-- --------------------------------------------------------

--
-- Estrutura da tabela `captador_processo`
--

DROP TABLE IF EXISTS `captador_processo`;
CREATE TABLE IF NOT EXISTS `captador_processo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descricao` varchar(150) NOT NULL,
  `deletado` tinyint(1) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `captador_processo`
--

INSERT INTO `captador_processo` (`id`, `descricao`, `deletado`, `data_cadastro`) VALUES
(1, 'Airton Forbrig', 0, '2018-05-29 17:05:28'),
(2, 'Alexandre Sato/ Karin', 0, '2018-05-29 17:05:44'),
(3, 'Aline Aurélio Curcio', 0, '2018-05-29 17:05:44');

-- --------------------------------------------------------

--
-- Estrutura da tabela `categoria_processo`
--

DROP TABLE IF EXISTS `categoria_processo`;
CREATE TABLE IF NOT EXISTS `categoria_processo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descricao` varchar(150) NOT NULL,
  `deletado` tinyint(1) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `categoria_processo`
--

INSERT INTO `categoria_processo` (`id`, `descricao`, `deletado`, `data_cadastro`) VALUES
(1, '------------', 0, '2018-05-29 17:07:52');

-- --------------------------------------------------------

--
-- Estrutura da tabela `chats_grupo`
--

DROP TABLE IF EXISTS `chats_grupo`;
CREATE TABLE IF NOT EXISTS `chats_grupo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_setor` int(11) NOT NULL DEFAULT '0',
  `nome` varchar(150) NOT NULL,
  `imagem` varchar(150) DEFAULT NULL,
  `tipo` int(11) NOT NULL DEFAULT '1' COMMENT '1 = Grupo, 2 = Privado',
  `deletado` tinyint(1) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_setor` (`id_setor`)
) ENGINE=MyISAM AUTO_INCREMENT=23 DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `chats_grupo`
--

INSERT INTO `chats_grupo` (`id`, `id_setor`, `nome`, `imagem`, `tipo`, `deletado`, `data_cadastro`) VALUES
(1, 4, 'PÚBLICO ESTADUAL POA', NULL, 1, 0, '2019-02-27 00:45:58'),
(2, 5, 'TRABALHISTA POA', NULL, 1, 0, '2019-02-27 00:46:30'),
(3, 6, 'PÚBLICO FEDERAL POA', NULL, 1, 0, '2019-02-27 00:46:44');

-- --------------------------------------------------------

--
-- Estrutura da tabela `chats_mensagens`
--

DROP TABLE IF EXISTS `chats_mensagens`;
CREATE TABLE IF NOT EXISTS `chats_mensagens` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_usuario` int(11) NOT NULL,
  `id_usuario_enviado` int(11) DEFAULT '0',
  `id_chat_grupo` int(11) DEFAULT '0',
  `texto` text NOT NULL,
  `deletado` tinyint(1) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `chats_mensagens_novidades`
--

DROP TABLE IF EXISTS `chats_mensagens_novidades`;
CREATE TABLE IF NOT EXISTS `chats_mensagens_novidades` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_usuario` int(11) NOT NULL,
  `id_usuario_enviado` int(11) NOT NULL,
  `id_chat_grupo` int(11) DEFAULT '0',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=26 DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `chats_mensagens_novidades`
--

INSERT INTO `chats_mensagens_novidades` (`id`, `id_usuario`, `id_usuario_enviado`, `id_chat_grupo`, `data_cadastro`) VALUES
(1, 1, 0, 2, '2019-02-28 01:01:45'),
(2, 1, 0, 3, '2019-02-28 01:01:48'),
(3, 1, 0, 1, '2019-02-28 01:01:49'),
(4, 1, 0, 3, '2019-02-28 13:31:12'),
(5, 1, 35, 0, '2019-02-28 13:40:42'),
(6, 1, 37, 0, '2019-02-28 13:40:46'),
(7, 1, 0, 2, '2019-02-28 18:17:48'),
(8, 1, 0, 3, '2019-02-28 18:17:54'),
(9, 1, 0, 1, '2019-02-28 18:17:56'),
(10, 1, 42, 0, '2019-02-28 18:17:59'),
(11, 1, 0, 2, '2019-02-28 18:18:02'),
(12, 1, 0, 3, '2019-02-28 18:18:04'),
(13, 1, 0, 1, '2019-02-28 18:18:06'),
(14, 1, 42, 0, '2019-02-28 18:18:07'),
(15, 1, 0, 2, '2019-03-05 20:19:19'),
(16, 1, 0, 2, '2019-06-07 03:19:38'),
(17, 1, 0, 3, '2019-06-07 03:19:40'),
(18, 1, 0, 1, '2019-06-07 03:19:41'),
(19, 1, 19, 0, '2019-06-07 03:19:45'),
(20, 1, 20, 0, '2019-06-07 03:19:46'),
(21, 1, 21, 0, '2019-06-07 03:19:47'),
(22, 1, 2, 0, '2019-06-07 03:19:51'),
(23, 1, 3, 0, '2019-06-07 03:19:52'),
(24, 1, 4, 0, '2019-06-07 03:19:53'),
(25, 1, 5, 0, '2019-06-07 03:19:54');

-- --------------------------------------------------------

--
-- Estrutura da tabela `chats_participantes_grupo`
--

DROP TABLE IF EXISTS `chats_participantes_grupo`;
CREATE TABLE IF NOT EXISTS `chats_participantes_grupo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_chat_grupo` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `deletado` tinyint(4) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_chat` (`id_chat_grupo`),
  KEY `id_usuario` (`id_usuario`)
) ENGINE=MyISAM AUTO_INCREMENT=34 DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `chats_participantes_grupo`
--

INSERT INTO `chats_participantes_grupo` (`id`, `id_chat_grupo`, `id_usuario`, `deletado`, `data_cadastro`) VALUES
(1, 1, 10, 0, '2019-02-28 00:59:42'),
(2, 1, 11, 0, '2019-02-28 00:59:42'),
(3, 1, 12, 0, '2019-02-28 00:59:42'),
(4, 1, 13, 0, '2019-02-28 00:59:42'),
(5, 1, 14, 0, '2019-02-28 00:59:42'),
(6, 1, 15, 0, '2019-02-28 00:59:42'),
(7, 1, 16, 0, '2019-02-28 00:59:42'),
(8, 1, 17, 0, '2019-02-28 00:59:42'),
(9, 1, 18, 0, '2019-02-28 00:59:42'),
(10, 1, 19, 0, '2019-02-28 00:59:42'),
(11, 1, 20, 0, '2019-02-28 00:59:43'),
(12, 1, 21, 0, '2019-02-28 00:59:43'),
(13, 1, 22, 0, '2019-02-28 00:59:43'),
(14, 1, 23, 0, '2019-02-28 00:59:43'),
(15, 1, 24, 0, '2019-02-28 00:59:43'),
(16, 1, 25, 0, '2019-02-28 00:59:43'),
(17, 1, 26, 0, '2019-02-28 00:59:43'),
(18, 1, 27, 0, '2019-02-28 00:59:43'),
(19, 1, 28, 0, '2019-02-28 00:59:43'),
(20, 1, 29, 0, '2019-02-28 00:59:43'),
(21, 1, 30, 0, '2019-02-28 00:59:43'),
(22, 1, 31, 0, '2019-02-28 00:59:43'),
(23, 2, 32, 0, '2019-02-28 00:59:43'),
(24, 2, 33, 0, '2019-02-28 01:01:32'),
(25, 2, 34, 0, '2019-02-28 01:01:32'),
(26, 2, 35, 0, '2019-02-28 01:01:32'),
(27, 2, 36, 0, '2019-02-28 01:01:32'),
(28, 2, 37, 0, '2019-02-28 01:01:33'),
(29, 2, 38, 0, '2019-02-28 01:01:33'),
(30, 2, 39, 0, '2019-02-28 01:01:33'),
(31, 3, 40, 0, '2019-02-28 01:01:33'),
(32, 3, 41, 0, '2019-02-28 01:01:33'),
(33, 3, 42, 0, '2019-02-28 01:01:33');

-- --------------------------------------------------------

--
-- Estrutura da tabela `clientes`
--

DROP TABLE IF EXISTS `clientes`;
CREATE TABLE IF NOT EXISTS `clientes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_grupo` int(11) NOT NULL DEFAULT '0',
  `nome` varchar(150) NOT NULL,
  `tipo_cliente` tinyint(1) NOT NULL DEFAULT '0',
  `perfil` varchar(150) DEFAULT NULL,
  `observacoes` varchar(150) DEFAULT NULL,
  `rua` varchar(150) NOT NULL,
  `bairro` varchar(150) DEFAULT NULL,
  `numero` varchar(50) NOT NULL,
  `cidade` varchar(50) NOT NULL,
  `estado` varchar(10) NOT NULL,
  `cep` varchar(16) DEFAULT NULL,
  `cpf_cnpj` varchar(18) NOT NULL,
  `rg` varchar(18) DEFAULT NULL,
  `ctps` varchar(150) DEFAULT NULL,
  `serie` varchar(50) DEFAULT NULL,
  `n_pis` varchar(50) DEFAULT NULL,
  `n_beneficio` varchar(50) DEFAULT NULL,
  `estado_civil` tinyint(1) DEFAULT '1' COMMENT '1=Solteiro,2=Casado,3=Separado,4=Divorciado,5=Viuvo',
  `nascimento` date DEFAULT NULL,
  `profissao` varchar(50) DEFAULT NULL,
  `tel_pessoal` varchar(50) DEFAULT NULL,
  `tel_trabalho` varchar(50) DEFAULT NULL,
  `tel_contato` varchar(50) DEFAULT NULL,
  `tel_outro` varchar(45) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `inscricao_estadual` varchar(50) DEFAULT NULL,
  `banco` varchar(18) DEFAULT NULL,
  `agencia` varchar(12) DEFAULT NULL,
  `n_conta_corrente` varchar(12) DEFAULT NULL,
  `atualizacao` varchar(50) DEFAULT NULL,
  `tipo` tinyint(1) NOT NULL COMMENT '1 = PJ, 2 = PF',
  `deletado` tinyint(1) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `clientes`
--

INSERT INTO `clientes` (`id`, `id_grupo`, `nome`, `tipo_cliente`, `perfil`, `observacoes`, `rua`, `bairro`, `numero`, `cidade`, `estado`, `cep`, `cpf_cnpj`, `rg`, `ctps`, `serie`, `n_pis`, `n_beneficio`, `estado_civil`, `nascimento`, `profissao`, `tel_pessoal`, `tel_trabalho`, `tel_contato`, `tel_outro`, `email`, `inscricao_estadual`, `banco`, `agencia`, `n_conta_corrente`, `atualizacao`, `tipo`, `deletado`, `data_cadastro`) VALUES
(1, 0, 'Sueli inácio de menezes', 0, '', '', 'Avenida Fortaleza', 'Santa Rita', '226', 'Guaíba', 'RS', '92708-165', '49294890082', '4039118825', '34334', '00017/rs', '12250100162', '', 1, '1964-06-05', 'Vigilante', '(51) 98541-2358', '', '', '', 'teste@teste.com.br', '', '', '', '', NULL, 2, 0, '2019-02-13 18:22:13'),
(2, 1, 'Sindicato dos vigilantes do rs  -sindivigilantes', 0, NULL, '', 'Rua Voluntários da Pátria', 'Centro Histórico', '595', 'Porto Alegre', 'RS', '90039-900', '91343293000165', '', '', '', '', '', 1, NULL, '', '', '', '', '', '', '', '', '', '', NULL, 1, 0, '2019-02-14 16:17:55'),
(11, 1, 'LUIS EMILIO RODRIGUES CARVALHO', 0, NULL, 'tELEFONE CONTATO COM ANDRESSA', 'Rua Santa Flora', 'Lomba do Pinheiro', '137', 'Porto Alegre', 'RS', '91570-600', '96165642004', '3065758835', '', '', '', '', 1, NULL, '', '(51) 98144-2453', '', '(51) 98196-8076', '', '', '', '', '', '', NULL, 2, 0, '2019-02-28 17:37:51'),
(12, 1, 'rita de cassia conceição figueira ', 0, NULL, '', 'Rua Monte Sul ', 'pascoaline', '54', 'Sapucaia do Sul', 'RS', '93220-260', '62720503053', '8059752488', '090330', '00004', '12480182235', '', 1, '1974-10-11', 'Vigilante', '(51) 99932-7278', '', '', '(51) 99256-6365', '', '', 'Caixa', '0449', '000553002-6', NULL, 2, 0, '2019-03-29 17:55:04'),
(13, 1, 'joão carlos borba dos santos', 0, NULL, '', '1 ', 'Pedras brancas', '1133', 'guaíba', 'RS', '96180-000', '65417356034', '3042963508', '0490754', '003-0', '1076470989-2', '', 1, '1961-01-25', 'Vigilante', '(51) 99690-5323', '', '(51) 99693-8611', '', '', '', 'caixa', '', '', NULL, 2, 0, '2019-03-29 18:22:39'),
(14, 1, 'Sônia maria silveira ', 0, NULL, '', 'Rua Oscar Balduíno Petry', 'monte blanco', '52', 'São Leopoldo', 'RS', '93035-505', '00474411001', '6070116865', '4763192', '003-0', '1283645369-0', '', 1, '1977-05-06', 'inspetora de qualidade ', '(51) 99267-9062', '', '', '', '', '', '', '', '', NULL, 2, 0, '2019-03-29 19:03:00'),
(15, 1, 'Jair flores ', 0, NULL, '', 'Rua Antônio Vivaldi', 'São Lucas', '1064', 'Viamão', 'RS', '94450-270', '55400337015', '1052843709', '044064', '00024-rs', '12321129958', '', 1, '1968-10-15', 'Vigilante', '', '', '', '', '', '', '', '', '', NULL, 2, 0, '2019-03-29 19:16:11'),
(16, 1, 'emerson ribeiro nunes', 0, NULL, 'este é só um teste de observação\r\nESTE É SÓ UM TESTE DE OBSERVAÇÃO\r\nESTE É SÓ UM TESTE DE OBSERVAÇÃO\r\nESTE É SÓ UM TESTE DE OBSERVAÇÃO\r\nESTE É SÓ UM T', 'Rua da escadinha ', 'cascata ', '127', 'Porto Alegre', 'RS', '91712-020', '01448920060', '4086483759', '3901726', '003-0', '2039315808-4', '', 1, '1992-11-20', 'Vigilante', '(51) 98029-0450', '', '', '', '', '', '', '', '', NULL, 2, 0, '2019-03-29 19:27:53'),
(17, 1, 'gilmar rodrigues guimarães ', 0, NULL, '', 'Rua Carmelita Grippi', 'parque dos maias ', '255/404', 'Porto Alegre', 'RS', '91170-070', '38896117020', '7019536676', '80079', '542', '1088185038', '', 1, '1962-12-14', 'Vigilante', '(51) 98409-7785', '', '', '', '', '', 'banco do brasil ', '32409', '270733', NULL, 2, 0, '2019-03-29 19:38:48'),
(18, 1, 'josimar guedes ', 0, NULL, '', 'Rua Laura Terezinha Walther da Rocha', 'Canudos', '41', 'Novo Hamburgo', 'RS', '93542-378', '02809304025', '3079090506', '5143083', '002-0', '130669', '', 1, '1992-08-18', 'Vigilante', '(51) 99393-6845', '', '', '', '', '', '', '', '', NULL, 2, 0, '2019-03-29 19:59:44'),
(19, 1, 'luis da silveira', 0, NULL, '', 'av. eduardo las casas ', 'Parque Santa Fé', '790/414', 'Porto Alegre', 'RS', '91180-205', '65858476015', '3057793774', '4904615', '002-0', '1230453492-0', '', 1, '1973-01-30', 'Vigilante', '(51) 99297-4722', '', '', '', '', '', '', '', '', NULL, 2, 0, '2019-03-29 20:15:35'),
(20, 1, 'Vladimir meneses leal ', 0, NULL, '', 'Rua F', 'Bom Jesus', '45', 'Porto Alegre', 'RS', '91420-721', '00941339050', '1086816641', '3124747', '001-0', '12846916677', '', 1, '1986-01-01', 'Vigilante', '', '', '', '', '', '', '', '', '', NULL, 2, 0, '2019-03-29 20:27:43');

-- --------------------------------------------------------

--
-- Estrutura da tabela `comarca`
--

DROP TABLE IF EXISTS `comarca`;
CREATE TABLE IF NOT EXISTS `comarca` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descricao` varchar(150) NOT NULL,
  `deletado` tinyint(1) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `comarca`
--

INSERT INTO `comarca` (`id`, `descricao`, `deletado`, `data_cadastro`) VALUES
(1, 'Novo Hamburgo', 0, '2018-05-29 17:05:28'),
(2, 'São Leopoldo', 0, '2018-05-29 17:05:44');

-- --------------------------------------------------------

--
-- Estrutura da tabela `compromissos`
--

DROP TABLE IF EXISTS `compromissos`;
CREATE TABLE IF NOT EXISTS `compromissos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_usuario` int(11) NOT NULL,
  `id_processo` int(11) NOT NULL,
  `id_recurso` int(11) DEFAULT '0',
  `id_apenso` int(11) DEFAULT '0',
  `id_advogado_setor` int(11) NOT NULL,
  `id_advogado_compromisso` int(11) NOT NULL,
  `tipo_compromisso` int(11) NOT NULL DEFAULT '0' COMMENT '0 - Pauta de Compromissos, 1 - Controle de Distribuição, 2 - Pauta de Julgamento',
  `tipo` int(11) NOT NULL DEFAULT '0' COMMENT '0 = acordao/setenca, 1 = desapacho/decisoes, 2 = peticoes diversas, 3 = quesitos, 4 = manif de docs, 5 = prazos processos fisicos, 6 = perito',
  `nome` varchar(150) DEFAULT NULL,
  `data_inicial` datetime NOT NULL,
  `data_final` datetime NOT NULL,
  `local` text,
  `complemento` text,
  `deletado` tinyint(1) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=32 DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `compromissos`
--

INSERT INTO `compromissos` (`id`, `id_usuario`, `id_processo`, `id_recurso`, `id_apenso`, `id_advogado_setor`, `id_advogado_compromisso`, `tipo_compromisso`, `tipo`, `nome`, `data_inicial`, `data_final`, `local`, `complemento`, `deletado`, `data_cadastro`) VALUES
(1, 6, 1, 0, 0, 6, 9, 0, 0, '', '2019-02-21 15:20:00', '0000-00-00 00:00:00', '20ª vara do trabalho poa', '', 1, '2019-02-13 19:28:08'),
(2, 6, 1, 0, 0, 6, 9, 0, 2, 'técnica', '2019-02-19 13:44:00', '2019-02-19 15:29:00', 'porto alegre', '', 0, '2019-02-13 19:44:43'),
(3, 6, 1, 0, 0, 9, 9, 1, 0, 'Acórdão', '2019-02-13 09:00:00', '2019-02-19 00:00:00', '', 'IR NA PRAÇA PEGAR OS ITENS', 0, '2019-02-13 19:59:40'),
(4, 1, 4, 0, 0, 6, 6, 0, 0, 'teste', '2019-02-15 21:50:00', '2019-02-16 21:50:00', '', '', 1, '2019-02-14 23:50:56'),
(8, 1, 1, 0, 0, 9, 9, 1, 0, 'teste', '2019-02-15 11:00:00', '2019-02-13 00:00:00', '', '', 1, '2019-02-15 13:51:53'),
(9, 9, 12, 0, 0, 9, 9, 1, 3, 'X', '2019-02-28 00:00:00', '2019-03-07 00:00:00', '', '', 0, '2019-02-28 17:53:13'),
(10, 9, 0, 0, 0, 0, 0, 0, 0, 'a', '2019-03-21 14:00:00', '2019-03-21 14:11:00', 'vARA', '', 0, '2019-02-28 17:56:42'),
(11, 1, 12, 0, 0, 9, 9, 0, 0, '', '2019-03-14 00:00:00', '2019-03-14 00:00:00', '', '', 1, '2019-03-04 02:39:02'),
(12, 1, 0, 0, 0, 0, 0, 1, 0, '', '2019-03-04 00:00:00', '0000-00-00 00:00:00', '', '', 1, '2019-03-04 14:35:02'),
(13, 6, 13, 0, 0, 36, 36, 0, 0, 'Inicial ', '2019-04-09 08:25:00', '0000-00-00 00:00:00', '29° Vara do trabalho de porto alegre ', '', 0, '2019-03-29 18:05:00'),
(14, 6, 14, 0, 0, 36, 36, 0, 0, 'inicial ', '2019-04-16 08:55:00', '0000-00-00 00:00:00', '6° vara do trabalho de porto alegre ', '', 0, '2019-03-29 18:33:01'),
(15, 6, 15, 0, 0, 36, 36, 0, 0, 'Inicial ', '2019-05-06 14:20:00', '0000-00-00 00:00:00', '1° vara do trabalho de são leopoldo', '', 0, '2019-03-29 19:05:37'),
(16, 6, 16, 0, 0, 36, 36, 0, 0, 'inicial', '2019-08-07 13:50:00', '0000-00-00 00:00:00', '26° vara do trabalho de são leopoldo', '', 1, '2019-03-29 19:18:36'),
(17, 6, 17, 0, 0, 36, 36, 0, 0, 'inicial ', '2019-05-27 14:00:00', '0000-00-00 00:00:00', '16° vara do trabalho de porto alegre ', '', 0, '2019-03-29 19:29:57'),
(18, 6, 19, 0, 0, 36, 36, 0, 0, 'inicial', '2019-05-02 09:00:00', '0000-00-00 00:00:00', '2° vara do trabalho de canoas', '', 0, '2019-03-29 20:04:25'),
(19, 6, 20, 0, 0, 36, 36, 0, 0, 'inicial', '2019-05-07 14:00:00', '0000-00-00 00:00:00', '7° vara do trabalho de porto alegre ', '', 0, '2019-03-29 20:17:59'),
(20, 6, 21, 0, 0, 36, 36, 0, 0, 'inical', '2019-06-13 09:10:00', '0000-00-00 00:00:00', '17° vara do trabalho de porto alegre ', '', 0, '2019-03-29 20:30:00'),
(21, 1, 21, 0, 0, 10, 10, 1, 0, '', '2019-09-02 19:00:00', '2019-09-02 00:00:00', '', 'NÃO ESQUECER DE PEGAR O PROCESSO', 0, '2019-09-04 21:46:05'),
(22, 1, 20, 0, 0, 10, 10, 1, 0, '', '2019-09-03 11:00:00', '2019-09-03 10:00:00', '', '', 0, '2019-09-04 21:46:39'),
(23, 1, 17, 0, 0, 10, 10, 1, 0, 'Teste mesma data', '2019-09-04 08:00:00', '2019-09-04 09:00:00', '', 'Comer Sushi', 0, '2019-09-04 21:47:24'),
(24, 1, 17, 0, 0, 32, 32, 1, 0, 'quebe', '2019-09-05 00:00:00', '2019-09-05 00:00:00', '', '', 1, '2019-09-04 21:48:08'),
(25, 1, 21, 0, 0, 10, 10, 2, 0, 'Teste', '2019-09-24 00:00:00', '2019-09-24 00:00:00', '', '', 1, '2019-09-05 21:57:31'),
(26, 1, 13, 0, 0, 9, 9, 1, 0, '', '2019-09-03 12:00:00', '2019-09-03 00:00:00', '', '', 0, '2019-09-06 17:13:56'),
(27, 1, 24, 0, 0, 18, 18, 1, 0, '', '2019-09-03 00:00:00', '2019-09-03 00:00:00', '', '', 0, '2019-09-06 17:26:39'),
(28, 1, 23, 0, 0, 40, 40, 1, 0, '', '2019-09-02 00:00:00', '2019-09-02 00:00:00', '', '', 0, '2019-09-06 17:27:16'),
(29, 1, 13, 0, 0, 20, 20, 2, 0, '', '2019-09-09 18:59:00', '2019-09-09 19:11:00', '', '', 0, '2019-09-12 21:34:26'),
(30, 1, 22, 0, 0, 9, 9, 2, 0, '', '2019-09-05 00:00:00', '2019-09-05 00:00:00', '', '', 0, '2019-09-12 21:34:43'),
(31, 1, 24, 0, 0, 10, 10, 0, 0, 'oie', '2019-10-15 18:45:00', '2019-10-16 23:00:00', '', '', 0, '2019-10-09 21:45:23');

-- --------------------------------------------------------

--
-- Estrutura da tabela `configuracoes`
--

DROP TABLE IF EXISTS `configuracoes`;
CREATE TABLE IF NOT EXISTS `configuracoes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_usuario` int(11) NOT NULL,
  `cor_padrao` varchar(16) NOT NULL,
  `deletado` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `configuracoes`
--

INSERT INTO `configuracoes` (`id`, `id_usuario`, `cor_padrao`, `deletado`) VALUES
(2, 1, '#000040', 0);

-- --------------------------------------------------------

--
-- Estrutura da tabela `contatos`
--

DROP TABLE IF EXISTS `contatos`;
CREATE TABLE IF NOT EXISTS `contatos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(150) NOT NULL,
  `deletado` tinyint(1) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=18 DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `contatos`
--

INSERT INTO `contatos` (`id`, `nome`, `deletado`, `data_cadastro`) VALUES
(1, 'Aeroporto', 0, '2019-02-14 12:44:15'),
(2, 'Água e Esgoto	', 0, '2019-02-14 12:44:32'),
(3, 'Bombeiros', 0, '2019-02-14 12:44:58'),
(4, 'Brigada Militar	', 0, '2019-02-14 12:45:11'),
(5, 'CEEE - Plantão 24 Horas', 0, '2019-02-14 12:45:32'),
(6, 'Conselho Tutelar (Centro)	', 0, '2019-02-14 12:45:52'),
(7, 'correios', 0, '2019-02-14 12:46:14'),
(8, 'Defesa Civil	', 0, '2019-02-14 12:46:38'),
(9, 'Delegacia da Criança	', 0, '2019-02-14 12:46:56'),
(10, 'Delegacia da Mulher	', 0, '2019-02-14 12:47:13'),
(11, 'Guarda Municipal poa	', 0, '2019-02-14 12:47:31'),
(12, 'INSS	', 0, '2019-02-14 12:47:49'),
(13, 'Polícia Civil	', 0, '2019-02-14 12:48:07'),
(14, 'Rodoviária	', 0, '2019-02-14 12:48:27'),
(15, 'Procon	', 0, '2019-02-14 12:48:45'),
(16, 'Trânsito e Transporte	', 0, '2019-02-14 12:49:07'),
(17, 'Vigilância Sanitária	', 0, '2019-02-14 12:49:31');

-- --------------------------------------------------------

--
-- Estrutura da tabela `contatos_lista`
--

DROP TABLE IF EXISTS `contatos_lista`;
CREATE TABLE IF NOT EXISTS `contatos_lista` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_contato` int(11) NOT NULL,
  `contato` varchar(150) NOT NULL,
  `tipo` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0 = Não Informado, 1 = Telefone, 2 = E-mail, 3 = Site',
  `deletado` tinyint(1) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=18 DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `contatos_lista`
--

INSERT INTO `contatos_lista` (`id`, `id_contato`, `contato`, `tipo`, `deletado`, `data_cadastro`) VALUES
(1, 1, '3358-2000', 0, 0, '2019-02-14 12:44:15'),
(2, 2, '115', 0, 0, '2019-02-14 12:44:32'),
(3, 3, '193', 0, 0, '2019-02-14 12:44:58'),
(4, 4, '190', 0, 0, '2019-02-14 12:45:11'),
(5, 5, '0800-999196', 0, 0, '2019-02-14 12:45:32'),
(6, 6, '3226-5788', 0, 0, '2019-02-14 12:45:52'),
(7, 7, '0800 570 0100', 0, 0, '2019-02-14 12:46:14'),
(8, 8, '3268-9026', 0, 0, '2019-02-14 12:46:38'),
(9, 9, '3233-6255', 0, 0, '2019-02-14 12:46:56'),
(10, 10, '3288-2172', 0, 0, '2019-02-14 12:47:13'),
(11, 11, '3224-9937', 0, 0, '2019-02-14 12:47:31'),
(12, 12, '0800-780191', 0, 0, '2019-02-14 12:47:49'),
(13, 13, '3288-2400', 0, 0, '2019-02-14 12:48:07'),
(14, 14, '3210-0101', 0, 0, '2019-02-14 12:48:27'),
(15, 15, '151', 0, 0, '2019-02-14 12:48:45'),
(16, 16, '118', 0, 0, '2019-02-14 12:49:07'),
(17, 17, '3289-2400', 0, 0, '2019-02-14 12:49:31');

-- --------------------------------------------------------

--
-- Estrutura da tabela `contatos_young`
--

DROP TABLE IF EXISTS `contatos_young`;
CREATE TABLE IF NOT EXISTS `contatos_young` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(150) NOT NULL,
  `email` varchar(150) NOT NULL,
  `tipo` tinyint(1) NOT NULL COMMENT '1 - contato, 2 - ebook',
  `deletado` tinyint(1) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=190 DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `contatos_young`
--

INSERT INTO `contatos_young` (`id`, `nome`, `email`, `tipo`, `deletado`, `data_cadastro`) VALUES
(1, 'Marcos', 'markosss13@gmail.com', 2, 0, '2018-06-06 14:17:48'),
(2, 'marcos', 'markosss13@gmail.com', 2, 0, '2018-06-06 14:22:37'),
(3, 'marcos', 'markosss13@gmail.com', 2, 0, '2018-06-06 14:26:07'),
(4, 'marcos', 'markosss13@hotmail.com', 2, 0, '2018-06-06 18:16:28'),
(5, 'marcos', 'm.barcellos.c@gmail.com', 2, 0, '2018-06-06 18:25:54'),
(6, 'marcos', 'markosss13@gmail.com', 2, 0, '2018-06-06 19:13:45'),
(7, 'marcossss', 'markosss13@gmail.com', 2, 0, '2018-06-06 19:13:55'),
(8, 'marcos', 'markosss13@hotmail.com', 2, 0, '2018-06-07 14:34:49'),
(9, 'Marcos', 'markosss13@gmail.com', 1, 0, '2018-06-07 15:05:08'),
(10, 'Marcos 9', 'marcos.s192@gmail.com', 1, 0, '2018-06-07 15:16:59'),
(11, 'Marcos', 'markosss13@gmail.com', 2, 0, '2018-06-07 16:48:42'),
(12, 'marcos', '1232132@asdasd.com', 2, 0, '2018-06-07 19:10:41'),
(13, 'carlos henrique provin almeida', 'pattyeike@gmail.com', 1, 0, '2018-06-07 23:08:22'),
(14, 'Marcos', 'marcos.schneider13@hotmail.com', 2, 0, '2018-06-12 16:58:05'),
(15, 'Marcos', 'marcos.schneider13@hotmail.com', 2, 0, '2018-06-12 17:02:00'),
(16, 'marcos', 'marcos.schneider13@hotmail.com', 2, 0, '2018-06-12 17:07:39'),
(17, 'Simone Breitenbach', 'simonebrei@yahoo.com.br', 2, 0, '2018-06-12 17:16:36'),
(18, 'Marcos', 'markosss13@gmail.com', 1, 0, '2018-06-14 19:00:00'),
(19, 'Simone', 'simonebrei@hotmail.com', 1, 0, '2018-06-18 19:00:15'),
(20, 'Simone', 'simonebrei@yahoo.com.br', 2, 0, '2018-06-18 19:00:32'),
(21, 'Luciana Robalo', 'promocoes@graficargb.com.br', 1, 0, '2018-06-19 16:35:25'),
(22, 'LUCIANE BOTELHO MARTINS', 'lucianebmk@hotmail.com', 1, 0, '2018-06-19 18:56:55'),
(23, 'Lucia Helena MENUZZI Vieira', 'lhmvieora@b.cpm.br', 1, 0, '2018-06-21 18:04:53'),
(24, 'Janes Teresinha Denardi', 'janesdenardi3@gmail.com', 1, 0, '2018-06-22 18:34:13'),
(25, 'alexandre paim de abreu', 'aabreu@caxia.rs.gov.br', 1, 0, '2018-06-26 16:03:40'),
(26, 'BRUNA BRENDER GRANDO', 'bruninha_bru@hotmail.com', 1, 0, '2018-06-26 23:47:20'),
(27, 'matheus', 'matheus.wasem956@gmail.com', 1, 0, '2018-06-29 23:41:24'),
(28, 'Antonio Freitas', 'capitalconsultoria@hotmail.com', 1, 0, '2018-07-03 00:12:30'),
(29, 'Kéthelyn Corrêa da Silva', 'kethelyncorrea1@hotmal.com', 1, 0, '2018-07-09 19:29:06'),
(30, 'Leonardo Augusto Lopes de Araujo', 'leolopesdearaujo@gmail.com', 1, 0, '2018-07-09 19:30:34'),
(31, 'Teste', 'teste@teste.com.br', 3, 0, '2018-07-10 18:13:29'),
(32, '123213', 'markosss123@gmail.com', 3, 0, '2018-07-10 18:22:02'),
(33, 'teste', 'teste@teste.com.br', 3, 0, '2018-07-10 18:41:04'),
(34, 'teste', 'markosss13@gmail.com', 3, 0, '2018-07-10 18:41:20'),
(35, 'teste', 'markosss13@gmail.com', 3, 0, '2018-07-10 18:41:21'),
(36, 'teste', 'markosss13@gmail.com', 3, 0, '2018-07-10 18:41:21'),
(37, 'teste', 'markosss13@gmail.com', 3, 0, '2018-07-10 18:41:21'),
(38, 'teste', 'markosss13@gmail.com', 3, 0, '2018-07-10 18:41:21'),
(39, 'teste', 'markosss13@gmail.com', 3, 0, '2018-07-10 18:41:21'),
(40, 'Fátima dos Santos carpes', 'fatimacarpes@hotmail.com', 1, 0, '2018-07-11 12:23:06'),
(41, 'Fátima dos Santos carpesfatima', 'fatimacarpes@hotmail.com', 1, 0, '2018-07-11 16:03:58'),
(42, 'teste', 'teste@teste.com.br', 3, 0, '2018-07-11 18:19:46'),
(43, 'noticia1', 'noticia1@noticia.com.br', 3, 0, '2018-07-11 19:00:17'),
(44, 'noticia2', 'noticia2@noticia2.com', 3, 0, '2018-07-11 19:01:24'),
(45, 'noticia2', 'noticia2@meuemail.com', 3, 0, '2018-07-11 19:01:37'),
(46, 'noticia2', 'noticia2@email.com', 3, 0, '2018-07-11 19:03:09'),
(47, 'noticia3', 'noticia3@email.com', 3, 0, '2018-07-11 19:03:36'),
(48, 'noticia4', 'noticia4@noticia4.com', 3, 0, '2018-07-11 19:04:13'),
(49, 'noticia5', 'noticia5@noticia5.com', 3, 0, '2018-07-11 19:04:38'),
(50, 'Simone Breitenbach', 'simonebrei@hotmail.com', 3, 0, '2018-07-11 20:51:50'),
(51, 'Maicon Dias da Silva', 'maicondiasdasilva@hotmail.com', 1, 0, '2018-07-13 01:15:01'),
(52, 'paulo silveira da silva', 'paullosilva@hotmail.com', 1, 0, '2018-07-13 12:59:50'),
(53, 'Tainara ', 'tainara.tata@gmail.com', 1, 0, '2018-07-15 19:28:04'),
(54, 'Vanessa Becker', 'vanessabecker.adv@hotmail.com', 1, 0, '2018-07-16 13:45:56'),
(55, 'Adir Cigognini', 'a.cigognini@gmail.com', 1, 0, '2018-07-17 11:34:09'),
(56, 'Mônica Von Borowski ', 'monica.von.borowski@gmail.com', 1, 0, '2018-07-18 18:37:50'),
(57, 'Alex Lima', 'akpraia@hotmail.com', 1, 0, '2018-07-19 15:31:40'),
(58, 'Eunice Marques Oliveira', 'eunicemarquesoliveir@hotmail.com', 1, 0, '2018-07-20 20:33:52'),
(59, 'Simone', 'simonebrei@yahoo.com.br', 3, 0, '2018-07-23 20:10:45'),
(60, 'Camila Jaques Schuler', 'CAMILY.JQS@GMAIL.COM', 1, 0, '2018-07-31 19:29:28'),
(61, 'Paulo Sanches', 'paulo.sanches@hotmail.com.br', 1, 0, '2018-08-01 22:04:50'),
(62, 'PAULO RICARDO RECUERO SOARES', 'paulo.recuero@yahoo.com', 1, 0, '2018-08-02 12:32:58'),
(63, 'Teste', 'teste@teste.com.br', 1, 0, '2018-08-06 20:04:16'),
(64, 'Rogerio Garay Cardoso', 'garayrogerioc@gmail.com', 1, 0, '2018-08-11 21:06:51'),
(65, 'Marco Antonio de Almeida Gomes', 'antoniogomes1958@bol.com.br', 1, 0, '2018-08-14 22:24:43'),
(66, 'Paula Alves', 'paulaalvesnh@gmail.com', 1, 0, '2018-08-15 16:00:39'),
(67, 'Carlos Augusto de Mello Leal', 'cdemelloleal@gmail.com', 1, 0, '2018-08-16 10:07:06'),
(68, 'Adriana Almeida', 'adrianaholzmann@gmail.com', 1, 0, '2018-08-17 16:56:41'),
(69, 'André Antonio Bueno', 'andrebuenonh@gmail.com', 1, 0, '2018-08-19 15:02:04'),
(70, 'ADRIANE AMARAL DA SILVA', 'adriane.asilva@hotmail.com', 1, 0, '2018-08-21 12:37:16'),
(71, 'Adriana Almeida', 'adrianaholzmann@gmail.com', 1, 0, '2018-08-21 18:31:18'),
(72, 'Luciano Pereira', 'lucianonsr@gmail.com', 2, 0, '2018-08-24 19:07:27'),
(73, 'WINDERSON MARQUES MACHADO', 'windersonmarques@hotmail.com', 2, 0, '2018-08-26 21:13:57'),
(74, 'Michael ', 'ianaeimarchandt@gmail.com', 1, 0, '2018-08-27 13:21:46'),
(75, 'edemar pacheco', 'edemarpacheco@hotmail.com', 1, 0, '2018-08-29 18:54:23'),
(76, 'LUIZ CARLOS DA SILVA DINIZ', 'dinizluizcarlos429@gmail.com', 1, 0, '2018-08-30 14:50:22'),
(77, 'Teste de envio', 'teste@teste.com.br', 1, 0, '2018-08-30 20:37:02'),
(78, 'ELIANA DOS SANTOS CARVALHO', 'segurancaelitte@hotmail.com', 1, 0, '2018-08-31 13:20:30'),
(79, 'marcol', 'arte.mvizio@gmail.com', 2, 0, '2018-08-31 23:05:06'),
(80, 'Simone', 'simonebrei@hotmail.com', 3, 0, '2018-09-03 02:07:26'),
(81, 'Simone', 'simonebrei@hotmail.com', 3, 0, '2018-09-03 02:07:54'),
(82, 'Simone', 'simonebrei@hotmail.com', 3, 0, '2018-09-03 02:08:19'),
(83, 'Simone', 'simonebrei@hotmail.com', 3, 0, '2018-09-03 02:08:47'),
(84, 'Simone', 'simonebrei@hotmail.com', 3, 0, '2018-09-03 02:09:04'),
(85, 'Gabriela Maiato Chagas', 'gabrielamaiato@hotmail.com', 1, 0, '2018-09-06 14:24:35'),
(86, 'Claudia Zitto', 'czitto@trt4.jus.br', 1, 0, '2018-09-10 17:46:14'),
(87, 'Mario Cezar de Castro Rodrigues', 'mccr@terra.com.br', 1, 0, '2018-09-25 21:08:16'),
(88, 'DENISE PAZ DA SILVA', 'denise.paz@hotmail.com', 1, 0, '2018-09-28 12:29:07'),
(89, 'ADRIANA EDINÁ AGÜERO', 'aguero_adriana@hotmail.com', 1, 0, '2018-10-04 00:34:36'),
(90, 'Alessandra Vieira Pacheco ', 'avpacheco24@gmail.com', 1, 0, '2018-10-10 16:21:38'),
(91, 'Gilberto Brinhol Carrion', 'gilbertobcarrion@gmail.com', 1, 0, '2018-10-12 20:47:01'),
(92, 'felipe', 'felipefmc@yahoo.com.br', 2, 0, '2018-10-15 12:47:04'),
(93, 'Wagner de Quadros', 'comercial.dequadros@gmail.com', 1, 0, '2018-10-16 01:51:34'),
(94, 'Berenice Martinelli de Marco', 'beremartinelli@gmail.com', 1, 0, '2018-10-16 19:45:33'),
(95, 'ELTON DORNELLES CASTRO', 'eltondornellescastro@gmail.com', 1, 0, '2018-10-19 13:05:19'),
(96, 'Luciane Bortoli', 'luciane.bortoli@gmail.com', 1, 0, '2018-10-19 17:51:17'),
(97, 'julio cesar rocha', 'fresart.fresas@gmail.com', 1, 0, '2018-10-22 19:16:06'),
(98, 'Lidiane ', 'lidiane.dornelles@yahoo.com.br', 1, 0, '2018-10-25 17:45:48'),
(99, 'Liane Teresinha berghan constante da Silveira', 'yuridenoia@gmail.com', 1, 0, '2018-10-27 14:10:45'),
(100, 'Leandro Abreu', 'leandrodem.abreu@gmail.com', 1, 0, '2018-11-01 04:55:13'),
(101, 'Claudia Szortika', 'claudias.q@hotmail.com', 1, 0, '2018-11-06 12:48:52'),
(102, 'Virgéria Cezar Custódio', 'virgeria@gmail.com.br', 1, 0, '2018-11-07 11:52:55'),
(103, 'Camila Santos de Souza Vianna', 'milasouzavianna@yahoo.com.br', 1, 0, '2018-11-14 00:03:10'),
(104, 'ANA CRISTINA SILVA DE MATOS', 'aninha2706a@gmail.com', 1, 0, '2018-11-15 18:23:48'),
(105, 'Sílvia da Silva Dalberto', 'silvia.dalberto@bol.com.br', 1, 0, '2018-11-21 00:10:43'),
(106, 'PAULO GOMES SAPORITI NETO', 'paulo.saporiti@hotmail.com', 1, 0, '2018-11-22 16:11:59'),
(107, 'juliana silva bortolotti', 'julianabortolotti.rs@gmail.com', 1, 0, '2018-11-22 21:29:11'),
(108, 'Edson Ganbarra de Gambarra', 'arte.mvizio@gmail.com', 2, 0, '2018-11-28 21:42:36'),
(109, 'sidney alves da silva', 'sidy_silvaalves@hotmail.com', 1, 0, '2018-11-29 14:30:14'),
(110, 'Simone Paula Mazzochi', 'simonecxs@hotmail.com', 1, 0, '2018-12-01 19:45:17'),
(111, 'Carlos Alberto Klostermeyer', 'c.klostermeyer@hotmail.com', 1, 0, '2018-12-03 16:57:31'),
(112, 'Fabiana', 'fabi.calculostrabalhistas@gmail.com', 1, 0, '2018-12-07 15:26:10'),
(113, 'William Silveira da Silva', '101033@upf.br', 1, 0, '2018-12-10 13:58:56'),
(114, 'Cleonice Elisete da Silveira Feijó', 'cfeijo@tjrs.jus.br', 1, 0, '2018-12-12 15:51:36'),
(115, 'Adre Silvane Rosa', 'adressilva@yahoo.com.br', 1, 0, '2018-12-18 18:31:47'),
(116, 'MICHEL MÜLLER', 'mmullerg@yahoo.com', 1, 0, '2018-12-19 17:20:21'),
(117, 'Jaime Marcelo Ribeiro', 'jmrjaime@gmail.com', 1, 0, '2018-12-21 10:40:09'),
(118, 'Andrius Debastiani', 'andrius.debastiani@hotmail.com', 1, 0, '2019-01-01 17:34:43'),
(119, 'Pâmela Cardoso ', 'pahhhcardossoo@gmail.com', 1, 0, '2019-01-07 23:28:27'),
(120, 'Leandro Scherer', 'leandro_schererdasilva@hotmail.com', 1, 0, '2019-01-08 21:38:56'),
(121, 'Viviane Winter Nicola', 'vivianewnicol@gmail.com', 1, 0, '2019-01-11 12:46:41'),
(122, 'Silvane Vecchietti Christofari', 'silvanecris@hotmail.com', 1, 0, '2019-01-23 13:41:03'),
(123, 'BRUNA BRENDER GRANDO', 'bruninha_bru@hotmail.com', 1, 0, '2019-01-26 13:05:29'),
(124, 'Clairton Lopes', 'clairtonlopes50@gmail.com', 2, 0, '2019-01-29 10:53:25'),
(125, 'Ingrid Fernanda Lopes da Silveira', 'ingridlopesnh@gmail.com', 1, 0, '2019-02-02 05:16:15'),
(126, 'NELITA MARIA FERRI', 'neferri@terra.com.br', 1, 0, '2019-02-10 22:28:51'),
(127, 'Alexsander', 'agmateriais51@gmail.com', 1, 0, '2019-02-12 15:44:05'),
(128, 'Carolina Martins da Silveira', 'carolinamssl@yahoo.com.br', 1, 0, '2019-02-27 16:20:47'),
(129, 'Mauren regina C. soares', 'fe-amor@outlook.com', 1, 0, '2019-03-01 03:38:52'),
(130, 'Victor Mattos', 'rovedamattos@hotmail.com', 1, 0, '2019-03-04 23:37:13'),
(131, 'Evani Lanius Sachett', 'evanilanius@hotmail.com', 1, 0, '2019-03-06 00:13:47'),
(132, 'ELISABETH KARST', 'bethikarst@gmail.com', 1, 0, '2019-03-06 13:20:10'),
(133, 'Araci Erica Richter', 'jonesrichter@yahoo.com.br', 1, 0, '2019-03-07 21:12:09'),
(134, 'Ricardo Zanolete', 'ricardoplustelecom@gmail.com', 1, 0, '2019-03-09 15:37:56'),
(135, 'DANIELA', 'daniela.bottega@yahoo.com.br', 2, 0, '2019-03-11 17:48:39'),
(136, 'DANIELA', 'daniela.bottega@yahoo.com.br', 2, 0, '2019-03-11 17:48:52'),
(137, 'Rosi Terezinha Bystronski Remboski', 'rosi.remboski@gmail.com', 1, 0, '2019-03-13 23:41:22'),
(138, 'THIAGO ANTONIO BARBOZA DE MELLO', 'thmello1@hotmail.com', 1, 0, '2019-03-15 18:39:26'),
(139, 'Paulo Cesar Maciel', 'pcmaciel_@hotmail.com', 1, 0, '2019-03-25 15:03:22'),
(140, 'Cesar Augusto Costa', 'cesar_felice@yahoo.com.br', 1, 0, '2019-03-26 00:08:31'),
(141, 'silmar meira severo', 'silmar.meirasevero@gmail.com', 1, 0, '2019-03-27 18:42:14'),
(142, 'PAULO RICARDO MERTEN', 'prmerten@gmail.com', 1, 0, '2019-03-27 19:12:14'),
(143, 'MARLENE JESUS DE ALMEIDA MACHADO', 'marleneja@terra.com.br', 1, 0, '2019-03-29 18:58:32'),
(144, 'Jair', 'jairsilvars@gmail.com', 1, 0, '2019-04-04 03:52:10'),
(145, 'Bruna Billig Cordeiro', 'bruna-billig@hotmail.com', 1, 0, '2019-04-08 18:39:58'),
(146, 'Mariangela Bueno Gorski', 'marigorski@yahoo.com.br', 1, 0, '2019-04-09 19:34:41'),
(147, 'João Vicente Dantas de Oliveira', 'joaovicente@liess.ind.br', 1, 0, '2019-04-09 19:52:20'),
(148, 'EMANUEL DUARTE ', 'eng.emanuelduarte@gmail.com', 1, 0, '2019-04-16 13:33:26'),
(149, 'ALVARO ARCEMILDO BAMBERG', 'alvaro@bambergadv.com.br', 1, 0, '2019-04-16 17:24:44'),
(150, 'João Vicente Dantas de Oliveira', 'joaovicente65@gmail.com', 1, 0, '2019-04-22 12:42:27'),
(151, 'João Cesar Faria marques', 'Joaocesar@tj.rs.gov.br', 1, 0, '2019-04-28 02:57:59'),
(152, 'João Cesar Faria marques', 'Joaocesar@tj.rs.gov.br', 1, 0, '2019-04-28 02:58:00'),
(153, 'João Cesar Faria marques', 'Joaocesar@tj.rs.gov.br', 1, 0, '2019-04-28 03:01:17'),
(154, 'Marcelo Bonat Agrello', 'marceloagrello@gmail.com', 1, 0, '2019-04-29 03:10:06'),
(155, 'maria augusta mattoso pereira', 'mattosopereira@gmail.com', 1, 0, '2019-04-30 19:37:55'),
(156, 'SIRLEI TERESINHA HENRICH ', 'sirleihp@hotmail.com', 1, 0, '2019-05-02 11:28:40'),
(157, 'Maria cristina', 'mariacristinalves@gmail.com', 2, 0, '2019-05-05 15:28:37'),
(158, 'Marcia Ortiz', 'marcia.ortiz@yahoo.com.br', 1, 0, '2019-05-05 22:06:10'),
(159, 'Larissa Meireles dos Santos ', 'larissa.meireles97@gmail.com', 1, 0, '2019-05-09 17:50:08'),
(160, 'Luis Carlos Hunhoff', 'luiscarloshunhoff@gmail.com', 1, 0, '2019-05-09 18:58:16'),
(161, 'Gilberto Bonato', 'betobobato@ymail.com', 1, 0, '2019-05-15 13:52:18'),
(162, 'Marcos', 'mkominkiewicz@hotmail.com', 1, 0, '2019-05-23 01:19:56'),
(163, 'João Vicente Dantas de Oliveira', 'joaovicente65@gmail.com', 1, 0, '2019-05-24 16:31:06'),
(164, 'Mario Paz', 'paz-mario@hotmail.com', 1, 0, '2019-05-29 14:27:38'),
(165, 'Mario Paz', 'paz-mario@hotmail.com', 1, 0, '2019-05-29 14:44:36'),
(166, 'João Vicente Dantas de Oliveira', 'joaovicente65@gmail.com', 1, 0, '2019-05-31 11:02:06'),
(167, 'Dulcinéia Mainardi Rosentalski', 'dulci_rosen@hotmail.com', 1, 0, '2019-06-04 14:14:13'),
(168, 'pedro cesar franco', 'pedrofranco248@gmail.com', 1, 0, '2019-06-06 18:00:30'),
(169, 'Vitor harras', 'vitorhenriqueharras@gmail.com', 1, 0, '2019-06-17 11:48:09'),
(170, 'Tânia Lourdes Smiderle ', 'taniasmiderle@yahoo.com.br', 1, 0, '2019-06-17 15:19:25'),
(171, 'Luciano', 'luciano_@gmail.com', 2, 0, '2019-06-28 20:11:50'),
(172, 'Luciano', 'lucianowinter700@gmail.com', 2, 0, '2019-06-28 20:12:16'),
(173, 'Luciano', 'lucianowinter700@gmail.com', 2, 0, '2019-06-28 20:12:29'),
(174, 'Mariele de Oliveira Lima Antunes', 'mariele@young.adv.br', 1, 0, '2019-07-02 17:36:19'),
(175, 'diulian ', 'diuliandesouza@gmail.com', 1, 0, '2019-07-03 10:59:48'),
(176, 'MYLLA CHRISTIE ALVES DA SILVA', 'myllachristiealves@gmail.com', 1, 0, '2019-07-08 19:40:44'),
(177, 'João Marcelo Martins Nunes', 'joaomarcelo5@yahoo.com.br', 1, 0, '2019-07-09 00:34:02'),
(178, 'isabel', 'isabelcruz@tj.rs.gov.br', 1, 0, '2019-07-09 19:14:05'),
(179, 'Fabricio Renato de Barcelos', 'fabricio0905@gmail.com', 1, 0, '2019-07-16 14:38:58'),
(180, 'Rosecler Pereira da Silva', 'roseclersilva12@gmail.com', 1, 0, '2019-07-17 14:20:29'),
(181, 'Luciano de Athayde Karasek', 'l.a.karasek@gmail.com', 1, 0, '2019-07-17 14:20:51'),
(182, 'Elton Souza dos Santos', 'eltonsantos@correios.com.br', 1, 0, '2019-07-18 17:02:04'),
(183, 'Elton Souza dos Santos', 'eltonsantos@correios.com.br', 1, 0, '2019-07-18 17:02:04'),
(184, 'Elton Souza dos Santos', 'eltonsantos@correios.com.br', 1, 0, '2019-07-18 17:02:04'),
(185, 'Am Maria Beltrame ', 'anamariasilvabeltrame@gmail.com', 1, 0, '2019-07-19 12:20:38'),
(186, 'eric robert schinkoeth', 'eric1801@gmail.com', 1, 0, '2019-07-28 20:25:49'),
(187, 'Faraday de deus', 'Gente@unimarlitoral.com', 1, 0, '2019-08-04 23:56:18'),
(188, 'Letícia de Mello', 'lehmello@bol.com.br', 1, 0, '2019-08-07 14:06:29'),
(189, 'Hugo Lobo', 'bike_hugo@hotmail.com', 1, 0, '2019-08-09 18:59:01');

-- --------------------------------------------------------

--
-- Estrutura da tabela `desativado-chats`
--

DROP TABLE IF EXISTS `desativado-chats`;
CREATE TABLE IF NOT EXISTS `desativado-chats` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_setor` int(11) NOT NULL DEFAULT '0',
  `nome` varchar(150) DEFAULT NULL,
  `tipo` int(11) NOT NULL DEFAULT '2' COMMENT '1 = Grupo, 2 = Privado',
  `deletado` tinyint(1) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `desativado-chats_participantes`
--

DROP TABLE IF EXISTS `desativado-chats_participantes`;
CREATE TABLE IF NOT EXISTS `desativado-chats_participantes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_chat` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `descricao_generico`
--

DROP TABLE IF EXISTS `descricao_generico`;
CREATE TABLE IF NOT EXISTS `descricao_generico` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descricao` varchar(150) NOT NULL,
  `deletado` tinyint(1) NOT NULL DEFAULT '0',
  `tipo` int(11) NOT NULL COMMENT '0 - assunto_processo 1 - categoria_processo 2 - endereco_foro 3 - fase_processo 4 - foro 5 - origem_captacao_processo 6 - outros_envolvidos_tipo_processo 7 - posicao_apenso 8 - posicao_processo 9 - posicao_recurso 10 - relator 11 - situacao_apenso 12 - tipo_acao_rito_processo 13 - tipo_causa 14 - tipo_causa_apenso 15 - tipo_causa_recurso 16 - tribunal 17 - turma_camara 18 - vara_processo 19 - comarca',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=217 DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `descricao_generico`
--

INSERT INTO `descricao_generico` (`id`, `descricao`, `deletado`, `tipo`, `data_cadastro`) VALUES
(4, 'Diversos', 0, 0, '2019-02-09 06:55:23'),
(3, 'Normal', 0, 0, '2019-02-09 06:55:23'),
(5, 'Abalo de Crédito - SPC e Serasa', 0, 0, '2019-02-09 06:55:23'),
(6, 'Abertura de Sucessão - Inventário', 0, 0, '2019-02-09 06:55:23'),
(7, 'Abono - Férias', 0, 0, '2019-02-09 06:55:23'),
(8, 'Abono de Faltas', 0, 0, '2019-02-09 06:55:23'),
(9, 'Abono Família', 0, 0, '2019-02-09 06:55:23'),
(10, 'Abono Natal', 0, 0, '2019-02-09 06:55:23'),
(11, 'Abono Permanência', 0, 0, '2019-02-09 06:55:23'),
(12, 'Porto Alegre - Av Otto Niemeyer, 2965', 0, 2, '2019-02-09 06:55:23'),
(13, 'Santa Maria - Av. Montevideu, n° 333', 0, 2, '2019-02-09 06:55:23'),
(14, 'Av. Borges de Medeiros, 1565 Sala 20', 0, 2, '2019-02-09 06:55:23'),
(15, 'Aguarda Audiência', 0, 3, '2019-02-09 06:55:23'),
(16, 'Ação Anulatória', 0, 4, '2019-02-09 06:55:23'),
(17, 'Ação Cautelar', 0, 4, '2019-02-09 06:55:23'),
(18, 'Foro Regional do Sarandi - POA', 0, 4, '2019-02-09 06:55:23'),
(19, 'Autor', 0, 6, '2019-02-09 06:55:23'),
(20, 'Litisconsorte', 0, 6, '2019-02-09 06:55:23'),
(21, 'Réu', 0, 6, '2019-02-09 06:55:23'),
(22, 'Terceiro Interessado', 0, 6, '2019-02-09 06:55:23'),
(23, 'Agravado', 0, 7, '2019-02-09 06:55:23'),
(24, 'Agravante', 0, 7, '2019-02-09 06:55:23'),
(25, 'Agravo Instrumento', 0, 7, '2019-02-09 06:55:23'),
(26, 'Autor', 0, 8, '2019-02-09 06:55:23'),
(27, 'Réu', 0, 8, '2019-02-09 06:55:23'),
(28, 'Terceiro', 0, 8, '2019-02-09 06:55:23'),
(29, 'Agravado', 0, 9, '2019-02-09 06:55:23'),
(30, 'Agravante', 0, 9, '2019-02-09 06:55:23'),
(31, 'Apelado', 0, 9, '2019-02-09 06:55:23'),
(32, 'Alberto Luiz Bresciane de Fontan', 0, 10, '2019-02-09 06:55:23'),
(33, 'Alcides Matte', 0, 10, '2019-02-09 06:55:23'),
(34, 'Alexandre Mussoi Moreira', 0, 10, '2019-02-09 06:55:23'),
(35, 'A Avaliação', 0, 11, '2019-02-09 06:55:23'),
(36, 'Acordo', 0, 11, '2019-02-09 06:55:23'),
(37, 'Acordo Aprovado e Assinado', 0, 11, '2019-02-09 06:55:23'),
(38, 'Rito Ordinário', 0, 12, '2019-02-09 06:55:23'),
(39, 'Rito Sumário', 0, 12, '2019-02-09 06:55:23'),
(40, 'Trabalhista', 0, 13, '2019-02-09 06:55:23'),
(41, 'Judicial', 0, 13, '2019-02-09 06:55:23'),
(42, 'Ação Cobrança', 0, 13, '2019-02-09 06:55:23'),
(43, 'A. Ordin. Revis. Contrato', 0, 13, '2019-02-09 06:55:23'),
(44, 'A. Ordinária com Pedido de Tut', 0, 13, '2019-02-09 06:55:23'),
(45, 'A. Ordinária Revisional D', 0, 13, '2019-02-09 06:55:23'),
(46, 'A. Revisional - IRSM', 0, 13, '2019-02-09 06:55:23'),
(47, 'Abono de férias', 0, 13, '2019-02-09 06:55:23'),
(48, 'Abono Permanência', 0, 13, '2019-02-09 06:55:23'),
(49, 'Ação Cautelar', 0, 14, '2019-02-09 06:55:23'),
(50, 'Ação Consignatória', 0, 14, '2019-02-09 06:55:23'),
(51, 'Ação de Alimentos', 0, 14, '2019-02-09 06:55:23'),
(52, 'Ação de Consignação', 0, 14, '2019-02-09 06:55:23'),
(53, 'Ação de Consignação em PGTO', 0, 14, '2019-02-09 06:55:23'),
(54, 'Ação de Despejo', 0, 14, '2019-02-09 06:55:23'),
(55, 'Ação de Dissolução de União', 0, 14, '2019-02-09 06:55:23'),
(56, 'Ação Declaratória Incidental', 0, 14, '2019-02-09 06:55:23'),
(57, 'Ação Indenizatória - Reparação', 0, 14, '2019-02-09 06:55:23'),
(58, 'Ação Recisória', 0, 15, '2019-02-09 06:55:23'),
(59, 'Agravo de Instrumento', 0, 15, '2019-02-09 06:55:23'),
(60, 'Agravo de Petição', 0, 15, '2019-02-09 06:55:23'),
(61, 'Agravo em Rec Esp/extr', 0, 15, '2019-02-09 06:55:23'),
(62, 'Agravo Interno', 0, 15, '2019-02-09 06:55:23'),
(63, 'Agravo Regimental', 0, 15, '2019-02-09 06:55:23'),
(64, 'Apelação', 0, 15, '2019-02-09 06:55:23'),
(65, 'Apelação - Reexame Necessário', 0, 15, '2019-02-09 06:55:23'),
(66, 'Carta Precatória', 0, 15, '2019-02-09 06:55:23'),
(67, 'Câmara Cível', 0, 16, '2019-02-09 06:55:23'),
(68, 'Câmara Recursal', 0, 16, '2019-02-09 06:55:23'),
(69, 'Justiça Federal', 0, 16, '2019-02-09 06:55:23'),
(70, 'SDC - TRT4', 0, 17, '2019-02-09 06:55:23'),
(71, 'TJ - 01° Vice Presidência - DI', 0, 17, '2019-02-09 06:55:23'),
(72, 'Tribunal Pleno', 0, 17, '2019-02-09 06:55:23'),
(73, '003° Vara do Trabalho', 0, 18, '2019-02-09 06:55:23'),
(74, '004° Vara do Trabalho', 0, 18, '2019-02-09 06:55:23'),
(75, 'Novo Hamburgo', 0, 19, '2019-02-09 06:55:23'),
(76, 'São Leopoldo', 0, 19, '2019-02-09 06:55:23'),
(82, 'aaaaaaaaa', 1, 13, '2019-02-10 03:23:05'),
(92, 'bbbbbbbb', 1, 13, '2019-02-10 03:23:34'),
(102, 'abcd', 1, 13, '2019-02-10 03:25:47'),
(112, 'abc', 1, 13, '2019-02-10 04:26:33'),
(122, 'aaaab', 1, 0, '2019-02-10 04:49:36'),
(132, 'Canoas', 0, 19, '2019-02-10 04:49:49'),
(142, 'aaaa', 1, 12, '2019-02-10 04:49:57'),
(152, 'aaaaaa', 1, 18, '2019-02-10 04:50:04'),
(162, 'aaaaaaaa', 1, 1, '2019-02-10 04:50:11'),
(172, 'aaaaaaaaa', 1, 3, '2019-02-10 04:50:19'),
(182, '213123', 1, 18, '2019-02-10 20:34:31'),
(192, 'Porto Alegre', 0, 19, '2019-02-10 20:35:33'),
(193, 'verbas rescisórias e outros', 0, 0, '2019-02-13 18:52:49'),
(194, '20ª Vara do trabalho', 0, 18, '2019-02-13 18:54:34'),
(195, 'sindivigilantes do sul/rs', 0, 1, '2019-02-13 18:55:50'),
(196, 'Em andamento', 0, 3, '2019-02-13 18:57:50'),
(197, 'aaa', 1, 0, '2019-02-18 02:49:16'),
(198, 'teste', 1, 3, '2019-02-28 02:58:03'),
(199, '29° Vara do trabalho', 0, 18, '2019-03-29 18:02:18'),
(200, '6° Vara do trabalho', 0, 18, '2019-03-29 18:25:54'),
(201, '1° vara do trabalho ', 0, 18, '2019-03-29 19:04:19'),
(202, '26° vara do trabalho', 0, 18, '2019-03-29 19:17:03'),
(203, '16° vara do trabalho ', 0, 18, '2019-03-29 19:28:44'),
(204, '2° vara do trabalho ', 0, 18, '2019-03-29 20:02:21'),
(205, '7° vara do trabalho ', 0, 18, '2019-03-29 20:16:39'),
(206, '17° vara do trabalho', 0, 18, '2019-03-29 20:28:44'),
(207, 'Alvorada', 0, 19, '2019-09-06 17:14:17'),
(208, 'Bagé', 0, 19, '2019-09-06 17:14:52'),
(209, 'cachoeirinha do sul', 0, 19, '2019-09-06 17:15:09'),
(210, 'caxias do sul', 0, 19, '2019-09-06 17:15:15'),
(211, 'esteio', 0, 19, '2019-09-06 17:15:29'),
(212, 'santa cruz do sul', 0, 19, '2019-09-06 17:15:48'),
(213, 'itaquí', 0, 19, '2019-09-06 17:15:56'),
(214, '005° vara do trabalho', 0, 18, '2019-09-06 17:16:22'),
(215, '006° vara do trabalho', 0, 18, '2019-09-06 17:16:30'),
(216, '007° vara do trabalho', 0, 18, '2019-09-06 17:16:39');

-- --------------------------------------------------------

--
-- Estrutura da tabela `documentos`
--

DROP TABLE IF EXISTS `documentos`;
CREATE TABLE IF NOT EXISTS `documentos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_usuario` int(11) NOT NULL,
  `id_doc_pai` int(11) DEFAULT '0',
  `arquivo` varchar(150) NOT NULL,
  `tipo` tinyint(4) NOT NULL DEFAULT '2' COMMENT '1 = Pasta, 2 = Documento',
  `onde` int(11) NOT NULL DEFAULT '1' COMMENT '1 = Tarefa, 2 = Documento',
  `geral` tinyint(1) DEFAULT NULL COMMENT '0 - geral qualquer um pode acessar\n1 - pessoal',
  `pasta_processos` tinyint(1) DEFAULT NULL COMMENT 'Só tera uma pasta com os processos dentro',
  `deletado` tinyint(1) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=66 DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `documentos`
--

INSERT INTO `documentos` (`id`, `id_usuario`, `id_doc_pai`, `arquivo`, `tipo`, `onde`, `geral`, `pasta_processos`, `deletado`, `data_cadastro`) VALUES
(1, 1, 0, 'Documentos Gerais', 1, 2, 1, 1, 0, '2019-02-12 16:01:57'),
(2, 1, 0, 'Pasta Setor', 1, 2, 1, NULL, 0, '2019-02-12 16:01:57'),
(8, 6, 1, 'NA74273-79.2019.7.59.0000', 1, 2, NULL, NULL, 0, '2019-02-13 18:22:13'),
(4, 1, 2, 'PÚBLICO ESTADUAL POA', 1, 2, NULL, NULL, 0, '2019-02-12 16:50:39'),
(5, 1, 2, 'TRABALHISTA POA', 1, 2, NULL, NULL, 0, '2019-02-12 16:50:50'),
(6, 1, 2, 'PÚBLICO FEDERAL POA', 1, 2, NULL, NULL, 0, '2019-02-12 16:50:59'),
(17, 10, 0, 'Documentos', 1, 2, NULL, NULL, 0, '2019-02-27 22:56:21'),
(18, 11, 0, 'Documentos', 1, 2, NULL, NULL, 0, '2019-02-27 22:56:56'),
(19, 12, 0, 'Documentos', 1, 2, NULL, NULL, 0, '2019-02-27 22:57:44'),
(20, 13, 0, 'Documentos', 1, 2, NULL, NULL, 0, '2019-02-27 22:58:15'),
(21, 14, 0, 'Documentos', 1, 2, NULL, NULL, 0, '2019-02-27 22:58:53'),
(22, 15, 0, 'Documentos', 1, 2, NULL, NULL, 0, '2019-02-27 22:59:29'),
(23, 16, 0, 'Documentos', 1, 2, NULL, NULL, 0, '2019-02-27 23:00:09'),
(24, 17, 0, 'Documentos', 1, 2, NULL, NULL, 0, '2019-02-27 23:00:59'),
(25, 18, 0, 'Documentos', 1, 2, NULL, NULL, 0, '2019-02-27 23:01:33'),
(26, 19, 0, 'Documentos', 1, 2, NULL, NULL, 0, '2019-02-27 23:02:07'),
(27, 20, 0, 'Documentos', 1, 2, NULL, NULL, 0, '2019-02-27 23:02:38'),
(28, 21, 0, 'Documentos', 1, 2, NULL, NULL, 0, '2019-02-27 23:03:13'),
(29, 22, 0, 'Documentos', 1, 2, NULL, NULL, 0, '2019-02-27 23:03:41'),
(30, 23, 0, 'Documentos', 1, 2, NULL, NULL, 0, '2019-02-27 23:04:11'),
(31, 24, 0, 'Documentos', 1, 2, NULL, NULL, 0, '2019-02-27 23:04:45'),
(32, 25, 0, 'Documentos', 1, 2, NULL, NULL, 0, '2019-02-27 23:05:28'),
(33, 26, 0, 'Documentos', 1, 2, NULL, NULL, 0, '2019-02-27 23:06:06'),
(34, 27, 0, 'Documentos', 1, 2, NULL, NULL, 0, '2019-02-27 23:06:32'),
(35, 28, 0, 'Documentos', 1, 2, NULL, NULL, 0, '2019-02-27 23:07:07'),
(36, 29, 0, 'Documentos', 1, 2, NULL, NULL, 0, '2019-02-27 23:07:34'),
(37, 30, 0, 'Documentos', 1, 2, NULL, NULL, 0, '2019-02-27 23:07:57'),
(38, 31, 0, 'Documentos', 1, 2, NULL, NULL, 0, '2019-02-27 23:08:27'),
(39, 32, 0, 'Documentos', 1, 2, NULL, NULL, 0, '2019-02-27 23:15:45'),
(40, 33, 0, 'Documentos', 1, 2, NULL, NULL, 0, '2019-02-27 23:16:17'),
(41, 34, 0, 'Documentos', 1, 2, NULL, NULL, 0, '2019-02-27 23:16:52'),
(42, 35, 0, 'Documentos', 1, 2, NULL, NULL, 0, '2019-02-27 23:17:16'),
(43, 36, 0, 'Documentos', 1, 2, NULL, NULL, 0, '2019-02-27 23:17:43'),
(44, 37, 0, 'Documentos', 1, 2, NULL, NULL, 0, '2019-02-27 23:18:16'),
(45, 38, 0, 'Documentos', 1, 2, NULL, NULL, 0, '2019-02-27 23:18:42'),
(46, 39, 0, 'Documentos', 1, 2, NULL, NULL, 0, '2019-02-27 23:19:10'),
(47, 40, 0, 'Documentos', 1, 2, NULL, NULL, 0, '2019-02-27 23:19:39'),
(48, 41, 0, 'Documentos', 1, 2, NULL, NULL, 0, '2019-02-27 23:20:03'),
(49, 42, 0, 'Documentos', 1, 2, NULL, NULL, 0, '2019-02-27 23:20:28'),
(53, 9, 1, '0020197-04.2019.5.04.0024', 1, 2, NULL, NULL, 0, '2019-02-28 17:37:51'),
(52, 1, 1, '27_02_2019_23_33_37_359_white.png', 2, 2, NULL, NULL, 1, '2019-02-28 02:33:38'),
(54, 6, 1, '0020182-20.2019.5.04.0029', 1, 2, NULL, NULL, 0, '2019-03-29 17:55:04'),
(55, 6, 1, '0020201-95.2019.5.04.0006', 1, 2, NULL, NULL, 0, '2019-03-29 18:22:39'),
(56, 6, 1, '0020237-35.2019.5.04.0331', 1, 2, NULL, NULL, 0, '2019-03-29 19:03:00'),
(57, 6, 1, '0020192-73.2019.5.04.0026', 1, 2, NULL, NULL, 0, '2019-03-29 19:16:11'),
(58, 6, 1, '0020128-93.2019.5.04.0016', 1, 2, NULL, NULL, 0, '2019-03-29 19:27:53'),
(59, 6, 1, '0020232-85.2019.5.04.0016', 1, 2, NULL, NULL, 0, '2019-03-29 19:38:48'),
(60, 6, 1, '0020207-96.2019.5.04.0202', 1, 2, NULL, NULL, 0, '2019-03-29 19:59:44'),
(61, 6, 1, '0020190-63.2019.5.04.0007', 1, 2, NULL, NULL, 0, '2019-03-29 20:15:35'),
(62, 6, 1, '0020181-71.2019.5.04.0017', 1, 2, NULL, NULL, 0, '2019-03-29 20:27:43'),
(63, 1, 1, 'NA12953-21.2019.8.62.0000', 1, 2, NULL, NULL, 0, '2019-09-05 20:31:56'),
(64, 1, 1, 'NA69046-95.2019.2.15.0000', 1, 2, NULL, NULL, 0, '2019-09-06 17:23:02'),
(65, 1, 1, 'NA40256-95.2019.3.64.0000', 1, 2, NULL, NULL, 0, '2019-09-06 17:23:54');

-- --------------------------------------------------------

--
-- Estrutura da tabela `endereco_foro`
--

DROP TABLE IF EXISTS `endereco_foro`;
CREATE TABLE IF NOT EXISTS `endereco_foro` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descricao` varchar(150) NOT NULL,
  `deletado` tinyint(1) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `endereco_foro`
--

INSERT INTO `endereco_foro` (`id`, `descricao`, `deletado`, `data_cadastro`) VALUES
(1, 'Porto Alegre - Av Otto Niemeyer, 2965', 0, '2018-05-29 17:05:28'),
(2, 'Santa Maria - Av. Montevideu, n° 333', 0, '2018-05-29 17:05:44'),
(3, 'Av. Borges de Medeiros, 1565 Sala 20', 0, '2018-05-29 17:05:44');

-- --------------------------------------------------------

--
-- Estrutura da tabela `fase_processo`
--

DROP TABLE IF EXISTS `fase_processo`;
CREATE TABLE IF NOT EXISTS `fase_processo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descricao` varchar(150) NOT NULL,
  `deletado` tinyint(1) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `fase_processo`
--

INSERT INTO `fase_processo` (`id`, `descricao`, `deletado`, `data_cadastro`) VALUES
(1, 'Aguarda Audiência', 0, '2018-05-29 17:08:20');

-- --------------------------------------------------------

--
-- Estrutura da tabela `ferramentas_senhas`
--

DROP TABLE IF EXISTS `ferramentas_senhas`;
CREATE TABLE IF NOT EXISTS `ferramentas_senhas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_usuario` int(11) NOT NULL,
  `nome` varchar(150) NOT NULL,
  `link` varchar(150) DEFAULT NULL,
  `login` varchar(150) DEFAULT NULL,
  `senha` varchar(100) NOT NULL,
  `deletado` tinyint(1) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `ferramentas_senhas`
--

INSERT INTO `ferramentas_senhas` (`id`, `id_usuario`, `nome`, `link`, `login`, `senha`, `deletado`, `data_cadastro`) VALUES
(1, 1, 'fwefwe', 'fwefwef', 'wefwef', 'wefwefwe', 0, '2018-01-17 15:46:33'),
(2, 1, 'Admin 2', '', 'admin', 'admin', 0, '2018-01-17 18:32:54');

-- --------------------------------------------------------

--
-- Estrutura da tabela `foro`
--

DROP TABLE IF EXISTS `foro`;
CREATE TABLE IF NOT EXISTS `foro` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descricao` varchar(150) NOT NULL,
  `deletado` tinyint(1) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `foro`
--

INSERT INTO `foro` (`id`, `descricao`, `deletado`, `data_cadastro`) VALUES
(1, 'Ação Anulatória', 0, '2018-05-29 17:08:20'),
(2, 'Ação Cautelar', 0, '2018-11-22 16:07:18'),
(3, 'Foro Regional do Sarandi - POA', 0, '2018-11-22 18:24:45');

-- --------------------------------------------------------

--
-- Estrutura da tabela `grupos`
--

DROP TABLE IF EXISTS `grupos`;
CREATE TABLE IF NOT EXISTS `grupos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(150) NOT NULL,
  `deletado` tinyint(1) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `grupos`
--

INSERT INTO `grupos` (`id`, `nome`, `deletado`, `data_cadastro`) VALUES
(1, 'vigilante', 0, '2019-02-14 16:12:56');

-- --------------------------------------------------------

--
-- Estrutura da tabela `historico_requisicoes`
--

DROP TABLE IF EXISTS `historico_requisicoes`;
CREATE TABLE IF NOT EXISTS `historico_requisicoes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_requisicao` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `tipo_historico` int(11) NOT NULL COMMENT '0 - Requisição foi iniciada , 1 - Requisição foi acompanhada , 2 - requisicao foi movida, 3 - requisicao foi completada',
  `deletado` tinyint(4) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `log`
--

DROP TABLE IF EXISTS `log`;
CREATE TABLE IF NOT EXISTS `log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ip` varchar(50) NOT NULL,
  `method` varchar(50) NOT NULL,
  `rota` varchar(250) NOT NULL,
  `user_agent` text NOT NULL,
  `id_usuario` int(11) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `node_categoria`
--

DROP TABLE IF EXISTS `node_categoria`;
CREATE TABLE IF NOT EXISTS `node_categoria` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(150) NOT NULL,
  `deletado` tinyint(1) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `node_categoria`
--

INSERT INTO `node_categoria` (`id`, `nome`, `deletado`, `data_cadastro`) VALUES
(1, 'Blog', 0, '2018-03-09 20:07:42'),
(2, 'Notícias', 0, '2018-03-09 20:07:55'),
(3, 'Legislação', 0, '2018-04-05 11:46:37'),
(4, 'Informativo', 0, '2018-04-19 17:36:46'),
(5, 'Informes', 0, '2018-05-07 14:02:15');

-- --------------------------------------------------------

--
-- Estrutura da tabela `node_post`
--

DROP TABLE IF EXISTS `node_post`;
CREATE TABLE IF NOT EXISTS `node_post` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `escritor` varchar(150) NOT NULL,
  `data_post` datetime NOT NULL,
  `conteudo` text NOT NULL,
  `titulo` varchar(150) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0=Publicado /1=rascunho',
  `arquivo` varchar(250) DEFAULT NULL COMMENT 'arquivo = imagem',
  `data_post_alteracao` datetime NOT NULL,
  `link` varchar(250) NOT NULL,
  `deletado` tinyint(4) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `node_post`
--

INSERT INTO `node_post` (`id`, `escritor`, `data_post`, `conteudo`, `titulo`, `status`, `arquivo`, `data_post_alteracao`, `link`, `deletado`, `data_cadastro`) VALUES
(1, 'Alex', '2018-03-11 00:00:00', '<div style=\"font-family: \'effra\', Verdana, Geneva, Tahoma, sans-serif;\"><h5 style=\"text-align: center;\"><strong>RESPONSABILIDADE CIVIL – AÇÕES CONTRA PLANOS DE SAÚDE</strong></h5>\n\n<div class=\"row\"><div class=\"col s12 lx10 offset-lx1\"><img src=\"/assets/imgs/blog/imagem_01.jpg\" style=\"\n    max-width: 100%;\n\"></div></div>\n<p style=\"text-align: justify;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Com a grande expansão dos planos particulares de saúde, muitos clientes perguntam com frequência <strong style=\"color: #532501;\">como agir no caso de necessitar de um serviço contratado pelo plano e ver negado o atendimento por parte deste</strong>. A questão possui vários desdobramentos técnicos e que devem ser encaminhados por advogado de sua confiança, mas em linhas gerais,&nbsp; acaba resultando numa ação judicial na esfera cível com pedido liminar, para obter o amparo que foi negado pelo agente contratado, no caso o plano de saúde.</p>\n<p style=\"text-align: justify;\">&nbsp;</p>\n<p style=\"text-align: justify;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Em geral, são processos relativamente no que se refere ao atendimento do procedimento urgente. Isso se deve ao fato de que, geralmente, o advogado formula um pedido de tutela antecipada (“liminar”). Mas se você está se perguntando o que é uma liminar, sintetizarei para você: uma liminar é uma <strong style=\"color: #532501;\">decisão de urgência</strong> concedida pelo Poder Judiciário desde que preenchidos certos requisitos legais. Tais pedidos são necessários pelo caráter iminente&nbsp; da questão que, quase sempre, envolve um risco a saúde do interessado. <strong style=\"color: #532501;\">Se a questão for muito urgente, pode sair em questão de horas, ou no mesmo dia da distribuição do processo.</strong> Nos casos não tão urgentes, geralmente sai em 4 ou 5 dias.</p>\n<p style=\"text-align: justify;\">&nbsp;</p>\n<p style=\"text-align: justify;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Em uma pesquisa sobre os principais temas ou dúvidas das pessoas afetadas por alguma negativa de plano de saúde estão:</p>\n<ul style=\"\n    padding: 0 0 0 40px;\n\"><li style=\"list-style: disc;\">O plano negou minha cirurgia;</li>\n    <li style=\"list-style: disc;\">Plano de saúde não autoriza cirurgia, o que fazer?</li>\n    <li style=\"list-style: disc;\">Plano de saúde não cobre parto, o que fazer?</li>\n    <li style=\"list-style: disc;\">O plano de saúde negou um procedimento;</li>\n    <li style=\"list-style: disc;\">Plano de saúde nega exame;</li>\n    <li style=\"list-style: disc;\">Plano de saúde nega atendimento;</li>\n    <li style=\"list-style: disc;\">Plano de saúde nega Home care.</li>\n</ul>\n<p style=\"text-align: justify; text-indent: 35.4pt;\">Normalmente as ações se referem a negação, por parte do plano de saúde, de diversos procedimentos, próteses, órteses, exames, materiais cirúrgicos, internações hospitalares e/ou reajustes abusivos de mensalidade. Em menor quantidade, há as ações envolvendo o cancelamento inesperado da apólice, a expulsão de idosos do plano, o descredenciamento de hospitais, entre outras. Para causas mais simples nesta área, é possível até mesmo valer-se do Juizado Especial Cível para processar o plano de saúde.</p>\n<p style=\"text-align: justify; text-indent: 35.4pt;\">&nbsp;</p><p style=\"text-align: justify; text-indent: 35.4pt;\">Algumas dúvidas muito frequentes dos cidadãos são:</p>\n<ul style=\"\n    padding: 0 0 0 40px;\n           \">\n    <li style=\"list-style: disc;\">Posso processar o meu plano de saúde?</li>\n    <li style=\"list-style: disc;\">Qual o risco de processar meu plano de saúde?</li>\n    <li style=\"list-style: disc;\">Posso contratar um advogado para processar meu plano de saúde?</li>\n</ul>\n<p style=\"text-align: justify;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Além das dúvidas supracitadas, outro temor muito comum do cidadão que se vê na necessidade de processar o seu plano de saúde é se, em caso de promover uma demanda judicial contra o plano de saúde, este pode promover retaliações. Neste caso devemos ser claros:&nbsp; <strong style=\"color: #532501;\">não é necessário temer retaliações.</strong> <u>O acesso ao Poder Judiciário é um direito constitucional</u>. Assim, caso isso ocorra, a questão deverá ser objeto de ação na Justiça.</p>\n<p style=\"text-align: justify;\">&nbsp;</p><div class=\"col s10 offset-s1 m5 l4\" style=\"float:left\"><img src=\"/assets/imgs/blog/imagem_02.jpg\" style=\"\n    max-width: 100%;\n    height: auto;\n\"></div><p style=\"text-align: justify;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Infelizmente, tais empresas acabam negando procedimentos caros no momento em que o consumidor mais precisa. Mas <strong style=\"color: #532501;\">deve-se ficar atento:</strong> mesmo que o plano de saúde alegue que não há o direito ao procedimento indicado pelo médico, ainda assim deve-se mover um processo contra o plano.&nbsp; Note-se que, ainda que o plano de saúde tenha negado a cobertura com base no contrato, é direito do consumidor questionar a validade da negativa na Justiça. <u>É comum que os contratos de planos de saúde contenham cláusulas abusivas. Nesse caso, as cláusulas são anuladas e<strong style=\"color: #532501;\"> o procedimento é liberado pelo Poder Judiciário.</strong></u></p>\n<p style=\"text-align: justify;\">&nbsp;</p>\n<p style=\"text-align: justify;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; De outra parte, se o plano ficou caro demais com o passar do tempo, há que se analisar <strong style=\"color: #532501;\">como baixar a mensalidade do plano de saúde</strong>. Hoje em dia é possível revisar os aumentos abusivos das mensalidades dos planos por ação judicial. Podem ser revisadas as mensalidades, também, de planos de saúde chamado&nbsp; “PME – Pequenas e Médias Empresas”, que tenham sido reajustados por alta taxa de sinistralidade. Normalmente são processos céleres, e a revisão pode ser concedida em caráter liminar. <u>Muitas pessoas conseguem, ainda, a devolução dos valores pagos em excesso nos últimos 5 anos.</u></p>\n<p style=\"text-align: justify;\">&nbsp;</p>\n<p style=\"text-align: justify;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Outra pergunta frequente é se o consumidor que realizou um procedimento com médico não credenciado ao plano de saúde e o reembolso foi pequeno, pode&nbsp; pedir na Justiça um valor maior de reembolso.&nbsp; A resposta é sim. Os valores de reembolso pelos planos de saúde costumam ser muito pequenos e, dependendo do caso, a Justiça determina até mesmo o reembolso integral das despesas. Com efeito, se o plano de saúde não quer cobrir, por exemplo a quimioterapia de uso oral; exame PET-CT; home care; material cirúrgico importado; cirurgia de obesidade mórbida; cirurgia plástica reparadora, também posso exigir na Justiça essas coberturas, e <u>as decisões mais recentes determinam que tais tratamentos e procedimentos sejam integralmente cobertos pelos planos de saúde, independente do que esteja previsto no rol da ANS.</u></p>\n<p style=\"text-align: justify;\">&nbsp;</p>\n<p style=\"text-align: justify;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong><u>Outras perguntas muito frequentes: </u></strong></p>\n<p style=\"text-align: justify;\"><strong style=\"color: #532501;\">&nbsp;</strong></p>\n<strong>1) Meu plano de saúde alegou que, como meu contrato é antigo, não há cobertura de “Stent”, o que devo fazer? </strong>\n<div class=\"row\" style=\"margin-top: 1em;margin-bottom: 1em;\">\n    <div class=\"col s1\" style=\"font-weight:bold;text-align:right;\">R:</div>\n<div class=\"col s11\" style=\"text-align: justify;\">Embora o contrato de plano de saúde antigo exclua a cobertura, a Justiça entende em sentido contrário (posicionamento pacífico – Súmula 93), obrigando a cobertura de “Stent cardiológico”. O mesmo se aplica com relação a marca-passo, endopróteses cardíacas, e outros materiais cirúrgicos ligados ao ato cirúrgico, sem caráter estético.</div></div>\n\n<p style=\"text-align: justify;\">&nbsp;</p>\n<strong>2) Trabalho há mais de 10 anos em uma empresa e vou me aposentar. Tenho direito a manter o plano de saúde? </strong>\n<div class=\"row\" style=\"margin-top: 1em;margin-bottom: 1em;\">\n    <div class=\"col s1\" style=\"font-weight:bold;text-align:right;\">R:</div>\n<div class=\"col s11\" style=\"text-align: justify;\">Caso o consumidor tenha laborado há 10 anos ou mais na mesma empresa, já esteja aposentado ou tenha direito a se aposentar, e verificado o desconto, em folha de pagamento, de uma cota-parte para pagamento do plano de saúde, é possível a manutenção do plano por prazo indeterminado para o mesmo e seus dependentes, desde que você assuma o pagamento integral do plano.</div>\n</div>\n<p style=\"text-align: justify;\">&nbsp;</p>\n<strong>3) Fui demitido da empresa em que trabalhava, posso manter o plano de saúde? </strong>\n<div class=\"row\" style=\"margin-top: 1em;margin-bottom: 1em;\">\n    <div class=\"col s1\" style=\"font-weight:bold;text-align:right;\">R:</div>\n<div class=\"col s11\" style=\"text-align: justify;\">Sim, por algum tempo. Em casos de demissão, a lei obriga a manutenção do plano de saúde no prazo mínimo de 6 meses e máximo de 2 anos.</div>\n</div>\n<p style=\"text-align: justify;\"><strong style=\"color: #532501;\">&nbsp;</strong></p>\n<strong>4) Quais são os documentos que eu preciso ter em mãos para iniciar um processo contra o meu plano de saúde? </strong>\n<p style=\"text-align: justify;\"><strong style=\"color: #532501;\">&nbsp;</strong></p>\n<div class=\"row\" style=\"\n    display: flex;\n\"><div class=\"col s8 offset-s2 m4 l3\"><img src=\"/assets/imgs/blog/ebook_v2.jpg\" style=\"\n    max-width: 100%;\n\"></div><div class=\"col s12 m8 l9 valign-wrapper\" style=\"\n\"><div><a class=\"abrir-formulario-ebook\"><p style=\"text-align: justify;\"><span style=\"color: #e8b61d;cursor:pointer;\">CLIQUE AQUI E BAIXE UM E-Book. Preparamos um documento com a lista do que você precisa para isso. </span></p></a>\n<a id=\"btn-gerenciar\" class=\"btn center waves-effect waves-light black-text abrir-formulario-ebook\" style=\"position: relative;/* bottom: 125px; */left: 50%;/* margin-left: -25%; */transform: translate(-50%);margin-top: 40px;color: #000 !important;\">Baixar</a></div></div></div>\n\n\n\n<p style=\"text-align: justify;\">&nbsp;</p>\n<p style=\"text-align: justify;text-indent: 35.4pt;\">Por fim recomendamos que procure se informar com um advogado acerca de detalhes particulares e mais específicos do caso.</p>\n\n<p style=\"margin-left: 35.4pt; text-align: justify;\">&nbsp;</p><p style=\"margin-left: 35.4pt; text-align: justify;\">&nbsp;</p><p style=\"margin-left: 35.4pt; text-align: justify;\">&nbsp;</p>\n<p style=\"margin: 0 35.4pt;text-align: justify;color: #e8b61d;\">Jeverton Alex de Oliveira Lima</p>\n<p style=\"margin: 0 35.4pt;text-align: justify;\">Advogado da Young, Dias, Lauxen e Lima,&nbsp; escritório com sedes em São Leopoldo/RS e Porto Alegre/RS, FONE: (051)30855507.</p>\n<div style=\"clear:both;height:30px;\"></div>\n                \n              \n<div style=\"clear:both;height:30px;\"></div>\n</div>', 'RESPONSABILIDADE CIVIL – AÇÕES CONTRA PLANOS DE SAÚDE', 0, 'imagem_01.jpg', '2018-03-11 00:00:00', 'responsabilidade-civil-acoes-contra-planos-de-saude', 0, '2018-03-21 17:33:20'),
(2, 'Alex', '2018-07-09 00:00:00', '<div style=\"font-family: \'effra\', Verdana, Geneva, Tahoma, sans-serif;\"><h5 style=\"text-align: center;\"><strong>ATENÇÃO – ASSALTOS AOS TRABALHADORES DOS CORREIOS</strong></h5>\n<div class=\"row\"><div class=\"col s12 lx10 offset-lx1\"><img src=\"/assets/imgs/blog/imagem_03.jpg\" style=\"\n    max-width: 100%;\n\"></div></div>\n<p style=\"text-align: justify;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Trabalhador dos correios: estas notícias da imagem lhe soam familiar?<br>\nFique atento pois sua segurança deve ser prioridade no seu ambiente de trabalho.<br>\nSeparamos abaixo uma lista de notícias sobre este tipo de incidente.<br>\nSe você está passando por situações assim ou saiba de algum colega, procure a assessoria jurídica para esclarecer as suas dúvidas.</p><br>\n<p style=\"text-align: justify;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <b>Lista de Notícias:</b></p><br><br>\n\n<div class=\"row\" style=\"margin-bottom: 50px;\"><div class=\"col s12 lx10 offset-lx1 center\"><img src=\"/assets/imgs/blog/imagem_04.jpg\" style=\"\n    max-width: 90%; margin: 20px auto;\n\"></div>\n<p style=\"text-align: justify;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; A Justiça do Trabalho condenou os Correios a pagar indenização de R$ 10 mil a cada trabalhador de Curitiba e Região Metropolitana que estava em agências assaltadas nos últimos cinco anos. A decisão é de...</p>\n<a id=\"btn-noticia-1\" class=\"btn btn-golden waves-effect waves-light black-text center\" style=\"position: relative; left: 50%; transform: translateX(-50%);\">LEIA A MATÉRIA NA ÍNTEGRA</a>\n</div>\n\n\n\n<div class=\"row\" style=\"margin-bottom: 50px;\"><div class=\"col s12 lx10 offset-lx1 center\"><img src=\"/assets/imgs/blog/imagem_05.jpg\" style=\"\n    max-width: 90%; margin: 20px auto;\n\"></div>\n<p style=\"text-align: justify;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Um funcionário da Empresa Brasileira de Correios e Telégrafos (ECT) vai receber R$ 10 mil de indenização por causa dos dois assaltos que ele sofreu no ambiente de trabalho, em Presidente Médici (RO). A decisão foi da 2ª Turma do Tribunal...</p>\n<a id=\"btn-noticia-2\" class=\"btn btn-golden waves-effect waves-light black-text center\" style=\"position: relative; left: 50%; transform: translateX(-50%);\">LEIA A MATÉRIA NA ÍNTEGRA</a>\n</div>\n\n\n\n<div class=\"row\" style=\"margin-bottom: 50px;\"><div class=\"col s12 lx10 offset-lx1 center\"><img src=\"/assets/imgs/blog/imagem_08.jpg\" style=\"\n    max-width: 90%; margin: 20px auto;\n\"></div>\n<p style=\"text-align: justify;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; A 2ª Turma do Tribunal Regional do Trabalho da Paraíba (13ª Região) aumentou para R$ 30.888,03 (valores a atualizados) a indenização que a Empresa Brasileira dos Correios e Telégrafos deverá pagar a uma funcionária por danos morais.  A 4ª Vara do Trabalho...</p>\n<a id=\"btn-noticia-3\" class=\"btn btn-golden waves-effect waves-light black-text center\" style=\"position: relative; left: 50%; transform: translateX(-50%);\">LEIA A MATÉRIA NA ÍNTEGRA</a>\n</div>\n\n\n\n<div class=\"row\" style=\"margin-bottom: 50px;\"><div class=\"col s12 lx10 offset-lx1 center\"><img src=\"/assets/imgs/blog/imagem_06.jpg\" style=\"\n    max-width: 90%; margin: 20px auto;\n\"></div>\n<p style=\"text-align: justify;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; A juíza Christiane Bimbatti Amorim, do Tribunal Regional do Trabalho da 9ª Região, alega que as agências não estão adotando medidas suficientes para impedir a ação dos ladrões. “O fato de não ter sido adotado medidas suficientes a fim de evitar roubos e, via de consequência, abalo mental dos que lá trabalham já enseja em culpa”...</p>\n<a id=\"btn-noticia-4\" class=\"btn btn-golden waves-effect waves-light black-text center\" style=\"position: relative; left: 50%; transform: translateX(-50%);\">LEIA A MATÉRIA NA ÍNTEGRA</a>\n</div>\n\n\n\n<div class=\"row\" style=\"margin-bottom: 50px;\"><div class=\"col s12 lx10 offset-lx1 center\"><img src=\"/assets/imgs/blog/imagem_07.jpg\" style=\"\n    max-width: 90%; margin: 20px auto;\n\"></div>\n<p style=\"text-align: justify;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Mais um trabalhador da Empresa Brasileira de Correios e Telégrafos (ECT) conseguiu na justiça o direito a indenização após ser vítima de assalto na agência em que trabalhava. O caso foi julgado procedente na 2º Vara do Trabalho...</p>\n<a id=\"btn-noticia-5\" class=\"btn btn-golden waves-effect waves-light black-text center\" style=\"position: relative; left: 50%; transform: translateX(-50%);\">LEIA A MATÉRIA NA ÍNTEGRA</a>\n</div>\n\n\n<p style=\"margin-left: 35.4pt; text-align: justify;\">&nbsp;</p><p style=\"margin-left: 35.4pt; text-align: justify;\">&nbsp;</p><p style=\"margin-left: 35.4pt; text-align: justify;\">&nbsp;</p>\n<p style=\"margin: 0 35.4pt;text-align: justify;\">Atenciosamente,</p>\n<p style=\"margin: 0 35.4pt;text-align: justify;color: #e8b61d;\">Equipe YDLL</p>\n<p style=\"margin: 0 35.4pt;text-align: justify;\">Advogado da Young, Dias, Lauxen e Lima,&nbsp; escritório com sedes em São Leopoldo/RS e Porto Alegre/RS, FONE: (051)30855507.</p>\n<div style=\"clear:both;height:30px;\"></div>\n                \n              \n<div style=\"clear:both;height:30px;\"></div>\n</div>', 'ATENÇÃO – ASSALTOS AOS TRABALHADORES DOS CORREIOS', 0, 'imagem_03.jpg', '2018-07-09 00:00:00', 'atencao-asstaltos-aos-trabalhadores-dos-correios', 0, '2018-07-11 18:56:50'),
(3, 'Alex', '2018-08-03 00:00:00', '<div style=\"font-family: \'effra\', Verdana, Geneva, Tahoma, sans-serif;\">\n<h5 style=\"text-align: center;\"><strong>SEMINÁRIO DE ORGANIZAÇÃO SINDICAL DO SINTRAJUFE/RS DIA 18 DE AGOSTO	</strong></h5>\n <div class=\"row\">\n <div class=\"col s12 lx10 offset-lx1\">\n <img src=\"/assets/imgs/blog/imagem_09.jpg\" style=\"\n     max-width: 100%;\n \"></div></div>\n<p class=\"justified\">&nbsp;</p>\n<p class=\"justified\">No dia 18 de Agosto, sábado, Jeverton Lima, advogado, sócio do escritório Young, Dias, Lauxen e Lima Advogados Associados e coordenador da assessoria jurídica do Sintrajufe/RS estará presente no Seminário de Organização Sindical do Sintrajufe/RS que ocorrerá no Salão Multicultural Alê Junqueira, no endereço Rua Marcílio Dias, 660, Bairro Menino Deus em Porto Alegre. O início será às 10 horas.</p>\n<p class=\"justified\">&nbsp;</p>\n<p class=\"justified\">Segundo dados do site do Sintrajufe/RS, o objetivo do seminário é iniciar o debate sobre a unificação da representação das categorias do Judiciário Federal e do Ministério Público da União no Sintrajufe/RS. O evento está aberto à participação dos servidores de ambas as categorias.</p>\n<p class=\"justified\">&nbsp;</p>\n<div class=\"row\"><img src=\"/assets/imgs/blog/imagem_10.jpeg\" style=\"max-width: 100%;\">\n<small>*Imagem retirada do site do Sintrajufe/RS.</small></div>\n<div class=\"row\">\n<p class=\"center\">Confira no <a href=\"https://www.sintrajufe.org.br/ultimas-noticias-detalhe/15846/sintrajufe-rs-promove-dia-18-seminario-de-organizacao-sindical-com-participacao-de-servidores-do-mpu\" target=\"_blank\">site do Sintrajufe/RS</a> a matéria e a programação completa.</p>\n</div>\n</div>', 'SEMINÁRIO DE ORGANIZAÇÃO SINDICAL DO SINTRAJUFE/RS DIA 18 DE AGOSTO', 0, 'imagem_09.jpg', '2018-08-03 00:00:00', 'seminario-de-organizacao-sindical-do-sintrajufe-rs-18-agosto', 0, '2018-08-03 17:26:19');

-- --------------------------------------------------------

--
-- Estrutura da tabela `node_post_categoria`
--

DROP TABLE IF EXISTS `node_post_categoria`;
CREATE TABLE IF NOT EXISTS `node_post_categoria` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_post` int(11) NOT NULL,
  `id_categoria` int(11) NOT NULL,
  `deletado` tinyint(4) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_post` (`id_post`),
  KEY `id_categoria` (`id_categoria`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `node_post_categoria`
--

INSERT INTO `node_post_categoria` (`id`, `id_post`, `id_categoria`, `deletado`, `data_cadastro`) VALUES
(1, 1, 2, 0, '2018-06-04 16:47:15'),
(2, 1, 4, 0, '2018-06-04 16:47:15');

-- --------------------------------------------------------

--
-- Estrutura da tabela `notificacoes`
--

DROP TABLE IF EXISTS `notificacoes`;
CREATE TABLE IF NOT EXISTS `notificacoes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_usuario_criador` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `texto` text NOT NULL,
  `link` varchar(250) NOT NULL,
  `visto` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0 - Não foi visto\n1 - Foi visto',
  `deletado` tinyint(1) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=458 DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `notificacoes`
--

INSERT INTO `notificacoes` (`id`, `id_usuario_criador`, `id_usuario`, `texto`, `link`, `visto`, `deletado`, `data_cadastro`) VALUES
(2, 1, 2, 'Adicionado Compromisso \"teste\"', '/compromissos/controle_distribuicao', 1, 0, '2019-02-10 05:46:35'),
(12, 1, 2, 'Adicionado Compromisso \"Novo Compromisso vagabundo\"', '/compromissos/controle_distribuicao', 1, 0, '2019-02-10 07:37:02'),
(22, 1, 2, 'Adicionado Compromisso \"teste not\"', '/compromissos/controle_distribuicao', 1, 0, '2019-02-10 07:44:42'),
(32, 1, 2, 'Atribuido Processo \"0000226-16.2012.5.04.0303\"', '/processos/abrir/1', 1, 0, '2019-02-10 08:35:22'),
(42, 1, 2, 'Atribuido Processo \"NA13830-38.2019.6.31.0000\"', '/processos/abrir/103', 1, 0, '2019-02-10 08:35:49'),
(52, 1, 2, 'Adicionado Compromisso \"qqqqqqqq\"', '/compromissos/controle_distribuicao', 1, 0, '2019-02-10 19:59:59'),
(62, 1, 2, 'Atribuido Processo \"NA11262-68.2019.3.29.0000\"', '/processos/abrir/63', 1, 0, '2019-02-10 20:50:07'),
(72, 1, 6, 'Adicionado Compromisso \"NOVO TESTE\"', '/compromissos/controle_distribuicao', 1, 0, '2019-02-10 22:02:18'),
(82, 1, 6, 'Adicionado Compromisso \"Apenso New\"', '/compromissos/controle_distribuicao', 1, 0, '2019-02-10 22:19:25'),
(92, 1, 6, 'Adicionado Compromisso \"apenso compromisso\"', '/compromissos/controle_distribuicao', 1, 0, '2019-02-10 22:20:23'),
(102, 1, 9, 'Adicionado Compromisso \"qqqqqqq\"', '/compromissos/pauta_julgamento', 1, 0, '2019-02-10 22:27:17'),
(112, 6, 1, 'Adicionado Compromisso \"teste\"', '/compromissos/pauta_julgamento', 1, 0, '2019-02-10 22:31:43'),
(122, 1, 0, 'Adicionado Compromisso \"teste\"', '/compromissos/pauta_julgamento', 0, 0, '2019-02-10 22:48:07'),
(132, 1, 0, 'Adicionado Compromisso \"123123\"', '/compromissos/controle_distribuicao', 0, 0, '2019-02-10 22:49:30'),
(142, 1, 0, 'Adicionado Compromisso \"12312312\"', '/compromissos/pauta_julgamento', 0, 0, '2019-02-10 22:49:56'),
(152, 1, 0, 'Adicionado Compromisso \"123123\"', '/compromissos/pauta_julgamento', 0, 0, '2019-02-10 22:51:10'),
(162, 1, 6, 'Adicionado Compromisso \"recurso\"', '/compromissos/controle_distribuicao', 1, 0, '2019-02-11 01:21:15'),
(172, 1, 4, 'Adicionado Compromisso \"teste\"', '/compromissos/pauta_compromisso', 1, 0, '2019-02-11 12:35:41'),
(182, 1, 1, 'Adicionado Compromisso \"pessoal\"', '/compromissos', 1, 0, '2019-02-11 12:51:53'),
(192, 1, 3, 'Adicionado Compromisso \"julgamento\"', '/compromissos/pauta_compromisso', 0, 0, '2019-02-11 13:05:47'),
(202, 1, 2, 'Adicionado Compromisso \"julgamento2\"', '/compromissos/pauta_compromisso', 1, 0, '2019-02-11 13:07:40'),
(212, 1, 3, 'Adicionado Compromisso \"pessoal\"', '/compromissos/pauta_compromisso', 1, 0, '2019-02-11 13:11:56'),
(222, 1, 4, 'Adicionado Compromisso \"pessoal\"', '/compromissos/', 1, 0, '2019-02-11 13:13:54'),
(232, 3, 9, 'Concluída Tarefa \"Teste Nova tarefa\"', '/tarefas/tarefas', 1, 0, '2019-02-11 17:02:25'),
(242, 3, 9, 'Concluída Tarefa 2 \"Teste Nova tarefa\"', '/tarefas/tarefas', 1, 0, '2019-02-11 17:11:22'),
(252, 3, 9, 'Concluída Tarefa 2 \"Teste Nova tarefa\"', '/tarefas/tarefas', 1, 0, '2019-02-11 17:11:27'),
(262, 3, 9, 'Concluída Tarefa 2 \"Teste Nova tarefa\"', '/tarefas/tarefas', 1, 0, '2019-02-11 17:13:04'),
(272, 3, 9, 'Concluída Tarefa \"Teste Nova tarefa\"', '/tarefas/tarefas', 1, 0, '2019-02-11 17:14:16'),
(282, 4, 9, 'Criada a Tarefa \"teste\"', '/tarefas/tarefas', 1, 0, '2019-02-11 18:18:21'),
(292, 9, 4, 'Criada a Tarefa \"qqqqqqq\"', '/tarefas/tarefas', 0, 0, '2019-02-11 18:19:52'),
(302, 6, 9, 'Criada a Tarefa \"abc\"', '/tarefas/tarefas', 1, 0, '2019-02-11 18:21:07'),
(312, 6, 4, 'Criada a Tarefa \"abc\"', '/tarefas/tarefas', 0, 0, '2019-02-11 18:21:07'),
(424, 1, 9, 'Adicionado Compromisso \"teste\"', '/compromissos/controle_distribuicao', 0, 0, '2019-02-15 13:51:53'),
(402, 1, 9, 'Adicionado Compromisso \"qqqqqqq\"', '/compromissos/controle_distribuicao', 1, 0, '2019-02-12 00:07:26'),
(412, 1, 0, 'Adicionado Compromisso \"providencia\"', '/compromissos/controle_distribuicao', 0, 0, '2019-02-12 01:13:59'),
(415, 1, 9, 'Atribuido Processo \"NA74273-79.2019.7.59.0000\"', '/processos/abrir/1', 0, 0, '2019-02-13 19:08:56'),
(416, 6, 6, 'Atribuido Processo \"NA74273-79.2019.7.59.0000\"', '/processos/abrir/1', 1, 0, '2019-02-13 19:10:34'),
(417, 6, 6, 'Adicionado Compromisso \"técnica\"', '/compromissos/pauta_compromisso', 1, 0, '2019-02-13 19:44:43'),
(418, 6, 9, 'Adicionado Compromisso \"Acórdão\"', '/compromissos/controle_distribuicao', 0, 0, '2019-02-13 19:59:40'),
(425, 9, 9, 'Adicionado Compromisso \"X\"', '/compromissos/controle_distribuicao', 0, 0, '2019-02-28 17:53:13'),
(426, 9, 0, 'Adicionado Compromisso \"a\"', '/compromissos/pauta_compromisso', 0, 0, '2019-02-28 17:56:42'),
(427, 9, 9, 'Criada a Tarefa \"LIGAR PARA CLIENTE\"', '/tarefas/tarefas', 0, 0, '2019-02-28 18:09:29'),
(428, 1, 9, 'Adicionado Compromisso \"\"', '/compromissos/pauta_compromisso', 0, 0, '2019-03-04 02:39:02'),
(429, 1, 0, 'Adicionado Compromisso \"\"', '/compromissos/controle_distribuicao', 0, 0, '2019-03-04 14:35:02'),
(430, 6, 36, 'Atribuido Processo \"0020182-20.2019.5.04.0029\"', '/processos/abrir/13', 0, 0, '2019-03-29 18:02:53'),
(431, 6, 36, 'Adicionado Compromisso \"Inicial \"', '/processos/abrir/13', 0, 0, '2019-03-29 18:05:00'),
(432, 6, 36, 'Atribuido Processo \"0020201-95.2019.5.04.0006\"', '/processos/abrir/14', 0, 0, '2019-03-29 18:26:44'),
(433, 6, 36, 'Adicionado Compromisso \"inicial \"', '/processos/abrir/14', 0, 0, '2019-03-29 18:33:01'),
(434, 6, 36, 'Atribuido Processo \"0020237-35.2019.5.04.0331\"', '/processos/abrir/15', 0, 0, '2019-03-29 19:04:39'),
(435, 6, 36, 'Adicionado Compromisso \"Inicial \"', '/processos/abrir/15', 0, 0, '2019-03-29 19:05:37'),
(436, 6, 36, 'Adicionado Compromisso \"inicial\"', '/processos/abrir/16', 0, 0, '2019-03-29 19:18:36'),
(437, 6, 36, 'Atribuido Processo \"0020192-73.2019.5.04.0026\"', '/processos/abrir/16', 0, 0, '2019-03-29 19:18:41'),
(438, 6, 36, 'Adicionado Compromisso \"inicial \"', '/processos/abrir/17', 0, 0, '2019-03-29 19:29:57'),
(439, 6, 36, 'Atribuido Processo \"0020128-93.2019.5.04.0016\"', '/processos/abrir/17', 0, 0, '2019-03-29 19:29:59'),
(440, 6, 36, 'Atribuido Processo \"0020232-85.2019.5.04.0016\"', '/processos/abrir/18', 0, 0, '2019-03-29 19:41:19'),
(441, 6, 36, 'Adicionado Compromisso \"inicial\"', '/processos/abrir/19', 0, 0, '2019-03-29 20:04:25'),
(442, 6, 36, 'Atribuido Processo \"0020207-96.2019.5.04.0202\"', '/processos/abrir/19', 0, 0, '2019-03-29 20:05:30'),
(443, 6, 36, 'Adicionado Compromisso \"inicial\"', '/processos/abrir/20', 0, 0, '2019-03-29 20:17:59'),
(444, 6, 36, 'Atribuido Processo \"0020190-63.2019.5.04.0007\"', '/processos/abrir/20', 0, 0, '2019-03-29 20:18:01'),
(445, 6, 36, 'Adicionado Compromisso \"inical\"', '/processos/abrir/21', 0, 0, '2019-03-29 20:30:00'),
(446, 6, 36, 'Atribuido Processo \"0020181-71.2019.5.04.0017\"', '/processos/abrir/21', 0, 0, '2019-03-29 20:30:01'),
(447, 1, 10, 'Adicionado Compromisso \"\"', '/compromissos/controle_distribuicao', 0, 0, '2019-09-04 21:46:05'),
(448, 1, 10, 'Adicionado Compromisso \"\"', '/compromissos/controle_distribuicao', 0, 0, '2019-09-04 21:46:39'),
(449, 1, 10, 'Adicionado Compromisso \"Teste mesma data\"', '/compromissos/controle_distribuicao', 0, 0, '2019-09-04 21:47:24'),
(450, 1, 32, 'Adicionado Compromisso \"\"', '/compromissos/controle_distribuicao', 0, 0, '2019-09-04 21:48:08'),
(451, 1, 10, 'Adicionado Compromisso \"Teste\"', '/compromissos/pauta_julgamento', 0, 0, '2019-09-05 21:57:31'),
(452, 1, 9, 'Adicionado Compromisso \"\"', '/compromissos/controle_distribuicao', 0, 0, '2019-09-06 17:13:56'),
(453, 1, 18, 'Adicionado Compromisso \"\"', '/compromissos/controle_distribuicao', 0, 0, '2019-09-06 17:26:39'),
(454, 1, 40, 'Adicionado Compromisso \"\"', '/compromissos/controle_distribuicao', 0, 0, '2019-09-06 17:27:16'),
(455, 1, 20, 'Adicionado Compromisso \"\"', '/compromissos/pauta_julgamento', 0, 0, '2019-09-12 21:34:26'),
(456, 1, 9, 'Adicionado Compromisso \"\"', '/compromissos/pauta_julgamento', 0, 0, '2019-09-12 21:34:43'),
(457, 1, 10, 'Adicionado Compromisso \"oie\"', '/processos/abrir/24', 0, 0, '2019-10-09 21:45:23');

-- --------------------------------------------------------

--
-- Estrutura da tabela `origem_captacao_processo`
--

DROP TABLE IF EXISTS `origem_captacao_processo`;
CREATE TABLE IF NOT EXISTS `origem_captacao_processo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descricao` varchar(150) NOT NULL,
  `deletado` tinyint(1) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `origem_captacao_processo`
--

INSERT INTO `origem_captacao_processo` (`id`, `descricao`, `deletado`, `data_cadastro`) VALUES
(1, '---------------------------', 0, '2018-05-29 17:06:26'),
(2, 'Ver Necessidade', 0, '2018-05-29 17:35:01');

-- --------------------------------------------------------

--
-- Estrutura da tabela `outros_envolvidos_adverso_processo`
--

DROP TABLE IF EXISTS `outros_envolvidos_adverso_processo`;
CREATE TABLE IF NOT EXISTS `outros_envolvidos_adverso_processo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_processo` int(11) NOT NULL,
  `id_adverso` int(11) NOT NULL,
  `id_outros_tipo` int(11) NOT NULL,
  `deletado` tinyint(1) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `outros_envolvidos_adverso_processo`
--

INSERT INTO `outros_envolvidos_adverso_processo` (`id`, `id_processo`, `id_adverso`, `id_outros_tipo`, `deletado`, `data_cadastro`) VALUES
(1, 1, 2, 4, 1, '2018-06-15 18:45:05'),
(2, 12, 102, 0, 1, '2019-02-10 20:55:23'),
(3, 1, 2, 4, 0, '2019-02-14 17:08:01'),
(4, 4, 1, 2, 0, '2019-02-14 23:50:17'),
(5, 4, 2, 4, 0, '2019-02-15 01:38:15'),
(6, 12, 2, 4, 0, '2019-02-28 17:38:58');

-- --------------------------------------------------------

--
-- Estrutura da tabela `outros_envolvidos_cliente_processo`
--

DROP TABLE IF EXISTS `outros_envolvidos_cliente_processo`;
CREATE TABLE IF NOT EXISTS `outros_envolvidos_cliente_processo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_processo` int(11) NOT NULL,
  `id_cliente` int(11) NOT NULL,
  `id_outros_tipo` int(11) NOT NULL,
  `deletado` tinyint(1) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `outros_envolvidos_cliente_processo`
--

INSERT INTO `outros_envolvidos_cliente_processo` (`id`, `id_processo`, `id_cliente`, `id_outros_tipo`, `deletado`, `data_cadastro`) VALUES
(1, 21, 16, 0, 0, '2019-08-16 15:01:31'),
(2, 24, 16, 0, 0, '2019-10-07 22:07:31');

-- --------------------------------------------------------

--
-- Estrutura da tabela `outros_envolvidos_tipo_processo`
--

DROP TABLE IF EXISTS `outros_envolvidos_tipo_processo`;
CREATE TABLE IF NOT EXISTS `outros_envolvidos_tipo_processo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descricao` varchar(150) NOT NULL,
  `deletado` tinyint(1) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `outros_envolvidos_tipo_processo`
--

INSERT INTO `outros_envolvidos_tipo_processo` (`id`, `descricao`, `deletado`, `data_cadastro`) VALUES
(1, '------------', 0, '2018-06-15 18:40:06'),
(2, 'Autor', 0, '2018-06-15 18:40:06'),
(3, 'Litisconsorte', 0, '2018-06-15 18:40:06'),
(4, 'Réu', 0, '2018-06-15 18:40:06'),
(5, 'Terceiro Interessado', 0, '2018-06-15 18:40:06');

-- --------------------------------------------------------

--
-- Estrutura da tabela `parcela_processo`
--

DROP TABLE IF EXISTS `parcela_processo`;
CREATE TABLE IF NOT EXISTS `parcela_processo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_processo` int(11) NOT NULL,
  `valor` double NOT NULL,
  `data_vencimento` date DEFAULT NULL,
  `data_recebimento_reclamada` date DEFAULT NULL,
  `data_pago_reclamante` date DEFAULT NULL,
  `acessor_juridico` double DEFAULT NULL,
  `imposto_renda` double DEFAULT NULL,
  `INSS` double DEFAULT NULL,
  `outros_descontos` double DEFAULT NULL,
  `deletado` tinyint(4) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_processo` (`id_processo`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `parcela_processo`
--

INSERT INTO `parcela_processo` (`id`, `id_processo`, `valor`, `data_vencimento`, `data_recebimento_reclamada`, `data_pago_reclamante`, `acessor_juridico`, `imposto_renda`, `INSS`, `outros_descontos`, `deletado`, `data_cadastro`) VALUES
(1, 24, 500, '2019-10-10', NULL, NULL, NULL, NULL, NULL, NULL, 0, '2019-10-10 23:08:25');

-- --------------------------------------------------------

--
-- Estrutura da tabela `pasta_cliente`
--

DROP TABLE IF EXISTS `pasta_cliente`;
CREATE TABLE IF NOT EXISTS `pasta_cliente` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_cliente` int(11) NOT NULL,
  `deletado` int(11) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `podcast`
--

DROP TABLE IF EXISTS `podcast`;
CREATE TABLE IF NOT EXISTS `podcast` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(150) NOT NULL,
  `descricao` varchar(2000) NOT NULL,
  `imagem` varchar(150) DEFAULT NULL,
  `arquivo_mp3` varchar(150) NOT NULL,
  `arquivo_ogg` varchar(150) NOT NULL,
  `deletado` tinyint(1) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=34 DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `podcast`
--

INSERT INTO `podcast` (`id`, `titulo`, `descricao`, `imagem`, `arquivo_mp3`, `arquivo_ogg`, `deletado`, `data_cadastro`) VALUES
(1, 'PodCast 01', 'Melhor podcast do Mundo', 'podcast-capa01.jpg', 'podcast_juridico01.mp3', 'podcast_juridico01.ogg', 0, '2018-04-17 16:55:49'),
(2, 'PodCast 02', 'Melhor podcast do Mundo', 'podcast-capa01.jpg', 'podcast_juridico01.mp3', 'podcast_juridico01.ogg', 0, '2018-04-17 16:55:49'),
(3, 'PodCast 03', 'Melhor podcast do Mundo', 'podcast-capa01.jpg', 'podcast_juridico01.mp3', 'podcast_juridico01.ogg', 0, '2018-04-17 16:55:49'),
(4, 'PodCast 04', 'Melhor podcast do Mundo', 'podcast-capa01.jpg', 'podcast_juridico01.mp3', 'podcast_juridico01.ogg', 0, '2018-04-17 16:55:49'),
(5, 'PodCast 05', 'Melhor podcast do Mundo', 'podcast-capa01.jpg', 'podcast_juridico01.mp3', 'podcast_juridico01.ogg', 0, '2018-04-17 16:55:49'),
(6, 'PodCast 06', 'Melhor podcast do Mundo', 'podcast-capa01.jpg', 'podcast_juridico01.mp3', 'podcast_juridico01.ogg', 0, '2018-04-17 16:55:49'),
(7, 'PodCast 07', 'Melhor podcast do Mundo', 'podcast-capa01.jpg', 'podcast_juridico01.mp3', 'podcast_juridico01.ogg', 0, '2018-04-17 16:55:49'),
(8, 'PodCast 08', 'Melhor podcast do Mundo', 'podcast-capa01.jpg', 'podcast_juridico01.mp3', 'podcast_juridico01.ogg', 0, '2018-04-17 16:55:49'),
(9, 'PodCast 09', 'Melhor podcast do Mundo', 'podcast-capa01.jpg', 'podcast_juridico01.mp3', 'podcast_juridico01.ogg', 0, '2018-04-17 16:55:49'),
(10, 'PodCast 10', 'Melhor podcast do Mundo', 'podcast-capa01.jpg', 'podcast_juridico01.mp3', 'podcast_juridico01.ogg', 0, '2018-04-24 16:29:23'),
(11, 'PodCast 11', 'Melhor podcast do Mundo', 'podcast-capa01.jpg', 'podcast_juridico01.mp3', 'podcast_juridico01.ogg', 0, '2018-04-24 16:29:23'),
(12, 'PodCast 12', 'Melhor podcast do Mundo', 'podcast-capa01.jpg', 'podcast_juridico01.mp3', 'podcast_juridico01.ogg', 0, '2018-04-24 16:29:23'),
(13, 'PodCast 13', 'Melhor podcast do Mundo', 'podcast-capa01.jpg', 'podcast_juridico01.mp3', 'podcast_juridico01.ogg', 0, '2018-04-24 16:29:23'),
(14, 'PodCast 14', 'Melhor podcast do Mundo', 'podcast-capa01.jpg', 'podcast_juridico01.mp3', 'podcast_juridico01.ogg', 0, '2018-04-24 16:29:23'),
(15, 'PodCast 15', 'Melhor podcast do Mundo', 'podcast-capa01.jpg', 'podcast_juridico01.mp3', 'podcast_juridico01.ogg', 0, '2018-04-24 16:29:23'),
(16, 'PodCast 16', 'Melhor podcast do Mundo', 'podcast-capa01.jpg', 'podcast_juridico01.mp3', 'podcast_juridico01.ogg', 0, '2018-04-24 16:29:23'),
(17, 'PodCast 17', 'Melhor podcast do Mundo', 'podcast-capa01.jpg', 'podcast_juridico01.mp3', 'podcast_juridico01.ogg', 0, '2018-04-24 16:29:23'),
(18, 'PodCast 18', 'Melhor podcast do Mundo', 'podcast-capa01.jpg', 'podcast_juridico01.mp3', 'podcast_juridico01.ogg', 0, '2018-04-24 16:29:23'),
(19, 'PodCast 19', 'Melhor podcast do Mundo', 'podcast-capa01.jpg', 'podcast_juridico01.mp3', 'podcast_juridico01.ogg', 0, '2018-04-24 16:29:23'),
(20, 'PodCast 20', 'Melhor podcast do Mundo', 'podcast-capa01.jpg', 'podcast_juridico01.mp3', 'podcast_juridico01.ogg', 0, '2018-04-24 16:29:23'),
(21, 'PodCast 21', 'Melhor podcast do Mundo', 'podcast-capa01.jpg', 'podcast_juridico01.mp3', 'podcast_juridico01.ogg', 0, '2018-04-24 16:29:23'),
(22, 'PodCast 22', 'Melhor podcast do Mundo', 'podcast-capa01.jpg', 'podcast_juridico01.mp3', 'podcast_juridico01.ogg', 0, '2018-04-24 16:29:23'),
(23, 'PodCast 23', 'Melhor podcast do Mundo', 'podcast-capa01.jpg', 'podcast_juridico01.mp3', 'podcast_juridico01.ogg', 0, '2018-04-24 16:29:23'),
(24, 'PodCast 24', 'Melhor podcast do Mundo', 'podcast-capa01.jpg', 'podcast_juridico01.mp3', 'podcast_juridico01.ogg', 0, '2018-04-24 16:29:23'),
(25, 'PodCast 25', 'Melhor podcast do Mundo', 'podcast-capa01.jpg', 'podcast_juridico01.mp3', 'podcast_juridico01.ogg', 0, '2018-04-24 16:29:23'),
(26, 'PodCast 26', 'Melhor podcast do Mundo', 'podcast-capa01.jpg', 'podcast_juridico01.mp3', 'podcast_juridico01.ogg', 0, '2018-04-24 16:29:23'),
(27, 'PodCast 27', 'Melhor podcast do Mundo', 'podcast-capa01.jpg', 'podcast_juridico01.mp3', 'podcast_juridico01.ogg', 0, '2018-04-24 16:29:23'),
(28, 'PodCast 28', 'Melhor podcast do Mundo', 'podcast-capa01.jpg', 'podcast_juridico01.mp3', 'podcast_juridico01.ogg', 0, '2018-04-24 16:29:23'),
(29, 'PodCast 29', 'Melhor podcast do Mundo', 'podcast-capa01.jpg', 'podcast_juridico01.mp3', 'podcast_juridico01.ogg', 0, '2018-04-24 16:29:23'),
(30, 'PodCast 30', 'Melhor podcast do Mundo', 'podcast-capa01.jpg', 'podcast_juridico01.mp3', 'podcast_juridico01.ogg', 0, '2018-04-24 16:29:23'),
(31, 'PodCast 31', 'Melhor podcast do Mundo', 'podcast-capa01.jpg', 'podcast_juridico01.mp3', 'podcast_juridico01.ogg', 0, '2018-04-24 16:29:23'),
(32, 'PodCast 32', 'Melhor podcast do Mundo', 'podcast-capa01.jpg', 'podcast_juridico01.mp3', 'podcast_juridico01.ogg', 0, '2018-04-24 16:29:23');

-- --------------------------------------------------------

--
-- Estrutura da tabela `posicao_apenso`
--

DROP TABLE IF EXISTS `posicao_apenso`;
CREATE TABLE IF NOT EXISTS `posicao_apenso` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descricao` varchar(150) NOT NULL,
  `deletado` tinyint(1) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `posicao_apenso`
--

INSERT INTO `posicao_apenso` (`id`, `descricao`, `deletado`, `data_cadastro`) VALUES
(1, 'Agravado', 0, '2018-05-29 17:05:28'),
(2, 'Agravante', 0, '2018-05-29 17:05:44'),
(3, 'Agravo Instrumento', 0, '2018-05-29 17:05:44');

-- --------------------------------------------------------

--
-- Estrutura da tabela `postagens`
--

DROP TABLE IF EXISTS `postagens`;
CREATE TABLE IF NOT EXISTS `postagens` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_usuario` int(11) NOT NULL,
  `id_categoria` int(11) NOT NULL,
  `titulo` varchar(150) NOT NULL,
  `descricao` text NOT NULL,
  `imagem` varchar(150) NOT NULL,
  `deletado` tinyint(1) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `data_atualizado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_usuario` (`id_usuario`),
  KEY `id_categoria` (`id_categoria`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura da tabela `postagens_categorias`
--

DROP TABLE IF EXISTS `postagens_categorias`;
CREATE TABLE IF NOT EXISTS `postagens_categorias` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_postagem` int(11) NOT NULL,
  `nome` varchar(150) NOT NULL,
  `descricao` text NOT NULL,
  `deletado` tinyint(1) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_postagem` (`id_postagem`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `processos`
--

DROP TABLE IF EXISTS `processos`;
CREATE TABLE IF NOT EXISTS `processos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_usuario` int(11) NOT NULL,
  `id_cliente` int(11) NOT NULL,
  `id_posicao_cliente` int(11) NOT NULL,
  `id_adverso` int(11) NOT NULL,
  `id_advogado` int(11) DEFAULT NULL,
  `id_tipo_causa` int(11) DEFAULT NULL,
  `id_assunto` int(11) DEFAULT NULL,
  `id_comarca` int(11) DEFAULT NULL,
  `id_tipo_acao_rito` int(11) DEFAULT NULL,
  `id_vara` int(11) DEFAULT NULL,
  `id_categoria` int(11) DEFAULT NULL,
  `id_fase` int(11) DEFAULT NULL,
  `numero` varchar(50) NOT NULL,
  `data` date DEFAULT NULL,
  `hora` time DEFAULT NULL,
  `valor_causa` double DEFAULT NULL,
  `distribuicao` date DEFAULT NULL,
  `citacao` date DEFAULT NULL,
  `vip` int(11) DEFAULT '0' COMMENT '0 = não, 1 = sim',
  `status` int(11) NOT NULL DEFAULT '0' COMMENT '0 = Processo Interno, 1 = Em andamento, 2 =  Entrar em Contato com o Cliente, 3 = Ajuizado, 4 = Audiência Marcada',
  `deletado` tinyint(1) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_usuario` (`id_usuario`),
  KEY `id_cliente` (`id_cliente`),
  KEY `id_adverso` (`id_adverso`),
  KEY `id_advogado` (`id_advogado`),
  KEY `id_tipo` (`id_tipo_causa`),
  KEY `id_assunto` (`id_assunto`),
  KEY `id_comarca` (`id_comarca`),
  KEY `id_tipo_acao_rito` (`id_tipo_acao_rito`),
  KEY `id_vara` (`id_vara`),
  KEY `id_categoria` (`id_categoria`),
  KEY `id_fase` (`id_fase`),
  KEY `id_posicao_cliente` (`id_posicao_cliente`)
) ENGINE=MyISAM AUTO_INCREMENT=25 DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `processos`
--

INSERT INTO `processos` (`id`, `id_usuario`, `id_cliente`, `id_posicao_cliente`, `id_adverso`, `id_advogado`, `id_tipo_causa`, `id_assunto`, `id_comarca`, `id_tipo_acao_rito`, `id_vara`, `id_categoria`, `id_fase`, `numero`, `data`, `hora`, `valor_causa`, `distribuicao`, `citacao`, `vip`, `status`, `deletado`, `data_cadastro`) VALUES
(1, 1, 1, 1, 1, 1, 40, 193, 76, 39, 194, 195, 196, '0020136-58.2019.5.04.0020', NULL, NULL, NULL, NULL, NULL, 0, 0, 0, '2019-02-13 18:22:13'),
(12, 1, 11, 1, 1, NULL, 40, 193, 192, NULL, NULL, NULL, NULL, '0020197-04.2019.5.04.0024', NULL, NULL, NULL, NULL, NULL, 0, 0, 0, '2019-02-28 17:37:51'),
(13, 6, 12, 1, 1, 36, 40, 193, 192, 38, 199, 195, 196, '0020182-20.2019.5.04.0029', NULL, NULL, NULL, '0000-00-00', NULL, 0, 0, 0, '2019-03-29 17:55:04'),
(14, 6, 13, 1, 1, 36, 40, 193, 192, 38, 200, 195, 196, '0020201-95.2019.5.04.0006', NULL, NULL, NULL, NULL, NULL, 0, 0, 0, '2019-03-29 18:22:39'),
(15, 6, 14, 1, 12, 36, 40, 193, 76, 38, 201, 195, 196, '0020237-35.2019.5.04.0331', NULL, NULL, NULL, NULL, NULL, 0, 0, 0, '2019-03-29 19:03:00'),
(16, 6, 15, 1, 1, 36, 40, 193, 192, 38, 202, 195, 196, '0020192-73.2019.5.04.0026', NULL, NULL, NULL, NULL, NULL, 0, 0, 0, '2019-03-29 19:16:11'),
(17, 6, 16, 1, 1, 36, 40, 193, 192, 39, 203, 195, 196, '0020128-93.2019.5.04.0016', NULL, NULL, NULL, NULL, NULL, 0, 0, 0, '2019-03-29 19:27:53'),
(18, 6, 17, 1, 1, 36, 40, 193, 192, 38, 203, 195, 196, '0020232-85.2019.5.04.0016', NULL, NULL, NULL, NULL, NULL, 0, 0, 0, '2019-03-29 19:38:48'),
(19, 6, 18, 1, 13, 36, 40, 193, 132, NULL, 204, 195, 196, '0020207-96.2019.5.04.0202', NULL, NULL, NULL, NULL, NULL, 0, 0, 0, '2019-03-29 19:59:44'),
(20, 6, 19, 1, 1, 36, 40, 193, 192, 38, 205, 195, 196, '0020190-63.2019.5.04.0007', NULL, NULL, NULL, NULL, NULL, 0, 0, 0, '2019-03-29 20:15:35'),
(21, 6, 20, 1, 1, 36, 40, 193, 192, 38, 206, 195, 196, '0020181-71.2019.5.04.0017', NULL, NULL, NULL, NULL, NULL, 0, 0, 0, '2019-03-29 20:27:43'),
(22, 1, 12, 1, 12, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'NA12953-21.2019.8.62.0000', NULL, NULL, NULL, NULL, NULL, 0, 0, 0, '2019-09-05 20:31:56'),
(23, 1, 19, 1, 12, NULL, NULL, NULL, 207, NULL, 216, NULL, NULL, 'NANANA9-52.0192.1.50.000', NULL, NULL, NULL, NULL, NULL, 0, 0, 0, '2019-09-06 17:23:02'),
(24, 1, 15, 1, 2, NULL, NULL, NULL, 208, NULL, 204, NULL, NULL, 'NA40256-95.2019.3.64.0000', NULL, NULL, NULL, NULL, NULL, 0, 0, 0, '2019-09-06 17:23:54');

-- --------------------------------------------------------

--
-- Estrutura da tabela `recurso`
--

DROP TABLE IF EXISTS `recurso`;
CREATE TABLE IF NOT EXISTS `recurso` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_usuario` int(11) NOT NULL,
  `id_processo` int(11) DEFAULT NULL,
  `id_apenso` int(11) DEFAULT NULL,
  `id_advogado` int(11) DEFAULT NULL,
  `id_relator` int(11) DEFAULT NULL,
  `id_tipo_recurso` int(11) DEFAULT NULL,
  `id_posicao_cliente` int(11) DEFAULT NULL,
  `id_tribunal` int(11) DEFAULT NULL,
  `id_turma_camara` int(11) DEFAULT NULL,
  `numero` varchar(50) NOT NULL,
  `interposicao` date DEFAULT NULL,
  `ajuizado` date DEFAULT NULL,
  `deletado` tinyint(4) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_usuario` (`id_usuario`),
  KEY `id_processo` (`id_processo`),
  KEY `id_apenso` (`id_apenso`),
  KEY `id_advogado` (`id_advogado`),
  KEY `id_relator` (`id_relator`),
  KEY `id_tipo_recurso` (`id_tipo_recurso`),
  KEY `id_posicao_cliente` (`id_posicao_cliente`),
  KEY `id_tribunal` (`id_tribunal`),
  KEY `id_turma_camara` (`id_turma_camara`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `recurso`
--

INSERT INTO `recurso` (`id`, `id_usuario`, `id_processo`, `id_apenso`, `id_advogado`, `id_relator`, `id_tipo_recurso`, `id_posicao_cliente`, `id_tribunal`, `id_turma_camara`, `numero`, `interposicao`, `ajuizado`, `deletado`, `data_cadastro`) VALUES
(1, 1, 24, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'NA40256-95.2019.3.64.0000', NULL, NULL, 0, '2019-10-07 22:12:10');

-- --------------------------------------------------------

--
-- Estrutura da tabela `relator`
--

DROP TABLE IF EXISTS `relator`;
CREATE TABLE IF NOT EXISTS `relator` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descricao` varchar(150) NOT NULL,
  `deletado` tinyint(1) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `relator`
--

INSERT INTO `relator` (`id`, `descricao`, `deletado`, `data_cadastro`) VALUES
(1, 'Alberto Luiz Bresciane de Fontan', 0, '2018-05-29 17:05:28'),
(2, 'Alcides Matte', 0, '2018-05-29 17:05:44'),
(3, 'Alexandre Mussoi Moreira', 0, '2018-05-29 17:05:44');

-- --------------------------------------------------------

--
-- Estrutura da tabela `requisicoes`
--

DROP TABLE IF EXISTS `requisicoes`;
CREATE TABLE IF NOT EXISTS `requisicoes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_usuario` int(11) NOT NULL,
  `data` date NOT NULL,
  `nome` varchar(150) DEFAULT NULL,
  `numero_processo` varchar(150) DEFAULT NULL,
  `email` varchar(150) DEFAULT NULL,
  `cpf` varchar(150) DEFAULT NULL,
  `tipo_cliente` tinyint(4) NOT NULL,
  `telefone` varchar(150) NOT NULL,
  `mensagem` text NOT NULL,
  `posicao` tinyint(4) NOT NULL DEFAULT '0' COMMENT '0 - Requisição foi iniciada , 1 - Requisição foi acompanhada , 2 - requisicao foi movida, 3 - requisicao foi completada',
  `deletado` tinyint(4) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `requisicoes`
--

INSERT INTO `requisicoes` (`id`, `id_usuario`, `data`, `nome`, `numero_processo`, `email`, `cpf`, `tipo_cliente`, `telefone`, `mensagem`, `posicao`, `deletado`, `data_cadastro`) VALUES
(1, 1, '2018-11-01', 'Leandro Abreu', NULL, 'leandrodem.abreu@gmail.com', '94587701068', 1, '(51) 99173-1091', 'Ação correção FGTS, Não lembro se entrei com a ação no mutirão promovido pelo SINDIPOLO, se não gostaria de entrar com o processo Att Leandro Abreu CPF 945877010-68', 0, 0, '2018-11-06 20:18:15');

-- --------------------------------------------------------

--
-- Estrutura da tabela `setores`
--

DROP TABLE IF EXISTS `setores`;
CREATE TABLE IF NOT EXISTS `setores` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(150) NOT NULL,
  `deletado` tinyint(1) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `setores`
--

INSERT INTO `setores` (`id`, `nome`, `deletado`, `data_cadastro`) VALUES
(1, 'Administrativo', 0, '2017-11-30 18:55:28'),
(2, 'Financeiro', 0, '2017-11-30 18:55:41'),
(3, 'T.I.', 0, '2017-11-30 18:55:49'),
(4, 'PÚBLICO ESTADUAL POA', 0, '2017-12-11 13:04:08'),
(5, 'TRABALHISTA POA', 0, '2018-03-20 19:47:22'),
(6, 'PÚBLICO FEDERAL POA', 0, '2019-02-27 22:52:48');

-- --------------------------------------------------------

--
-- Estrutura da tabela `situacao_apenso`
--

DROP TABLE IF EXISTS `situacao_apenso`;
CREATE TABLE IF NOT EXISTS `situacao_apenso` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descricao` varchar(150) NOT NULL,
  `deletado` tinyint(1) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `situacao_apenso`
--

INSERT INTO `situacao_apenso` (`id`, `descricao`, `deletado`, `data_cadastro`) VALUES
(1, 'A Avaliação', 0, '2018-05-29 17:05:28'),
(2, 'Acordo', 0, '2018-05-29 17:05:44'),
(3, 'Acordo Aprovado e Assinado', 0, '2018-05-29 17:05:44');

-- --------------------------------------------------------

--
-- Estrutura da tabela `tarefas`
--

DROP TABLE IF EXISTS `tarefas`;
CREATE TABLE IF NOT EXISTS `tarefas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_responsavel` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `nome` varchar(150) NOT NULL,
  `descricao` text NOT NULL,
  `data_prevista` date NOT NULL,
  `tempo_previsto` time NOT NULL,
  `tempo_gasto` time NOT NULL DEFAULT '00:00:00',
  `status` varchar(45) NOT NULL DEFAULT '0' COMMENT '0 - A fazer\n1 - Fazendo\n2 - Impedimento\n3 - Concluido',
  `data_inicio` timestamp NULL DEFAULT NULL,
  `data_final` timestamp NULL DEFAULT NULL,
  `deletado` tinyint(1) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_gerente` (`id_responsavel`),
  KEY `id_usuario` (`id_usuario`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `tarefas`
--

INSERT INTO `tarefas` (`id`, `id_responsavel`, `id_usuario`, `nome`, `descricao`, `data_prevista`, `tempo_previsto`, `tempo_gasto`, `status`, `data_inicio`, `data_final`, `deletado`, `data_cadastro`) VALUES
(1, 9, 9, 'teste', 'Teste de tarefa mvizio', '2019-02-14', '00:00:01', '00:00:00', '0', '2019-02-14 02:00:00', '2019-02-14 02:00:00', 1, '2019-02-13 14:18:51'),
(2, 9, 2, 'teste', 'teste', '2019-02-07', '12:00:00', '00:00:00', '0', '2019-02-08 02:00:00', '2019-02-15 02:00:00', 1, '2019-02-15 01:40:14'),
(3, 6, 6, 'qqqqqq', '1qweq', '2019-02-05', '11:11:00', '00:00:00', '0', '2019-02-15 02:00:00', '2019-02-16 02:00:00', 1, '2019-02-15 01:41:05'),
(4, 9, 9, 'LIGAR PARA CLIENTE', 'X', '2019-03-06', '00:00:01', '00:00:00', '2', '2019-03-06 03:00:00', '2019-03-06 03:00:00', 0, '2019-02-28 18:09:29');

-- --------------------------------------------------------

--
-- Estrutura da tabela `tarefas_arquivos`
--

DROP TABLE IF EXISTS `tarefas_arquivos`;
CREATE TABLE IF NOT EXISTS `tarefas_arquivos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_tarefa` int(11) NOT NULL,
  `arquivo` varchar(150) NOT NULL,
  `deletado` tinyint(1) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_tarefa` (`id_tarefa`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `tarefas_comentarios`
--

DROP TABLE IF EXISTS `tarefas_comentarios`;
CREATE TABLE IF NOT EXISTS `tarefas_comentarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_tarefa` int(11) NOT NULL,
  `texto` text NOT NULL,
  `tipo` tinyint(1) NOT NULL DEFAULT '2' COMMENT '1 = Usuario da Tarefa, 2 = Outro',
  `deletado` tinyint(1) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_tarefa` (`id_tarefa`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `tarefas_comentarios`
--

INSERT INTO `tarefas_comentarios` (`id`, `id_tarefa`, `texto`, `tipo`, `deletado`, `data_cadastro`) VALUES
(1, 4, 'NAO ATENDEU', 1, 0, '2019-02-28 18:10:20');

-- --------------------------------------------------------

--
-- Estrutura da tabela `tarefas_topicos`
--

DROP TABLE IF EXISTS `tarefas_topicos`;
CREATE TABLE IF NOT EXISTS `tarefas_topicos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_tarefa` int(11) NOT NULL,
  `texto` text NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0 = Não feito, 1 = Feito',
  `deletado` tinyint(1) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_tarefa` (`id_tarefa`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `tarefas_topicos`
--

INSERT INTO `tarefas_topicos` (`id`, `id_tarefa`, `texto`, `status`, `deletado`, `data_cadastro`) VALUES
(1, 2, '12312', 1, 0, '2019-02-15 01:40:14'),
(2, 2, '1231231', 0, 0, '2019-02-15 01:40:14'),
(3, 3, 'qqqqqqqq', 0, 0, '2019-02-15 01:41:05'),
(4, 3, '222222222', 0, 0, '2019-02-15 01:41:05'),
(5, 4, '', 0, 0, '2019-02-28 18:09:29');

-- --------------------------------------------------------

--
-- Estrutura da tabela `tipo_acao_rito_processo`
--

DROP TABLE IF EXISTS `tipo_acao_rito_processo`;
CREATE TABLE IF NOT EXISTS `tipo_acao_rito_processo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descricao` varchar(150) NOT NULL,
  `deletado` tinyint(1) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `tipo_acao_rito_processo`
--

INSERT INTO `tipo_acao_rito_processo` (`id`, `descricao`, `deletado`, `data_cadastro`) VALUES
(1, 'Rito Ordinário', 0, '2018-05-29 17:06:26'),
(2, 'Rito Sumário', 0, '2018-05-29 17:35:01');

-- --------------------------------------------------------

--
-- Estrutura da tabela `tipo_causa`
--

DROP TABLE IF EXISTS `tipo_causa`;
CREATE TABLE IF NOT EXISTS `tipo_causa` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descricao` varchar(150) NOT NULL,
  `deletado` tinyint(1) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `tipo_causa`
--

INSERT INTO `tipo_causa` (`id`, `descricao`, `deletado`, `data_cadastro`) VALUES
(1, 'Trabalhista', 0, '2018-05-28 19:23:33'),
(2, 'Judicial', 0, '2018-05-29 17:45:52'),
(3, 'Ação Cobrança', 0, '2018-05-29 17:45:52'),
(4, 'A. Ordin. Revis. Contrato', 0, '2018-05-29 17:45:52'),
(5, 'A. Ordinária com Pedido de Tut', 0, '2018-05-29 17:45:52'),
(6, 'A. Ordinária Revisional D', 0, '2018-05-29 17:45:52'),
(7, 'A. Revisional - IRSM', 0, '2018-05-29 17:45:52'),
(8, 'Abono de férias', 0, '2018-05-29 17:45:52'),
(9, 'Abono Permanência', 0, '2018-05-29 17:45:52');

-- --------------------------------------------------------

--
-- Estrutura da tabela `tipo_causa_apenso`
--

DROP TABLE IF EXISTS `tipo_causa_apenso`;
CREATE TABLE IF NOT EXISTS `tipo_causa_apenso` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descricao` varchar(150) NOT NULL,
  `deletado` tinyint(1) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `tipo_causa_apenso`
--

INSERT INTO `tipo_causa_apenso` (`id`, `descricao`, `deletado`, `data_cadastro`) VALUES
(1, 'Ação Cautelar', 0, '2018-05-28 19:23:33'),
(2, 'Ação Consignatória', 0, '2018-05-29 17:45:52'),
(3, 'Ação de Alimentos', 0, '2018-05-29 17:45:52'),
(4, 'Ação de Consignação', 0, '2018-05-29 17:45:52'),
(5, 'Ação de Consignação em PGTO', 0, '2018-05-29 17:45:52'),
(6, 'Ação de Despejo', 0, '2018-05-29 17:45:52'),
(7, 'Ação de Dissolução de União', 0, '2018-05-29 17:45:52'),
(8, 'Ação Declaratória Incidental', 0, '2018-05-29 17:45:52'),
(9, 'Ação Indenizatória - Reparação', 0, '2018-05-29 17:45:52');

-- --------------------------------------------------------

--
-- Estrutura da tabela `tipo_causa_recurso`
--

DROP TABLE IF EXISTS `tipo_causa_recurso`;
CREATE TABLE IF NOT EXISTS `tipo_causa_recurso` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descricao` varchar(150) NOT NULL,
  `deletado` tinyint(1) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `tipo_causa_recurso`
--

INSERT INTO `tipo_causa_recurso` (`id`, `descricao`, `deletado`, `data_cadastro`) VALUES
(1, 'Ação Recisória', 0, '2018-05-28 19:23:33'),
(2, 'Agravo de Instrumento', 0, '2018-05-29 17:45:52'),
(3, 'Agravo de Petição', 0, '2018-05-29 17:45:52'),
(4, 'Agravo em Rec Esp/extr', 0, '2018-05-29 17:45:52'),
(5, 'Agravo Interno', 0, '2018-05-29 17:45:52'),
(6, 'Agravo Regimental', 0, '2018-05-29 17:45:52'),
(7, 'Apelação', 0, '2018-05-29 17:45:52'),
(8, 'Apelação - Reexame Necessário', 0, '2018-05-29 17:45:52'),
(9, 'Carta Precatória', 0, '2018-05-29 17:45:52');

-- --------------------------------------------------------

--
-- Estrutura da tabela `tribunal`
--

DROP TABLE IF EXISTS `tribunal`;
CREATE TABLE IF NOT EXISTS `tribunal` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descricao` varchar(150) NOT NULL,
  `deletado` tinyint(1) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `tribunal`
--

INSERT INTO `tribunal` (`id`, `descricao`, `deletado`, `data_cadastro`) VALUES
(1, 'Câmara Cível', 0, '2018-05-29 17:05:28'),
(2, 'Câmara Recursal', 0, '2018-05-29 17:05:44'),
(3, 'Justiça Federal', 0, '2018-05-29 17:05:44');

-- --------------------------------------------------------

--
-- Estrutura da tabela `turma_camara`
--

DROP TABLE IF EXISTS `turma_camara`;
CREATE TABLE IF NOT EXISTS `turma_camara` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descricao` varchar(150) NOT NULL,
  `deletado` tinyint(1) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `turma_camara`
--

INSERT INTO `turma_camara` (`id`, `descricao`, `deletado`, `data_cadastro`) VALUES
(1, 'SDC - TRT4', 0, '2018-05-29 17:05:28'),
(2, 'TJ - 01° Vice Presidência - DI', 0, '2018-05-29 17:05:44'),
(3, 'Tribunal Pleno', 0, '2018-05-29 17:05:44');

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_setor` int(11) NOT NULL COMMENT 'PADRAO: 1 = Adminstrativo, 2 = Financeiro, 3 = T.I',
  `login` varchar(150) NOT NULL,
  `senha` varchar(150) NOT NULL,
  `imagem` varchar(150) NOT NULL DEFAULT '/assets/imgs/user-padrao.jpg',
  `nome` varchar(150) NOT NULL,
  `email` varchar(150) NOT NULL,
  `telefone` varchar(150) NOT NULL,
  `nivel` tinyint(1) NOT NULL COMMENT '1 = admin, 2 = gerente, 3 = usuario',
  `cpf` varchar(411) DEFAULT NULL,
  `hash_login` varchar(150) DEFAULT NULL COMMENT 'hash de login, para verificacao mais segura via ajax alterado a cada login',
  `cargo` varchar(45) DEFAULT NULL COMMENT '1 - advogado',
  `oab` varchar(20) DEFAULT NULL,
  `deletado` tinyint(1) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_setor` (`id_setor`)
) ENGINE=MyISAM AUTO_INCREMENT=43 DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `usuarios`
--

INSERT INTO `usuarios` (`id`, `id_setor`, `login`, `senha`, `imagem`, `nome`, `email`, `telefone`, `nivel`, `cpf`, `hash_login`, `cargo`, `oab`, `deletado`, `data_cadastro`) VALUES
(1, 0, 'admin', '745536f0652656dae49565e5fa26152b', '/assets/imgs/user-padrao.jpg', 'Administrador', 'contato@young.adv.br', '(42) 34234-234', 1, NULL, '10276c33603b8791c4ef4ecb2a49690c', '0', NULL, 0, '2017-11-30 18:49:14'),
(2, 3, 'pablo', '745536f0652656dae49565e5fa26152b', '/assets/imgs/user-padrao.jpg', 'Pablo', 'pablo@young.adv.br', '(12) 41241-2412', 3, '', 'd3d4b649ea9ac587edd74d887102397b', '1', '', 0, '2017-11-30 18:54:31'),
(3, 3, 'taina', '745536f0652656dae49565e5fa26152b', '/assets/imgs/user-padrao.jpg', 'Tainã', 'cleberson@cleber.com.br', '66 666 6666 99', 3, NULL, '18db9f39bfecde512023f4f1f73588b3', '1', NULL, 0, '2017-11-30 19:52:24'),
(4, 2, 'elisandra', '745536f0652656dae49565e5fa26152b', '/assets/imgs/user-padrao.jpg', 'Elisandra', 'teste@teste.com', '342423423', 3, NULL, '756aeb49fc6c6a20d1d447396c0ca6dd', '1', NULL, 0, '2017-12-06 16:39:39'),
(5, 1, 'arthur', '745536f0652656dae49565e5fa26152b', '/assets/imgs/user-padrao.jpg', 'Arthur Orlando Dias Filho', 'geren@geren.com', '12312341', 3, NULL, '', NULL, '040806', 0, '2017-12-06 17:57:00'),
(6, 3, 'mariele', '745536f0652656dae49565e5fa26152b', '/assets/imgs/user-padrao.jpg', 'Mariele', 'marquito@maquito.com', '1251251234124', 2, NULL, 'b7af02ab35ee458e7e25724d68f96fb1', '1', NULL, 0, '2018-01-17 11:38:04'),
(7, 3, 'marilia', '745536f0652656dae49565e5fa26152b', '/assets/imgs/user-padrao.jpg', 'Marília', 'marquito@maquito.com', '1251251234124', 3, NULL, NULL, NULL, NULL, 0, '2018-01-17 11:38:19'),
(9, 2, 'fabio', '745536f0652656dae49565e5fa26152b', '/assets/imgs/user-padrao.jpg', 'Fábio', 'teste@teste.com', '23423423', 2, NULL, '0f11340a9d53bafd0c54e40822a0e057', '1', NULL, 0, '2018-01-18 13:27:31'),
(10, 4, 'aliny', '745536f0652656dae49565e5fa26152b', '/assets/imgs/user-padrao.jpg', 'Aliny Marin', 'aliny@teste.com.br', '(51) 99999-9999', 3, NULL, NULL, '1', '', 0, '2019-02-27 22:56:21'),
(11, 4, 'ana', '745536f0652656dae49565e5fa26152b', '/assets/imgs/user-padrao.jpg', 'Ana Cristina Heerbach', 'ana@teste.com.br', '(51) 99999-9999', 3, NULL, NULL, '1', '', 0, '2019-02-27 22:56:56'),
(12, 4, 'anderson', '745536f0652656dae49565e5fa26152b', '/assets/imgs/user-padrao.jpg', 'Anderson Nunes da Silva', 'anderson@gmail.com', '(51) 99999-9999', 3, NULL, NULL, '0', NULL, 0, '2019-02-27 22:57:44'),
(13, 4, 'ariane', '745536f0652656dae49565e5fa26152b', '/assets/imgs/user-padrao.jpg', 'Ariane Gabriella Rocha', 'ariane@teste.com.br', '(51) 99999-9999', 3, NULL, NULL, '0', NULL, 0, '2019-02-27 22:58:15'),
(14, 4, 'caroline', '745536f0652656dae49565e5fa26152b', '/assets/imgs/user-padrao.jpg', 'Caroline da Cássia Cadora', 'caroline@teste.com.br', '(51) 99999-9999', 3, NULL, NULL, '1', '', 0, '2019-02-27 22:58:53'),
(15, 4, 'daniela', '745536f0652656dae49565e5fa26152b', '/assets/imgs/user-padrao.jpg', 'Daniela Santos de Souza', 'daniela@teste.com.br', '(51) 99999-9999', 3, NULL, NULL, '0', NULL, 0, '2019-02-27 22:59:29'),
(16, 4, 'diana', '745536f0652656dae49565e5fa26152b', '/assets/imgs/user-padrao.jpg', 'Diana Tem Caten Butzen', 'diana@teste.com.br', '(51) 99999-9999', 3, NULL, NULL, '1', '', 0, '2019-02-27 23:00:09'),
(17, 4, 'dyandra', '745536f0652656dae49565e5fa26152b', '/assets/imgs/user-padrao.jpg', 'Dyandra Sulzback Brasil', 'dyandra@teste.com.br', '(51) 99999-9999', 3, NULL, NULL, '0', NULL, 0, '2019-02-27 23:00:59'),
(18, 4, 'eduarda', '745536f0652656dae49565e5fa26152b', '/assets/imgs/user-padrao.jpg', 'Eduarda Gonçalves Berbigier', 'eduarda@teste.com.br', '(51) 99999-9999', 3, NULL, NULL, '1', '', 0, '2019-02-27 23:01:33'),
(19, 4, 'francisco', '745536f0652656dae49565e5fa26152b', '/assets/imgs/user-padrao.jpg', 'Francisco Alf de Carvalho', 'francisco@teste.com.br', '(51) 99999-9999', 3, NULL, NULL, '1', '', 0, '2019-02-27 23:02:07'),
(20, 4, 'gabriela', '745536f0652656dae49565e5fa26152b', '/assets/imgs/user-padrao.jpg', 'Gabriela Pereira M. Correa', 'gabriela@teste.com.br', '(51) 99999-9999', 3, NULL, NULL, '1', '', 0, '2019-02-27 23:02:38'),
(21, 4, 'heleonora', '745536f0652656dae49565e5fa26152b', '/assets/imgs/user-padrao.jpg', 'Heleonora Desdema Busanello', 'heleonora@teste.com.br', '(51) 99999-9999', 3, NULL, NULL, '0', NULL, 0, '2019-02-27 23:03:13'),
(22, 4, 'iolanda', '745536f0652656dae49565e5fa26152b', '/assets/imgs/user-padrao.jpg', 'Iolanda Navegantes Santos Prates', 'iolanda@teste.com.br', '(51) 99999-9999', 3, NULL, NULL, '0', NULL, 0, '2019-02-27 23:03:41'),
(23, 4, 'jessica', '745536f0652656dae49565e5fa26152b', '/assets/imgs/user-padrao.jpg', 'Jéssica Dornelles Dymkovski', 'jessica@teste.com.br', '(51) 99999-9999', 3, NULL, NULL, '0', NULL, 0, '2019-02-27 23:04:11'),
(24, 4, 'karoline', '745536f0652656dae49565e5fa26152b', '/assets/imgs/user-padrao.jpg', 'Karoline Gonçalves Bruno', 'karoline@teste.com.br', '(51) 99999-9999', 3, NULL, NULL, '0', NULL, 0, '2019-02-27 23:04:45'),
(25, 4, 'leticia', '745536f0652656dae49565e5fa26152b', '/assets/imgs/user-padrao.jpg', 'Letícia Kaiane de Paula Klipel', 'leticia@teste.com.br', '(51) 99999-9999', 3, NULL, NULL, '0', NULL, 0, '2019-02-27 23:05:28'),
(26, 4, 'lilian', '745536f0652656dae49565e5fa26152b', '/assets/imgs/user-padrao.jpg', 'Lilian da Silva Rangel', 'lilian@teste.com.br', '(51) 99999-9999', 3, NULL, NULL, '1', '', 0, '2019-02-27 23:06:06'),
(27, 4, 'luiza', '745536f0652656dae49565e5fa26152b', '/assets/imgs/user-padrao.jpg', 'Luiza da Mota Borges', 'luiza@teste.com.br', '(51) 99999-9999', 3, NULL, NULL, '0', NULL, 0, '2019-02-27 23:06:32'),
(28, 4, 'maicon', '745536f0652656dae49565e5fa26152b', '/assets/imgs/user-padrao.jpg', 'Maicon Roberto Rivas', 'maicon@teste.com.br', '(51) 99999-9999', 3, NULL, NULL, '0', NULL, 0, '2019-02-27 23:07:07'),
(29, 4, 'pamela', '745536f0652656dae49565e5fa26152b', '/assets/imgs/user-padrao.jpg', 'Pamela da Silva Ribeiro', 'pamela@teste.com.br', '(51) 99999-9999', 3, NULL, NULL, '0', NULL, 0, '2019-02-27 23:07:34'),
(30, 4, 'rodrigo', '745536f0652656dae49565e5fa26152b', '/assets/imgs/user-padrao.jpg', 'Rodrigo Spigolon Montano', 'rodrigo@teste.com.br', '(51) 99999-9999', 3, NULL, NULL, '1', '', 0, '2019-02-27 23:07:57'),
(31, 4, 'walter', '745536f0652656dae49565e5fa26152b', '/assets/imgs/user-padrao.jpg', 'Walter Fabiano Barbosa Neto', 'walter@teste.com.br', '(51) 99999-9999', 3, NULL, NULL, '0', NULL, 0, '2019-02-27 23:08:27'),
(32, 5, 'ariel', '745536f0652656dae49565e5fa26152b', '/assets/imgs/user-padrao.jpg', 'Ariel Giordano Vivan', 'ariel@teste.com.br', '(51) 99999-9999', 3, NULL, NULL, '1', '', 0, '2019-02-27 23:15:45'),
(33, 5, 'jaqueline', '745536f0652656dae49565e5fa26152b', '/assets/imgs/user-padrao.jpg', 'Jaqueline Matiazzo de Carvalho', 'jaqueline@teste.com.br', '(51) 99999-9999', 3, NULL, NULL, '1', '', 0, '2019-02-27 23:16:17'),
(34, 5, 'juliana', '745536f0652656dae49565e5fa26152b', '/assets/imgs/user-padrao.jpg', 'Juliana Ribeiro Dal Bosco', 'juliana@teste.com.br', '(51) 99999-9999', 3, NULL, NULL, '0', NULL, 0, '2019-02-27 23:16:52'),
(35, 5, 'katia', '745536f0652656dae49565e5fa26152b', '/assets/imgs/user-padrao.jpg', 'Katia Oliveira de Avila', 'katia@teste.com.br', '(51) 99999-9999', 3, NULL, NULL, '0', NULL, 0, '2019-02-27 23:17:16'),
(36, 5, 'mauricio', '745536f0652656dae49565e5fa26152b', '/assets/imgs/user-padrao.jpg', 'Maurício Vieira da Silva', 'mauricio@teste.com.br', '(51) 99999-9999', 3, NULL, NULL, '1', '', 0, '2019-02-27 23:17:43'),
(37, 5, 'ohana', '745536f0652656dae49565e5fa26152b', '/assets/imgs/user-padrao.jpg', 'Ohana Cabelleira Lopes', 'ohana@teste.com.br', '(51) 99999-9999', 3, NULL, NULL, '1', '', 0, '2019-02-27 23:18:16'),
(38, 5, 'rayssa', '745536f0652656dae49565e5fa26152b', '/assets/imgs/user-padrao.jpg', 'Rayssa Gonçalves de Sant Helena', 'rayssa@teste.com.br', '(51) 99999-9999', 3, NULL, NULL, '0', NULL, 0, '2019-02-27 23:18:42'),
(39, 5, 'vera', '745536f0652656dae49565e5fa26152b', '/assets/imgs/user-padrao.jpg', 'Vera Lucia Correa Oliveira', 'vera@teste.com.br', '(51) 99999-9999', 3, NULL, NULL, '0', NULL, 0, '2019-02-27 23:19:10'),
(40, 6, 'gabriel', '745536f0652656dae49565e5fa26152b', '/assets/imgs/user-padrao.jpg', 'Gabriel Lemos Weber', 'gabriel@teste.com.br', '(51) 99999-9999', 3, NULL, NULL, '1', '', 0, '2019-02-27 23:19:38'),
(41, 6, 'ihana', '745536f0652656dae49565e5fa26152b', '/assets/imgs/user-padrao.jpg', 'Ihana dos Santos Guerra', 'ihana@teste.com.br', '(51) 99999-9999', 3, NULL, '7e4cef100971839538e61088563b0450', '1', '', 0, '2019-02-27 23:20:03'),
(42, 6, 'luciana', '745536f0652656dae49565e5fa26152b', '/assets/imgs/user-padrao.jpg', 'Luciana Ruttscheidt da Cunha', 'luciana@teste.com.br', '(51) 99999-9999', 3, NULL, NULL, '1', '', 0, '2019-02-27 23:20:28');

-- --------------------------------------------------------

--
-- Estrutura da tabela `vara_processo`
--

DROP TABLE IF EXISTS `vara_processo`;
CREATE TABLE IF NOT EXISTS `vara_processo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descricao` varchar(150) NOT NULL,
  `deletado` tinyint(1) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `vara_processo`
--

INSERT INTO `vara_processo` (`id`, `descricao`, `deletado`, `data_cadastro`) VALUES
(1, '003° Vara do Trabalho', 0, '2018-05-29 17:07:00'),
(2, '004° Vara do Trabalho', 0, '2018-05-29 17:07:14');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
