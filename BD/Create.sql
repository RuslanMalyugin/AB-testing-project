DROP SCHEMA IF EXISTS trains_main CASCADE;
CREATE SCHEMA trains_main;

---Таблицы---
DROP TABLE IF EXISTS trains_main.Carriage;
CREATE TABLE trains_main.Carriage
(
    Carriage_Number CHAR(4)  NOT NULL UNIQUE PRIMARY KEY,
    Kind SMALLINT NOT NULL,
    Mileage INTEGER NOT NULL DEFAULT 0,
    Train_Number CHAR(5) NOT NULL,
    Carrying_Capacity INTEGER NOT NULL
);

DROP TABLE IF EXISTS trains_main.Station;
CREATE TABLE trains_main.Station
(
    Name VARCHAR(30) NOT NULL UNIQUE PRIMARY KEY,
    Direction_Code SMALLINT NOT NULL,
    Depot SMALLINT
);


DROP TABLE IF EXISTS trains_main.Container;
CREATE TABLE trains_main.Container
(
    Containe_Number CHAR(7)  NOT NULL UNIQUE PRIMARY KEY,
    Size_Type SMALLINT NOT NULL,
    Owner_Country_Code CHAR(3) NOT NULL,
    Type_Of_Cargo VARCHAR(30) NOT NULL,
    Container_Status VARCHAR(30) NOT NULL,
    Destination_Station VARCHAR(30) NOT NULL,
    Carriage_Number CHAR(4) NOT NULL,
    Time_From TIMESTAMP NOT NULL,
    Time_To TIMESTAMP NOT NULL
);

DROP TABLE IF EXISTS trains_main.Brigade;
CREATE TABLE trains_main.Brigade
(
    Brigade_Code CHAR(5)  NOT NULL UNIQUE PRIMARY KEY,
    Home_Road_Code CHAR(2) NOT NULL,
    Depot SMALLINT NOT NULL,
    Locomotive_Code CHAR(8) NOT NULL
);

DROP TABLE IF EXISTS trains_main.Train;
CREATE TABLE trains_main.Train
(
    Train_Index CHAR(5) NOT NULL UNIQUE PRIMARY KEY,
    Departure_Station VARCHAR(30) NOT NULL,
    Destination_Station VARCHAR(30) NOT NULL,
    ---Departure_Time TIMESTAMP NOT NULL
    ---Destination_Time TIMESTAMP NOT NULL,
    Carriage_Number SMALLINT NOT NULL
);

DROP TABLE IF EXISTS trains_main.Series;
CREATE TABLE trains_main.Series
(
    Batch_Code VARCHAR(2) NOT NULL UNIQUE PRIMARY KEY,
    Net_Weight INTEGER CHECK(Net_Weight >= 0) NOT NULL,
    Gross_Weight INTEGER CHECK(Gross_Weight >= 0) NOT NULL,
    Power INTEGER NOT NULL
);

DROP TABLE IF EXISTS trains_main.Locomotive;
CREATE TABLE trains_main.Locomotive
(
    Identification_Code CHAR(8) NOT NULL UNIQUE PRIMARY KEY,
    Train_Index CHAR(5) REFERENCES trains_main.Train(Train_Index) NOT NULL,
    Batch_Code VARCHAR(2) NOT NULL,
    Milage INTEGER NOT NULL,
    Brigade_Sign CHAR(1) NOT NULL
);

INSERT INTO trains_main.Train (Train_Index, Departure_Station, Destination_Station, Carriage_Number)
VALUES ('TR123', 'Timiryazevskaya', 'Novodachnaya', 124),
       ('TR234', 'Novodachnaya', 'Timiryazevskaya', 24),
       ('TR345', 'Mark', 'Leonozovo', 53),
       ('TR456', 'Mark', 'Degunino', 32),
       ('TR567', 'Mark', 'Leonozovo', 56),
       ('TR678', 'Novodachnaya', 'Timiryazevskaya', 90);

INSERT INTO trains_main.Locomotive (Identification_Code, Train_Index, Batch_Code, Milage, Brigade_Sign)
VALUES ('LOK12345', 'TR123', 'M', 124, '1'),
       ('LOK12346', 'TR234', 'M', 24, '1'),
       ('LOK12347', 'TR123', 'K', 772, '0'),
       ('LOK12348', 'TR345', 'L1', 236, '1'),
       ('LOK12349', 'TR456', 'L2', 129, '1'),
       ('LOK12350', 'TR567', 'L2', 130, '1');


INSERT INTO trains_main.Series (Batch_Code, Net_Weight, Gross_Weight, Power)
VALUES ('M', 1200, 1500, 50),
       ('K', 1300, 1550, 60),
       ('L1', 1600, 1700, 70),
       ('L2', 1200, 1400, 60);

