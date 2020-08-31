/*
MySQL Data Transfer
Source Host: localhost
Source Database: bbs
Target Host: localhost
Target Database: bbs
Date: 2020/8/29 16:36:56
*/

SET FOREIGN_KEY_CHECKS=0;
-- ----------------------------
-- Table structure for book
-- ----------------------------
DROP TABLE IF EXISTS `book`;
CREATE TABLE `book` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bookname` char(50) NOT NULL,
  `price` float(4,1) NOT NULL,
  `imgsrc` varchar(255) DEFAULT NULL,
  `bookinfo` char(100) DEFAULT NULL,
  `authorinfo` varchar(255) DEFAULT NULL,
  `fitpeople` varchar(255) DEFAULT NULL,
  `buyinfo` varchar(255) DEFAULT NULL,
  `jutiinfo` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for cart
-- ----------------------------
DROP TABLE IF EXISTS `cart`;
CREATE TABLE `cart` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bookname` char(50) DEFAULT NULL,
  `price` float(4,1) DEFAULT NULL,
  `num` int(11) DEFAULT NULL,
  `uid` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1000001 DEFAULT CHARSET=utf8 COMMENT='书籍名称 价格 数量 用户id';

-- ----------------------------
-- Table structure for content
-- ----------------------------
DROP TABLE IF EXISTS `content`;
CREATE TABLE `content` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` text NOT NULL COMMENT '本文',
  `writetiime` datetime NOT NULL,
  `writename` char(20) NOT NULL,
  `writerid` int(20) NOT NULL,
  `likenum` int(10) NOT NULL DEFAULT '0',
  `commentnum` int(10) NOT NULL DEFAULT '0',
  `writeimgurl` char(50) NOT NULL,
  `sort` char(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for dingdan
-- ----------------------------
DROP TABLE IF EXISTS `dingdan`;
CREATE TABLE `dingdan` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `orderNum` int(11) NOT NULL,
  `goodsname` char(50) DEFAULT NULL,
  `num` int(11) DEFAULT NULL,
  `totalprice` float(10,2) DEFAULT NULL,
  `uid` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1000002 DEFAULT CHARSET=utf8 COMMENT='订单编号  商品名称  数量 总价格  用户id';

-- ----------------------------
-- Table structure for makefriendscon
-- ----------------------------
DROP TABLE IF EXISTS `makefriendscon`;
CREATE TABLE `makefriendscon` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` text NOT NULL,
  `writetime` datetime NOT NULL,
  `writename` char(20) NOT NULL,
  `writerid` int(20) NOT NULL,
  `likenum` int(10) NOT NULL DEFAULT '0',
  `commentnum` int(10) NOT NULL DEFAULT '0',
  `writeimgurl` char(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for review
-- ----------------------------
DROP TABLE IF EXISTS `review`;
CREATE TABLE `review` (
  `id` int(20) NOT NULL,
  `content` text NOT NULL,
  `likenum` int(10) NOT NULL DEFAULT '0',
  `reviewid` int(20) NOT NULL,
  `reviewname` char(10) NOT NULL,
  `reviewtime` datetime NOT NULL,
  `reviewpart` int(2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for userinfor
-- ----------------------------
DROP TABLE IF EXISTS `userinfor`;
CREATE TABLE `userinfor` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userid` int(20) NOT NULL,
  `name` char(255) NOT NULL,
  `sex` char(2) DEFAULT NULL,
  `datetime` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `userid` int(20) NOT NULL AUTO_INCREMENT,
  `email` char(20) NOT NULL,
  `password` char(20) NOT NULL,
  PRIMARY KEY (`userid`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records 
-- ----------------------------
INSERT INTO `users` VALUES ('1', '123', '123');
