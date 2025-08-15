-- Schema for Certification-related tables

-- Table: certifications
CREATE TABLE IF NOT EXISTS certifications (
    certification_id INT AUTO_INCREMENT PRIMARY KEY,
    certification_name VARCHAR(255) NOT NULL,
    issuing_organization VARCHAR(255),
    description TEXT,
    validity_period_months INT,
    requirements JSON,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table: certificate_templates
CREATE TABLE IF NOT EXISTS certificate_templates (
    template_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    template_file_url VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table: certificates (Generated certificates for users)
CREATE TABLE IF NOT EXISTS certificates (
    certificate_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    training_id INT,
    certification_id INT,
    issue_date DATE NOT NULL,
    certificate_url VARCHAR(255) NOT NULL,
    template_id INT, -- Link to the template used for generation
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (training_id) REFERENCES training_courses(course_id),
    FOREIGN KEY (certification_id) REFERENCES certifications(certification_id),
    FOREIGN KEY (template_id) REFERENCES certificate_templates(template_id)
);

-- Table: user_certifications (User's obtained certifications, potentially external)
CREATE TABLE IF NOT EXISTS user_certifications (
    user_certification_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    certification_id INT, -- Link to defined certifications
    course_id INT, -- Link to training course if obtained via training
    obtained_date DATE NOT NULL,
    expiry_date DATE,
    certificate_number VARCHAR(255),
    file_path VARCHAR(255),
    status ENUM('active', 'expired', 'revoked', 'pending') DEFAULT 'active',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (certification_id) REFERENCES certifications(certification_id),
    FOREIGN KEY (course_id) REFERENCES training_courses(course_id),
    UNIQUE KEY unique_user_certification (user_id, certification_id, obtained_date)
);