-- Schema for Contracts-related tables

-- Table: contracts
CREATE TABLE IF NOT EXISTS contracts (
    contract_id INT AUTO_INCREMENT PRIMARY KEY,
    contract_number VARCHAR(255) UNIQUE NOT NULL,
    company_id INT,
    quote_id INT,
    type ENUM('subscription', 'service', 'formation') NOT NULL,
    status ENUM('draft', 'active', 'suspended', 'terminated') NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE,
    auto_renewal BOOLEAN DEFAULT FALSE,
    renewal_period VARCHAR(50),
    total_value DECIMAL(10, 2),
    signed_date DATE,
    signed_by_client BOOLEAN DEFAULT FALSE,
    signed_by_ehc BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (company_id) REFERENCES companies(company_id),
    FOREIGN KEY (quote_id) REFERENCES quotes(quote_id)
);

-- Table: contract_documents
CREATE TABLE IF NOT EXISTS contract_documents (
    document_id INT AUTO_INCREMENT PRIMARY KEY,
    contract_id INT,
    version_number INT NOT NULL,
    description TEXT,
    file_path VARCHAR(255) NOT NULL,
    uploaded_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (contract_id) REFERENCES contracts(contract_id),
    FOREIGN KEY (uploaded_by) REFERENCES users(user_id)
);

-- Table: contract_clauses
CREATE TABLE IF NOT EXISTS contract_clauses (
    clause_id INT AUTO_INCREMENT PRIMARY KEY,
    contract_id INT,
    clause_type ENUM('payment', 'cancellation', 'liability', 'sla', 'general') NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    is_mandatory BOOLEAN DEFAULT FALSE,
    order_index INT,
    FOREIGN KEY (contract_id) REFERENCES contracts(contract_id)
);

-- Table: contract_versions
CREATE TABLE IF NOT EXISTS contract_versions (
    version_id INT AUTO_INCREMENT PRIMARY KEY,
    contract_id INT,
    version_number INT NOT NULL,
    changes_description TEXT,
    document_path VARCHAR(255),
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (contract_id) REFERENCES contracts(contract_id),
    FOREIGN KEY (created_by) REFERENCES users(user_id)
);