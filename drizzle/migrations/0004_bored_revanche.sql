DROP TABLE `account`;--> statement-breakpoint
DROP TABLE `session`;--> statement-breakpoint
DROP TABLE `user`;--> statement-breakpoint
DROP TABLE `verificationToken`;--> statement-breakpoint
ALTER TABLE `qrcodes` ADD `scanned_by` varchar(255);--> statement-breakpoint
ALTER TABLE `qrcodes` ADD `scanned_at` datetime;--> statement-breakpoint
CREATE INDEX `id_event_index` ON `qrcodes` (`id`,`event_id`);