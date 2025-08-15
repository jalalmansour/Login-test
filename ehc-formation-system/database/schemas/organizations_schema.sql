-- database/schemas/organizations_schema.sql

-- Table: prospects
CREATE TABLE prospects (
    prospect_id INT AUTO_INCREMENT PRIMARY KEY,
    company_name VARCHAR(255) NOT NULL,
    contact_name VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(50),
    industry VARCHAR(255),
    company_size VARCHAR(50), -- Added based on simplified structure
    status ENUM('new', 'qualified', 'contacted', 'lost') DEFAULT 'new',
    lead_score INT,           -- Added based on simplified structure
    assigned_to INT,          -- FK to users table (assuming users_schema.sql is applied)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (assigned_to) REFERENCES users(user_id) ON DELETE SET NULL
);

-- Table: prospect_interactions
CREATE TABLE prospect_interactions (
    interaction_id INT AUTO_INCREMENT PRIMARY KEY,
    prospect_id INT NOT NULL,
    user_id INT, -- User who performed the interaction (FK to users table)
    type ENUM('call', 'email', 'meeting', 'demo') NOT NULL,
    subject VARCHAR(255),
    description TEXT,        -- Added based on simplified structure
    outcome TEXT,            -- Added based on simplified structure
    next_action VARCHAR(255), -- Added based on simplified structure
    next_action_date DATE,   -- Added based on simplified structure
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (prospect_id) REFERENCES prospects(prospect_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE SET NULL
);

-- Table: prospect_contacts
CREATE TABLE prospect_contacts (
    contact_id INT AUTO_INCREMENT PRIMARY KEY,
    prospect_id INT NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(50),
    mobile VARCHAR(50), -- Added based on simplified structure
    position VARCHAR(255),
    department VARCHAR(255),    -- Added based on simplified structure
    is_main_contact BOOLEAN DEFAULT FALSE, -- Added based on simplified structure
    is_decision_maker BOOLEAN DEFAULT FALSE, -- Added based on simplified structure
    is_technical_contact BOOLEAN DEFAULT FALSE, -- Added based on simplified structure
    notes TEXT,              -- Added based on simplified structure
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (prospect_id) REFERENCES prospects(prospect_id) ON DELETE CASCADE
);

-- Table: marketing_campaigns
CREATE TABLE marketing_campaigns (
    campaign_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    start_date DATE,
    end_date DATE,
    budget DECIMAL(10, 2),
    description TEXT, -- Added based on simplified structure
    status ENUM('planned', 'in_progress', 'completed', 'cancelled') DEFAULT 'planned', -- Added based on simplified structure
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table: prospect_sources
CREATE TABLE prospect_sources (
    source_id INT AUTO_INCREMENT PRIMARY KEY,
    prospect_id INT NOT NULL,
    source_type ENUM('site_web', 'salon', 'recommendation', 'cold_call', 'linkedin', 'marketing_campaign') NOT NULL, -- Added 'marketing_campaign'
    source_detail VARCHAR(255),
    campaign_id INT, -- FK to marketing_campaigns table (if source_type is marketing_campaign)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (prospect_id) REFERENCES prospects(prospect_id) ON DELETE CASCADE,
    FOREIGN KEY (campaign_id) REFERENCES marketing_campaigns(campaign_id) ON DELETE SET NULL
);
