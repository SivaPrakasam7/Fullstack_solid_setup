use `sample`;

DROP TABLE IF EXISTS `sample_table`;

CREATE TABLE
    `sample_table` (
        `id` int (11) AUTO_INCREMENT,
        `name` varchar(100),
        PRIMARY KEY (`id`)
    );

INSERT INTO
    `sample_table` (`name`)
VALUES
    ('siva');