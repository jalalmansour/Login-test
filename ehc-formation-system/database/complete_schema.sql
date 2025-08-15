-- Database Schema for EHC Training Hub

-- Create the database
CREATE DATABASE IF NOT EXISTS `ehc_training_hub`;
USE `ehc_training_hub`;

-- Module 1: Prospect and CRM
CREATE TABLE `prospects` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `company_name` VARCHAR(255) NOT NULL,
    `contact_person` VARCHAR(255),
    `email` VARCHAR(255),
    `status` ENUM('nouveau', 'qualifié', 'intéressé', 'perdu') DEFAULT 'nouveau',
    `lead_score` INT DEFAULT 0,
    `assigned_to` INT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE `prospect_interactions` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `prospect_id` INT NOT NULL,
    `user_id` INT NOT NULL,
    `type` ENUM('call', 'email', 'meeting', 'demo') NOT NULL,
    `subject` VARCHAR(255),
    `description` TEXT,
    `outcome` TEXT,
    `next_action` VARCHAR(255),
    `next_action_date` DATE,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`prospect_id`) REFERENCES `prospects`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) -- Assuming 'users' table exists for agents
);

CREATE TABLE `prospect_contacts` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `prospect_id` INT NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255),
    `phone` VARCHAR(50),
    `role` VARCHAR(255),
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`prospect_id`) REFERENCES `prospects`(`id`) ON DELETE CASCADE
);

CREATE TABLE `marketing_campaigns` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `start_date` DATE,
    `end_date` DATE,
    `budget` DECIMAL(10, 2),
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `prospect_sources` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `prospect_id` INT NOT NULL,
    `campaign_id` INT NULL,
    `source_type` VARCHAR(255) NOT NULL,
    `source_detail` TEXT,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`prospect_id`) REFERENCES `prospects`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`campaign_id`) REFERENCES `marketing_campaigns`(`id`) ON DELETE SET NULL
);

-- Module 2: Quote and Commercial Proposal Management
CREATE TABLE `products` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `description` TEXT,
    `category` VARCHAR(255),
    `price_model` VARCHAR(255),
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `quotes` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `quote_number` VARCHAR(255) UNIQUE NOT NULL,
    `prospect_id` INT NULL,
    `company_id` INT NULL,
    `status` ENUM('draft', 'sent', 'accepted', 'rejected', 'expired') DEFAULT 'draft',
    `valid_until` DATE,
    `total_amount` DECIMAL(10, 2) DEFAULT 0.00,
    `discount_percent` DECIMAL(5, 2) DEFAULT 0.00,
    `notes` TEXT,
    `created_by` INT NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`prospect_id`) REFERENCES `prospects`(`id`) ON DELETE SET NULL,
    FOREIGN KEY (`company_id`) REFERENCES `companies`(`id`) ON DELETE SET NULL,
    FOREIGN KEY (`created_by`) REFERENCES `users`(`id`)
);

CREATE TABLE `quote_items` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `quote_id` INT NOT NULL,
    `product_type` VARCHAR(255), -- e.g., 'subscription', 'formation', 'consulting'
    `description` TEXT,
    `quantity` INT DEFAULT 1,
    `unit_price` DECIMAL(10, 2) DEFAULT 0.00,
    `discount_amount` DECIMAL(10, 2) DEFAULT 0.00,
    `total_price` DECIMAL(10, 2) DEFAULT 0.00,
    `order_index` INT,
    FOREIGN KEY (`quote_id`) REFERENCES `quotes`(`id`) ON DELETE CASCADE
);

CREATE TABLE `quote_templates` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `description` TEXT,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `quote_template_items` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `template_id` INT NOT NULL,
    `product_id` INT NOT NULL,
    `default_quantity` INT DEFAULT 1,
    FOREIGN KEY (`template_id`) REFERENCES `quote_templates`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE CASCADE
);

