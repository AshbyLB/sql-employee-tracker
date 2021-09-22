INSERT INTO department (`name`)
VALUES ("Front of House"),
       ("Back of House"),
       ("Box Office"),
       ("Security");

INSERT INTO role (`title`, `salary`, `department_id`)
VALUES ("CSR", 25000, 3),
       ("Group Sales", 30000, 3),
       ("Leads", 40000, 3),
       ("Supervisor", 50000, 3),
       ("Department Head", 70000, 3),
       ("Usher", 20000, 1),
       ("Usher Lead", 25000, 1),
       ("Bartender", 20000, 1),
       ("Front Of House Manager", 30000, 1),
       ("Stage Hands", 25000, 2),
       ("Fly Rail Op", 25000, 2),
       ("Electric Op", 25000, 2),
       ("Production Manager", 50000, 2),
       ("Stage Door Security", 30000, 4),
       ("Lobby Security", 30000, 4),
       ("Talent Security Guard", 30000, 4),
       ("Security Lead", 30000, 4);



INSERT INTO employee (`first_name`, `last_name`, `role_id`, `manager_id`)
VALUES ("Tommy", "Tickles",9, NULL),
       ("Randy", "Rockstar",13, NULL),
       ("Richard", "Soggybottom", 5, NULL),
       ("Jesse","Jawbreaker", 17, NULL);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;