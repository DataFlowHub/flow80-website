-- Flow80 Stripe Subscriptions Schema
-- Run once against your MySQL database (e.g. via phpMyAdmin or `mysql -u ...`)

CREATE TABLE IF NOT EXISTS flow80_subscriptions (
  id                BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id           VARCHAR(255)     NOT NULL,           -- flow80 internal user id (metadata flow80_user_id)
  stripe_customer_id VARCHAR(255)    NOT NULL UNIQUE,
  stripe_subscription_id VARCHAR(255) NOT NULL UNIQUE,
  tier              ENUM('starter','pro','business','free') NOT NULL DEFAULT 'free',
  status            VARCHAR(50)      NOT NULL,           -- active, trialing, past_due, canceled, unpaid, incomplete
  interval          ENUM('monthly','annual') DEFAULT 'monthly',
  trial_ends_at     DATETIME NULL,                       -- when the 14-day trial ends
  current_period_end DATETIME NULL,                      -- subscription period end
  canceled_at       DATETIME NULL,
  created_at        DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at        DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_user_id (user_id),
  INDEX idx_stripe_customer (stripe_customer_id),
  INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
