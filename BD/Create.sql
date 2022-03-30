DROP SCHEMA IF EXISTS AB_test CASCADE;
CREATE SCHEMA AB_test;

---Таблицы---
DROP TABLE IF EXISTS AB_test.Projects_Common_Information;
CREATE TABLE AB_test.Projects_Common_Information
(
  Project_ID INTEGER UNIQUE PRIMARY KEY,
  Project_Name TEXT default NULL,
  Client_ID INTEGER default NULL,
  Time_Begin_Testing DATE,
  Time_End_Testing DATE,
  City VARCHAR(255),
  Date_Open DATE,
  Business_Square INTEGER,
  Goods_Type VARCHAR(255),
  Enterprise_Type VARCHAR(255),
  Work_Days VARCHAR(255),
  Servant_Number INTEGER
);


DROP TABLE IF EXISTS AB_test.Projects_Metric_Information;
CREATE TABLE AB_test.Projects_Metric_Information
(
    Project_ID INTEGER UNIQUE PRIMARY KEY,
    Main_Metric VARCHAR(255) default NULL,
    Others_Metrics VARCHAR(255) default NULL,
    Criteria VARCHAR(255) DEFAULT 'two-sided',
    Method VARCHAR(255),
    Test_power FLOAT DEFAULT 0.8,
    Significance_level FLOAT DEFAULT 0.05,
    Expected_effect FLOAT DEFAULT 0.1,
    Variations FLOAT DEFAULT NULL,
    Conversion_rate FLOAT DEFAULT NULL
);

DROP TABLE IF EXISTS AB_test.Metrics;
CREATE TABLE AB_test.Metrics
(
    Project_ID INTEGER,
    Date DATE,
    Metric VARCHAR(255),
    Value INTEGER
);

DROP TABLE IF EXISTS AB_test.Users;
CREATE TABLE AB_test.Users
(
    User_ID INTEGER UNIQUE PRIMARY KEY,
    User_Name VARCHAR(50),
    Gender VARCHAR(50),
    Project_ID INTEGER,
    AB_Group VARCHAR(1),
    Registration_Data DATE,
    Hours_Attended INTEGER
);




