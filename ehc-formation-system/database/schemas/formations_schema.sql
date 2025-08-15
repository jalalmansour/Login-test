-- SQL Schema for Formation-Related Tables

-- Table: domains (Compétences)
CREATE TABLE IF NOT EXISTS domains (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table: topics (Thématiques)
CREATE TABLE IF NOT EXISTS topics (
    id INT AUTO_INCREMENT PRIMARY KEY,
    domain_id INT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (domain_id) REFERENCES domains(id) ON DELETE SET NULL
);

-- Table: skills
CREATE TABLE IF NOT EXISTS skills (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table: trainings (Formations)
CREATE TABLE IF NOT EXISTS trainings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    course_code VARCHAR(50) UNIQUE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category_id INT,
    level ENUM('debutant', 'intermediaire', 'avance', 'expert'),
    duration_hours DECIMAL(5, 2),
    max_participants INT,
    prerequisites TEXT,
    objectives JSON,
    is_active BOOLEAN DEFAULT TRUE,
    is_certification_eligible BOOLEAN DEFAULT FALSE,
    price DECIMAL(10, 2),
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES training_categories(id) ON DELETE SET NULL,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);

-- Table: training_skills (Join Table)
CREATE TABLE IF NOT EXISTS training_skills (
    training_id INT,
    skill_id INT,
    PRIMARY KEY (training_id, skill_id),
    FOREIGN KEY (training_id) REFERENCES trainings(id) ON DELETE CASCADE,
    FOREIGN KEY (skill_id) REFERENCES skills(id) ON DELETE CASCADE
);

-- Table: training_content_modules
CREATE TABLE IF NOT EXISTS training_content_modules (
    id INT AUTO_INCREMENT PRIMARY KEY,
    training_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    `order` INT NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (training_id) REFERENCES trainings(id) ON DELETE CASCADE
);

-- Table: training_content_units
CREATE TABLE IF NOT EXISTS training_content_units (
    id INT AUTO_INCREMENT PRIMARY KEY,
    module_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    content_type ENUM('video', 'document', 'quiz', 'link', 'text'),
    content_url VARCHAR(255),
    content TEXT, -- For text content directly
    `order` INT NOT NULL,
    duration_minutes INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (module_id) REFERENCES training_content_modules(id) ON DELETE CASCADE
);

-- Table: resource_library
CREATE TABLE IF NOT EXISTS resource_library (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    resource_type ENUM('document', 'video', 'audio', 'interactive') NOT NULL,
    file_path VARCHAR(255) NOT NULL,
    file_size INT,
    duration_minutes INT,
    category_id INT,
    course_id INT, -- Nullable if resource is not tied to a specific course
    access_level ENUM('public', 'client', 'premium') DEFAULT 'client',
    download_count INT DEFAULT 0,
    rating_average DECIMAL(3, 2),
    is_active BOOLEAN DEFAULT TRUE,
    uploaded_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES training_categories(id) ON DELETE SET NULL,
    FOREIGN KEY (course_id) REFERENCES trainings(id) ON DELETE SET NULL,
    FOREIGN KEY (uploaded_by) REFERENCES users(id) ON DELETE SET NULL
);

-- Table: training_sessions
CREATE TABLE IF NOT EXISTS training_sessions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    course_id INT NOT NULL,
    session_code VARCHAR(50) UNIQUE,
    title VARCHAR(255),
    start_date DATETIME NOT NULL,
    end_date DATETIME NOT NULL,
    location_type ENUM('presential', 'remote', 'hybrid'),
    location_details TEXT,
    trainer_id INT,
    max_participants INT,
    status ENUM('planned', 'confirmed', 'in_progress', 'completed', 'cancelled') DEFAULT 'planned',
    price DECIMAL(10, 2),
    company_id INT, -- Null if public session
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (course_id) REFERENCES trainings(id) ON DELETE CASCADE,
    FOREIGN KEY (trainer_id) REFERENCES trainers(id) ON DELETE SET NULL,
    FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE SET NULL
);