-- Module 3: Contract and Subscription Management
CREATE TABLE `contracts` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `contract_number` VARCHAR(255) UNIQUE NOT NULL,
    `company_id` INT NOT NULL,
    `quote_id` INT NULL,
    `type` VARCHAR(255) NOT NULL, -- e.g., 'subscription', 'service', 'formation'
    `status` ENUM('draft', 'active', 'suspended', 'terminated') DEFAULT 'draft',
    `start_date` DATE,
    `end_date` DATE,
    `auto_renewal` BOOLEAN DEFAULT FALSE,
    `renewal_period` VARCHAR(50), -- e.g., 'annual', 'monthly'
    `total_value` DECIMAL(10, 2),
    `signed_date` DATE,
    `signed_by_client` BOOLEAN DEFAULT FALSE,
    `signed_by_ehc` BOOLEAN DEFAULT FALSE,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`company_id`) REFERENCES `companies`(`id`),
    FOREIGN KEY (`quote_id`) REFERENCES `quotes`(`id`) ON DELETE SET NULL
);

CREATE TABLE `contract_documents` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `contract_id` INT NOT NULL,
    `document_url` VARCHAR(255) NOT NULL,
    `version` VARCHAR(50),
    `upload_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `uploaded_by` INT NOT NULL,
    FOREIGN KEY (`contract_id`) REFERENCES `contracts`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`uploaded_by`) REFERENCES `users`(`id`)
);

CREATE TABLE `subscription_plans` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `plan_name` VARCHAR(255) NOT NULL,
    `plan_type` VARCHAR(50) NOT NULL, -- e.g., 'monthly', 'quarterly', 'annual'
    `price` DECIMAL(10, 2) NOT NULL,
    `max_users` INT NULL,
    `max_formations` INT NULL,
    `features` JSON,
    `is_active` BOOLEAN DEFAULT TRUE,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE `subscriptions` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `company_id` INT NOT NULL,
    `contract_id` INT NULL,
    `plan_id` INT NOT NULL,
    `status` ENUM('active', 'suspended', 'cancelled', 'expired') DEFAULT 'active',
    `start_date` DATE NOT NULL,
    `end_date` DATE NULL,
    `billing_cycle` VARCHAR(50) NOT NULL,
    `monthly_price` DECIMAL(10, 2),
    `user_limit` INT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`company_id`) REFERENCES `companies`(`id`),
    FOREIGN KEY (`contract_id`) REFERENCES `contracts`(`id`) ON DELETE SET NULL,
    FOREIGN KEY (`plan_id`) REFERENCES `subscription_plans`(`id`)
);

CREATE TABLE `subscription_history` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `subscription_id` INT NOT NULL,
    `action` VARCHAR(255) NOT NULL, -- e.g., 'created', 'upgraded', 'downgraded', 'renewed', 'cancelled'
    `old_plan_id` INT NULL,
    `new_plan_id` INT NULL,
    `reason` TEXT,
    `performed_by` INT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`subscription_id`) REFERENCES `subscriptions`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`old_plan_id`) REFERENCES `subscription_plans`(`id`) ON DELETE SET NULL,
    FOREIGN KEY (`new_plan_id`) REFERENCES `subscription_plans`(`id`) ON DELETE SET NULL,
    FOREIGN KEY (`performed_by`) REFERENCES `users`(`id`) ON DELETE SET NULL
);

CREATE TABLE `subscription_modules` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `module_name` VARCHAR(255) NOT NULL,
    `description` TEXT,
    `is_premium` BOOLEAN DEFAULT FALSE,
    `monthly_cost` DECIMAL(10, 2) DEFAULT 0.00,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `subscription_active_modules` (
    `subscription_id` INT NOT NULL,
    `module_id` INT NOT NULL,
    `activated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `activated_by` INT NULL,
    PRIMARY KEY (`subscription_id`, `module_id`),
    FOREIGN KEY (`subscription_id`) REFERENCES `subscriptions`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`module_id`) REFERENCES `subscription_modules`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`activated_by`) REFERENCES `users`(`id`) ON DELETE SET NULL
);

CREATE TABLE `subscription_renewals` (
    `renewal_id` INT AUTO_INCREMENT PRIMARY KEY,
    `subscription_id` INT NOT NULL,
    `renewal_date` DATE NOT NULL,
    `amount` DECIMAL(10, 2),
    `status` ENUM('pending', 'completed', 'failed') DEFAULT 'pending',
    `payment_method` VARCHAR(255),
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`subscription_id`) REFERENCES `subscriptions`(`id`) ON DELETE CASCADE
);

