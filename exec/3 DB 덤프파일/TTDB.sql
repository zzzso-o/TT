-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: i7a809.p.ssafy.io    Database: TTDB
-- ------------------------------------------------------
-- Server version	8.0.30-0ubuntu0.20.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `share_comment_code` bigint NOT NULL AUTO_INCREMENT,
  `created_date` varchar(255) COLLATE utf8mb3_bin DEFAULT NULL,
  `modified_date` varchar(255) COLLATE utf8mb3_bin DEFAULT NULL,
  `share_comment_author` varchar(255) COLLATE utf8mb3_bin DEFAULT NULL,
  `share_comment_content` text COLLATE utf8mb3_bin,
  `share_code` bigint DEFAULT NULL,
  PRIMARY KEY (`share_comment_code`),
  KEY `FKecmdpctqgrmis43rkb8855mbm` (`share_code`),
  CONSTRAINT `FKecmdpctqgrmis43rkb8855mbm` FOREIGN KEY (`share_code`) REFERENCES `share` (`share_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `meeting`
--

DROP TABLE IF EXISTS `meeting`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `meeting` (
  `meet_code` bigint NOT NULL AUTO_INCREMENT,
  `meet_author` varchar(255) COLLATE utf8mb3_bin DEFAULT NULL,
  `meet_content` text COLLATE utf8mb3_bin,
  `meet_date` varchar(255) COLLATE utf8mb3_bin DEFAULT NULL,
  `meet_game_is_start` bit(1) DEFAULT NULL,
  `meet_py_num` int DEFAULT NULL,
  `meet_py_time` varchar(255) COLLATE utf8mb3_bin DEFAULT NULL,
  `meet_title` varchar(255) COLLATE utf8mb3_bin DEFAULT NULL,
  `room_code` bigint DEFAULT NULL,
  PRIMARY KEY (`meet_code`),
  KEY `FKnthmb0v02b1uubwf80yqba0o4` (`room_code`),
  CONSTRAINT `FKnthmb0v02b1uubwf80yqba0o4` FOREIGN KEY (`room_code`) REFERENCES `room_info` (`room_code`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `meeting`
--

LOCK TABLES `meeting` WRITE;
/*!40000 ALTER TABLE `meeting` DISABLE KEYS */;
INSERT INTO `meeting` VALUES (1,'lich','주사위 너무너무 어렵당','2022-08-18T00:11',_binary '',3,'2022-08-18T00:08','주사위 테스트',1),(2,'minseok','dasd','2022-08-18T09:14',_binary '',3,'2022-08-17T09:14','test',2),(3,'임완택','지금!','2022-08-18T09:27',_binary '',6,'2022-08-18T09:27','테스트',3),(4,'이창현','TEST','2022-08-18T10:06',_binary '',6,'2022-08-18T10:07','시연 테스트',4),(5,'coachAn','오른손에 갑자기 이상한 액체 괴물이 붙었고 내 손에 흡수되었다...!!\n\n당신은 이 순간 어떻게 할 것인가?','2022-08-18T10:44',_binary '\0',6,'2022-08-19T13:46','데헷 데헷 데헷 데헷 데헷 데헷~~',6),(6,'coachAn','오른손에 갑자기 이상한 액체 괴물이 붙었고 내 손에 흡수되었다...!!\n\n당신은 이 순간 어떻게 할 것인가?','2022-08-18T10:44',_binary '\0',6,'2022-08-19T13:46','데헷 데헷 데헷 데헷 데헷 데헷~~',7),(7,'coachAn','오른손에 갑자기 이상한 액체 괴물이 붙었고 내 손에 흡수되었다...!!\n\n당신은 이 순간 어떻게 할 것인가?','2022-08-18T10:44',_binary '\0',6,'2022-08-19T13:46','데헷 데헷 데헷 데헷 데헷 데헷~~',5),(8,'minseok','adsds','2022-08-18T12:51',_binary '',3,'2022-08-17T12:51','testwqew',8),(9,'minseok','dasd','2022-08-18T12:59',_binary '',3,'2022-08-17T12:59','testgm',9),(10,'minseok','dasd','2022-08-18T13:39',_binary '',3,'2022-08-17T13:39','playertest',10),(11,'aaaaaa','aasd','2022-08-18T14:21',_binary '',2,'2022-08-18T14:21','aaaaaa',11),(12,'minseok','dad','2022-08-18T14:47',_binary '',4,'2022-08-18T16:47','pagination test',12),(13,'이창현','ㅅㄷㄴㅅ','2022-08-18T15:26',_binary '',2,'2022-08-18T15:26','시연 테스트2',13),(14,'이창현','ㅅㄷㄴㅅ','2022-08-18T15:27',_binary '',2,'2022-08-18T15:29','시연 테스트3',14),(15,'이창현','ㅅㄷㄴㅅ','2022-08-18T15:27',_binary '',5,'2022-08-18T15:28','시연 테스트4',15),(16,'이창현','ㅅㄷㄴㅅ','2022-08-18T15:27',_binary '',5,'2022-08-18T15:29','시연 테스트5',16),(17,'이창현','ㅅㄷㄴㅅ','2022-08-18T15:27',_binary '',5,'2022-08-18T19:31','시연 테스트6',17),(18,'이창현','test','2022-08-18T15:35',_binary '',5,'2022-08-18T15:36','시연 테스트7',18),(19,'이창현','test','2022-08-18T15:35',_binary '',3,'2022-08-18T15:36','시연 테스트8',19),(20,'이창현','테스트','2022-08-18T16:15',_binary '',2,'2022-08-18T16:15','시연테스트9',20),(21,'이창현','텟투','2022-08-18T16:20',_binary '',3,'2022-08-18T16:20','시연테스트10',21),(22,'이창현','ㅅㄷㄴㅅ','2022-08-18T16:34',_binary '',5,'2022-08-18T16:34','시연테스트21',22),(23,'이창현','ㅅㄷㄴㅅ','2022-08-18T16:42',_binary '',4,'2022-08-18T16:39','시연테스트11',23),(24,'이창현','ㅇㅇ','2022-08-18T16:50',_binary '',3,'2022-08-18T16:50','시연테스트12',24),(25,'이창현','ㅅㄷㄴㅅ','2022-08-18T16:56',_binary '',2,'2022-08-18T16:55','시연테스트13',25),(26,'이창현','ㅅㄷㄴ','2022-08-18T17:00',_binary '',3,'2022-08-18T17:00','시연테스트 14',26),(27,'memetata','모두모두 모여라','2022-08-18T17:20',_binary '',6,'2022-08-18T17:18','여기로와야함',27),(28,'임완택','시연입니다.','2022-08-18T23:23',_binary '',6,'2022-08-18T23:23','시연하겠습니다',28),(29,'이창현','시연','2022-08-18T23:38',_binary '',6,'2022-08-18T23:38','첫 번째 시연',29),(30,'이창현','시연','2022-08-18T23:44',_binary '',6,'2022-08-18T23:44','두번째 시연',30),(31,'이창현','시연','2022-08-19T00:37',_binary '',6,'2022-08-19T00:37','마지막 시연',31),(32,'이창현','ewq','2022-08-19T03:39',_binary '',6,'2022-08-19T03:38','시연 테스트',32),(33,'lich','같이 TRPG 즐기실 분 모집합니다!\n\n저는 게임 마스터를 할 예정이고, \n직접 플레이를 뛰실 분들을 모집합니다!\n\nTRPG 좋아하신다면 신청해주세요~~','2022-08-19T10:00',_binary '',4,'2022-08-19T09:00','같이 TRPG 즐기실 분!',33),(34,'TT관리자','TT 사이트 관리자와 함께 TRPG 하실 분을 모집 합니다!!','2022-08-19T10:29',_binary '\0',6,'2022-08-19T18:00','운영자와 함께하는 TRPG',34),(35,'임완택','같이 재밌게 놀아요~!','2022-08-19T10:29',_binary '\0',6,'2022-08-19T14:29','오늘 시간 되시는 분 모여주세요!',35),(36,'이창현','본인이 GM을 맛깔나게 잘한다 하시는 분만 오세요~','2022-08-19T10:30',_binary '\0',6,'2022-08-20T13:30','GM 빡고수 구합니다.. ',36),(37,'beckhem960810@gmail.com','완전 처음이라 가르쳐주시거나 같이 해볼 분들이었으면 좋겠어요.','2022-08-19T10:31',_binary '\0',6,'2022-08-20T10:31','TRPG 초보자인데 같이 하실 분 구해요',37),(38,'싸피싸피김싸피','싸피의 힘을 보여줍시다!!','2022-08-19T10:32',_binary '\0',5,'2022-08-19T15:36','싸피 파티원 구해요~',38),(39,'뉴비','Player는 여러번 해봤지만 GM도 재미있어보여서 한번 해보려고 합니다.\n부족하지만 재미있게 같이 하실 분들 참여해주세요!!','2022-08-19T10:33',_binary '\0',5,'2022-08-19T16:39','GM 초보 도전기 참여해서 도와주실 분들...',39),(40,'리자드맨','저는 경력이 좀 있어서 초보자 분들 알려드리면서 하려고 합니다! 내일 봬요!','2022-08-19T10:36',_binary '\0',6,'2022-08-20T14:36','제가 알려드리면서 할 건데 같이 하실 분~!',40),(41,'이창현','모닝 TRPG 같이 하실분 모집합니다!!\n인원 충족 안되면 폭파할게요!!','2022-08-19T10:39',_binary '',6,'2022-08-19T10:38','지금 당장 같이 하실 분 있으신가요??',41),(42,'네크로멘서','참고로 enroll time은 열어놓겠습니다!!','2022-08-19T10:41',_binary '',6,'2022-08-19T10:30','오랫동안 천천히 하실 분 구해요',42),(43,'metamong','ㅎㅎㅎ','2022-08-19T11:06',_binary '',6,'2022-08-19T11:05','게임 같이 하실 분',43),(47,'지수짱','ㅎㅎㅎ','2022-08-19T11:13',_binary '',6,'2022-08-18T11:13','ㅎㅎ',47);
/*!40000 ALTER TABLE `meeting` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notice`
--

DROP TABLE IF EXISTS `notice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notice` (
  `notice_code` bigint NOT NULL AUTO_INCREMENT,
  `notice_article` text COLLATE utf8mb3_bin,
  `notice_author` varchar(255) COLLATE utf8mb3_bin DEFAULT NULL,
  `notice_date` varchar(255) COLLATE utf8mb3_bin DEFAULT NULL,
  `notice_title` varchar(255) COLLATE utf8mb3_bin DEFAULT NULL,
  PRIMARY KEY (`notice_code`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notice`
--

LOCK TABLES `notice` WRITE;
/*!40000 ALTER TABLE `notice` DISABLE KEYS */;
INSERT INTO `notice` VALUES (1,'TT 사이트를 이용하기 위해서\n\n1. Meeting 게시판에서 같이 TRPG를 플레이 할 사람을 모집한다.\n\n2. GM or Player로 둘 중 하나를 선택한다.\n - GM은 1명 Player는 여려 명으로 구성된다.\n\n3. 방을 만든 사람이 설정한 시간이 되면 방 입장 버튼이 생기고 방에 입장한다.\n\n4. Player들은 각자 역할을 할 캐릭터를 작성하고 Gm은 방 입장 전 어떻게 진행을 할 지에 대한 시나리오를 구상한다.\n\n5. Gm의 진행에 따라 Player들은 각자의 캐릭터를 연기하며 스토리를 만들어 나간다.','TT관리자','2022-08-19 09:42','[공지] 사이트 이용 방법'),(2,'1. 직업을 고른다 ex) 재미있는 마법사 아이디어가 떠올랐기 때문에, 마법사를 플레이하고 싶다고 말을 꺼냅니다. 다른 사람들은 어차피 마법사를 할 생각이 없다고 합니다. 주저 없이 마법사 직업을 선택합니다. 2. 외모를 작성한다. ex) 마법사라면 보통 사람이 상상도 못할 것을 보아 왔을 테니 “뭔가에 씐 듯한 눈”이 어울릴 것 같습니다. 진정한 마법사는 헤어스타일 따위에 신경을 쓸 겨를이 없다는 이유로 “다듬지 않은 머리”를 고릅니다. “괴상하게 생긴 로브”를 입고 있다고 정하고, 다른 사람들에게는 이 로브가 어쩌면 소환 의식의 결과로 이계에서 왔는지도 모른다고 이야기합니다. 공부하고 연구하느라 밥 먹을 시간이 없었으니 “마른 몸매”를 택합니다. 3. 가치관을 선택한다. ex) 마법사가 중립을 선택하면 마법적인 수수께끼를 발견할 때마다 경험치를 얻는다고 되어 있습니다. 아본은 수수께끼를 좋아하므로, 중립을 선택하기로 합니다. 4. 캐릭터를 소개한다. ex) “아본은 강력한 마법사예요! 인간이고, 뭔가에 씐 듯한 눈에 다듬지 않은 머리를 하고 있고요, 마른 몸매에 괴상하게 생긴 로브를 걸치고 있습니다. 아까도 말했지만 이 로브는 다른 세계에서 소환된 거라서 특이하게 생겼어요.”','TT관리자','2022-08-19 09:50','[공지] 캐릭터 만드는 법'),(3,'능력 수정치란 주사위를 굴렸을 때 주사위의 눈의 값에 + 되거나 -되는 추가적인 수치를 이야기합니다. 1~3: -3, 4~5: -2, 6~8: -1, 9~12:0, 13~15: +1, 16~17: +2, 18: +3의 추가적인 수정치를 가지고 있습니다.','TT관리자','2022-08-19 09:52','[공지] 능력 수정치에 관해서'),(5,'TRPG를 진행하는 바탕은 마스터의 강령, 원칙, 액션으로 이루어져 있습니다. 강령은 마스터가 그 자리에 앉는 목적입니다. 원칙은 강령을 수행하는 데 집중할 수 있도록 도와주는 지침입니다. 액션은 순간순간 플레이를 진전시키기 위해 마스터가 일으키는 일들입니다. 플레이어의 판정에 6-가 나왔을 때, 룰에서 지시할 때, 그리고 다들 어떻게 될지 궁금해 하며 마스터를 쳐다볼 때, 마스터는 액션을 발동시킵니다.\n\n마스터의 강령, 원칙, 액션은 피해나 수치나 HP와 똑같은 룰입니다. 그러므로 마스터에게 적용되는 룰을 고치거나 무시할 때에는 다른 “보다 룰 같은 룰”을 고치거나 무시할 때와 똑같은 주의를 기울여야 합니다.','TT관리자','2022-08-19 09:57','[공지] 마스터링 하는 법'),(6,'피의 향기 - 같은 대상을 공격할 경우 발동한다. 먼저 1D6의 데미지를 발동한 다음 추가 데미지를 준다, 1D6, 1 ~ 2은 1추가, 3 ~ 4는 2추가,			5 ~ 6은 3추가 피해를 입힌다.ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ                                         \n고유 병기의 종류 - 검/도끼/망치/창 특징: 데미지 + 2ㅡㅡㅡㅡㅡㅡㅡㅡ         \n             	\n병기의 영 - 자기의 고유 병기에 깃든 영에게 말을 걸면 현 상황에 관한 정보나 관점을 제시해줌,매력 판정 2D6, 10+ - 자세한 정보, 7 ~ 9 - 대략적인 정보\n			','TT관리자','2022-08-19 10:02','[공지] 전사 고유 스킬 정보'),(7,'간편 주문,	빛,	물체에 빛을 발광시킴 빛의 세기는 횃불 정도		\n	소마법	사소한 효과를 냄. 음식의 맛을 변화시키는 등 사소한 효과		ㅡㅡㅡㅡㅡㅡㅡ\n고유기술ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ	1.주문강화	\"다음 효과 중 하나를 택한다\n* 주문의 효과가 2배가 됩니다\n* 주문의 대상이 2배가 됩니다\"	,2D6,	10+ 부작용(GM재량) 하나를 받고 다음의 효과를 택한다.ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ\n	2. 화염탄	방어력을 무시하는 데미지를 준다	지능 판정 ,2D6,	10+: 해당 숫자의 합을 데미지로 준다\n				\"7 ~ 9: 첫번째 주사위는 해당 숫자의 값을\n           두번째 주사위는 1 ~ 2 : 1 / 3~4 : 2 / 5 ~ 6: 3을 추가\"\n				6 이하면 6짜리 1번 굴린다.\n	ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ마력의 방패	방어력 + 2		','TT관리자','2022-08-19 10:06','[공지] 마법사 고유 스킬 정보'),(8,'정조준,	방어를 할 수 없거나 기습을 당한 적을 멀리서 공격한다.,	민첩 판정 2D6,	10+ 상대가 부위에 따라 상태이상에 걸리며 데미지도 준다.\n			7 ~ 9 상대가 부위에 따라 상태이상에 걸린다.ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ\n야성의 교감,	동물의 말을 이해하고 동물과 대화를 할 수 있게 됩니다.ㅡ		\n더블샷,	더블 샷,	\"1. 공격 방법: 민첩 판정 2D6,\n2. 데미지: 민첩 판정 2D6\"	\"10+:공격 방법 선택\n1. 한명한테 2번\n2. 2명한테 한 번씩\"\n			7 ~9: 2명한테 한 번씩.\n			6-: 1명한테만 한 발','TT관리자','2022-08-19 10:09','[공지]  사냥꾼 고유 스킬 정보'),(9,'암습,	\"근거리 전투에 말려들지 않습니다,\n통상적인 피해 +1D6를 줍니다.\n상대가 갑옷을 수리할 때까지 방어력에 -1을 받습니다.\"	,민첩 판정 2D6,	\"10+ 2개 선택,\n7 ~ 9 1개 선택\"ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ\n프로의 솜씨,	자물쇠를 따거나 소매치기를 하거나 덫을 해제할 때 	,민첩 판정 2D6,	10+ 성공,\n			7 ~ 9 성공은 하지만 패널티 부여ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ\n덫 전문가,	\"해당 던전에 있는 함정에 대해서 주어진 질문을 통해서 파악할 수 있다,\n* 여기 덫이 있는지, 있다면 어떻게 발동되는지\n* 발동되면 무슨 일이 일어나는지\n* 숨겨진 것이 있는지\"	,민첩 판정 2D6,	10+: 질문 2개','TT관리자','2022-08-19 10:21','[공지] 도적 고유 스킬 정보'),(10,'신 + 탄원	\"신들 중 하나 선택\n종류: 수켈루스(치유와 복구),\n         암흑의 크루곤(무력에 의한 정복),\n         조리카(지식과 숨겨진 것들),\n신에게 탄원을 하면 신이 관장하는 영역에 관련된 유용한 지식과 도움을 제공함. GM 재량\"	ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ\n치유,	본인 포함 치유할 1명을 고른다,	일반 주사위 1D6ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ\n천벌,	적에게 신의 권능을 보여준다. 주사위 6짜리 2번의 데미지, 자신에게 6짜리 1번의 피해	\"적: 일반 주사위 2D6\n자신: 일반 주사위 1D6\"','TT관리자','2022-08-19 10:22','[공지] 사제 고유 스킬 정보'),(11,'던전 월드 한국어 판 룰 북 - https://sites.google.com/site/dungeonworldkr/ ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ\nD & D 한국어 판 룰 북 - https://www.dndkr.com/support','TT관리자','2022-08-19 10:27','[공지] TRPG 룰북에 대해 더 알아보고 싶다면');
/*!40000 ALTER TABLE `notice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `player_char_info`
--

DROP TABLE IF EXISTS `player_char_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `player_char_info` (
  `py_char_code` bigint NOT NULL AUTO_INCREMENT,
  `py_armor` varchar(255) COLLATE utf8mb3_bin DEFAULT NULL,
  `py_class` varchar(255) COLLATE utf8mb3_bin DEFAULT NULL,
  `py_curr_hp` int DEFAULT NULL,
  `py_look` varchar(255) COLLATE utf8mb3_bin DEFAULT NULL,
  `py_max_hp` int DEFAULT NULL,
  `py_name` varchar(255) COLLATE utf8mb3_bin DEFAULT NULL,
  `py_skill_one` varchar(255) COLLATE utf8mb3_bin DEFAULT NULL,
  `py_skill_two` varchar(255) COLLATE utf8mb3_bin DEFAULT NULL,
  `py_skill_three` varchar(255) COLLATE utf8mb3_bin DEFAULT NULL,
  `py_species` varchar(255) COLLATE utf8mb3_bin DEFAULT NULL,
  `py_stat_one` int DEFAULT NULL,
  `py_stat_two` int DEFAULT NULL,
  `py_stat_three` int DEFAULT NULL,
  `py_stat_four` int DEFAULT NULL,
  `py_stat_five` int DEFAULT NULL,
  `py_stat_six` int DEFAULT NULL,
  `py_sup_one` int DEFAULT NULL,
  `py_sup_two` int DEFAULT NULL,
  `py_sup_three` int DEFAULT NULL,
  `py_code` bigint DEFAULT NULL,
  `py_value` varchar(255) COLLATE utf8mb3_bin DEFAULT NULL,
  `py_weapon` varchar(255) COLLATE utf8mb3_bin DEFAULT NULL,
  PRIMARY KEY (`py_char_code`)
) ENGINE=InnoDB AUTO_INCREMENT=99 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `player_char_info`
--

LOCK TABLES `player_char_info` WRITE;
/*!40000 ALTER TABLE `player_char_info` DISABLE KEYS */;
INSERT INTO `player_char_info` VALUES (60,'','priest',17,'aaa',17,'aaa','신 + 탄원','치유','천벌','aaa',11,13,9,8,9,9,0,0,0,12,'good','평범한 기도서'),(62,'','warrior',27,'asd',27,'asd','피의 향기','고유 병기의 종류','병기의 영','asd',12,8,17,15,11,6,0,0,0,16,'good','평범한 한손 대검'),(80,'','hunter',18,'대머리의 날카로운 눈매. 묵언 수행 중이어서 언제나 말이 없다.',18,'Minseok','정조준','야성의 교감','더블샷','인간',11,8,10,10,9,12,0,0,0,3,'good','평범한 활'),(89,'','warrior',23,'연어모양 투구장식물을 달고있다.\n붉게 충혈된 눈으로 적을 찾는듯 주변을 둘러보고있다.',23,'연어전사','피의 향기','고유 병기의 종류','병기의 영','인간',15,11,13,9,8,7,0,0,0,17,'evil','평범한 한손 대검'),(93,'','wizard',13,'뭔가에 씌인 듯한 눈을 하고 있다. 후드를 뒤짚어 쓰고 다니면서, 머리를 정돈하지 못한채로 다닌다',13,'lich','주문강화','화염탄','마력의 방패','인간',7,13,9,11,9,11,0,0,0,1,'neutral','평범한 완드'),(96,'','thief',14,'asd',14,'asd','암습','프로의 솜씨','덫 전문가','asd',15,5,8,15,3,5,0,0,0,4,'good','평범한 단도'),(97,'','warrior',26,'beauty',26,'choi','피의 향기','고유 병기의 종류','병기의 영','male',10,9,16,7,9,12,0,0,0,7,'evil','평범한 한손 대검'),(98,'','',6,'ㅎㅎ',6,'ㅎㅎ','','','','ㅎㅎ',12,6,6,7,5,11,0,0,0,15,'good','');
/*!40000 ALTER TABLE `player_char_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room_info`
--

DROP TABLE IF EXISTS `room_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `room_info` (
  `room_code` bigint NOT NULL AUTO_INCREMENT,
  `room_gm_user_code` bigint DEFAULT NULL,
  `room_py1_user_code` bigint DEFAULT NULL,
  `room_py2_user_code` bigint DEFAULT NULL,
  `room_py3_user_code` bigint DEFAULT NULL,
  `room_py4_user_code` bigint DEFAULT NULL,
  `room_py5_user_code` bigint DEFAULT NULL,
  PRIMARY KEY (`room_code`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room_info`
--

LOCK TABLES `room_info` WRITE;
/*!40000 ALTER TABLE `room_info` DISABLE KEYS */;
INSERT INTO `room_info` VALUES (1,1,3,4,0,0,0),(2,3,4,9,0,0,0),(3,4,5,1,6,16,0),(4,6,9,1,4,3,0),(5,9,6,6,0,0,0),(6,9,12,6,3,3,3),(7,9,4,4,3,0,0),(8,3,0,0,0,0,0),(9,3,12,6,0,0,0),(10,7,3,4,0,0,0),(11,6,12,0,0,0,0),(12,3,0,0,0,0,0),(13,4,6,0,0,0,0),(14,0,6,0,0,0,0),(15,0,6,16,0,0,0),(16,1,6,0,0,0,0),(17,6,4,16,0,0,0),(18,6,4,0,0,0,0),(19,6,1,7,0,0,0),(20,6,1,0,0,0,0),(21,6,1,4,0,0,0),(22,6,1,0,0,0,0),(23,6,1,4,0,0,0),(24,6,1,0,0,0,0),(25,6,1,0,0,0,0),(26,6,1,7,0,0,0),(27,14,15,3,12,7,6),(28,0,4,6,1,17,0),(29,6,4,1,15,17,0),(30,6,1,4,15,17,3),(31,6,3,15,1,17,4),(32,6,4,1,15,17,0),(33,1,20,5,7,0,0),(34,5,6,0,0,0,0),(35,4,6,23,0,0,0),(36,0,6,0,0,0,0),(37,16,21,7,6,0,0),(38,23,21,0,0,0,0),(39,22,6,0,0,0,0),(40,23,7,22,6,0,0),(41,0,6,0,0,0,0),(42,24,6,15,0,0,0),(43,25,26,6,0,0,0),(47,26,0,0,0,0,0);
/*!40000 ALTER TABLE `room_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `share`
--

DROP TABLE IF EXISTS `share`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `share` (
  `share_code` bigint NOT NULL AUTO_INCREMENT,
  `created_date` varchar(255) COLLATE utf8mb3_bin DEFAULT NULL,
  `modified_date` varchar(255) COLLATE utf8mb3_bin DEFAULT NULL,
  `share_author` varchar(100) COLLATE utf8mb3_bin NOT NULL,
  `share_content` text COLLATE utf8mb3_bin NOT NULL,
  `share_like` int DEFAULT '0',
  `share_title` varchar(500) COLLATE utf8mb3_bin NOT NULL,
  `share_view` int DEFAULT '0',
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`share_code`),
  KEY `FKhwfan84wqm1mflkf4dp8wcic0` (`user_id`),
  CONSTRAINT `FKhwfan84wqm1mflkf4dp8wcic0` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_code`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `share`
--

LOCK TABLES `share` WRITE;
/*!40000 ALTER TABLE `share` DISABLE KEYS */;
INSERT INTO `share` VALUES (3,'2022.08.18 10:47','2022.08.18 10:47','coachAn','씨크릿이야',0,'나의 정보를 묻는가?',0,NULL),(6,'2022.08.18 23:17','2022.08.18 23:17','Ssalmon','도적 야캐요',0,'현재 직업별 밸런스 맞음?',0,NULL),(8,'2022.08.18 23:24','2022.08.18 23:24','Ssalmon','법사는 역시 힘법사',0,'마법사 키우는법',0,NULL),(12,'2022.08.19 10:16','2022.08.19 10:16','lich','유튜브를 통해서 TRPG에 대해서 알게되었어요.\n친구놈들에게 해보자고 했었는데, 이상한 눈으로 쳐다보더라고요...\n그래서 이 사이트를 통해서 다른 분들과 같이 즐겨봤습니다!\n정말 몰입이 중요한 게임인 것 같아요',0,'TRPG 즐겨본 후기~',0,NULL),(13,'2022.08.19 10:42','2022.08.19 10:42','이창현','처음 해보았는데 역할에 몰입하는 것도 어렵고 말하는 것도 어렵고 생각보다 어려운거 같아요... 잘하시는 분들 존경합니다!',0,'TRPG 어렵네요..',0,NULL);
/*!40000 ALTER TABLE `share` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_code` bigint NOT NULL AUTO_INCREMENT,
  `user_authority` varchar(255) COLLATE utf8mb3_bin DEFAULT NULL,
  `user_email` varchar(255) COLLATE utf8mb3_bin DEFAULT NULL,
  `user_gender` varchar(255) COLLATE utf8mb3_bin DEFAULT NULL,
  `user_id` varchar(255) COLLATE utf8mb3_bin DEFAULT NULL,
  `user_nickname` varchar(255) COLLATE utf8mb3_bin DEFAULT NULL,
  `user_phone` varchar(255) COLLATE utf8mb3_bin DEFAULT NULL,
  `user_pw` varchar(255) COLLATE utf8mb3_bin DEFAULT NULL,
  PRIMARY KEY (`user_code`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'','icll@naver.com','male','chung5072','lich','010-9457-5072','$2a$10$xrfJsDKhfj6kThOlNR9tB.OWcdHFZWb59KyeFatVGw.3YdpgE2m6m'),(3,'','ejlieb@hafs.kr','male','chris980','minseok','010-3122-3629','$2a$10$EGX5vtERQcLFXBIw2CsaYuzwUYyOE7hoqMCGBaBlHcB6276UM2VMG'),(4,'','beckhem96@naver.com','male','beckhem96','임완택','010-3916-0639','$2a$10$w5nDIkKRbJEtnftFJ7mH7uKxn162r/gensD4GW1FUPmqiJ4d25GoG'),(5,'rule_admin','jisoo@naver.com','female','adminTT','TT관리자','010-4077-3909','$2a$10$4RGz4gyCcyx/Dd48w18iFu4MOU0e/qPtMlg7/.6G/vdCQgo2rzT92'),(6,'','rover48@hanmail.net','male','rover48','이창현','010-4651-4793','$2a$10$f402D/TwrHvGUBHKfzQiHefWcYeaQAmpin0uZ2kcwZ2FoBmRSMrmW'),(7,'','ssafycon@ssafy.com','male','ssafycon','ssafycon','010-0000-0000','$2a$10$pnotlJZs3P7/GgTju4o6I.s3ZiC9TAZ8x1XHxgorKX2vBYbxTCDdC'),(8,'rule_admin','adminssafycon@ssafy.com','none','adminssafycon','adminssafy','010-1111-1111','$2a$10$t2PsFdHk1o.oXYqHzl9RWOvfapTXD8Kfc2Fs2xqHzjO2Zg0o1/sIC'),(9,'','ssafyAn@ssafy.com','male','ssafycoachAn','coachAn','010-2222-2222','$2a$10$QaMPoxfUcEkTXasSVlvUP.C5Fbd2DqBUmu5Dz75y4gxz5nTjhjM6q'),(10,'','ssafyChoi@ssafy.com','female','ssafycoachChoi','coachChoi','010-3333-3333','$2a$10$uM5LIFlfnrSc3RmtzjlMZO9UeSplvo29Fr.LVepJ0Sytf6N3jloBi'),(11,'rule_admin','ssafycoach@ssafy.com','none','adminssafycoach','admincoach','010-5555-5555','$2a$10$f8iUc4kuJDENAzvX8EpDBedeBPdibvI.KZLPByttveYC7O/i/stG.'),(12,'','aaaaa@aaaa.com','male','aaaaaa','aaaaaa','01012348514','$2a$10$40Izj1.Rbwn/2fijpLvN2eJrCWm7e3dvDb5CJoUXijNEE40YFI1.u'),(13,'','coryonronda@gmail.com','','108094751922524763502','원민석','','$2a$10$3ggVY.bmldrUuOSbPW4PCe4Cm7bW8B32cVY4cO0t0Cmnx4Kguiup6'),(14,'','12312gg@naver.com','male','test5','memetata','01012345677','$2a$10$sBPr85FOM5zLRQfKkNaV7ebHnjZ3hSuyt8/XHWaLP2o/pskXbYYpO'),(15,'','12312gg@naver.com','female','jisoo','memetata','01012345677','$2a$10$MjDn6qMMZilu90XpUqma/.Ih6Bjy312/VHsLqi.BTSar1PhskQX36'),(16,'','beckhem960810@gmail.com',NULL,'beckhem960810@gmail.com','beckhem960810@gmail.com',NULL,NULL),(17,'','yeonstar1@gmail.com','male','ysy','Ssalmon','010-2236-2110','$2a$10$fEkdaQEyKP0llHxG2gGZLePelAxx9jj7ctJwkTpWyJMM//4KTiFgu'),(18,'','metamong@ssafy.com','female','jisoolee','jisoo','010-1234-5678','$2a$10$jZcwfkwzS9BLTK78jWwjKOglyQJQUaodyK3njyXX71F7EQduy8gMS'),(19,'','takajii98@gmail.com',NULL,'takajii98@gmail.com','takajii98@gmail.com',NULL,NULL),(20,'','icll5072@gmail.com',NULL,'icll5072@gmail.com','icll5072@gmail.com',NULL,NULL),(21,'','ssafy@naver.com','none','ssafy123','싸피싸피김싸피','010-1234-4567','$2a$10$jo0Sj6aaCRIVWh9YTNVqcO8fBDf8Oqpxd3nwe0Ky5zWbjoKB.uzze'),(22,'','dlguscd@naver.com','male','dlguscd','뉴비','010-4651-4793','$2a$10$utcn1DOKseeteuk/V8zxyugdkX5fkrFhvDuS5tCtLP8/tIYIFzQ9.'),(23,'','17a809@naver.com','female','beckhem996','리자드맨','01039160639','$2a$10$a/vIS2oXPauFcGPgcA2lieE6ibznY/cXn4tXSPaFCLZga2ZX2qJ8O'),(24,'','lwt1996@naver.com','','beckhem966','네크로멘서','01039160639','$2a$10$EkIgEy/eDNQZCmvoHBLemOoWbC7Q1MNs0zufS9wDb1NyluUAE1yF6'),(25,'','ssafyzzang@ssafy.com','none','ssafyzzang','metamong','010-1234-5678','$2a$10$aO/Ztx4mqKMh4FPKfiGiaeQc3AtENvUicuAiRwSvWAPiaNgDo19xm'),(26,'','ssafy123@ssafy.com','female','jisoo2','지수짱','010-1234-5678','$2a$10$q.O6sczXvtJnwXSfeBZyUe0AElVm0vKS4bPPDCxIApikJHlNmunCa');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-08-19 11:39:30