-- Table: trainers
CREATE TABLE IF NOT EXISTS trainers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    phone VARCHAR(50),
    specialties JSON,
    certifications JSON,
    bio TEXT,
    hourly_rate DECIMAL(10, 2),
    is_internal BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    user_id INT UNIQUE, -- Link to user account if internal trainer
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Table: session_participants (Join Table)
CREATE TABLE IF NOT EXISTS session_participants (
    participation_id INT AUTO_INCREMENT PRIMARY KEY,
    session_id INT NOT NULL,
    user_id INT NOT NULL,
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('registered', 'confirmed', 'attended', 'absent', 'cancelled') DEFAULT 'registered',
    attendance_rate DECIMAL(5, 2),
    completion_status ENUM('not_started', 'in_progress', 'completed', 'failed') DEFAULT 'not_started',
    notes TEXT,
    UNIQUE KEY unique_session_user (session_id, user_id),
    FOREIGN KEY (session_id) REFERENCES training_sessions(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Table: training_requests
CREATE TABLE IF NOT EXISTS training_requests (
    request_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL, -- Demandeur
    course_id INT NOT NULL,
    session_id INT, -- Nullable if request is for a course, not a specific session
    requested_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    justification TEXT,
    urgency ENUM('low', 'medium', 'high') DEFAULT 'medium',
    estimated_cost DECIMAL(10, 2),
    status ENUM('pending', 'manager_approved', 'hr_approved', 'rejected', 'planned') DEFAULT 'pending',
    approved_by INT,
    approval_date TIMESTAMP,
    rejection_reason TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES trainings(id) ON DELETE CASCADE,
    FOREIGN KEY (session_id) REFERENCES training_sessions(id) ON DELETE SET NULL,
    FOREIGN KEY (approved_by) REFERENCES users(id) ON DELETE SET NULL
);

-- Table: user_training_history
CREATE TABLE IF NOT EXISTS user_training_history (
    history_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    training_id INT NOT NULL,
    completion_date DATE,
    score DECIMAL(5, 2),
    session_id INT,
    status ENUM('completed', 'in_progress', 'failed', 'cancelled'),
    certificate_id INT, -- Link to user_certifications if applicable
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (training_id) REFERENCES trainings(id) ON DELETE CASCADE,
    FOREIGN KEY (session_id) REFERENCES training_sessions(id) ON DELETE SET NULL,
    FOREIGN KEY (certificate_id) REFERENCES user_certifications(user_certification_id) ON DELETE SET NULL
);

-- Table: waiting_lists
CREATE TABLE IF NOT EXISTS waiting_lists (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    training_id INT NOT NULL,
    request_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('pending', 'offered', 'enrolled', 'cancelled') DEFAULT 'pending',
    session_offered_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (training_id) REFERENCES trainings(id) ON DELETE CASCADE,
    FOREIGN KEY (session_offered_id) REFERENCES training_sessions(id) ON DELETE SET NULL
);

-- Table: training_plans
CREATE TABLE IF NOT EXISTS training_plans (
    id INT AUTO_INCREMENT PRIMARY KEY,
    company_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    year INT NOT NULL,
    status ENUM('draft', 'submitted', 'approved', 'in_progress', 'completed', 'archived') DEFAULT 'draft',
    description TEXT,
    created_by INT,
    approved_by INT,
    approval_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (approved_by) REFERENCES users(id) ON DELETE SET NULL
);

-- Table: plan_items
CREATE TABLE IF NOT EXISTS plan_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    plan_id INT NOT NULL,
    training_id INT NOT NULL,
    target_audience TEXT, -- Description of the target audience (e.g., "Marketing Department", "New Hires")
    planned_quarter ENUM('Q1', 'Q2', 'Q3', 'Q4'),
    planned_sessions INT DEFAULT 1,
    estimated_cost DECIMAL(10, 2),
    status ENUM('planned', 'in_progress', 'completed', 'cancelled') DEFAULT 'planned',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (plan_id) REFERENCES training_plans(id) ON DELETE CASCADE,
    FOREIGN KEY (training_id) REFERENCES trainings(id) ON DELETE CASCADE
);