CREATE TABLE `terminations` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `subscription_id` INT NOT NULL,
    `company_id` INT NOT NULL,
    `cancellation_date` DATE NOT NULL,
    `effective_date` DATE NOT NULL,
    `reason_category` VARCHAR(255),
    `detailed_reason` TEXT,
    `initiated_by` ENUM('client', 'ehc') NOT NULL,
    `final_invoice_id` INT NULL,
    `refund_amount` DECIMAL(10, 2) DEFAULT 0.00,
    `status` ENUM('pending', 'confirmed', 'completed') DEFAULT 'pending',
    `processed_by` INT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`subscription_id`) REFERENCES `subscriptions`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`company_id`) REFERENCES `companies`(`id`),
    FOREIGN KEY (`final_invoice_id`) REFERENCES `invoices`(`id`) ON DELETE SET NULL,
    FOREIGN KEY (`processed_by`) REFERENCES `users`(`id`) ON DELETE SET NULL
);


-- Module 4: Company and User Management (SIRH)
CREATE TABLE `companies` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `legal_name` VARCHAR(255),
    `siret` VARCHAR(50),
    `industry` VARCHAR(255),
    `size_category` VARCHAR(50),
    `employee_count` INT NULL,
    `address` VARCHAR(255),
    `city` VARCHAR(255),
    `postal_code` VARCHAR(50),
    `country` VARCHAR(255),
    `website` VARCHAR(255),
    `status` ENUM('prospect', 'client', 'former_client') DEFAULT 'prospect',
    `primary_contact_id` INT NULL, -- Self-referencing or FK to company_contacts
    `subscription_tier` VARCHAR(255),
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE `users` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `company_id` INT NOT NULL,
    `username` VARCHAR(255) UNIQUE NOT NULL,
    `email` VARCHAR(255) UNIQUE NOT NULL,
    `password_hash` VARCHAR(255) NOT NULL,
    `first_name` VARCHAR(255),
    `last_name` VARCHAR(255),
    `phone` VARCHAR(50),
    `is_active` BOOLEAN DEFAULT TRUE,
    `last_login` TIMESTAMP NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`company_id`) REFERENCES `companies`(`id`) ON DELETE CASCADE
);

CREATE TABLE `roles` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) UNIQUE NOT NULL,
    `description` TEXT,
    `is_system_role` BOOLEAN DEFAULT FALSE,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `permissions` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) UNIQUE NOT NULL,
    `module` VARCHAR(255),
    `action` VARCHAR(255), -- e.g., 'create', 'read', 'update', 'delete', 'export'
    `description` TEXT,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `role_permissions` (
    `role_id` INT NOT NULL,
    `permission_id` INT NOT NULL,
    PRIMARY KEY (`role_id`, `permission_id`),
    FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`permission_id`) REFERENCES `permissions`(`id`) ON DELETE CASCADE
);

