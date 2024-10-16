use `home_management`;

-- Users
DROP TABLE IF EXISTS `users`;

CREATE TABLE
    `users` (
        `id` int(11) AUTO_INCREMENT,
        `userId` VARCHAR(100) NOT NULL, -- Store generated userId 
        `email` VARCHAR(100), -- Email address its optional 
        `phoneNo` VARCHAR(100), -- phoneNo its options
        `profileURL` VARCHAR(255), -- Store profile image URL
        `bannerURL` VARCHAR(255), -- Store user banner background image
        `passwordHash` VARCHAR(255), -- Store password hash
        `providerId` VARCHAR(255), -- For google authentication
        `secretKey` VARCHAR(100) NOT NULL, -- Attach secret to token, It is used for handle logout from all devices
        `isDeleted` INT (11) NOT NULL DEFAULT 0,
        `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
        `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
        PRIMARY KEY (`userId`)
    );

CREATE INDEX idx_email_phone ON `users` (`email`, `phoneNo`);

-- Verifications
DROP TABLE IF EXISTS `verifications`;

CREATE TABLE
    `verifications` (
        `id` INT AUTO_INCREMENT NOT NULL,
        `source` VARCHAR(255) NOT NULL, -- The actual source (email or phone number)
        `sourceType` ENUM ('email', 'phone') NOT NULL, -- Specify the type of the source
        `verified` INT (11) NOT NULL DEFAULT 0,
        `secretId` VARCHAR(100) NOT NULL,
        `isDeleted` INT (11) NOT NULL DEFAULT 0,
        `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
        `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP(),
        PRIMARY KEY (`id`)
    );

CREATE INDEX idx_source ON `verifications` (`source`);

use `home_management_logs`;

CREATE TABLE
    `audit_logs` (
        `id` INT AUTO_INCREMENT,
        `userId` VARCHAR(50) NOT NULL,
        `action` VARCHAR(255) NOT NULL,
        `ipAddress` VARCHAR(100),
        `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
        PRIMARY KEY (`id`),
        FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE
    );

CREATE TABLE
    `login_attempts` (
        `id` INT AUTO_INCREMENT,
        `userId` VARCHAR(50) NOT NULL,
        `attempts` INT (11) NOT NULL DEFAULT 0,
        `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
        PRIMARY KEY (`id`),
        FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE
    );

--