INSERT INTO trains_main.Brigade (Brigade_Code, Home_Road_Code, Depot, Locomotive_code)
VALUES ('BR000', 'E8', 253, 'LOK12345'),
       ('BR001', 'E9', 234, 'LOK12347'),
       ('BR002', 'E3', 226, 'LOK12349'),
       ('BR003', 'B4', 234, 'LOK12347'),
       ('BR004', 'B4', 253, 'LOK12347'),
       ('BR005', 'B7', 281, 'LOK12347'),
       ('BR006', 'B4', 226, 'LOK12347'),
       ('BR007', 'B5', 228, 'LOK12350');

COPY trains_main.Station (Name, Direction_Code, Depot) FROM
   'C:\Stations.csv' DELIMITER ';' CSV HEADER;

INSERT INTO trains_main.Carriage (Carriage_Number, Kind, Mileage, Train_Number, Carrying_Capacity)
VALUES ('V431', 3, 345, 'TR456', 1200),
       ('V432', 2, 300, 'TR456', 1400),
       ('V433', 3, 500, 'TR456', 900),
       ('V434', 3, 600, 'TR456', 900),
       ('V435', 1, 800, 'TR123', 900),
       ('V436', 1, 234, 'TR123', 1300),
       ('V437', 1, 469, 'TR234', 1300),
       ('V438', 3, 700, 'TR234', 800),
       ('V439', 4, 1600, 'TR567', 850),
       ('V440', 3, 500, 'TR567', 950),
       ('V441', 3, 1300, 'TR678', 1000);

INSERT INTO trains_main.Container (Containe_Number, Size_Type, Owner_Country_Code, Type_Of_Cargo,
                                   Container_Status, Destination_Station, Carriage_Number,
                                   Time_From, Time_To)
VALUES ('C123567', 3, 'RUS', 'Coal', 'inventory', 'Mark', 'V431', '04.12.2020', '22.05.2021'),
      ('C123546', 7, 'RUS', 'Wood', 'inventory', 'Novodachnaya', 'V431', '22.03.2021', '22.05.2021'),
       ('C123524', 4, 'KZN', 'Sand', 'rented', 'Leonozovo', 'V441', '13.03.2021', '22.05.2021'),
       ('C123545', 3, 'RUS', 'Coal', 'inventory', 'Mark', 'V441', '19.01.2021', '22.05.2021'),
       ('C123589', 3, 'RUS', 'Coal', 'rented', 'Leonozovo', 'V432', '22.03.2021', '22.05.2021'),
       ('C123523', 2, 'UKR', 'Wood', 'rented', 'Novodachnaya', 'V433', '18.01.2021', '22.05.2021'),
       ('C123519', 2, 'RUS', 'Post', 'urgent return', 'Timiryazevskaya', 'V434', '22.03.2021', '22.05.2021'),
       ('C123591', 2, 'UKR', 'Sand', 'own', 'Degunino', 'V435', '20.03.2021', '22.05.2021'),
       ('C123530', 2, 'RUS', 'Coal', 'own', 'Degunino', 'V436', '20.03.2021', '22.05.2021');

CREATE INDEX index ON trains_main.Container (Containe_Number);

---Запрос: Поезд с наибольшим числом вагонов до Леонозово
select train_index, carriage_number from trains_main.Train t
where (SELECT max(carriage_number) as mx
from trains_main.Train as t
where destination_station = 'Leonozovo') = carriage_number
group by train_index;

---Запрос: Вывести количество контейнеров от каждой страны по возрастанию их количества
select owner_country_code, count(containe_number) as country_count
from trains_main.Container
group by owner_country_code
order by country_count desc;

---Количество бригад на каждой станции
select Name, count(Brigade_Code) as Brigade_number
from trains_main.Station as Tr left join trains_main.Brigade as Br on Tr.Depot = Br.Depot
group by Name;

---локомотивы серии L, их мощность и количеством прицепленных вагонов, если оно больше 30
select identification_code, power, carriage_number
from (select * from trains_main.Locomotive as L where L.batch_code like 'L%') as L
inner join trains_main.series as S on L.batch_code = S.batch_code inner join trains_main.Train as T
on L.train_index = T.train_index
group by identification_code, power, carriage_number
having Carriage_Number > 30;

---сравнение грузоподъемности вагона со средней грузоподъемностью вагонов того же типа
select Carriage_number, kind, carrying_capacity,
       avg(carrying_capacity) over (partition by kind)
from trains_main.Carriage
order by Carriage_number;

WITH Ordered AS (
select ROW_NUMBER() OVER (ORDER BY T.train_index) AS RowNumber,
T.train_index, count(C.carriage_number) as sum_len
from trains_main.train as T left join trains_main.carriage as C on T.train_index = C.Train_Number
group by T.train_index
order by sum_len desc)
select train_index
from Ordered
WHERE RowNumber = 2


/*---Пробег локомотивов массы < 1400 кг
select sum(milage) as sum_milage
from trains_main.Locomotive as C right join trains_main.series as S on C.batch_code = S.batch_code
where S.net_weight < 1400;

---Вывести вагоны по видам грузоподъемности больше 850 кг
select carriage_number, kind, rank() OVER (
	   PARTITION BY kind
	)
from trains_main.carriage as C
where C.carrying_capacity > 850;*/