CREATE TABLE `user_roles` (
    `user_id` INT NOT NULL,
    `role_id` INT NOT NULL,
    `assigned_by` INT NULL,
    `assigned_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`user_id`, `role_id`),
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`assigned_by`) REFERENCES `users`(`id`) ON DELETE SET NULL
);

CREATE TABLE `organizational_units` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `company_id` INT NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `parent_unit_id` INT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`company_id`) REFERENCES `companies`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`parent_unit_id`) REFERENCES `organizational_units`(`id`) ON DELETE CASCADE
);

CREATE TABLE `user_profiles` (
    `user_id` INT PRIMARY KEY,
    `job_title` VARCHAR(255),
    `phone_number` VARCHAR(50),
    `avatar_url` VARCHAR(255),
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
);

-- Module 5: Training Engineering and Catalog (SIRH)
CREATE TABLE `domains` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `description` TEXT,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `topics` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `domain_id` INT NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `description` TEXT,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`domain_id`) REFERENCES `domains`(`id`) ON DELETE CASCADE
);

CREATE TABLE `skills` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `description` TEXT,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `training_categories` (
    `category_id` INT AUTO_INCREMENT PRIMARY KEY,
    `category_name` VARCHAR(255) NOT NULL,
    `parent_category_id` INT NULL,
    `description` TEXT,
    `color_code` VARCHAR(20),
    `icon` VARCHAR(50),
    `sort_order` INT DEFAULT 0,
    FOREIGN KEY (`parent_category_id`) REFERENCES `training_categories`(`category_id`) ON DELETE CASCADE
);

CREATE TABLE `trainings` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `course_code` VARCHAR(255),
    `title` VARCHAR(255) NOT NULL,
    `description` TEXT,
    `category_id` INT NULL,
    `level` ENUM('debutant', 'intermediaire', 'avance', 'expert'),
    `duration_hours` DECIMAL(10, 2),
    `max_participants` INT,
    `prerequisites` TEXT,
    `objectives` JSON,
    `is_active` BOOLEAN DEFAULT TRUE,
    `is_certification_eligible` BOOLEAN DEFAULT FALSE,
    `price` DECIMAL(10, 2),
    `created_by` INT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`category_id`) REFERENCES `training_categories`(`category_id`) ON DELETE SET NULL,
    FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE SET NULL
);

CREATE TABLE `training_skills` (
    `training_id` INT NOT NULL,
    `skill_id` INT NOT NULL,
    PRIMARY KEY (`training_id`, `skill_id`),
    FOREIGN KEY (`training_id`) REFERENCES `trainings`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`skill_id`) REFERENCES `skills`(`id`) ON DELETE CASCADE
);

CREATE TABLE `training_content_modules` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `training_id` INT NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `order` INT,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`training_id`) REFERENCES `trainings`(`id`) ON DELETE CASCADE
);

CREATE TABLE `training_content_units` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `module_id` INT NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `content_type` VARCHAR(50) NOT NULL, -- e.g., 'video', 'pdf', 'quiz', 'text'
    `content_url` VARCHAR(255),
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`module_id`) REFERENCES `training_content_modules`(`id`) ON DELETE CASCADE
);

CREATE TABLE `resource_library` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `title` VARCHAR(255) NOT NULL,
    `description` TEXT,
    `type` VARCHAR(50) NOT NULL, -- e.g., 'document', 'video', 'link'
    `file_url` VARCHAR(255),
    `topic_id` INT NULL,
    `uploaded_by` INT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`topic_id`) REFERENCES `topics`(`id`) ON DELETE SET NULL,
    FOREIGN KEY (`uploaded_by`) REFERENCES `users`(`id`) ON DELETE SET NULL
);

-- Module 6: Participant and Enrollment Management (SIRH)
CREATE TABLE `trainers` (
    `trainer_id` INT AUTO_INCREMENT PRIMARY KEY,
    `first_name` VARCHAR(255) NOT NULL,
    `last_name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) UNIQUE NOT NULL,
    `phone` VARCHAR(50),
    `specialties` JSON,
    `certifications` JSON,
    `bio` TEXT,
    `hourly_rate` DECIMAL(10, 2),
    `is_internal` BOOLEAN DEFAULT TRUE,
    `is_active` BOOLEAN DEFAULT TRUE,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `training_sessions` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `training_id` INT NOT NULL,
    `session_code` VARCHAR(255) UNIQUE,
    `title` VARCHAR(255),
    `start_date` DATETIME NOT NULL,
    `end_date` DATETIME NOT NULL,
    `location_type` ENUM('presential', 'remote', 'hybrid') NOT NULL,
    `location_details` TEXT,
    `trainer_id` INT NULL,
    `max_participants` INT,
    `status` ENUM('planned', 'confirmed', 'in_progress', 'completed', 'cancelled') DEFAULT 'planned',
    `price` DECIMAL(10, 2),
    `company_id` INT NULL, -- For private sessions
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`training_id`) REFERENCES `trainings`(`id`),
    FOREIGN KEY (`trainer_id`) REFERENCES `trainers`(`trainer_id`) ON DELETE SET NULL,
    FOREIGN KEY (`company_id`) REFERENCES `companies`(`id`) ON DELETE SET NULL
);

