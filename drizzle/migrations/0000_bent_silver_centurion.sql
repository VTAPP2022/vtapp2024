CREATE TABLE `qrcodes` (
	`id` varchar(24) NOT NULL,
	`applicant_email` varchar(255) NOT NULL,
	`applicant_name` varchar(255) NOT NULL,
	`applicant_phone_no` bigint NOT NULL,
	`application_no` varchar(30) NOT NULL,
	`date_of_birth` varchar(10) NOT NULL,
	`event_id` tinyint NOT NULL,
	`created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `qrcodes_id` PRIMARY KEY(`id`),
	CONSTRAINT `appno_event_index` UNIQUE(`application_no`,`event_id`)
);
