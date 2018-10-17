/*
Navicat MySQL Data Transfer

Source Server         : local
Source Server Version : 50721
Source Host           : localhost:3306
Source Database       : rollcall

Target Server Type    : MYSQL
Target Server Version : 50721
File Encoding         : 65001

Date: 2018-10-18 01:03:04
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for dm_attendance
-- ----------------------------
DROP TABLE IF EXISTS `dm_attendance`;
CREATE TABLE `dm_attendance` (
  `id` char(36) CHARACTER SET utf8 NOT NULL COMMENT '考勤任务的唯一标识id',
  `name` varchar(255) CHARACTER SET utf8 NOT NULL COMMENT '考勤任务名称',
  `classroomid` char(36) CHARACTER SET utf8 DEFAULT NULL COMMENT '考勤任务所在的课堂id',
  `starttime` char(13) CHARACTER SET utf8 NOT NULL COMMENT '考勤任务开始时间',
  `endtime` char(13) CHARACTER SET utf8 NOT NULL COMMENT '考勤任务结束时间',
  `teacherid` char(36) CHARACTER SET utf8 DEFAULT NULL COMMENT '考勤任务的老师id',
  `description` text CHARACTER SET utf8 COMMENT '当前考勤任务描述',
  `remark` text CHARACTER SET utf8 COMMENT '备注',
  `status` int(1) NOT NULL DEFAULT '0' COMMENT '考勤任务的状态：0：正常|1：禁用',
  PRIMARY KEY (`id`),
  KEY `classroomid` (`classroomid`),
  KEY `teacherid` (`teacherid`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of dm_attendance
-- ----------------------------

-- ----------------------------
-- Table structure for dm_calling
-- ----------------------------
DROP TABLE IF EXISTS `dm_calling`;
CREATE TABLE `dm_calling` (
  `id` char(36) CHARACTER SET utf8 NOT NULL DEFAULT '' COMMENT '唯一标识id',
  `attendanceid` char(36) CHARACTER SET utf8 DEFAULT NULL COMMENT '考勤任务的id',
  `studentid` char(36) CHARACTER SET utf8 DEFAULT NULL COMMENT '考勤学生id',
  `callstatus` int(2) NOT NULL DEFAULT '0' COMMENT '考勤状态：0：正常（默认）；1：迟到；2:早退；3：旷课；4：请假；5：课堂奖励；6：课堂惩罚；',
  `remark` text CHARACTER SET utf8 COMMENT '考勤记录备注',
  `status` int(1) NOT NULL DEFAULT '0' COMMENT '考勤记录的状态：0：正常|1：禁用',
  PRIMARY KEY (`id`),
  KEY `attendance_key` (`attendanceid`),
  KEY `studentid_key` (`studentid`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of dm_calling
-- ----------------------------

-- ----------------------------
-- Table structure for dm_class
-- ----------------------------
DROP TABLE IF EXISTS `dm_class`;
CREATE TABLE `dm_class` (
  `id` char(36) CHARACTER SET utf8 NOT NULL COMMENT '唯一标识id',
  `name` varchar(255) CHARACTER SET utf8 NOT NULL COMMENT '班级名称',
  `code` varchar(30) CHARACTER SET utf8 NOT NULL COMMENT '班级编号',
  `monitorid` char(36) CHARACTER SET utf8 DEFAULT NULL COMMENT '班级班长id',
  `counsellorid` char(36) CHARACTER SET utf8 DEFAULT NULL COMMENT '辅导员id',
  `description` text CHARACTER SET utf8 COMMENT '班级描述',
  `status` int(1) NOT NULL DEFAULT '0' COMMENT '可用状态：0：正常|1：禁用',
  PRIMARY KEY (`id`),
  KEY `counsellorid` (`counsellorid`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of dm_class
-- ----------------------------
INSERT INTO `dm_class` VALUES ('cff81990-cfba-11e8-8b0f-6535604c9485', '16级网络工程3班', '16413203', null, 'ec7d01e0-c98c-11e8-86f2-334aff9c8cf0', null, '0');
INSERT INTO `dm_class` VALUES ('dbf47d60-cfba-11e8-8b0f-6535604c9485', '16级网络工程4班', '16413204', null, 'ec7d01e0-c98c-11e8-86f2-334aff9c8cf0', null, '0');
INSERT INTO `dm_class` VALUES ('fa753900-d1cc-11e8-b9d0-09ff942b6546', '16级网络工程2班', '16413202', null, 'ec7d01e0-c98c-11e8-86f2-334aff9c8cf0', null, '0');

-- ----------------------------
-- Table structure for dm_classroom
-- ----------------------------
DROP TABLE IF EXISTS `dm_classroom`;
CREATE TABLE `dm_classroom` (
  `id` char(36) CHARACTER SET utf8 NOT NULL COMMENT '唯一标识id',
  `classid` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '课堂班级id；以 , 号分隔',
  `teacherid` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '课堂老师id；以 , 号分隔',
  `name` varchar(100) CHARACTER SET utf8 NOT NULL COMMENT '课堂名称',
  `code` varchar(30) CHARACTER SET utf8 NOT NULL COMMENT '课堂编号；以KT开头+4位数字',
  `period` int(3) NOT NULL DEFAULT '1' COMMENT '课堂总课时',
  `description` text CHARACTER SET utf8 COMMENT '课堂描述',
  `picture` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '课堂封面图片相对路径',
  `starttime` char(13) CHARACTER SET utf8 NOT NULL COMMENT '课堂开课时间',
  `endtime` char(13) CHARACTER SET utf8 NOT NULL COMMENT '课堂结课时间',
  `status` int(1) NOT NULL DEFAULT '0' COMMENT '课堂状态：0：正常|1：禁用',
  PRIMARY KEY (`id`),
  KEY `teacherid_teachertableid` (`teacherid`),
  KEY `classid_classtableid` (`classid`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of dm_classroom
-- ----------------------------
INSERT INTO `dm_classroom` VALUES ('9fbcff40-d15c-11e8-835f-f7a06db66861', 'cff81990-cfba-11e8-8b0f-6535604c9485', '8a302350-c15d-11e8-8579-e72dbcf90694', 'JavaScript高级程序设计', 'KT1001', '32', 'JavaScript高级程序设计简述', '/public\\uploads\\avataor\\20181016\\1539705635744_319907-106.jpg', '1539619200000', '1551283200000', '0');
INSERT INTO `dm_classroom` VALUES ('38623c80-cfc1-11e8-af00-75b92ae9cef4', 'cff81990-cfba-11e8-8b0f-6535604c9485,dbf47d60-cfba-11e8-8b0f-6535604c9485', '710dc6d0-bf4f-11e8-b219-f546aa359bf1', 'web渗透测试(工具篇)', 'KT1000', '64', 'web渗透测试(工具篇)，核心课程', '/public\\uploads\\avataor\\20181014\\1539528939199_319910-106.jpg', '1535731200000', '1548864000000', '0');

-- ----------------------------
-- Table structure for dm_counsellor
-- ----------------------------
DROP TABLE IF EXISTS `dm_counsellor`;
CREATE TABLE `dm_counsellor` (
  `id` char(36) CHARACTER SET utf8 NOT NULL COMMENT '唯一标识',
  `name` varchar(20) CHARACTER SET utf8 NOT NULL COMMENT '辅导员姓名',
  `password` varchar(255) CHARACTER SET utf8 NOT NULL COMMENT '系统登录密码',
  `sex` char(2) CHARACTER SET utf8 NOT NULL DEFAULT '0' COMMENT '性别：0:女|1:男',
  `code` varchar(20) CHARACTER SET utf8 DEFAULT NULL COMMENT '辅导员编号',
  `createtime` char(13) CHARACTER SET utf8 NOT NULL COMMENT '创建时间',
  `recenttime` char(13) CHARACTER SET utf8 DEFAULT NULL COMMENT '最近访问时间',
  `description` text CHARACTER SET utf8 COMMENT '描述',
  `status` int(1) NOT NULL DEFAULT '0' COMMENT '使用状态：0：正常|1：禁用',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of dm_counsellor
-- ----------------------------
INSERT INTO `dm_counsellor` VALUES ('45f881b0-c954-11e8-a8c1-153669a525ac', '测试', 'U2FsdGVkX1+fK2mRWeJDEGfJN3RG+Mlmi4N2bLY2p58=', '0', 'cs123', '1538822442000', '', '13', '0');
INSERT INTO `dm_counsellor` VALUES ('993ae510-c95f-11e8-879d-71e5b316a41d', '测试13', 'U2FsdGVkX1/L+r8hxADGCUNsS3MrPRPRG1eV5CCaA6U=', '1', 'cf323', '1538827306000', '', null, '0');
INSERT INTO `dm_counsellor` VALUES ('ec7d01e0-c98c-11e8-86f2-334aff9c8cf0', '邓宇轩', 'U2FsdGVkX19eMogosP10aK6P7/Su1EY2jTfQr8O59Y0=', '0', 'dyx100', '1538846773000', '', null, '0');

-- ----------------------------
-- Table structure for dm_roomstudent
-- ----------------------------
DROP TABLE IF EXISTS `dm_roomstudent`;
CREATE TABLE `dm_roomstudent` (
  `id` char(36) CHARACTER SET utf8 NOT NULL COMMENT '唯一标识id',
  `classroomid` char(36) CHARACTER SET utf8 DEFAULT NULL COMMENT '课堂id',
  `classid` char(36) CHARACTER SET utf8 DEFAULT NULL COMMENT '班级id',
  `studentid` char(36) CHARACTER SET utf8 DEFAULT NULL COMMENT '学生id',
  `status` int(1) NOT NULL DEFAULT '0' COMMENT '课堂里学生的可用状态；0：正常|1：禁用',
  PRIMARY KEY (`id`),
  KEY `classroomid` (`classroomid`),
  KEY `classid` (`classid`),
  KEY `studentid` (`studentid`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of dm_roomstudent
-- ----------------------------
INSERT INTO `dm_roomstudent` VALUES ('ebd00bc0-ce3c-11e8-bee8-ad2d74fdaa6f', '8c47b140-cbe8-11e8-b56d-6391b1d6c64b', '18b6b940-c98d-11e8-b2a9-fbad469714c2', '526618d0-ca4f-11e8-a742-85ad8e8b3111', '0');
INSERT INTO `dm_roomstudent` VALUES ('ebcfe4b0-ce3c-11e8-bee8-ad2d74fdaa6f', '8c47b140-cbe8-11e8-b56d-6391b1d6c64b', '18b6b940-c98d-11e8-b2a9-fbad469714c2', '5389a6b0-ca4e-11e8-8d90-b3ab8aab42f2', '0');
INSERT INTO `dm_roomstudent` VALUES ('a43c9201-ce3d-11e8-bee8-ad2d74fdaa6f', '162e4c20-cc6b-11e8-944a-0116bef785da', '18b6b940-c98d-11e8-b2a9-fbad469714c2', '526618d0-ca4f-11e8-a742-85ad8e8b3111', '0');
INSERT INTO `dm_roomstudent` VALUES ('a43c9200-ce3d-11e8-bee8-ad2d74fdaa6f', '162e4c20-cc6b-11e8-944a-0116bef785da', '18b6b940-c98d-11e8-b2a9-fbad469714c2', '5389a6b0-ca4e-11e8-8d90-b3ab8aab42f2', '0');
INSERT INTO `dm_roomstudent` VALUES ('4a29c7d0-cfc1-11e8-af00-75b92ae9cef4', '38623c80-cfc1-11e8-af00-75b92ae9cef4', 'cff81990-cfba-11e8-8b0f-6535604c9485', 'dad71490-cfbc-11e8-8b0f-6535604c9485', '0');
INSERT INTO `dm_roomstudent` VALUES ('4a2a15f0-cfc1-11e8-af00-75b92ae9cef4', '38623c80-cfc1-11e8-af00-75b92ae9cef4', 'cff81990-cfba-11e8-8b0f-6535604c9485', 'f8741ac0-cfbc-11e8-8b0f-6535604c9485', '0');
INSERT INTO `dm_roomstudent` VALUES ('4a2a15f2-cfc1-11e8-af00-75b92ae9cef4', '38623c80-cfc1-11e8-af00-75b92ae9cef4', 'cff81990-cfba-11e8-8b0f-6535604c9485', '43013000-cfbd-11e8-8b0f-6535604c9485', '0');
INSERT INTO `dm_roomstudent` VALUES ('4a2a6410-cfc1-11e8-af00-75b92ae9cef4', '38623c80-cfc1-11e8-af00-75b92ae9cef4', 'cff81990-cfba-11e8-8b0f-6535604c9485', '6eab8dc0-cfbf-11e8-af00-75b92ae9cef4', '0');
INSERT INTO `dm_roomstudent` VALUES ('4a2a6412-cfc1-11e8-af00-75b92ae9cef4', '38623c80-cfc1-11e8-af00-75b92ae9cef4', 'cff81990-cfba-11e8-8b0f-6535604c9485', '947f8b50-cfbf-11e8-af00-75b92ae9cef4', '0');
INSERT INTO `dm_roomstudent` VALUES ('4a2a8b20-cfc1-11e8-af00-75b92ae9cef4', '38623c80-cfc1-11e8-af00-75b92ae9cef4', 'cff81990-cfba-11e8-8b0f-6535604c9485', 'a6990730-cfbf-11e8-af00-75b92ae9cef4', '0');
INSERT INTO `dm_roomstudent` VALUES ('4a2a6411-cfc1-11e8-af00-75b92ae9cef4', '38623c80-cfc1-11e8-af00-75b92ae9cef4', 'cff81990-cfba-11e8-8b0f-6535604c9485', '813ea670-cfbf-11e8-af00-75b92ae9cef4', '0');
INSERT INTO `dm_roomstudent` VALUES ('4a2a3d00-cfc1-11e8-af00-75b92ae9cef4', '38623c80-cfc1-11e8-af00-75b92ae9cef4', 'cff81990-cfba-11e8-8b0f-6535604c9485', '81ed2b60-cfbe-11e8-bfad-e7b43d6683d2', '0');
INSERT INTO `dm_roomstudent` VALUES ('4a2a3d03-cfc1-11e8-af00-75b92ae9cef4', '38623c80-cfc1-11e8-af00-75b92ae9cef4', 'cff81990-cfba-11e8-8b0f-6535604c9485', '5cffa0c0-cfbf-11e8-af00-75b92ae9cef4', '0');
INSERT INTO `dm_roomstudent` VALUES ('4a2a3d01-cfc1-11e8-af00-75b92ae9cef4', '38623c80-cfc1-11e8-af00-75b92ae9cef4', 'cff81990-cfba-11e8-8b0f-6535604c9485', 'efa05c40-cfbe-11e8-af00-75b92ae9cef4', '0');
INSERT INTO `dm_roomstudent` VALUES ('4a2a3d02-cfc1-11e8-af00-75b92ae9cef4', '38623c80-cfc1-11e8-af00-75b92ae9cef4', 'cff81990-cfba-11e8-8b0f-6535604c9485', '4b021150-cfbf-11e8-af00-75b92ae9cef4', '0');
INSERT INTO `dm_roomstudent` VALUES ('4a2a15f1-cfc1-11e8-af00-75b92ae9cef4', '38623c80-cfc1-11e8-af00-75b92ae9cef4', 'cff81990-cfba-11e8-8b0f-6535604c9485', '0e764280-cfbd-11e8-8b0f-6535604c9485', '0');
INSERT INTO `dm_roomstudent` VALUES ('4a2a8b21-cfc1-11e8-af00-75b92ae9cef4', '38623c80-cfc1-11e8-af00-75b92ae9cef4', 'cff81990-cfba-11e8-8b0f-6535604c9485', 'b7b51040-cfbf-11e8-af00-75b92ae9cef4', '0');
INSERT INTO `dm_roomstudent` VALUES ('711e2980-cfc1-11e8-af00-75b92ae9cef4', '38623c80-cfc1-11e8-af00-75b92ae9cef4', 'dbf47d60-cfba-11e8-8b0f-6535604c9485', '30191220-cfc0-11e8-af00-75b92ae9cef4', '0');
INSERT INTO `dm_roomstudent` VALUES ('711e5090-cfc1-11e8-af00-75b92ae9cef4', '38623c80-cfc1-11e8-af00-75b92ae9cef4', 'dbf47d60-cfba-11e8-8b0f-6535604c9485', '42165370-cfc0-11e8-af00-75b92ae9cef4', '0');
INSERT INTO `dm_roomstudent` VALUES ('711e5091-cfc1-11e8-af00-75b92ae9cef4', '38623c80-cfc1-11e8-af00-75b92ae9cef4', 'dbf47d60-cfba-11e8-8b0f-6535604c9485', '53a605e0-cfc0-11e8-af00-75b92ae9cef4', '0');
INSERT INTO `dm_roomstudent` VALUES ('711e5092-cfc1-11e8-af00-75b92ae9cef4', '38623c80-cfc1-11e8-af00-75b92ae9cef4', 'dbf47d60-cfba-11e8-8b0f-6535604c9485', '65cd1650-cfc0-11e8-af00-75b92ae9cef4', '0');
INSERT INTO `dm_roomstudent` VALUES ('711e5093-cfc1-11e8-af00-75b92ae9cef4', '38623c80-cfc1-11e8-af00-75b92ae9cef4', 'dbf47d60-cfba-11e8-8b0f-6535604c9485', '74f390f0-cfc0-11e8-af00-75b92ae9cef4', '0');
INSERT INTO `dm_roomstudent` VALUES ('711e5094-cfc1-11e8-af00-75b92ae9cef4', '38623c80-cfc1-11e8-af00-75b92ae9cef4', 'dbf47d60-cfba-11e8-8b0f-6535604c9485', '8423cf90-cfc0-11e8-af00-75b92ae9cef4', '0');
INSERT INTO `dm_roomstudent` VALUES ('711e77a0-cfc1-11e8-af00-75b92ae9cef4', '38623c80-cfc1-11e8-af00-75b92ae9cef4', 'dbf47d60-cfba-11e8-8b0f-6535604c9485', '98db4ee0-cfc0-11e8-af00-75b92ae9cef4', '0');
INSERT INTO `dm_roomstudent` VALUES ('711e77a1-cfc1-11e8-af00-75b92ae9cef4', '38623c80-cfc1-11e8-af00-75b92ae9cef4', 'dbf47d60-cfba-11e8-8b0f-6535604c9485', 'af0dae60-cfc0-11e8-af00-75b92ae9cef4', '0');
INSERT INTO `dm_roomstudent` VALUES ('711e77a2-cfc1-11e8-af00-75b92ae9cef4', '38623c80-cfc1-11e8-af00-75b92ae9cef4', 'dbf47d60-cfba-11e8-8b0f-6535604c9485', 'c451dd50-cfc0-11e8-af00-75b92ae9cef4', '0');
INSERT INTO `dm_roomstudent` VALUES ('b9241fc0-d163-11e8-94fc-4d7b27721e27', '9fbcff40-d15c-11e8-835f-f7a06db66861', 'cff81990-cfba-11e8-8b0f-6535604c9485', 'dad71490-cfbc-11e8-8b0f-6535604c9485', '0');
INSERT INTO `dm_roomstudent` VALUES ('b92446d0-d163-11e8-94fc-4d7b27721e27', '9fbcff40-d15c-11e8-835f-f7a06db66861', 'cff81990-cfba-11e8-8b0f-6535604c9485', 'f8741ac0-cfbc-11e8-8b0f-6535604c9485', '0');

-- ----------------------------
-- Table structure for dm_student
-- ----------------------------
DROP TABLE IF EXISTS `dm_student`;
CREATE TABLE `dm_student` (
  `id` char(36) CHARACTER SET utf8 NOT NULL COMMENT '唯一标识id',
  `name` varchar(30) CHARACTER SET utf8 NOT NULL COMMENT '学生姓名',
  `sex` char(2) CHARACTER SET utf8 NOT NULL DEFAULT '1' COMMENT '性别：0：女；1：男',
  `code` varchar(30) CHARACTER SET utf8 NOT NULL COMMENT '学生学号',
  `classid` char(36) CHARACTER SET utf8 DEFAULT NULL COMMENT '所属班级id',
  `phone` varchar(20) CHARACTER SET utf8 DEFAULT NULL COMMENT '联系电话',
  `qq` varchar(20) CHARACTER SET utf8 DEFAULT NULL COMMENT '学生qq号码',
  `gravatar` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '头像地址',
  `status` int(1) NOT NULL DEFAULT '0' COMMENT '学生状态：0：正常；1：禁用',
  PRIMARY KEY (`id`),
  KEY `classid` (`classid`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of dm_student
-- ----------------------------
INSERT INTO `dm_student` VALUES ('5389a6b0-ca4e-11e8-8d90-b3ab8aab42f2', '123', '0', '12313', '18b6b940-c98d-11e8-b2a9-fbad469714c2', '123', '123', '/public\\uploads\\avataor\\1538929778220_1_03.PNG', '0');
INSERT INTO `dm_student` VALUES ('f58e8ca0-ca4e-11e8-b508-0102f3640de8', 'ceshi1', '1', '123123', '80174fa0-ca3c-11e8-9875-13c9f3bf49f6', '12314', '123123', '/public\\uploads\\avataor\\1538930107282_111.jpg', '0');
INSERT INTO `dm_student` VALUES ('2bc77840-ca4f-11e8-a742-85ad8e8b3111', '13123', '1', '23453453', '80174fa0-ca3c-11e8-9875-13c9f3bf49f6', '12312334', '23123', '/public\\uploads\\avataor\\1538930198487_189320-106.jpg', '0');
INSERT INTO `dm_student` VALUES ('526618d0-ca4f-11e8-a742-85ad8e8b3111', '12`3123', '0', '43214', '18b6b940-c98d-11e8-b2a9-fbad469714c2', '12', '2342', '/public\\uploads\\avataor\\1538930265646_189320-106.jpg', '0');
INSERT INTO `dm_student` VALUES ('6ff53c50-ca4f-11e8-9a81-cb06d5e1ef8f', '1231', '0', '34', '18b6b940-c98d-11e8-b2a9-fbad469714c2', '234235', '5345', '/public\\uploads\\avataor\\1538930313735_banner03.jpg', '0');
INSERT INTO `dm_student` VALUES ('94e19210-cc49-11e8-b06a-37a4d85f4e55', '452342c', '1', '121232', '18b6b940-c98d-11e8-b2a9-fbad469714c2', '5654685685', '24124', '/public\\uploads\\avataor\\1539147700855_banner01.jpg', '0');
INSERT INTO `dm_student` VALUES ('de693ce0-cc57-11e8-86ee-09fa81f7ff84', '21312', '1', '4142114', '18b6b940-c98d-11e8-b2a9-fbad469714c2', '312', '241414', '/public\\uploads\\avataor\\1539153838810_111.jpg', '0');
INSERT INTO `dm_student` VALUES ('dad71490-cfbc-11e8-8b0f-6535604c9485', '陈友锋', '1', '1641320301', 'cff81990-cfba-11e8-8b0f-6535604c9485', '13208100196', '281996516', '/public\\uploads\\avataor\\20181014\\1539527064576_image1.jpeg', '0');
INSERT INTO `dm_student` VALUES ('f8741ac0-cfbc-11e8-8b0f-6535604c9485', '李路', '1', '1641320303', 'cff81990-cfba-11e8-8b0f-6535604c9485', '13208168676', '187642916', '/public\\uploads\\avataor\\20181014\\1539527114851_image6.jpeg', '0');
INSERT INTO `dm_student` VALUES ('0e764280-cfbd-11e8-8b0f-6535604c9485', '游振栋', '1', '1641320304', 'cff81990-cfba-11e8-8b0f-6535604c9485', '13208195332', '834840889', '/public\\uploads\\avataor\\20181014\\1539527151949_image22.jpeg', '0');
INSERT INTO `dm_student` VALUES ('43013000-cfbd-11e8-8b0f-6535604c9485', '张馨月', '0', '1641320305', 'cff81990-cfba-11e8-8b0f-6535604c9485', '13658119217', '969403455', '/public\\uploads\\avataor\\20181014\\1539527239988_image15.jpeg', '0');
INSERT INTO `dm_student` VALUES ('81ed2b60-cfbe-11e8-bfad-e7b43d6683d2', '曾元江', '1', '1641320306', 'cff81990-cfba-11e8-8b0f-6535604c9485', '13795549137', '1072831626', '/public\\uploads\\avataor\\20181014\\1539527773237_image4.jpeg', '0');
INSERT INTO `dm_student` VALUES ('efa05c40-cfbe-11e8-af00-75b92ae9cef4', '彭彪', '1', '1641320307', 'cff81990-cfba-11e8-8b0f-6535604c9485', '15182050880', '2205825505', '/public\\uploads\\avataor\\20181014\\1539527958849_image17.jpeg', '0');
INSERT INTO `dm_student` VALUES ('4b021150-cfbf-11e8-af00-75b92ae9cef4', '杨康', '1', '1641320308', 'cff81990-cfba-11e8-8b0f-6535604c9485', '13547881223', '2054598510', '/public\\uploads\\avataor\\20181014\\1539528110264_image12.jpeg', '0');
INSERT INTO `dm_student` VALUES ('5cffa0c0-cfbf-11e8-af00-75b92ae9cef4', '张亮春', '1', '1641320309', 'cff81990-cfba-11e8-8b0f-6535604c9485', '13540686226', '2054598510', '/public\\uploads\\avataor\\20181014\\1539528141658_image23.jpg', '0');
INSERT INTO `dm_student` VALUES ('6eab8dc0-cfbf-11e8-af00-75b92ae9cef4', '潘超', '1', '1641320310', 'cff81990-cfba-11e8-8b0f-6535604c9485', '18716121027', '1165778071', '/public\\uploads\\avataor\\20181014\\1539528172152_image11.jpeg', '0');
INSERT INTO `dm_student` VALUES ('813ea670-cfbf-11e8-af00-75b92ae9cef4', '杨志康', '1', '1641320311', 'cff81990-cfba-11e8-8b0f-6535604c9485', '15828577550', '934992791', '/public\\uploads\\avataor\\20181014\\1539528201697_image2.jpeg', '0');
INSERT INTO `dm_student` VALUES ('947f8b50-cfbf-11e8-af00-75b92ae9cef4', '胡刚', '1', '1641320312', 'cff81990-cfba-11e8-8b0f-6535604c9485', '18227140821', '1147225517', '/public\\uploads\\avataor\\20181014\\1539528235869_image19.png', '0');
INSERT INTO `dm_student` VALUES ('a6990730-cfbf-11e8-af00-75b92ae9cef4', '田佳慧', '0', '1641320313', 'cff81990-cfba-11e8-8b0f-6535604c9485', '18270272045', '1196549436', '/public\\uploads\\avataor\\20181014\\1539528266159_image14.jpeg', '0');
INSERT INTO `dm_student` VALUES ('b7b51040-cfbf-11e8-af00-75b92ae9cef4', '赖星辰', '1', '1641320314', 'cff81990-cfba-11e8-8b0f-6535604c9485', '15308387066', '2314383979', '/public\\uploads\\avataor\\20181014\\1539528294409_image5.jpeg', '0');
INSERT INTO `dm_student` VALUES ('30191220-cfc0-11e8-af00-75b92ae9cef4', '刘钰博', '1', '1641320401', 'dbf47d60-cfba-11e8-8b0f-6535604c9485', '15039201998', '1833732878', '/public\\uploads\\avataor\\20181014\\1539528495224_image5.jpeg', '0');
INSERT INTO `dm_student` VALUES ('42165370-cfc0-11e8-af00-75b92ae9cef4', '胡凌瑞', '1', '1641320402', 'dbf47d60-cfba-11e8-8b0f-6535604c9485', '13896378623', '754248034', '/public\\uploads\\avataor\\20181014\\1539528526184_image2.jpeg', '0');
INSERT INTO `dm_student` VALUES ('53a605e0-cfc0-11e8-af00-75b92ae9cef4', '蒋海燕', '0', '1641320404', 'dbf47d60-cfba-11e8-8b0f-6535604c9485', '18582388736', '379417595', '/public\\uploads\\avataor\\20181014\\1539528556783_image6.png', '0');
INSERT INTO `dm_student` VALUES ('65cd1650-cfc0-11e8-af00-75b92ae9cef4', '李广', '1', '1641320406', 'dbf47d60-cfba-11e8-8b0f-6535604c9485', '13440055675', '1048085505', '/public\\uploads\\avataor\\20181014\\1539528586845_image20.jpeg', '0');
INSERT INTO `dm_student` VALUES ('74f390f0-cfc0-11e8-af00-75b92ae9cef4', '马圣尧', '1', '1641320407', 'dbf47d60-cfba-11e8-8b0f-6535604c9485', '13208191723', '764741657', '/public\\uploads\\avataor\\20181014\\1539528612336_image7.png', '0');
INSERT INTO `dm_student` VALUES ('8423cf90-cfc0-11e8-af00-75b92ae9cef4', '杨佳雨', '1', '1641320408', 'dbf47d60-cfba-11e8-8b0f-6535604c9485', '13540631589', '2282808705', '/public\\uploads\\avataor\\20181014\\1539528637885_image8.png', '0');
INSERT INTO `dm_student` VALUES ('98db4ee0-cfc0-11e8-af00-75b92ae9cef4', '金子哲', '1', '1641320409', 'dbf47d60-cfba-11e8-8b0f-6535604c9485', '13511382777', '374068549', '/public\\uploads\\avataor\\20181014\\1539528671293_image13.png', '0');
INSERT INTO `dm_student` VALUES ('af0dae60-cfc0-11e8-af00-75b92ae9cef4', '柳先杰飞', '1', '1641320410', 'dbf47d60-cfba-11e8-8b0f-6535604c9485', '13666283654', '1062655331', '/public\\uploads\\avataor\\20181014\\1539528706548_1d624e055d8ba85d.jpg', '0');
INSERT INTO `dm_student` VALUES ('c451dd50-cfc0-11e8-af00-75b92ae9cef4', '寇钦', '1', '1641320411', 'dbf47d60-cfba-11e8-8b0f-6535604c9485', '18284924507', '826110229', '/public\\uploads\\avataor\\20181014\\1539528745646_image9.png', '0');
INSERT INTO `dm_student` VALUES ('38bc1030-d1cd-11e8-b9d0-09ff942b6546', '鲁小豪', '1', '1641320225', 'fa753900-d1cc-11e8-b9d0-09ff942b6546', '18302846417', '1584848224', '/public\\uploads\\avataor\\20181017\\1539753995842_image1.png', '0');

-- ----------------------------
-- Table structure for dm_teacher
-- ----------------------------
DROP TABLE IF EXISTS `dm_teacher`;
CREATE TABLE `dm_teacher` (
  `id` char(36) CHARACTER SET utf8 NOT NULL COMMENT '唯一标识',
  `name` varchar(30) CHARACTER SET utf8 NOT NULL COMMENT '老师名称真实姓名',
  `password` varchar(255) CHARACTER SET utf8 NOT NULL COMMENT '用户登录密码',
  `sex` char(2) CHARACTER SET utf8 NOT NULL DEFAULT '1' COMMENT '性别：0：女；1：男',
  `code` varchar(20) CHARACTER SET utf8 NOT NULL COMMENT '老师编号',
  `createtime` char(13) CHARACTER SET utf8 NOT NULL COMMENT '创建时间',
  `status` int(1) NOT NULL DEFAULT '0' COMMENT '老师状态：0：正常|1：禁用',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of dm_teacher
-- ----------------------------
INSERT INTO `dm_teacher` VALUES ('eeaa0660-bf4c-11e8-82aa-87eb8d938e15', 'admin', 'U2FsdGVkX1+bFw9Bw/NX3qIoRmCI3svNgELO/L1EqLo=', '1', 'T0001', '1537719777', '0');
INSERT INTO `dm_teacher` VALUES ('710dc6d0-bf4f-11e8-b219-f546aa359bf1', '杨坤', 'U2FsdGVkX19HPoYkwOgkZzjGvbhK669X1jf++MFH67A=', '1', 'T0002', '1537720855', '0');
INSERT INTO `dm_teacher` VALUES ('90524600-bf50-11e8-a1df-8d26a812baa9', '戚薇', 'U2FsdGVkX1+7fWzUPlBEHGWwZnkzr4VUOqQhdLDIORE=', '0', 'T0003', '1537721337', '0');
INSERT INTO `dm_teacher` VALUES ('c0bda770-bfc4-11e8-b0d3-69b64dc89502', '你好', 'U2FsdGVkX1/QaY1MYY4xTCllul//QeFo8FxLTc5Hhpg=', '1', 'T0004', '1537771240', '0');
INSERT INTO `dm_teacher` VALUES ('8a302350-c15d-11e8-8579-e72dbcf90694', '邓超', 'U2FsdGVkX1+UYvHFOE0oXDR+jkIi6svUnm2qLTqUXjg=', '1', 'T0005', '1537946812', '0');
