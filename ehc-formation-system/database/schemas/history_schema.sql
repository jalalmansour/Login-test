-- Create the cancellations table
CREATE TABLE cancellations (
    cancellation_id INT AUTO_INCREMENT PRIMARY KEY,
    subscription_id INT,
    company_id INT,
    cancellation_date DATE,
    effective_date DATE,
    reason_category VARCHAR(255),
    detailed_reason TEXT,
    initiated_by ENUM('client', 'ehc'),
    final_invoice_id INT,
    refund_amount DECIMAL(10, 2),
    status ENUM('pending', 'confirmed', 'completed'),
    processed_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (subscription_id) REFERENCES subscriptions(subscription_id),
    FOREIGN KEY (company_id) REFERENCES companies(company_id),
    FOREIGN KEY (final_invoice_id) REFERENCES invoices(invoice_id),
    FOREIGN KEY (processed_by) REFERENCES users(user_id)
);

-- Create the client_history table
CREATE TABLE client_history (
    history_id INT AUTO_INCREMENT PRIMARY KEY,
    company_id INT,
    user_id INT,
    action_type VARCHAR(255),
    description TEXT,
    data_snapshot JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (company_id) REFERENCES companies(company_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);