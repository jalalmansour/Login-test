-- database/schemas/entreprises_schema.sql

-- Table: companies
CREATE TABLE companies (
    company_id INT AUTO_INCREMENT PRIMARY KEY,
    company_name VARCHAR(255) NOT NULL,
    legal_name VARCHAR(255),
    siret VARCHAR(20),
    industry VARCHAR(100),
    size_category VARCHAR(50), -- e.g., TPE, PME, ETI, GE
    employee_count INT,
    address VARCHAR(255),
    city VARCHAR(100),
    postal_code VARCHAR(20),
    country VARCHAR(100),
    website VARCHAR(255),
    status ENUM('prospect', 'client', 'former_client') NOT NULL DEFAULT 'prospect',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table: company_contacts
CREATE TABLE company_contacts (
    contact_id INT AUTO_INCREMENT PRIMARY KEY,
    company_id INT,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(50),
    mobile VARCHAR(50),
    position VARCHAR(100),
    department VARCHAR(100),
    is_main_contact BOOLEAN DEFAULT FALSE,
    is_decision_maker BOOLEAN DEFAULT FALSE,
    is_technical_contact BOOLEAN DEFAULT FALSE,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (company_id) REFERENCES companies(company_id) ON DELETE CASCADE
);
