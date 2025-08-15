-- Schema for Evaluation-related tables

-- quizzes table
CREATE TABLE quizzes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    training_content_module_id INT,
    passing_score DECIMAL(5, 2) DEFAULT 0,
    FOREIGN KEY (training_content_module_id) REFERENCES training_content_modules(id) ON DELETE CASCADE
);

-- questions table
CREATE TABLE questions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    quiz_id INT,
    question_text TEXT NOT NULL,
    type ENUM('multiple_choice', 'true_false', 'short_answer', 'long_answer') NOT NULL,
    FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE
);

-- question_options table (for multiple choice questions)
CREATE TABLE question_options (
    id INT AUTO_INCREMENT PRIMARY KEY,
    question_id INT,
    option_text TEXT NOT NULL,
    is_correct BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
);

-- quiz_attempts table
CREATE TABLE quiz_attempts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    quiz_id INT,
    start_time DATETIME,
    end_time DATETIME,
    score DECIMAL(5, 2),
    status ENUM('in_progress', 'completed', 'failed') NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE
);

-- user_answers table
CREATE TABLE user_answers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    attempt_id INT,
    question_id INT,
    selected_option_id INT, -- for multiple choice
    answer_text TEXT, -- for short/long answer
    FOREIGN KEY (attempt_id) REFERENCES quiz_attempts(id) ON DELETE CASCADE,
    FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE,
    FOREIGN KEY (selected_option_id) REFERENCES question_options(id) ON DELETE CASCADE
);

-- evaluations table (feedback)
CREATE TABLE evaluations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    session_id INT,
    user_id INT, -- participant giving feedback
    evaluation_type ENUM('hot', 'cold', 'impact') NOT NULL,
    evaluation_date DATETIME,
    overall_rating INT CHECK (overall_rating BETWEEN 1 AND 5),
    content_rating INT CHECK (content_rating BETWEEN 1 AND 5),
    trainer_rating INT CHECK (trainer_rating BETWEEN 1 AND 5),
    organization_rating INT CHECK (organization_rating BETWEEN 1 AND 5),
    would_recommend BOOLEAN,
    comments TEXT,
    skills_acquired JSON,
    improvement_suggestions TEXT,
    FOREIGN KEY (session_id) REFERENCES training_sessions(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);