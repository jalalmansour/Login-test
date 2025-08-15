-- subscription_plans
CREATE TABLE subscription_plans (
    plan_id INT AUTO_INCREMENT PRIMARY KEY,
    plan_name VARCHAR(255) NOT NULL,
    plan_type ENUM('monthly', 'quarterly', 'annual') NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    max_users INT,
    max_formations INT,
    features JSON,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- subscriptions
CREATE TABLE subscriptions (
    subscription_id INT AUTO_INCREMENT PRIMARY KEY,
    company_id INT NOT NULL,
    contract_id INT,
    plan_id INT NOT NULL,
    status ENUM('active', 'suspended', 'cancelled', 'expired') DEFAULT 'active',
    start_date DATE NOT NULL,
    end_date DATE,
    billing_cycle ENUM('monthly', 'quarterly', 'annual') NOT NULL,
    monthly_price DECIMAL(10, 2),
    user_limit INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (company_id) REFERENCES companies(company_id),
    FOREIGN KEY (contract_id) REFERENCES contracts(contract_id),
    FOREIGN KEY (plan_id) REFERENCES subscription_plans(plan_id)
);

-- subscription_history
CREATE TABLE subscription_history (
    history_id INT AUTO_INCREMENT PRIMARY KEY,
    subscription_id INT NOT NULL,
    action ENUM('created', 'upgraded', 'downgraded', 'renewed', 'cancelled') NOT NULL,
    old_plan_id INT,
    new_plan_id INT,
    reason TEXT,
    performed_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (subscription_id) REFERENCES subscriptions(subscription_id),
    FOREIGN KEY (old_plan_id) REFERENCES subscription_plans(plan_id),
    FOREIGN KEY (new_plan_id) REFERENCES subscription_plans(plan_id),
    FOREIGN KEY (performed_by) REFERENCES users(user_id)
);

-- terminations
CREATE TABLE terminations (
    cancellation_id INT AUTO_INCREMENT PRIMARY KEY,
    subscription_id INT NOT NULL,
    company_id INT NOT NULL,
    cancellation_date DATE NOT NULL,
    effective_date DATE NOT NULL,
    reason_category VARCHAR(255),
    detailed_reason TEXT,
    initiated_by ENUM('client', 'ehc') NOT NULL,
    final_invoice_id INT,
    refund_amount DECIMAL(10, 2),
    status ENUM('pending', 'confirmed', 'completed') DEFAULT 'pending',
    processed_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (subscription_id) REFERENCES subscriptions(subscription_id),
    FOREIGN KEY (company_id) REFERENCES companies(company_id),
    FOREIGN KEY (final_invoice_id) REFERENCES invoices(invoice_id),
    FOREIGN KEY (processed_by) REFERENCES users(user_id)
);

-- subscription_modules
CREATE TABLE subscription_modules (
    module_id INT AUTO_INCREMENT PRIMARY KEY,
    module_name VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    is_premium BOOLEAN DEFAULT FALSE,
    monthly_cost DECIMAL(10, 2)
);

-- subscription_active_modules
CREATE TABLE subscription_active_modules (
    subscription_id INT NOT NULL,
    module_id INT NOT NULL,
    activated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    activated_by INT,
    PRIMARY KEY (subscription_id, module_id),
    FOREIGN KEY (subscription_id) REFERENCES subscriptions(subscription_id),
    FOREIGN KEY (module_id) REFERENCES subscription_modules(module_id),
    FOREIGN KEY (activated_by) REFERENCES users(user_id)
);

-- subscription_renewals
CREATE TABLE subscription_renewals (
    renewal_id INT AUTO_INCREMENT PRIMARY KEY,
    subscription_id INT NOT NULL,
    renewal_date DATE NOT NULL,
    amount DECIMAL(10, 2),
    status ENUM('pending', 'completed', 'failed') DEFAULT 'pending',
    payment_method VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (subscription_id) REFERENCES subscriptions(subscription_id)
);

-- retention_offers
CREATE TABLE retention_offers (
    offer_id INT AUTO_INCREMENT PRIMARY KEY,
    cancellation_id INT NOT NULL,
    offer_type VARCHAR(255) NOT NULL,
    offer_details TEXT,
    value DECIMAL(10, 2),
    valid_until DATE,
    status ENUM('sent', 'accepted', 'rejected', 'expired') DEFAULT 'sent',
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    executed_at TIMESTAMP,
    FOREIGN KEY (cancellation_id) REFERENCES terminations(cancellation_id),
    FOREIGN KEY (created_by) REFERENCES users(user_id)
);