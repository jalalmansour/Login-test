-- Schema for Support-related tables

-- Table: support_tickets
CREATE TABLE support_tickets (
    ticket_id INT AUTO_INCREMENT PRIMARY KEY,
    ticket_number VARCHAR(255) UNIQUE NOT NULL,
    company_id INT,
    user_id INT, -- demandeur
    category VARCHAR(255),
    priority ENUM('low', 'medium', 'high', 'urgent'),
    status ENUM('open', 'in_progress', 'waiting_client', 'resolved', 'closed'),
    subject VARCHAR(255),
    description TEXT,
    assigned_to INT, -- support agent
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    resolved_at TIMESTAMP NULL,
    closed_at TIMESTAMP NULL,
    FOREIGN KEY (company_id) REFERENCES companies(company_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (assigned_to) REFERENCES users(user_id)
);

-- Table: support_messages
CREATE TABLE support_messages (
    message_id INT AUTO_INCREMENT PRIMARY KEY,
    ticket_id INT,
    sender_id INT,
    message_type ENUM('client', 'support', 'internal'),
    content TEXT,
    attachments JSON,
    is_internal BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (ticket_id) REFERENCES support_tickets(ticket_id),
    FOREIGN KEY (sender_id) REFERENCES users(user_id)
);

-- Table: client_notes
CREATE TABLE client_notes (
    note_id INT AUTO_INCREMENT PRIMARY KEY,
    company_id INT,
    user_id INT, -- auteur
    note_type ENUM('commercial', 'technical', 'relationship', 'warning'),
    title VARCHAR(255),
    content TEXT,
    is_private BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (company_id) REFERENCES companies(company_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Table: satisfaction_surveys
CREATE TABLE satisfaction_surveys (
    survey_id INT AUTO_INCREMENT PRIMARY KEY,
    company_id INT,
    survey_type ENUM('support', 'formation', 'general'),
    reference_id INT, -- ticket_id or formation_id
    overall_rating INT,
    questions_answers JSON,
    comments TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (company_id) REFERENCES companies(company_id)
    -- FOREIGN KEY (reference_id) REFERENCES support_tickets(ticket_id) -- Example, depends on survey_type
);

-- Table: retention_actions
CREATE TABLE retention_actions (
    action_id INT AUTO_INCREMENT PRIMARY KEY,
    company_id INT,
    action_type VARCHAR(255),
    trigger_reason TEXT,
    description TEXT,
    status ENUM('planned', 'executed', 'successful', 'failed'),
    executed_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    executed_at TIMESTAMP NULL,
    FOREIGN KEY (company_id) REFERENCES companies(company_id),
    FOREIGN KEY (executed_by) REFERENCES users(user_id)
);