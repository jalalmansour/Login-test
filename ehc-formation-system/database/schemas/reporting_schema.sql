-- reporting_schema.sql

-- Table: kpi_metrics
CREATE TABLE kpi_metrics (
    metric_id INT AUTO_INCREMENT PRIMARY KEY,
    metric_name VARCHAR(255) NOT NULL,
    metric_type VARCHAR(50), -- e.g., revenue, users, formations, satisfaction
    value DECIMAL(15, 2),
    period_type VARCHAR(20), -- e.g., daily, weekly, monthly, yearly
    period_start DATE,
    period_end DATE,
    company_id INT NULL, -- NULL for global metrics
    calculated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (company_id) REFERENCES companies(company_id) ON DELETE SET NULL
);

-- Table: reports
CREATE TABLE reports (
    report_id INT AUTO_INCREMENT PRIMARY KEY,
    report_name VARCHAR(255) NOT NULL,
    report_type VARCHAR(50), -- e.g., financial, usage, formations, client_health
    parameters JSON, -- Store report parameters in JSON format
    file_path VARCHAR(255),
    status VARCHAR(20), -- e.g., generating, completed, failed
    generated_by INT, -- FK to users table
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP NULL,
    FOREIGN KEY (generated_by) REFERENCES users(user_id) ON DELETE SET NULL
);