CREATE TABLE `session_participants` (
    `participation_id` INT AUTO_INCREMENT PRIMARY KEY,
    `session_id` INT NOT NULL,
    `user_id` INT NOT NULL,
    `registration_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `status` ENUM('registered', 'confirmed', 'attended', 'absent', 'cancelled') DEFAULT 'registered',
    `attendance_rate` DECIMAL(5, 2),
    `completion_status` ENUM('not_started', 'in_progress', 'completed') DEFAULT 'not_started',
    `notes` TEXT,
    FOREIGN KEY (`session_id`) REFERENCES `training_sessions`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
);

CREATE TABLE `training_registrations` (
    `registration_id` INT AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT NOT NULL,
    `session_id` INT NOT NULL,
    `registration_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `status` ENUM('pending', 'approved', 'rejected', 'cancelled') DEFAULT 'pending',
    `approved_by` INT NULL,
    `approval_date` TIMESTAMP NULL,
    `cancellation_reason` TEXT,
    `cost` DECIMAL(10, 2),
    `budget_source` VARCHAR(255),
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`session_id`) REFERENCES `training_sessions`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`approved_by`) REFERENCES `users`(`id`) ON DELETE SET NULL
);

CREATE TABLE `user_training_history` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT NOT NULL,
    `training_id` INT NOT NULL,
    `completion_date` DATE,
    `score` DECIMAL(5, 2),
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`training_id`) REFERENCES `trainings`(`id`) ON DELETE CASCADE
);

CREATE TABLE `waiting_lists` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT NOT NULL,
    `training_id` INT NOT NULL,
    `request_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`training_id`) REFERENCES `trainings`(`id`) ON DELETE CASCADE
);

-- Module 7: Evaluation, Quiz and Certification (SIRH)
CREATE TABLE `quizzes` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `title` VARCHAR(255) NOT NULL,
    `training_content_module_id` INT NULL,
    `passing_score` DECIMAL(5, 2),
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`training_content_module_id`) REFERENCES `training_content_modules`(`id`) ON DELETE CASCADE
);

CREATE TABLE `questions` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `quiz_id` INT NOT NULL,
    `question_text` TEXT NOT NULL,
    `type` ENUM('mcq', 'true_false', 'short_answer') NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`quiz_id`) REFERENCES `quizzes`(`id`) ON DELETE CASCADE
);

CREATE TABLE `question_options` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `question_id` INT NOT NULL,
    `option_text` TEXT NOT NULL,
    `is_correct` BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (`question_id`) REFERENCES `questions`(`id`) ON DELETE CASCADE
);

CREATE TABLE `quiz_attempts` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT NOT NULL,
    `quiz_id` INT NOT NULL,
    `start_time` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `end_time` TIMESTAMP NULL,
    `score` DECIMAL(5, 2),
    `status` ENUM('in_progress', 'completed', 'failed') DEFAULT 'in_progress',
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`quiz_id`) REFERENCES `quizzes`(`id`) ON DELETE CASCADE
);

CREATE TABLE `user_answers` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `attempt_id` INT NOT NULL,
    `question_id` INT NOT NULL,
    `selected_option_id` INT NULL,
    `answer_text` TEXT, -- For short answer questions
    `is_correct` BOOLEAN,
    FOREIGN KEY (`attempt_id`) REFERENCES `quiz_attempts`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`question_id`) REFERENCES `questions`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`selected_option_id`) REFERENCES `question_options`(`id`) ON DELETE SET NULL
);

CREATE TABLE `evaluations` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `session_id` INT NOT NULL,
    `user_id` INT NOT NULL,
    `evaluation_type` ENUM('hot', 'cold', 'impact') NOT NULL,
    `evaluation_date` DATE NOT NULL,
    `overall_rating` INT NULL,
    `content_rating` INT NULL,
    `trainer_rating` INT NULL,
    `organization_rating` INT NULL,
    `would_recommend` BOOLEAN NULL,
    `comments` TEXT,
    `skills_acquired` JSON,
    `improvement_suggestions` TEXT,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`session_id`) REFERENCES `training_sessions`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
);

CREATE TABLE `certificates` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT NOT NULL,
    `training_id` INT NULL,
    `certification_id` INT NULL,
    `issue_date` DATE NOT NULL,
    `certificate_url` VARCHAR(255),
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`training_id`) REFERENCES `trainings`(`id`) ON DELETE SET NULL,
    FOREIGN KEY (`certification_id`) REFERENCES `certifications`(`id`) ON DELETE SET NULL
);

CREATE TABLE `certificate_templates` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `template_file_url` VARCHAR(255) NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `certifications` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `certification_name` VARCHAR(255) NOT NULL,
    `issuing_organization` VARCHAR(255),
    `description` TEXT,
    `validity_period_months` INT NULL,
    `requirements` JSON,
    `is_active` BOOLEAN DEFAULT TRUE,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `user_certifications` (
    `user_certification_id` INT AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT NOT NULL,
    `certification_id` INT NOT NULL,
    `course_id` INT NULL, -- if obtained via formation
    `obtained_date` DATE NOT NULL,
    `expiry_date` DATE NULL,
    `certificate_number` VARCHAR(255),
    `file_path` VARCHAR(255),
    `status` ENUM('active', 'expired', 'revoked') DEFAULT 'active',
    `notes` TEXT,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`certification_id`) REFERENCES `certifications`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`course_id`) REFERENCES `trainings`(`id`) ON DELETE SET NULL
);


-- Module 8: Invoicing and Payments
CREATE TABLE `invoices` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `invoice_number` VARCHAR(255) UNIQUE NOT NULL,
    `company_id` INT NOT NULL,
    `subscription_id` INT NULL,
    `contract_id` INT NULL,
    `issue_date` DATE NOT NULL,
    `due_date` DATE,
    `status` ENUM('draft', 'sent', 'paid', 'overdue', 'cancelled') DEFAULT 'draft',
    `subtotal` DECIMAL(10, 2),
    `tax_rate` DECIMAL(5, 2),
    `tax_amount` DECIMAL(10, 2),
    `total_amount` DECIMAL(10, 2) NOT NULL,
    `currency` VARCHAR(10) DEFAULT 'DHS',
    `notes` TEXT,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`company_id`) REFERENCES `companies`(`id`),
    FOREIGN KEY (`subscription_id`) REFERENCES `subscriptions`(`id`) ON DELETE SET NULL,
    FOREIGN KEY (`contract_id`) REFERENCES `contracts`(`id`) ON DELETE SET NULL
);

CREATE TABLE `invoice_items` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `invoice_id` INT NOT NULL,
    `description` TEXT NOT NULL,
    `quantity` INT DEFAULT 1,
    `unit_price` DECIMAL(10, 2) DEFAULT 0.00,
    `discount_percent` DECIMAL(5, 2) DEFAULT 0.00,
    `line_total` DECIMAL(10, 2) NOT NULL,
    `tax_rate` DECIMAL(5, 2),
    `period_start` DATE NULL,
    `period_end` DATE NULL,
    FOREIGN KEY (`invoice_id`) REFERENCES `invoices`(`id`) ON DELETE CASCADE
);

CREATE TABLE `payments` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `invoice_id` INT NOT NULL,
    `payment_date` DATE NOT NULL,
    `amount` DECIMAL(10, 2) NOT NULL,
    `payment_method` VARCHAR(255),
    `transaction_id` VARCHAR(255),
    `status` ENUM('pending', 'completed', 'failed', 'refunded') DEFAULT 'pending',
    `notes` TEXT,
    `processed_by` INT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`invoice_id`) REFERENCES `invoices`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`processed_by`) REFERENCES `users`(`id`) ON DELETE SET NULL
);

CREATE TABLE `transactions` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `payment_id` INT NULL,
    `type` VARCHAR(50) NOT NULL, -- e.g., 'charge', 'refund', 'payout'
    `amount` DECIMAL(10, 2) NOT NULL,
    `currency` VARCHAR(10),
    `status